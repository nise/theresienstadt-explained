<template>
  <div class="container">
    <!-- Anzeige eines Fehlers, falls vorhanden -->
    <div class="alert alert-danger" role="alert" v-if="error">
      Fehler: {{this.error}}
    </div>
    <h1>Registrierung</h1>
    <div>
      <p style="font-size:large;" v-if="this.id && this.sessionStatus !== 'Individualanalyse'">Sie haben sich erfolgreich registriert. Bitte warten Sie noch, bis sich alle anderen Teilnehmer registriert haben.</p>
      <p style="font-size: large" v-if="this.sessionStatus === 'Individualanalyse'">Nun können Sie fortfahren, indem Sie auf den Knopf unten drücken. Sie gelangen zur Einzelanalyse des Videos.</p>
      <button class="btn btn-primary" v-if="this.sessionStatus==='Individualanalyse'" v-on:click="navigateToIndividualAnalysis">Starten</button>
    </div>
    <!-- Input Gruppe zur Eingabe von Vor- und Nachmame; wird über v-model jeweils mit der Variable synchronisiert -->
    <div v-if="this.id===''">
      <p>Bitte geben Sie Ihren Vor- und Nachnamen ein. Mit einem Klick auf Senden nehmen Sie an der Videoanalyse teil.</p>
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
    <div v-if="this.sessionStatus !== 'Individualanalyse'">
    <h4 class="display-6">Aktuell registrierte Teilnehmer</h4>
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
          //Studenten erneut auslesen zur Aktualisierung der Anzeige
          this.students = await StudentService.getStudents(this.session);
          } catch (err) {
            this.error = err.message;
          }
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
      try {
      this.sessions = await SessionService.getSessions();
      } catch (err) {
        this.error = err.message;
      }
      const filteredSession = this.sessions.find(element => element.id === this.session);
      this.sessionStatus = filteredSession.status;
    },
    //Funktion zum Navigieren zu Komponente "IndividualAnalysis"
    async navigateToIndividualAnalysis() {
      //in student abspeichern, dass er mit der Anmeldung fertig ist
      StudentService.setStudentStatus(this.studentId, 'Individualanalyse')
      //Navigieren zu IndividualAnalysis
      this.$router.push('/individualanalysis');
    }
  }
}
</script>

