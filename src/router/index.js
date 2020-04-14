import Vue from 'vue';
import VueRouter from 'vue-router';
import Welcome from '../views/Welcome.vue';
import Home from '../views/Home.vue';
import Auth from '../auth/Auth.vue';

const getPrincipals = require('@/utils/MockUtil').getPrincipals;
const getMentors = require('@/utils/MockUtil').getMentors;
const getTeachers = require('@/utils/MockUtil').getTeachers;
const getStudents = require('@/utils/MockUtil').getStudents;

Vue.use(VueRouter);

const routes = [
  {
    path: '/welcome',
    component: Welcome
  },
  {
    path: '/',
    component: Auth
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/config',
    name: 'config',
    component: () => import('@/components/Config.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/:id',
    name: 'admin',
    component: () => import('@/components/Admin.vue'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/principal/:id',
    name: 'principal',
    component: () => import('@/components/Principal.vue'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/mentor/:id',
    name: 'mentor',
    component: () => import('@/components/Mentor.vue'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/teacher/:id',
    name: 'teacher',
    component: () => import('@/components/Teacher.vue'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/student/:id',
    name: 'student',
    component: () => import('@/components/Student.vue'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/chart',
    name: 'chart',
    component: () => import('@/components/Chart.vue'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

let principals = getPrincipals();
let mentors = getMentors();
let teachers = getTeachers();
let students = getStudents();

let appContext = {
  principals: principals,
  mentors: mentors,
  teachers: teachers,
  students: students
};

Vue.mixin({
  data() {
    return {
      appContext: appContext
    };
  }
});

export default router;
