import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth.store';
import editor from './modules/editor.store';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    editor,
  },
  state: {},
  actions: {},
  mutations: {},
  getters: {},
});

export default store;
