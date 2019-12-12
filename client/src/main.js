import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import store from './store';
import Session from './components/StartSession.vue';
import GetStudents from './components/GetStudents.vue';
import IndividualAnalysis from './components/IndividualAnalysis.vue';
import ShowPartners from './components/ShowPartners.vue';
import GroupAnalysis from './components/GroupAnalysis.vue'
import VuePlyr from 'vue-plyr'

//Einbindung des Vue Router
Vue.use(VueRouter);

//Setzen von Standardeinstellungen für den Videoplayer vue-plyr
Vue.use(VuePlyr, {
  plyr: {
    //standardmäßig kein Vollbild auswählbar
    fullscreen: { enabled: false }
  },
  emit: ['ended']
})

//Anlegen der Routen fürs Routing im Frontend
const routes = [
  { path: '/createsession', component: Session },
  { path: '/', component: GetStudents },
  { path: '/individualanalysis', component: IndividualAnalysis},
  { path: '/showpartners', component: ShowPartners},
  { path: '/groupanalysis', component: GroupAnalysis}
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
