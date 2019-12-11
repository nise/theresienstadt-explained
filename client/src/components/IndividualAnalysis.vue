<template>
  <div class="container">
      <h1 class="display-4">Einzelanalyse der Videos</h1>
      <p style="font-size:large; text-align:justify">
          Sie können das Video mit dem Player abspielen. Zur Markierung einer Stelle drücken Sie den Knopf "Markieren" unter der Aufgabenstellung.
          Anschließend sollten Sie die Stelle Ihrer Markierung begründen.</p>
      <!-- Zweispaltiges Layout mit Bootstrap row und col -->
        <div class="row">
            <!-- Div mit Video; Nutzung des Moduls "vue-plyr"; initialisiert in main.js -->
            <div class="Video col-md-7">
                <vue-plyr ref="player">
                    <video>
                        <source :src="task.videoPath" type="video/mp4" />
                    </video>
                </vue-plyr>
            </div>
            <!-- Anzeigen der Aufgabenstellung -->
            <div class="Task col-md-5">
                <!-- Anzeige der Markierungen unter der Aufgabenstellung durch Verschachteln von rows in der bereits bestehenden row -->
                <div class="row">
                    <div class="alert alert-secondary" role="alert">
                        <h4 class="alert-heading">Aufgabe {{task.taskNumber}}</h4>
                        <hr>
                        <p style="font-size:large">{{task.text}}</p>
                        <hr>
                        <button class="btn btn-primary" @click="addAnnotation">Markieren</button>
                    </div>
                </div>
                <!-- Markierungen aus VueX Store Array -->
                <p style="font-size:x-large">Markierungen:</p>
                <div class="row">
                    <!-- Erstelle so viele Annotation Elemente wie es Einträge im Array gibt -->
                    <div class="card col-md-12" v-for="(annotation, index) in annotations" v-bind:key="index">
                        <!-- Überschrift ist Zeitpunkt der Markierung (automatisch eingetragen über Button Markieren) -->
                        <div class="card-header" style="font-size:x-large">{{annotation.annotationStartTime}} s</div>
                        <div class="card-body">
                            <!-- Text wird vom Benutzer eingetragen; key an vuex Attribut gebunden und über @ Event geändert mit Mutation -->
                            <p class="card-text"><input v:value="annotation.text" @input="changeAnnotationText($event.target.value, index)" type="text" class="form-control" placeholder="Bitte hier die Begründung eingeben"></p>
                            <hr>
                            <!-- Buttons zum Löschen und zum Springen zu der Stelle im Video -->
                            <button class="btn btn-info" @click="jumpToAnnotationTime(annotation.annotationStartTime)">Zur Stelle im Video springen</button>
                            <button class="btn btn-danger" @click="removeAnnotation(index)">Markierung löschen</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <button class="btn btn-primary" @click="jumpToNextTaskOrComplete">Absenden</button>
  </div>
</template>

<script>
//Vuex Import
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
import { mapActions } from 'vuex';

//Import der Middleware für Tasks
import TaskService from '../../TaskService';
import StudentService from '../../StudentService';

export default {
  name: "IndividualAnalysis",
  //komponenteigener Datenstore
  data() {
    return {
        task: {},
        error: '',
        iteration: 1,
        player: null
    };
  },
  mounted() {
    //Plyr Player referenzieren
    this.player = this.$refs.player.player;
  },
    //Vuex Store
    computed: {
        ...mapState({
        studentId: "studentId",
        sessionId: "sessionId",
        annotations: "annotations",
        })
    },
    //bei Seitenaufruf ausführen
    async created() {
        try {
            //Aufgabe 1 (iteration vorbefüllt mit 1) über getTasks Funktion in Array tasks schreiben
            this.task = await TaskService.getTasks(this.sessionId, this.iteration);
        } catch (err) {
            this.error = err.message;
        }
    },
    methods: {
        //Vuex Methoden: Getters, Mutations, Actions
        ...mapGetters([
        ]),
        ...mapMutations([
            "DELETE_EXISTING_ANNOTATION",
            "CHANGE_EXISTING_ANNOTATION",
            "CREATE_NEW_ANNOTATION",
            "EMPTY_ANNOTATIONS_ARRAY"
        ]),
        ...mapActions([
            "WRITE_ANNOTATIONS_TO_DATABASE"
        ]),
        //Iteration um 1 erhöhen und Task neu laden -> nächster Task wird aus Datenbank geladen und in task Variable gespeichert -> Felder aktualisieren sich automatisch
        async switchToNextTask() {
            //zu nächster Aufgabe wechseln:
            this.iteration++;
            try {
                //nächste Aufgabe aus Datenbank holen
                this.task = await TaskService.getTasks(this.sessionId, this.iteration);
            } catch (err) {
                this.error = err.message;
            }
        },
        //neue Markierung hinzufügen; neues Annotation Objekt anlegen und über Mutation CREATE NEW ANNOTATION zu Store hinzufügen
        addAnnotation () {
            //Wiedergabe pausieren
            this.player.pause();
            //neues Markierungsobjekt anlegen
            const newAnnotation = {
                session: this.sessionId,
                student: this.studentId,
                annotationText: null,
                //auf volle Sekunden runden
                annotationStartTime: Math.round(this.player.currentTime),
                annotationEndTime: Math.round(this.player.currentTime),
                taskId: this.task.id
            }
            this.CREATE_NEW_ANNOTATION(newAnnotation);
        },
        //Text der Markierung ändern; Id und Text an Mutation in Form eines Objekts übergeben
        changeAnnotationText(text, annotationId) {
            var annotationToChange = {
                id: annotationId,
                annotationText: text
            }
            this.CHANGE_EXISTING_ANNOTATION(annotationToChange);
        },
        //bestehende Markierung löschen; Id der zu löschenden Markierung an Mutation übergeben
        removeAnnotation (annotationId) {
            this.DELETE_EXISTING_ANNOTATION(annotationId);
        },
        //zu übergebener Zeit im Videoplayer springen
        jumpToAnnotationTime(timeToJump) {
            this.player.currentTime = timeToJump;
        },
        //prüfe, ob eine weitere Aufgabe verfügbar ist; wenn ja, dann Laden der nächsten Aufgabe; wenn nein, dann Abschluss der Aufgaben; in jedem Fall Speichern der Markierungen
        async jumpToNextTaskOrComplete() {
            //prüfe, ob mindestens eine Markierung vorgenommen wurde
            if (this.annotations[0]) {
                //prüfe, ob der Begründungstext jeder Markierung ausgefüllt ist
                if (this.validateInput()) {
                    //wenn eine weitere Aufgabe in der Datenbank ist
                    if (await TaskService.getTasks(this.sessionId, this.iteration+1)) {
                        //speichere Markierungen in die Datenbank
                        this.annotations.forEach(element => {
                            this.WRITE_ANNOTATIONS_TO_DATABASE(element);
                        });
                        //annotations Array leeren, damit für neue Aufgabe bereit
                            this.EMPTY_ANNOTATIONS_ARRAY();
                        //Zähler auf nächste Aufgabe setzen
                        this.iteration++;
                        //nächste Aufgabe laden
                        this.task = await TaskService.getTasks(this.sessionId, this.iteration)
                    } else {
                        //in student abspeichern, dass er mit der Individualanalyse fertig ist
                        StudentService.setStudentStatus(this.studentId, 'waitingForGroupAnalysis')
                        //zur Seite für Ansicht der gebildeten Dyaden springen
                        this.$router.push('/showpartners');
                    }
                }
            } else { //wenn keine Markierung vorgenommen wurde, dann Fehler ausgeben
                this.error = 'Bitte nehmen Sie mindestens eine Markierung vor';
            }
        },
        //prüfe, ob für jede Annotation ein Text eingetragen ist
        validateInput: function () {
            //Rückgabevariable
            var feedback = false;
            //Durchlaufen der Annotations
            this.annotations.forEach(element => {
                //wenn Text vorhanden, dann weiter
                if (element.annotationText) {
                    this.error = '';
                    feedback = true;
                } else { //wenn kein Text vorhanden dann Fehler setzen und beenden (false zurückgeben)
                    this.error = 'Bitte begründen Sie Ihre Markierungen.'
                    //false zurückgeben -> weitere Ausführung verhindern
                    feedback = false;
                }
            });
            //Rückgabevariable weitergeben
            return feedback;
        }
    }
};
</script>