import Vue from "vue";
import Router from "vue-router";
import Home from "./views/home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/courses",
      name: "courses",
      component: () =>
        import(/* webpackChunkName: 'courses' */ "./views/courses/index.vue")
    },
    {
      path: "/sign-in",
      name: "sign-in",
      component: () =>
        import(/* webpackChunkName: 'auth' */ "./views/auth/sign-in.vue")
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: () =>
        import(/* webpackChunkName: 'auth' */ "./views/auth/sign-up.vue")
    }
  ]
});
