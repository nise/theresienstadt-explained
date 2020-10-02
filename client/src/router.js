import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
//import Video from './views/Video.vue';
//import Intro from './views/Intro.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'intro',
      component: Home, // Intro,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/film',
      name: 'film',
      component: () => import(/* webpackChunkName: "about" */ './views/Video.vue'),
    },
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
      component: () => import(/* webpackChunkName: "privacy" */ './views/Privacy.vue'),
    },
    {
      path: '/pages/persons',
      name: 'imprint',
      component: () => import(/* webpackChunkName: "persons" */ './views/Persons.vue'),
    },
    {
      path: '/pages/scenes',
      name: 'scenes',
      component: () => import(/* webpackChunkName: "scenes" */ './views/Scenes.vue'),
    },
    {
      path: '/pages/map',
      name: 'pages/map',
      component: () => import(/* webpackChunkName: "map" */ './views/Map.vue'),
    },
    {
      path: '/pages/history',
      name: 'imprint',
      component: () => import(/* webpackChunkName: "history" */ './views/History.vue'),
    },
    {
      path: '/pages/fake-video',
      name: 'imprint',
      component: () => import(/* webpackChunkName: "fakevideo" */ './views/FakeVideo.vue'),
    },
    {
      path: '/pages/references',
      name: 'imprint',
      component: () => import(/* webpackChunkName: "references" */ './views/References.vue'),
    },
    {
      path: '/pages/video-analyses',
      name: 'imprint',
      component: () => import(/* webpackChunkName: "analysis" */ './views/VideoAnalyses.vue'),
    },
    {
      path: '/pages/guided-video',
      name: 'imprint',
      component: () => import(/* webpackChunkName: "guidedvideo" */ './views/GuidedVideo.vue'),
    },
    {
      path: '/pages/propaganda',
      name: 'imprint',
      component: () => import(/* webpackChunkName: "propaganda" */ './views/Propaganda.vue'),
    },
  ],
})
