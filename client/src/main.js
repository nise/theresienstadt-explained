import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Session from './components/StartSession.vue';
import GetStudents from './components/GetStudents.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/session', component: Session },
  { path: '/', component: GetStudents }
];

const router = new VueRouter({
  routes: routes
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
