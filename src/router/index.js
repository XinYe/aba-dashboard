import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

const getOwner = require('@/utils/MockUtil').getOwner;
const getPrincipals = require('@/utils/MockUtil').getPrincipals;
const getMentors = require('@/utils/MockUtil').getMentors;
const getTeachers = require('@/utils/MockUtil').getTeachers;
const getStudents = require('@/utils/MockUtil').getStudents;

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/principal',
    name: 'principal',
    component: () => import('@/components/Principal.vue'),
    props: true
  },
  {
    path: '/mentor',
    name: 'mentor',
    component: () => import('@/components/Mentor.vue'),
    props: true
  },
  {
    path: '/teacher',
    name: 'teacher',
    component: () => import('@/components/Teacher.vue'),
    props: true
  },
  {
    path: '/student',
    name: 'student',
    component: () => import('@/components/Student.vue'),
    props: true
  },
  {
    path: '/chart',
    name: 'chart',
    component: () => import('@/components/Chart.vue'),
    props: true
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
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
