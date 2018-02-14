import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App';
import router from './router';
import store from './store';
import './directives';
import * as filters from './filters';

Vue.use(Vuelidate);
Vue.config.productionTip = false;
Object
  .keys(filters)
  .forEach(key => Vue.filter(key, filters[key]));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
