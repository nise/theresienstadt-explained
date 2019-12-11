import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import store from './store';
import Session from './components/StartSession.vue';
import GetStudents from './components/GetStudents.vue';
import IndividualAnalysis from './components/IndividualAnalysis.vue';
import ShowPartners from './components/ShowPartners.vue';
import VuePlyr from 'vue-plyr'

//Einbindung des Vue Router
Vue.use(VueRouter);

Vue.use(VuePlyr, {
  plyr: {
    fullscreen: { enabled: false }
  },
  emit: ['ended']
})

const routes = [
  { path: '/createsession', component: Session },
  { path: '/', component: GetStudents },
  { path: '/individualanalysis', component: IndividualAnalysis},
  { path: '/showpartners', component: ShowPartners}
];

const router = new VueRouter({
  routes: routes
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
