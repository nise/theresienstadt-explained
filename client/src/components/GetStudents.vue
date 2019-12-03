<template>
  <div class="container">
    <h1 class="display-4">Teilnehmererfassung</h1>
    <!-- Input Gruppe zur Eingabe von Vor- und Nachmame; wird über v-model jeweils mit der Variable synchronisiert -->
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
//Exports der Attribute, die aus den Eingabefeldern und automatisch beschrieben werden
export default {
  name: 'GetStudents',
  data() {
    return {
      students: [],
      error: '',
      firstName: '',
      lastName: '',
      session: '123456789', //TODO: Test Session entfernen
      id: ''
    }
  },
  //bei Seitenaufruf ausführen
  async created() {
    //TODO: aktuelle Session über Middleware auslesen
    try {
      //Studenten Array zur Anzeige befüllen
      this.students = await StudentService.getStudents(this.session);
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {

    //TODO: Funktion für Required inputs firstName und lastName; wenn leer, dann Fehlermeldung siehe unten
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
            this.id = await StudentService.postStudent(this.firstName, this.lastName, this.session);
          } catch (err) {
            this.error = err.message;
          }
          //Studenten erneut auslesen zur Aktualisierung der Anzeige
          this.students = await StudentService.getStudents(this.session);
      } else {
        return this.error;
      }
    }
  }
}

</script>

