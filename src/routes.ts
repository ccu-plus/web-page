import Home from '@/views/home.vue';
import Courses from '@/views/courses/index.vue';
import CourseShow from '@/views/courses/show.vue';
import SignIn from '@/views/auth/sign-in.vue';
import SignOut from '@/views/auth/sign-out.vue';
import NotFound from '@/views/errors/404.vue';

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/courses',
    name: 'courses',
    component: Courses,
    meta: {
      title: '探索課程',
    },
  },
  {
    path: '/courses/:code',
    name: 'courses.show',
    component: CourseShow,
    meta: {
      title: '課程資訊',
    },
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: SignIn,
    meta: {
      title: '登入',
    },
  },
  {
    path: '/sign-out',
    name: 'sign-out',
    component: SignOut,
    meta: {
      title: '登出',
    },
  },
  {
    path: '*',
    name: '404',
    component: NotFound,
    meta: {
      title: '404 Not Found',
    },
  },
];
