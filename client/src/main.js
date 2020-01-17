import Vue from 'vue';
//Vue Router
import VueRouter from 'vue-router';
//Import für App
import App from './App.vue';
//Vuex Import
import store from './store';
//Imports für Komponenten
import Session from './components/StartSession.vue';
import GetStudents from './components/GetStudents.vue';
import IndividualAnalysis from './components/IndividualAnalysis.vue';
import ShowPartners from './components/ShowPartners.vue';
import GroupAnalysis from './components/GroupAnalysis.vue';
import Debriefing from './components/Debriefing.vue';
import CreateTasks from './components/CreateTasks.vue';
import Tracking from './components/Tracking.vue';
import AnalysisEnd from './components/AnalysisEnd.vue';
import ModifySession from './components/ModifySession.vue';
//Import für Chart-Package "highcharts-vue"
import HighchartsVue from 'highcharts-vue';
import Highcharts from 'highcharts';
import heatmapInit from 'highcharts/modules/heatmap';
//Import für Chat "vue-beautiful-chat"
import Chat from 'vue-beautiful-chat';
//Import für Vue-Clipboard
import VueClipboard from 'vue-clipboard2';
//Import für Bootstrap-vue
import BootstrapVue from 'bootstrap-vue';
//Import für AsyncComputed
import AsyncComputed from 'vue-async-computed';
//Import Vue-socket.io
import VueSocketIO from '../node_modules/vue-socket.io/dist/vue-socketio.js';

//Einbindung des Vue Router
Vue.use(VueRouter);

//Einbindung des "vue-beautiful-chat"
Vue.use(Chat);

//Einbindung des Vue-Clipboard
Vue.use(VueClipboard);

//Einbindung von Boostrap-vue
Vue.use(BootstrapVue);

//Einbindung von Highcharts-vue
Vue.use(HighchartsVue);

//Init für Heatmap Plugin für Highcharts
heatmapInit(Highcharts);

//vue-async-computed Use
Vue.use(AsyncComputed);


//vue-socket.io init
Vue.use(new VueSocketIO({
  debug: true,
  //api proxy, siehe vue.config.js
  connection: 'http://localhost:5000',
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
  options: {} //Optional options
}))

//Anlegen der Routen fürs Routing im Frontend
const routes = [
  { path: '/createsession', component: Session },
  { path: '/', component: GetStudents },
  { path: '/individualanalysis', component: IndividualAnalysis },
  { path: '/showpartners', component: ShowPartners },
  { path: '/groupanalysis', component: GroupAnalysis },
  { path: '/debriefing', component: Debriefing },
  { path: '/createtasks', component: CreateTasks },
  { path: '/tracking', component: Tracking },
  { path: '/analysisend', component: AnalysisEnd },
  { path: '/modifysession', component: ModifySession }
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
