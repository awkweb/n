import api from '@/api';
import {
  INIT_EDITOR,
  SET_ACTIVE_NOTE,
  SET_THEME,
  SET_QUERY,
} from '@/store/constants';

const store = {
  state: {
    activeNote: null,
    notes: [],
    theme: 'light',
    query: '',
  },
  actions: {
    FETCH_USER_DATA: ({ commit, rootState }) =>
      api
        .getDataForUserId(rootState.auth.user.uid)
        .then(res => commit(INIT_EDITOR, res)),
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
  },
  getters: {
    activeNote: state => state.activeNote,
    notes: state => state.notes,
    theme: state => state.theme,
    query: state => state.query,
  },
};

export default { ...store };
