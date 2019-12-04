import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        //Storage für Attribute
        studentId: ''
    },
    getters: {
        //gibt berechnete Werte aufgrund der Attribute zurück
    },
    mutations: {
        //synchrones Hinzufügen neuer Daten (in ein Array) oder Verändern von Daten

        //Funktion zum Ändern der studentId
        CHANGE_STUDENT_ID: (state, newId) => {
            state.studentId =newId;
        }
    },
    actions: {
        //asynchrones Hinzufügen neuer Daten (in ein Array) oder Verändern von Daten
    }
})