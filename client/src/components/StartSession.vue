<template>
  <div class="container">
    <!-- Anzeige eines Fehlers, falls vorhanden -->
    <div class="alert alert-danger" role="alert" v-if="error">
      Fehler: {{this.error}}
    </div>
    <h1>Schritt 1: Starten einer neuen Session</h1>
    <!-- Sprung zur Aufgabenpflege; wird durch v-if nur angezeigt, wenn bereits eine Session generiert wurde -->
    <div v-if="sessionId">
      <label for="basic-url">Die Session wurde erfolgreich erstellt. Sie können nun über folgenden Knopf zur Aufgabenpflege (Schritt 2) springen:</label>
      <br>
      <button class="btn btn-primary" @click="jumpToCreateTasks">Zur Aufgabenpflege</button>
    </div>
    <div v-else>
      <!-- Session Name wird über Input eingegeben und über anschließenden Klick auf Button "Senden" wird neue Session angelegt-->
      <label for="basic-url">Bitte geben Sie einen Session-Namen ein. Der Name ist frei wählbar und muss nicht eindeutig sein. Mit einem Klick auf Senden können Sie eine neue Session generieren.</label>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" style="width: 100px;">Name</span>
        </div>
        <input type="text" v-model="name" class="form-control" placeholder="z.B. Klasse 10a" aria-label="z.B. Klasse 10a" aria-describedby="basic-addon1">
      </div>
      <button class="btn btn-primary" v-on:click="createSession">Senden</button>
    </div>
  </div>
</template>

<script>
//SessionService Middleware importieren
import SessionService from '../../SessionService';
//Vuex Import
import { mapState } from 'vuex';
import { mapMutations } from 'vuex';
//Exports der Attribute, die aus den Eingabefeldern automatisch beschrieben werden
export default {
  name: 'StartSession',
  data() {
    return {
      error: '',
      name: '',
      date: ''
    }
  },
  //Vuex Store
  computed: {
    ...mapState({
    sessionId: "sessionId"
    })
  },
  methods: {
    ...mapMutations([
    "CHANGE_SESSION_ID"
    ]),
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
            this.date = new Date();
            try {
            this.id = await SessionService.postSessions(this.name, this.date);
            } catch (err) {
              this.error = err.message;
            }
            //ID der neuen Session in Vuex Store schreiben
            this.CHANGE_SESSION_ID(this.id);
          } catch (err) {
            this.error = err.message;
          }
      } else {
        return this.error;
      }
    },
    //springt zur Komponente "CreateTasks"
    jumpToCreateTasks() {
      this.$router.push('/createtasks');
    }
  }
}
</script>

