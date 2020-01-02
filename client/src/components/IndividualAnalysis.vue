<template>
  <div class="container">
        <!-- Anzeige eines Fehlers, falls vorhanden -->
        <div class="alert alert-danger" role="alert" v-if="error">
            Fehler: {{this.error}}
        </div>
      <h1>Einzelanalyse</h1>
      <p style="font-size:large; text-align:justify">
          Sie sehen unten nun Ihre Aufgabenstellung. Zur Beantwortung der Aufgabe markieren Sie Passagen im Video. Sie können das Video mit dem Player abspielen. Zur Markierung einer Passage drücken Sie den Knopf "Starte Markierung" unter der Aufgabenstellung. Lassen Sie das Video dann weiterlaufen, bis Sie die Stelle erreicht haben, an der Sie die Markierung stoppen möchten. Dafür drücken Sie den Knopf "Stoppe Markierung". Bitte begründen Sie Ihre Markierung anschließend. Wenn Sie mit der Bearbeitung der Aufgabe fertig sind, dann drücken Sie auf "Absenden". Sie gelangen so zur nächsten Aufgabe - wenn vorhanden - oder schließen die Bearbeitung ab.</p>
      <hr>
        <!-- Anzeigen der Aufgabenstellung -->
      <h4>Aufgabe {{task.taskNumber}}</h4>
      <p><em>{{task.text}}</em></p>
      <hr>
      <!-- Zweispaltiges Layout mit Bootstrap row und col -->
        <div class="row">
            <!-- Div mit Video; Nutzung des Moduls "videojs"-->
            <div class="Video col-md-7">
                <video-player ref="videoPlayer" :options="videoOptions"/>
            </div>
            <div class="Task col-md-5">
                <h4>Markierungen:</h4>
                <div class="row">
                    <!-- Zeige die Markierungen in einer Tabelle an; so viele Markierungen wie es Einträge im Array gibt -->
                    <b-table class="col-md-12" bordered small striped hover :items="annotations" :fields="fields" responsive="sm">
                        <!-- Anzeige der Startzeit im Format (hh:)mm:ss --> 
                        <template v-slot:cell(annotationStartTime)="data">
                            {{showTimeInMMSS(data.value)}}
                        </template>
                        <!-- Anzeige der Endzeit im Format (hh:)mm:ss -->
                        <template v-slot:cell(annotationEndTime)="data">
                            {{showTimeInMMSS(data.value)}}
                        </template>
                        <!-- AnnotationText als Input Feld -->
                        <template v-slot:cell(annotationText)="data">
                            <b-form-input type="text" v-model="annotations[data.index].annotationText"></b-form-input>
                        </template>
                        <!-- Aktionen Löschen und zur Stelle im Video springen -->
                        <template v-slot:cell(actions)="data">
                            <button v-b-tooltip.hover title="Spiele markierte Passage ab" style="font-size:large;" class="btn btn-sm typcn typcn-media-play" @click="jumpToAnnotationTime(annotations[data.index].annotationStartTime, annotations[data.index].annotationEndTime)"></button><button v-b-tooltip.hover title="Lösche Markierung" style="font-size:large;" class="btn btn-sm typcn typcn-trash" @click="removeAnnotation(data.index)"></button>
                        </template>
                    </b-table>
                </div>
                <button @click="startAnnotation" class="btn btn-success" v-if="isAnnotationRunning!==true">Starte Markierung</button>
                <button @click="stopAnnotation" class="btn btn-info" v-if="isAnnotationRunning===true">Stoppe Markierung</button>
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

//Videojs Import
import VideoPlayer from "./VideoPlayer.vue";

//Import der Middleware für Tasks
import TaskService from '../../TaskService';
//Import der Middleware für Students
import StudentService from '../../StudentService';
//Import der Middleware für Annotations
import AnnotationService from '../../AnnotationService';

export default {
  name: "IndividualAnalysis",
  components: {
		VideoPlayer
  },
  //komponenteigener Datenstore
  data() {
    return {
        task: {},
        error: '',
        iteration: 1,
        annotations: [],
        latestAnnotationIndex: null,
        isAnnotationRunning: false,
        videoPlayer: null,
        //Felder für Markierungstabelle
        fields: [
            {
                key: 'annotationStartTime',
                label: 'Startzeit'
            },
            {
                key: 'annotationEndTime',
                label: 'Endzeit'
            },
            {
                key: "annotationText",
                label: "Begründung"
            },
            {
                key: "actions",
                label: "Aktionen"
            }
        ],
        //Optionen für video.js VideoPlayer
        videoOptions: {
			autoplay: false,
            controls: true,
            width: "640",
            controlBar: {
                //kein Vollbild-Button
                fullscreenToggle: false
            },
			sources: [
				{
					src: "/theresienstadt.mp4",
					type: "video/mp4"
				}
			]
		}
    };
  },
    //Vuex Store
    computed: {
        ...mapState({
        studentId: "studentId",
        sessionId: "sessionId"
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
    mounted() {
        this.videoPlayer = this.$refs.videoPlayer.player;
        //Initialisierung von vuejs-markers Plugin
        this.videoPlayer.markers({
            markerStyle: {
                //Festlegung des Stils der Markierungen
                'width':'3px',
                'height': '15px',
                'border-radius': '0%',
                'background-color': 'red'
            },
            markerTip:{
                display: true,
                text: function(marker) {
                    //Festlegen, wie Popup angezeigt wird, wenn man über die Markierung fährt;  geändert von Break + Zeitpunkt auf nur Zeitpunkt
                    return marker.text;
                }
            },
            //Initialisierung des Arrays für die Marker; befüllt über markers.add Funktion
            markers: []
        });
    },
    methods: {
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
        //Start einer neuen Markierung; neues Markierungs-Objekt anlegen; an der richtigen Position im annotations Array einfügen; neuen Start Marker in Video Timeline einfügen; laufendes Beschreiben der Endtime, bis Stop gedrückt wird
        startAnnotation() {
            //nur durchführen, wenn Video auch gerade läuft
            if (this.videoPlayer.paused() !== true) {
                this.error = '';
                //neues Markierungsobjekt anlegen
                const newAnnotation = {
                    session: this.sessionId,
                    student: this.studentId,
                    annotationText: null,
                    //auf volle Sekunden runden
                    annotationStartTime: Math.round(this.videoPlayer.currentTime()),
                    annotationEndTime: 0,
                    taskId: this.task.id
                }
                //an der richtigen Stelle im Array einfügen mit Splice Methode
                //dafür ermitteln, wo sich sich das Element einordnet
                //wenn Array schon mindestens ein Element enthält
                if (this.annotations.length > 0) {
                    for (var i = 0; i < this.annotations.length; i++) {
                        //wenn das aktuelle Element eine größere oder gleiche Startzeit hat, wie das neue, dann davor einfügen
                        if (this.annotations[i].annotationStartTime >= newAnnotation.annotationStartTime) {
                            this.annotations.splice(i, 0, newAnnotation);
                            this.latestAnnotationIndex = i + 1;
                            break;
                        }
                        //wenn letztes Element erreicht, dann einfach am Ende einfügen
                        if (i === this.annotations.length-1) {
                            this.annotations.push(newAnnotation);
                            this.latestAnnotationIndex = i + 1;
                            break;
                        }
                    }
                //wenn Array bisher leer, dann einfach am Ende einfügen
                } else {
                    this.annotations.push(newAnnotation);
                    this.latestAnnotationIndex = 0;
                }
                //neuen Start-Marker auf Video-Zeitleiste einfügen mithilfe von Videojs-markers
                this.videoPlayer.markers.add([{
                    time: Math.round(this.videoPlayer.currentTime()),
                    text: this.showTimeInMMSS(Math.round(this.videoPlayer.currentTime())),
                    overlayText: this.showTimeInMMSS(Math.round(this.videoPlayer.currentTime()))
                }]);
                var vm = this;
                //Statusindikator umsetzen, dass gerade Markierung läuft
                this.isAnnotationRunning = true;
                //Listener hinzufügen für timeupdate Event des Videoplayers, dass AnnotationEndTime aktualisiert wird
                this.videoPlayer.on('timeupdate', function(e) {
                    //aktuelle Laufzeit des Players in annotationEndTime des Objekts des zuletzt hinzugefügten Indizes schreiben
                    vm.annotations[vm.latestAnnotationIndex].annotationEndTime = Math.round(vm.videoPlayer.currentTime());
                    return;
                }); 
            } else {
                this.error = 'Bitte starten Sie das Video, bevor Sie eine Markierung beginnen';
            }
        },
        //Stop einer Markierung; Event Listener wird beendet; aktuelle Endzeit bleibt in AnnotationEndTime stehen
        stopAnnotation() {
            if (this.videoPlayer.currentTime() >= this.annotations[this.latestAnnotationIndex].annotationStartTime) {
                this.error = '';
                //Player pausieren
                this.videoPlayer.pause();
                //Listener stoppen
                this.videoPlayer.off("timeupdate");
                //Statusindikator zurücksetzen
                this.isAnnotationRunning = false;
            } else {
                this.error = 'Bitte stellen Sie sicher, dass der Endzeitpunkt Ihrer Markierung hinter dem Startzeitpunkt liegt';
            }

        },
        //Text der Markierung ändern
        changeAnnotationText(text, annotationId) {
            this.annotations[annotationId].text = text;
        },
        //bestehende Markierung löschen
        removeAnnotation (annotationId) {
            this.annotations.splice(annotationId, 1);
            //Marker entfernen
            this.videoPlayer.markers.remove([annotationId]);
        },
        //zu übergebener Sektion im Videoplayer springen und Video wieder stoppen, wenn Player an Ende der Markierung ankommt
        jumpToAnnotationTime(timeToJump, endTime) {
            this.videoPlayer.currentTime(timeToJump);
            this.videoPlayer.play();
            var vm = this;
            this.videoPlayer.on('timeupdate', function(e) {
                if (vm.checkIfEndTimeIsReached(timeToJump, endTime)) {
                    vm.videoPlayer.pause();
                    vm.videoPlayer.off('timeupdate');
                }
            });
        },
        //prüft, ob Sektion vollständig abgespielt wurde
        checkIfEndTimeIsReached(timeToStart, timeToEnd) {
            //wenn Spielzeit Endzeit der Markierung überschritten hat -> beenden
            if (this.videoPlayer.currentTime() >= timeToEnd) {
                return true;
            } else {
                //wenn vor den Start der Markierung gespult wurde -> beenden
                if (this.videoPlayer.currentTime() < timeToStart) {
                return true;
                } else {
                    //alle anderen Fälle -> weiterlaufen lassen
                    return false;
                }
            }
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
                            this.writeAnnotationsToDatabase(element);
                        });
                        //annotations Array leeren, damit für neue Aufgabe bereit
                        this.annotations = [];
                        //Marker auf Timeline löschen
                        this.videoPlayer.markers.removeAll();
                        //Zähler auf nächste Aufgabe setzen
                        this.iteration++;
                        //nächste Aufgabe laden
                        this.task = await TaskService.getTasks(this.sessionId, this.iteration)
                    } else {
                        //speichere Markierungen in die Datenbank
                        this.annotations.forEach(element => {
                            this.writeAnnotationsToDatabase(element);
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
        },
        async writeAnnotationsToDatabase(annotation) {
            try {
                AnnotationService.postAnnotations(annotation.session, annotation.student, annotation.annotationText, annotation.annotationStartTime, annotation.annotationEndTime, annotation.taskId, "Individualanalyse");
            } catch (err) {
                this.error = err.message;
            }
        }
    }
};
</script>