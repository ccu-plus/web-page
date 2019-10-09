import bus from '@/libs/bus';
import Router from 'vue-router';
import routes from './routes';
import store from './store';
import Vue from 'vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  store.state.requests.forEach((xhr) => xhr.cancel());
  store.state.requests = [];

  next();
});

bus.$on('api-response-404', () => {
  //
});

export default router;
