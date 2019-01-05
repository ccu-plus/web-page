export default [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: 'home' */ "./views/home.vue")
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
  }
];
