import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';

import Home from '@/pages/Home';
import Editor from '@/pages/Editor';
import LogIn from '@/pages/LogIn';
import NotFound from '@/pages/NotFound';
import SignUp from '@/pages/SignUp';

Vue.use(Router);
Vue.use(Meta);

const isLoggedIn = () =>
  JSON.parse(localStorage.getItem('user')) !== null;

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'App',
      component: Editor,
      beforeEnter: (to, from, next) => {
        if (isLoggedIn()) next();
        else next({ name: 'Home' });
      },
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LogIn,
      beforeEnter: (to, from, next) => {
        if (!isLoggedIn()) next();
        else next({ name: 'App' });
      },
      props: route => ({ email: route.query.email }),
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
      beforeEnter: (to, from, next) => {
        if (!isLoggedIn()) next();
        else next({ name: 'App' });
      },
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
  scrollBehavior: (to, from, savedPosition) =>
    savedPosition || { x: 0, y: 0 },
});
