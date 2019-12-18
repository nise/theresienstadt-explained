import Vue from 'vue';
import Vuex from 'vuex';
import AnnotationService from '../AnnotationService';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        //Storage für Attribute
        //Student-Id und Session als permanenter Speicher für alle Komponenten -> wird in GetStudents initial befüllt
        studentId: '',
        sessionId: '',
        partnerId: '',
        partnerName: '',
        //Markierungen als permanenter Speicher, wird nach abschließen der Analyse in Datenbank geschrieben
        annotations: new Array
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
        },
        //Funktion zum Anlegen einer neuen Markierung; Übergabeparameter sind Attribute einer Markierung
        CREATE_NEW_ANNOTATION: (state, newAnnotation) => {
            //push Funktion gibt Index des neu erstellten Eintrags zurück; wird für Änderungen oder Löschungen zurückgegeben
            return state.annotations.push(newAnnotation);
        },

        //Funktion zum Ändern einer bestehenden Markierung; annotationText und id sind in annotationToChange Objekt enthalten
        CHANGE_EXISTING_ANNOTATION: (state, annotationToChange) => {
            //alten Eintrag auslesen
            const oldEntry = state.annotations[annotationToChange.id];
            //neuen Eintrag mit altem Eintrag initialisieren
            var newEntry = oldEntry;
            //Text des neuen Eintrags ändern
            newEntry.annotationText = annotationToChange.annotationText;
            //neuen Eintrag zurückschreiben in Store
            state.annotations[annotationToChange.id] = newEntry;
        },

        //Funktion zum Löschen einer bestehenden Markierung; Übergabeparameter ist Index des Elements im Array (aus CREATE Funktion)
        DELETE_EXISTING_ANNOTATION: (state, arrayIndex) => {
            //Nutzung der Splice Methode zum Löschen
            state.annotations.splice(arrayIndex, 1);
        },

        //Annotations Array leeren
        EMPTY_ANNOTATIONS_ARRAY: (state) => {
            state.annotations = [];
        }
    },
    actions: {
    //asynchrones Hinzufügen neuer Daten (in ein Array) oder Verändern von Daten
        //Schreiben von Markierungen aus dem VueX Store in die Datenbank; bleiben im Store aber erhalten; Nutzung des AnnotationService
        async WRITE_ANNOTATIONS_TO_DATABASE ({ commit, state }, annotation) {
            try {
                await AnnotationService.postAnnotations(annotation.session, annotation.student, annotation.annotationText, annotation.annotationStartTime, annotation.annotationEndTime, annotation.taskId);
            } catch (err) {
                this.error = err.message;
            }
        }
    }
})