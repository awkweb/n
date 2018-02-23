import api from '@/api';
import {
  INIT_EDITOR,
  SET_ACTIVE_NOTE,
  SET_THEME,
  SET_QUERY,
  SET_RESULT_INDEX,
} from '@/store/constants';

const store = {
  state: {
    activeNote: null,
    editingId: null,
    notes: [],
    renamingId: null,
    theme: 'light',
    query: '',
    resultIndex: -1,
  },
  actions: {
    FETCH_USER_DATA: ({ commit, rootState }) =>
      api
        .getDataForUserId(rootState.auth.user.uid)
        .then(res => commit(INIT_EDITOR, res)),
    RESET_ACTIVE_NOTE: ({ commit }) => {
      commit(SET_RESULT_INDEX, -1);
      commit(SET_ACTIVE_NOTE, null);
    },
  },
  mutations: {
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
    [SET_THEME](state, theme) {
      state.theme = theme;
    },
    [SET_QUERY](state, query) {
      state.query = query;
    },
    [SET_RESULT_INDEX](state, resultIndex) {
      state.resultIndex = resultIndex;
    },
  },
  getters: {
    activeNote: state => state.activeNote,
    editingId: state => state.editingId,
    notes: state => state.notes,
    theme: state => state.theme,
    query: state => state.query,
    renamingId: state => state.renamingId,
    resultIndex: state => state.resultIndex,
  },
};

export default { ...store };
