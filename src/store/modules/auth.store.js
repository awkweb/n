import api from '@/api';
import {
  SET_USER,
} from '@/store/constants';

const store = {
  state: {
    user: null,
  },
  actions: {
    FETCH_USER: ({ commit }) =>
      api.watchAuthStateChanged(user => commit(SET_USER, user)),
    LOG_IN_USER: ({ commit }, data) =>
      api
        .logIn(data.email, data.password)
        .then(user => commit(SET_USER, user)),
    LOG_OUT_USER: async ({ commit }) =>
      api
        .logOut()
        .then(() => commit(SET_USER, null)),
    SIGN_UP_USER: ({ commit }, data) =>
      api
        .signUp(data.email, data.password)
        .then(() =>
          api
            .updateProfile({ displayName: data.displayName })
            .finally(() =>
              api
                .sendEmailVerification()
                .finally(() => commit(SET_USER, api.getCurrentUser())))),
  },
  mutations: {
    [SET_USER](state, user) {
      if (user) localStorage.setItem('user', JSON.stringify(user));
      else localStorage.removeItem('user');
      state.user = user;
    },
  },
  getters: {
    user: state => state.user,
  },
};

export default { ...store };
