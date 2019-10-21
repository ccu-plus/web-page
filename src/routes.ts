import Courses from '@/views/courses/index.vue';
import CourseShow from '@/views/courses/show.vue';
import Home from '@/views/home.vue';
import NotFound from '@/views/errors/404.vue';
import Profile from '@/views/profile/index.vue';
import SignIn from '@/views/auth/sign-in/index.vue';
import SignOut from '@/views/auth/sign-out.vue';

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
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
    path: '/sign-up',
    redirect: { name: 'sign-in' },
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
