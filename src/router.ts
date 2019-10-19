import Router from 'vue-router';
import routes from './routes';
import store from './store';
import Vue from 'vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: (to, from, position) => (position || { x: 0, y: 0 }),
});

router.beforeEach((to, from, next) => {
  store.state.requests.forEach((xhr) => xhr.cancel());

  store.state.requests = [];

  if (to.meta.title) {
    document.title = `${to.meta.title} | CCU PLUS`;
  } else {
    document.title = 'CCU PLUS | 全新生活 由此領航';
  }

  next();
});

export default router;
