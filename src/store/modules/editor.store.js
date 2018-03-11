import Vue from 'vue';
import moment from 'moment';
import api from '@/api';
import {
  ADD_NOTE,
  DELETE_NOTE,
  INIT_EDITOR,
  SET_ACTIVE_NOTE,
  SET_EDITING_ID,
  SET_NOTE,
  SET_THEME,
  SET_QUERY,
  SET_RENAMING_ID,
  SET_RESULT_INDEX,
  TOGGLE_FULL_SCREEN,
} from '@/store/constants';

const store = {
  state: {
    activeNote: null,
    editingId: null,
    isFullScreen: false,
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
    UPDATE_NOTE: ({ commit, rootState }, note) =>
      api
        .updateNote(rootState.auth.user.uid, note.key, moment().toString(), note)
        .then((res) => {
          const newNote = Object.assign(note, { date_modified: res.date_modified });
          commit(SET_NOTE, newNote);
        }),
    UPDATE_THEME: ({ commit, rootState }, theme) =>
      api
        .updateTheme(rootState.auth.user.uid, theme)
        .then(() => commit(SET_THEME, theme)),
  },
  mutations: {
    [ADD_NOTE](state, note) {
      Vue.set(state.notes, 0, note);
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
    [SET_ACTIVE_NOTE](state, note) {
      state.activeNote = note;
    },
    [SET_EDITING_ID](state, editingId) {
      state.editingId = editingId;
    },
    [SET_NOTE](state, newNote) {
      const note = state.notes.find(n => n.key === newNote.key);
      note.date_modified = newNote.date_modified;
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
    [TOGGLE_FULL_SCREEN](state) {
      state.isFullScreen = !state.isFullScreen;
    },
  },
  getters: {
    activeNote: state => state.activeNote,
    editingId: state => state.editingId,
    isFullScreen: state => state.isFullScreen,
    notes: state => state.notes,
    theme: state => state.theme,
    query: state => state.query,
    renamingId: state => state.renamingId,
    resultIndex: state => state.resultIndex,
  },
};

export default { ...store };
