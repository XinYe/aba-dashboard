import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

// import { getOwner, getPrincipals } from "@/utils/MockUtil";

const getOwner = require('@/utils/MockUtil').getOwner;
const getPrincipals = require('@/utils/MockUtil').getPrincipals;

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
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

let appData = {
  owner: getOwner()
};

let appContext = {
  getPrincipals: (ownerEmail: string) => {
    return getPrincipals(ownerEmail);
  },
  curPrincipal: null
}

Vue.mixin({
  data() {
    return {
      appData: appData,
      appContext: appContext
    };
  }
});

export default router;
