import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App';
import router from './router';
import store from './store';
import './directives';

Vue.use(Vuelidate);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
