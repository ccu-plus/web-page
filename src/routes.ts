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
  },
  {
    path: '/courses/:code',
    name: 'courses.show',
    component: CourseShow,
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: SignIn,
  },
  {
    path: '/sign-out',
    name: 'sign-out',
    component: SignOut,
  },
  {
    path: '*',
    name: '404',
    component: NotFound,
  },
];
