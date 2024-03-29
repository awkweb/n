import Vue from 'vue';
import moment from 'moment';
import api from '@/api';
import utils from '@/utils';
import {
  ADD_NOTE,
  DELETE_NOTE,
  INIT_EDITOR,
  RESET_EDITOR,
  SET_ACTIVE_NOTE,
  SET_EDITING_ID,
  SET_NOTE,
  SET_THEME,
  SET_QUERY,
  SET_RENAMING_ID,
  SET_RESULT_INDEX,
} from '@/store/constants';

const store = {
  state: {
    activeNote: null,
    activeNotes: [],
    editingId: null,
    notes: [],
    renamingId: null,
    theme: 'light',
    query: '',
    resultIndex: -1,
  },
  actions: {
    CREATE_NOTE: ({ commit, rootState, state }) => {
      const ids = state.notes.map(note => note.id);
      const id = ids.length > 0 ? Math.max(...ids) + 1 : 1;
      const name = state.query.length > 0 ? state.query : 'Untitled Note';
      const note = {
        id,
        name,
        body: '',
      };
      return api
        .createNote(rootState.auth.user.uid, moment().toString(), note)
        .then(res => commit(ADD_NOTE, res));
    },
    DELETE_NOTE: ({ commit, rootState }, noteKey) =>
      api
        .deleteNote(rootState.auth.user.uid, noteKey)
        .then(() => commit(DELETE_NOTE, noteKey)),
    FETCH_USER_DATA: ({ commit, rootState }) =>
      api
        .getDataForUserId(rootState.auth.user.uid)
        .then(res => commit(INIT_EDITOR, res)),
    RESET_ACTIVE_NOTE: ({ commit }) => {
      commit(SET_RESULT_INDEX, -1);
      commit(SET_ACTIVE_NOTE, null);
    },
    UPDATE_NOTE_BODY: ({ commit, rootState, state }, body) => {
      const note = Object.assign({}, state.activeNote, { body });
      if (state.activeNote.id !== state.editingId) {
        this.SET_RESULT_INDEX(0);
      }
      return api
        .updateNote(rootState.auth.user.uid, note.key, moment().toString(), note)
        .then((res) => {
          const newNote = Object.assign({}, note, { date_modified: res.date_modified });
          commit(SET_NOTE, newNote);
        });
    },
    UPDATE_NOTE_NAME: ({ commit, rootState, state }, name) => {
      const note = Object.assign({}, state.activeNote, { name });
      return api
        .updateNote(rootState.auth.user.uid, note.key, moment().toString(), note)
        .then((res) => {
          const newNote = Object.assign({}, note, { date_modified: res.date_modified });
          commit(SET_NOTE, newNote);
        });
    },
    UPDATE_THEME: ({ commit, rootState }, theme) =>
      api
        .updateTheme(rootState.auth.user.uid, theme)
        .then(() => commit(SET_THEME, theme)),
  },
  mutations: {
    [ADD_NOTE](state, note) {
      state.notes.splice(0, 1, note);
      state.activeKey = note.key;
      state.activeNote = note;
    },
    [DELETE_NOTE](state, noteKey) {
      const index = state.notes.findIndex(note => note.key === noteKey);
      Vue.delete(state.notes, index);
    },
    [INIT_EDITOR](state, data) {
      state.notes = Object
        .keys(data.notes)
        .map((key) => {
          const note = data.notes[key];
          note.key = key;
          return note;
        });
      state.theme = data.theme;
    },
    [RESET_EDITOR](state) {
      state.activeNote = null;
      state.activeNotes = [];
      state.editingId = null;
      state.notes = [];
      state.renamingId = null;
      state.theme = 'light';
      state.query = '';
      state.resultIndex = -1;
    },
    [SET_ACTIVE_NOTE](state, note) {
      state.activeNote = note;
    },
    [SET_EDITING_ID](state, editingId) {
      state.editingId = editingId;
    },
    [SET_NOTE](state, newNote) {
      const noteIndex = state.notes.findIndex(n => n.key === newNote.key);
      state.notes.splice(noteIndex, 1, newNote);
    },
    [SET_THEME](state, theme) {
      state.theme = theme;
    },
    [SET_QUERY](state, query) {
      state.query = query;
    },
    [SET_RENAMING_ID](state, renamingId) {
      state.renamingId = renamingId;
    },
    [SET_RESULT_INDEX](state, resultIndex) {
      state.resultIndex = resultIndex;
    },
  },
  getters: {
    activeNote: state => state.activeNote,
    activeNoteId(state) {
      return state.activeNote ? state.activeNote.id : -1;
    },
    activeNotes(state) {
      const emptyQuery = state.query.length === 0;
      const filteredNotes = emptyQuery ?
        state.notes : utils.filterNotesForQuery(state.query, state.notes);
      return utils.sortNotes(filteredNotes, !emptyQuery);
    },
    editingId: state => state.editingId,
    notes: state => state.notes,
    theme: state => state.theme,
    query: state => state.query,
    renamingId: state => state.renamingId,
    resultIndex: state => state.resultIndex,
  },
};

export default { ...store };
