import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Intro from './views/Intro.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'intro',
      component: Intro,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    { path: '/film', name: 'film', component: () => import(/* webpackChunkName: "imprint" */ './views/Video.vue') },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/imprint',
      name: 'imprint',
      component: () => import(/* webpackChunkName: "imprint" */ './views/Imprint.vue'),
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import(/* webpackChunkName: "imprint" */ './views/Privacy.vue'),
    },
    {
      path: '/pages/persons',
      name: 'imprint',
      component: () => import(/* webpackChunkName: "about" */ './views/Persons.vue'),
    },
    {
      path: '/pages/scenes',
      name: 'scenes',
      component: () => import(/* webpackChunkName: "about" */ './views/Scenes.vue'),
    },
    {
      path: '/pages/map',
      name: 'pages/map',
      component: () => import(/* webpackChunkName: "about" */ './views/Map.vue'),
    },
    {
      path: '/pages/history',
      name: 'imprint',
      component: () => import(/* webpackChunkName: "about" */ './views/History.vue'),
    },
  ],
});
