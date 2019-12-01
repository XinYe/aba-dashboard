import Vue from 'vue';
import VueRouter from 'vue-router';
import Welcome from '../views/Welcome.vue';
import Auth from '../auth/Auth.vue';

const getOwner = require('@/utils/MockUtil').getOwner;
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
    path: '/owner',
    name: 'owner',
    component: () => import('@/components/Owner.vue'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/principal',
    name: 'principal',
    component: () => import('@/components/Principal.vue'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/mentor',
    name: 'mentor',
    component: () => import('@/components/Mentor.vue'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/teacher',
    name: 'teacher',
    component: () => import('@/components/Teacher.vue'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/student',
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

let owner = getOwner();
let principals = getPrincipals();
let mentors = getMentors();
let teachers = getTeachers();
let students = getStudents();

let appContext = {
  owner: owner,
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
