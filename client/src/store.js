import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        //Storage für Attribute
        //Student-Id und Session als permanenter Speicher für alle Komponenten -> wird in GetStudents initial befüllt
        studentId: '',
        sessionId: '5e08b52cd2a32a9384bfb990',
        partnerId: '',
        partnerName: '',
    },
    getters: {
        //gibt berechnete Werte aufgrund der Attribute zurück
    },
    mutations: {
        //synchrones Hinzufügen neuer Daten (in ein Array) oder Verändern von Daten

        //Funktion zum Ändern der studentId
        CHANGE_STUDENT_ID: (state, newId) => {
            state.studentId = newId;
        },
        //Funktion zum Ändern der sessionId
        CHANGE_SESSION_ID: (state, newId) => {
            state.sessionId = newId;
        },
        //Funktion zum Ändern der partnerId
        CHANGE_PARTNER_ID: (state, newId) => {
            state.partnerId = newId;
        },
        //Funktion zum Ändern des partner Name
        CHANGE_PARTNER_NAME: (state, newName) => {
            state.partnerName = newName;
        }
    },
    actions: {
    //asynchrones Hinzufügen neuer Daten (in ein Array) oder Verändern von Daten
    }
})