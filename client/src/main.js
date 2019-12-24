import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import store from './store';
import Session from './components/StartSession.vue';
import GetStudents from './components/GetStudents.vue';
import IndividualAnalysis from './components/IndividualAnalysis.vue';
import ShowPartners from './components/ShowPartners.vue';
import GroupAnalysis from './components/GroupAnalysis.vue';
import Debriefing from './components/Debriefing.vue';
import CreateTasks from './components/CreateTasks.vue';
import Tracking from './components/Tracking.vue';
//Import für Chat "vue-beautiful-chat"
import Chat from 'vue-beautiful-chat';
//Import für Vue-Clipboard
import VueClipboard from 'vue-clipboard2'
//Import für Bootstrap-vue
import BootstrapVue from 'bootstrap-vue'

//Einbindung des Vue Router
Vue.use(VueRouter);

//Einbindung des "vue-beautiful-chat"
Vue.use(Chat);

//Einbindung des Vue-Clipboard
Vue.use(VueClipboard);

//Einbindung von Boostrap-vue
Vue.use(BootstrapVue);


//Anlegen der Routen fürs Routing im Frontend
const routes = [
  { path: '/createsession', component: Session },
  { path: '/', component: GetStudents },
  { path: '/individualanalysis', component: IndividualAnalysis },
  { path: '/showpartners', component: ShowPartners },
  { path: '/groupanalysis', component: GroupAnalysis },
  { path: '/debriefing', component: Debriefing },
  { path: '/createtasks', component: CreateTasks },
  { path: '/tracking', component: Tracking }
];

const router = new VueRouter({
  routes: routes
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    //Bestätigung notwendig vor dem Verlassen einer Seite mit den Browser Buttons -> Sicherheit wegen Nicht-Benutzung von Cookies
    window.addEventListener('beforeunload', (event) => {
      event.returnValue ="Wenn Sie die Seite verlassen, dann können Sie nicht zurückkehren. Bitte verlassen Sie die Seite wirklich nur, wenn Sie mit der Videoanalyse fertig sind.";
    }, false)
  },
}).$mount('#app')
