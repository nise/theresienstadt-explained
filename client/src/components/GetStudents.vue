<template>
  <div class="container">
    <h1 class="display-4">Teilnehmererfassung</h1>
    <div v-if="this.id">
      <p style="font-size:large;">Bitte warten Sie, bis der Lehrer die Session startet.</p>
      <button class="btn btn-primary" v-if="this.sessionStatus==='Individualanalyse'" v-on:click="navigateToIndividualAnalysis">Starten</button>
    </div>
    <!-- Input Gruppe zur Eingabe von Vor- und Nachmame; wird über v-model jeweils mit der Variable synchronisiert -->
    <div v-else>
      <label for="basic-url">Bitte geben Sie Ihren Vor- und Nachnamen ein. Mit einem Klick auf Senden können Sie an der Videoanalyse teilnehmen.</label>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" style="width: 100px;">Vorname</span>
        </div>
        <input type="text" v-model="firstName" class="form-control" placeholder="z.B. Max" aria-label="z.B. Max" aria-describedby="basic-addon1">
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" style="width: 100px;">Nachname</span>
        </div>
        <input type="text" v-model="lastName" class="form-control" placeholder="z.B. Mustermann" aria-label="z.B. Mustermann" aria-describedby="basic-addon1">
      </div>
      <!-- Button zum Absenden der Eingaben; mit onklick Event werden Daten zur Middleware und anschließend in die Datenbank gesendet -->
      <button class="btn btn-primary" v-on:click="createStudent">Senden</button>
      <hr>
    </div>
    <!-- Anzeige der aktuell für diese Session registrierten Schüler -->
  <h2 class="display-6">Aktuell registrierte Schüler</h2>
    <div class="row">
      <div class="col-sm-4"
        v-for="student in students"
        v-bind:key="student._id">
        <div class="card border-dark mb-3" style="width: 18rem;">
          <ul class = "list-group list-group-flush">
            <li class="list-group-item">{{student.firstName}}</li>
            <li class="list-group-item">{{student.lastName}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//StudentService Middleware importieren
import StudentService from '../../StudentService';
//SessionServie Middleware importieren
import SessionService from '../../SessionService';
//Vuex Import
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
import { mapActions } from 'vuex';
//Exports der Attribute, die aus den Eingabefeldern und automatisch beschrieben werden
export default {
  name: 'GetStudents',
  //komponenteigener Datenstore
  data() {
    return {
      firstName: '',
      id: '',
      lastName: '',
      session: this.$route.query.session,
      students: [],
      error: '',
      sessions: [],
      sessionStatus: ''
    }
  },
  //Vuex Store
  computed: {
    ...mapState({
      studentId: "studentId",
      sessionId: "sessionId"
    }),
    
  },
  //bei Seitenaufruf ausführen
  async created() {
    setInterval(()=>{this.writeStudentsToArray()}, 3000);
    setInterval(()=>{this.getSessionStatus()}, 3000);
    try {
      //Studenten Array zur Anzeige befüllen
      this.students = await StudentService.getStudents(this.session);
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    //Vuex Methoden: Getters, Mutations, Actions
    ...mapGetters({
    }),
    ...mapMutations([
      "CHANGE_STUDENT_ID",
      "CHANGE_SESSION_ID"
    ]),
    ...mapActions({
    }),
    changeStudentId: function() {
      this.CHANGE_STUDENT_ID(this.id);
    },
    changeSessionId: function() {
      this.CHANGE_SESSION_ID(this.session);
    },
    //Methode zur Überprüfung der Eingabefelder, ob sie befüllt sind, und Rückgabe einer Fehlermeldung in error Variable, wenn nicht
    validateInput: function () {
      if (this.firstName&&this.lastName) {
        this.error = '';
        return true;
      } else {
        if (this.firstName !== true) {
          this.error = 'Bitte den Vornamen eingeben.';
        } else {
          this.error = 'Bitte den Nachnamen eingeben.';
        }
      }
    },
    //Methode zum Erstellen eines Studenten
    async createStudent() {
      if (this.validateInput()) {
          //Fehlerbehandlung
          try {
            //Aufruf der Middleware zum Anlegen eines Studenten; firstName aus Nutzereingabe, lastName aus Nutzereingabe, session aus Funktion zum Session auslesen
            //ID des neuen Studenten wird in Variable id hinterlegt
            this.id = await StudentService.postStudent(this.firstName, this.lastName, this.session, 'inRegistration');
            //studentId im Vuex Store aktualisieren, damit bei späteren Komponenten verwendbar
            this.changeStudentId();
            this.changeSessionId();
          } catch (err) {
            this.error = err.message;
          }
          //Studenten erneut auslesen zur Aktualisierung der Anzeige
          this.students = await StudentService.getStudents(this.session);
      } else {
        return this.error;
      }
    },
    //Hilfsfunktion für setInterval
    async writeStudentsToArray() {
      try {
        this.students = await StudentService.getStudents(this.session);
      } catch (err) {
        this.error = err.message;
      }
    },
    //prüft, ob Session Status "Individualanalyse ist"; wenn ja, dann true; wenn nein, dann false
    async getSessionStatus() {
      this.sessions = await SessionService.getSessions();
      const filteredSession = this.sessions.find(element => element.id === this.session);
      this.sessionStatus = filteredSession.status;
    },
    //Funktion zum Navigieren zu Komponente "IndividualAnalysis"
    async navigateToIndividualAnalysis() {
      //in student abspeichern, dass er mit der Anmeldung fertig ist
      StudentService.setStudentStatus(this.studentId, 'IndividualAnalysis')
      //Navigieren zu IndividualAnalysis
      this.$router.push('/individualanalysis');
    }
  }
}
</script>

