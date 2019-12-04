<template>
    <div class="container">
        <h1 class="display-4">Starten einer neuen Session</h1>
        <div v-if="this.id">
          <p style="font-size:large;">Wenn sich alle Schüler registriert haben, dann drücken Sie bitte auf Starten. <br> Der Button ist nur sichtbar, wenn eine gerade Zahl von Schülern angemeldet ist.</p>
          <!-- Button nur anzeigen, wenn Array Länge modulo zwei 0 ist (gerade) und Zahl der Schüler nicht null
               Nutzung einer Hilfsfunktion, um gesicherte Daten aus dem Backend zu erhalten -->
          <button class="btn btn-primary" v-if="students.length % 2 == 0 && students.length !== 0">Starten</button>
        </div>
        <div v-else>
          <!-- Session Name wird über Input eingegeben und über anschließenden Klick auf Button "Senden" wird neue Session angelegt 
              anschließend wird URL zum Kopieren angeboten mit Session-ID als Parameter zum Verteilen an die Schüler-->
          <label for="basic-url">Bitte geben Sie einen Session-Namen ein. Mit einen Klick auf Senden können Sie eine neue Session generieren.</label>
          <div class="input-group mb-3">
              <div class="input-group-prepend">
                  <span class="input-group-text" style="width: 100px;">Name</span>
              </div>
          <input type="text" v-model="name" class="form-control" placeholder="z.B. Klasse 10a" aria-label="z.B. Klasse 10a" aria-describedby="basic-addon1">
          </div>
          <button class="btn btn-primary" v-on:click="createSession">Senden</button>
        </div>
        <!-- Anzeige der ID der erstellten Session; Aufruf der Schüler über Domain/#/?session=IDDERERSTELLTENSESSION -->
        <div v-if="this.id">
            <hr>
            Bitte geben Sie folgende ID an die Lernenden weiter: <br>
            <p style="font-weight:bold; font-size:x-large">{{this.id}}</p>
        </div>
        <!-- wenn Session ID Variable befüllt, dann werden aktuell für die Session registrierten Schüler angezeigt -->
        <div v-if="this.id">
            <hr>
            Aktuell für die Session registrierte Schüler:
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
//SessionService Middleware importieren
import SessionService from '../../SessionService';
import StudentService from '../../StudentService';
//Exports der Attribute, die aus den Eingabefeldern automatisch beschrieben werden
export default {
  name: 'GetSessions',
  data() {
    return {
      error: '',
      name: '',
      date: '',
      id: '',
      timer: '',
      students: []
    }
  },
  //bei Seitenaufruf ausführen
  async created() {
  },
  methods: {
    //Methode zur Überprüfung der Eingabefelder, ob sie befüllt sind, und Rückgabe einer Fehlermeldung in error Variable, wenn nicht
    validateInput: function () {
      if (this.name) {
        this.error = '';
        return true;
      } else {
        if (this.name !== true) {
          this.error = 'Bitte den Namen der Session eingeben.';
        }
      }
    },
    //Methode zum Erstellen einer Session
    async createSession() {
      if (this.validateInput()) {
          //Fehlerbehandlung
          try {
            //Aufruf der Middleware zum Anlegen einer Session; name aus Nutzereingabe, date automatisch generiert
            //ID der neuen Session wird in Variable id hinterlegt
            //nach Anlegen der Session werden für die Session registrierte Studenten und die ID der erstellten Session angezeigt
            this.date = new Date();
            this.id = await SessionService.postSessions(this.name, this.date);
          } catch (err) {
            this.error = err.message;
          }
      } else {
        return this.error;
      }
      setInterval(()=>{this.writeStudentsToArray()}, 3000);
    },
    //Hilfsfunktion für setInterval
    async writeStudentsToArray() {
        this.students = await StudentService.getStudents(this.id);
    }
  }
}
</script>

