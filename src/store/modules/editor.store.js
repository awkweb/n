import api from '@/api';
import {
  INIT_EDITOR,
  SET_NOTES,
  SET_THEME,
  SET_QUERY,
} from '@/store/constants';

const store = {
  state: {
    notes: {},
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
      state.notes = data.notes;
      state.theme = data.theme;
    },
    [SET_NOTES](state, notes) {
      state.notes = notes;
    },
    [SET_THEME](state, theme) {
      state.theme = theme;
    },
    [SET_QUERY](state, query) {
      state.query = query;
    },
  },
  getters: {
    notes: state => state.notes,
    theme: state => state.theme,
    query: state => state.query,
  },
};

export default { ...store };
