<template>
  <div class="container">
        <!-- Anzeige eines Fehlers, falls vorhanden -->
        <div class="alert alert-danger" role="alert" v-if="error">
            Fehler: {{this.error}}
        </div>
      <h1>Einzelanalyse</h1>
      <p style="font-size:large; text-align:justify">
          Sie sehen unten nun Ihre Aufgabenstellung. Zur Beantwortung der Aufgabe markieren Sie Stellen im Video. Sie können das Video mit dem Player abspielen. Zur Markierung einer Stelle drücken Sie den Knopf "Markieren" unter der Aufgabenstellung. Bitte begründen Sie Ihre Markierung anschließend. Wenn Sie mit der Bearbeitung der Aufgabe fertig sind, dann drücken Sie auf "Absenden". Sie gelangen so zur nächsten Aufgabe - wenn vorhanden - oder schließen die Bearbeitung ab.</p>
      <hr>
        <!-- Anzeigen der Aufgabenstellung -->
      <h4>Aufgabe {{task.taskNumber}}</h4>
      <p><em>{{task.text}}</em></p>
      <hr>
      <!-- Zweispaltiges Layout mit Bootstrap row und col -->
        <div class="row">
            <!-- Div mit Video; Nutzung des Moduls "vue-plyr"; initialisiert in main.js -->
            <div class="Video col-md-7">
                <vue-plyr ref="player">
                    <video v-bind:src="task.videoPath">
                        <source :src="task.videoPath" type="video/mp4" />
                    </video>
                </vue-plyr>
            </div>
            <div class="Task col-md-5">
                <!--<button class="btn btn-success" @click="addAnnotation">Markieren</button>-->
                <h4>Markierungen:</h4>
                <div class="row">
                    <!-- Zeige die Markierungen in einer Tabelle an; so viele Markierungen wie es Einträge im Array gibt -->
                    <b-table class="col-md-12" bordered striped hover :items="annotations" :fields="fields" responsive="sm">
                        <!-- Anzeige der Zeitpunkte im Format (hh:)mm:ss --> 
                        <template v-slot:cell(annotationStartTime)="data">
                            {{showTimeInMMSS(data.value)}}
                        </template>
                        <!-- AnnoationText als Input Feld -->
                        <template v-slot:cell(annotationText)="data">
                            <b-form-input type="text" v-model="annotations[data.index].annotationText"></b-form-input>
                        </template>
                        <template v-slot:cell(actions)="data">
                            <button v-b-tooltip.hover title="Springe zur Stelle im Video" style="font-size:large;" class="btn typcn typcn-media-play" @click="jumpToAnnotationTime(annotations[data.index].annotationStartTime)"></button><button v-b-tooltip.hover title="Lösche Markierung" style="font-size:large;" class="btn typcn typcn-trash" @click="removeAnnotation(data.index)"></button>
                        </template>
                    </b-table>
                </div>
                <button @click="addAnnotation" class="btn btn-success">Markieren</button>
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
//Import der Middleware für Students
import StudentService from '../../StudentService';

export default {
  name: "IndividualAnalysis",
  //komponenteigener Datenstore
  data() {
    return {
        task: {},
        error: '',
        iteration: 1,
        player: null,
        fields: [
            {
                key: 'annotationStartTime',
                label: 'Zeitpunkt'
            },
            {
                key: "annotationText",
                label: "Begründung"
            },
            {
                key: "actions",
                label: "Aktionen"
            }
        ]
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
                this.error = '';
                //prüfe, ob der Begründungstext jeder Markierung ausgefüllt ist
                if (this.validateInput()) {
                    try {
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
                        //speichere Markierungen in die Datenbank
                        this.annotations.forEach(element => {
                            this.WRITE_ANNOTATIONS_TO_DATABASE(element);
                        });
                        //in student abspeichern, dass er mit der Individualanalyse fertig ist
                        StudentService.setStudentStatus(this.studentId, 'wartend_auf_Gruppenanalyse')
                        //zur Seite für Ansicht der gebildeten Dyaden springen
                        this.$router.push('/showpartners');
                    }
                    } catch (err) {
                        this.error = err.message;
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
        },
        //erhält eine Zahl in Sekunden und rechnet sie um in hh:mm:ss, wenn größer 1 Stunde oder mm:ss, wenn kleiner 1 Stunde
        showTimeInMMSS(time) {
            var hours   = Math.floor(time / 3600);
            var minutes = Math.floor((time - (hours * 3600)) / 60);
            var seconds = time - (hours * 3600) - (minutes * 60);
            if (hours   < 10) {hours   = "0"+hours;}
            if (minutes < 10) {minutes = "0"+minutes;}
            if (seconds < 10) {seconds = "0"+seconds;}
            if (hours > 0) {
                return hours+':'+minutes+':'+seconds;
            } else {
            return minutes+':'+seconds;
            }
        }
    }
};
</script>