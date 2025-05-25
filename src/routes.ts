import Courses from '@/views/courses/index.vue';
import CourseShow from '@/views/courses/show.vue';
import Home from '@/views/home.vue';
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
    path: '*',
    name: '404',
    component: NotFound,
    meta: {
      title: '404 Not Found',
    },
  },
];
