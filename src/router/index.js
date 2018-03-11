import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';

import Home from '@/pages/Home';
import Editor from '@/pages/Editor';
import LogIn from '@/pages/LogIn';
import NotFound from '@/pages/NotFound';
import ResetPassword from '@/pages/ResetPassword';
import Settings from '@/pages/Settings';
import SignUp from '@/pages/SignUp';

Vue.use(Router);
Vue.use(Meta);

const isLoggedIn = () =>
  JSON.parse(localStorage.getItem('user')) !== null;
const beforeEnterLoggedIn = (to, from, next) => {
  if (isLoggedIn()) next();
  else next({ name: 'Home' });
};
const beforeEnterLoggedOut = (to, from, next) => {
  if (!isLoggedIn()) next();
  else next({ name: 'App' });
};

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'App',
      component: Editor,
      beforeEnter: beforeEnterLoggedIn,
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      beforeEnter: beforeEnterLoggedIn,
    },
    {
      path: '/login/reset',
      name: 'ResetPassword',
      component: ResetPassword,
      beforeEnter: beforeEnterLoggedOut,
      props: route => ({ email: route.query.email }),
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LogIn,
      beforeEnter: beforeEnterLoggedOut,
      props: route => ({ email: route.query.email }),
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
      beforeEnter: beforeEnterLoggedOut,
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
