<template>
    <div class="container">
        <!-- Anzeige eines Fehlers, falls vorhanden -->
        <div class="alert alert-danger" role="alert" v-if="error">
            Fehler: {{this.error}}
        </div>
        <h1>Gruppenanalyse</h1>
        <p style="font-size:large; text-align:justify">
        Bitte bearbeiten Sie die Aufgaben nun mit Ihrem Partner. Sie können über ein Chat-Fenster mit Ihrem Partner kommunizieren. Dieses öffnen Sie über den runden Knopf am unteren rechten Ende der Seite. Einigen Sie sich mit Ihrem Partner auf eine gemeinsame Antwort durch Diskussion Ihrer Standpunkte. Als Grundlage der Diskussion werden Ihnen die Antworten von Ihnen und Ihrem Partner auf die Aufgabe angezeigt. Haben Sie sich auf eine gemeinsame Antwort geeinigt, dann bearbeitet bitte ein Mitglied Ihrer Gruppe die Aufgabe und drückt auf "Absenden"</p>
        <hr>
        <!-- Anzeigen der Aufgabenstellung -->
        <h4>Aufgabe {{task.taskNumber}}</h4>
        <p><em>{{task.text}}</em></p>
        <hr>
        <!-- Anzeige des Chat-Fensters -->
        <beautiful-chat
        :participants="participants"
        :titleImageUrl="titleImageUrl"
        :onMessageWasSent="onMessageWasSent"
        :messageList="messageList"
        :newMessagesCount="newMessagesCount"
        :isOpen="isChatOpen"
        :close="closeChat"
        :icons="icons"
        :open="openChat"
        :showEmoji="true"
        :showFile="false"
        :showTypingIndicator="showTypingIndicator"
        :colors="colors"
        :alwaysScrollToBottom="alwaysScrollToBottom"
        :messageStyling="messageStyling"
        @onType="handleOnType"
        @edit="editMessage" />
        <!-- Zweispaltiges Layout mit Bootstrap row und col -->
        <div class="row">
            <!-- Div mit Video; Nutzung des Moduls "videojs"-->
            <div class="left col-md-7">
                <video-player ref="videoPlayer" :options="videoOptions"/>
            </div>
            <div class="right col-md-5">
            <!-- Anzeigen der alten Markierung und neuen Markierungen in einer Tabelle -->
            <h4>Markierungen der Einzelanalyse</h4>
                <div class="row">
                    <!-- Zeige die alten Markierungen in einer Tabelle an; so viele Markierungen wie es Einträge im Array gibt -->
                    <b-table class="col-md-12" bordered striped hover small :items="oldAnnotations" :fields="fieldsOld" responsive="sm">
                        <!-- Anzeige, von wem die Markierung ist --> 
                        <template v-slot:cell(annotationOf)="data">
                            {{getAnnotationSource(oldAnnotations[data.index].student)}}
                        </template>
                        <!-- Anzeige der Startzeit im Format (hh:)mm:ss -->
                        <template v-slot:cell(annotationStartTime)="data">
                            {{showTimeInMMSS(data.value)}}
                        </template>
                        <!-- Anzeige der Endzeit im Format (hh:)mm:ss -->
                        <template v-slot:cell(annotationEndTime)="data">
                            {{showTimeInMMSS(data.value)}}
                        </template>
                        <!-- Buttons für Aktionen -->
                        <template v-slot:cell(actions)="data">
                            <button v-b-tooltip.hover title="Spiele markierte Passage ab" style="font-size:large;" class="btn btn-sm typcn typcn-media-play" @click="jumpToAnnotationTime(oldAnnotations[data.index].annotationStartTime, oldAnnotations[data.index].annotationEndTime)"></button>
                        </template>
                    </b-table>
                </div>
                <h4>Markierungen der Gruppenanalyse</h4>
                <div class="row">
                    <!-- Zeige die neuen Markierungen in einer Tabelle an; so viele Markierungen wie es Einträge im Array gibt -->
                    <b-table class="col-md-12" bordered small striped :items="annotations" :fields="fieldsNew" responsive="sm">
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
                        <!-- Buttons für Aktionen -->
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
        <p v-if="jumpingStarted">Bitte warten</p>
    </div>
</template>

<script>
//Vuex Import
import { mapState } from 'vuex';
import { mapMutations } from 'vuex';

//Videojs Import
import VideoPlayer from "./VideoPlayer.vue";

//Import der Middleware für Tasks
import TaskService from '../../TaskService';
//Import der Middleware für Students
import StudentService from '../../StudentService';
//Import der Middleware für Gruppen
import GroupService from '../../GroupService';
//Import der Middleware für Annotations
import AnnotationService from '../../AnnotationService';
//Import der Middleware für Chat-Nachrichten
import ChatMessageService from '../../ChatMessageService';

//Import der Icons für vue-beautiful-chat
import CloseIcon from 'vue-beautiful-chat/src/assets/close-icon.png'
import OpenIcon from 'vue-beautiful-chat/src/assets/logo-no-bg.svg'
import FileIcon from 'vue-beautiful-chat/src/assets/file.svg'
import CloseIconSvg from 'vue-beautiful-chat/src/assets/close.svg'

export default {
    name: "GroupAnalysis",
    components: {
		VideoPlayer
    },
    //komponenteigener Datenstore
    data() {
        return {
            task: {},
            error: '',
            iteration: 1,
            jumpingStarted: false,
            intervalIds: new Array,
            videoPlayer: null,
            student: null,
            group: null,
            iteration: 1,
            latestAnnotationIndex: null,
            isAnnotationRunning: false,
            annotations: [],
            oldAnnotations: [],
            //Felder für Markierungstabelle
            fieldsOld: [
            {
                key: 'annotationOf',
                label: 'Markierung von'
            },
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
            fieldsNew: [
                {
                    key: 'annotationStartTime',
                    label: 'Zeitpunkt'
                },
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
            //Variablen für vue-beautiful-chat
            icons:{
                open:{
                    img: OpenIcon,
                    name: 'default',
                },
                close:{
                    img: CloseIcon,
                    name: 'default',
                },
                file:{
                    img: FileIcon,
                    name: 'default',
                },
                closeSvg:{
                    img: CloseIconSvg,
                    name: 'default',
                }
            },
            participants: [
                {
                id: this.$store.state.partnerId,
                name: this.$store.state.partnerName,
                imageUrl: 'Portrait_Placeholder.png'
                }
            ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
            titleImageUrl: '/Chat_Default_Picture.png',
            messageList: new Array, //z.B. type: 'text', author: `me`, data: { text: `Say yes!` } // the list of the messages to show, can be paginated and adjusted dynamically
            newMessagesCount: 0,
            isChatOpen: false, // to determine whether the chat window should be open or closed
            showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
            colors: {
                header: {
                    bg: '#4e8cff',
                    text: '#ffffff'
                },
                launcher: {
                    bg: '#4e8cff'
                },
                messageList: {
                    bg: '#ffffff'
                },
                sentMessage: {
                    bg: '#4e8cff',
                    text: '#ffffff'
                },
                receivedMessage: {
                    bg: '#eaeaea',
                    text: '#222222'
                },
                userInput: {
                    bg: '#f4f7f9',
                    text: '#565867'
                }
            }, // specifies the color scheme for the component
            alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
            messageStyling: true, // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
            
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
    //Vuex Store
    computed: {
        ...mapState({
        studentId: "studentId",
        sessionId: "sessionId",
        partnerId: "partnerId",
        partnerName: "partnerName"
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
        try {
            //Student Objekt des aktuellen Studenten aus Datenbank holen
            const studentsTemp = await StudentService.getStudents(this.sessionId);
            this.student = studentsTemp.find(element => element.id === this.studentId);
        } catch (err) {
            this.error = err.message;
        }
        try {
            //vorherige Markierungen des aktuellen Studenten aus Datenbank holen
            this.oldAnnotations = await AnnotationService.getAnnotations(this.sessionId, this.studentId, this.task.id);
            //vorherige Markierungen des anderen Studenten der Gruppe aus der Datenbank holen -> dem Array hinzufügen
            const oldAnnotationsStudent2 = await AnnotationService.getAnnotations(this.sessionId, this.partnerId, this.task.id);
            oldAnnotationsStudent2.forEach(element => {
                this.oldAnnotations.push(element);
            });
        } catch (err) {
            this.error = err.message;
        }
        //Speichern der Intervall-Ids für Clear Interval Befehl
        //Gruppe Objekt des aktuellen Studenten aus Datenbank holen und laufend aktualisieren -> wegen Statusänderungen
        this.intervalIds.push(setInterval(() => {this.getGroup()}, 3000));
        //jede Sekunde prüfen, ob Gruppenarbeit erledigt ist
        this.intervalIds.push(setInterval(() => {this.jumpToDebriefingIfGroupFinished()}, 1000));
        //jede Sekunde auf neue Chat Nachrichten des Partners prüfen
        this.intervalIds.push(setInterval(() => {this.getNewPartnerMessages()}, 1000));
    },
    methods: {
        //schreibt die Daten der dem Studenten zugeordneten Gruppe in Objekt this.group
        async getGroup() {
            try {
                this.group = await GroupService.getGroups(this.student.group);
            } catch (err) {
                this.error = err.message;
            }
        },
        //neue Markierung hinzufügen; neues Annotation Objekt anlegen und über Mutation CREATE NEW ANNOTATION zu Store hinzufügen
        //Start einer neuen Markierung; neues Markierungs-Objekt anlegen; an der richtigen Position im annotations Array einfügen; neuen Start Marker in Video Timeline einfügen; laufendes Beschreiben der Endtime, bis Stop gedrückt wird
        startAnnotation() {
            //nur durchführen, wenn Video auch gerade läuft
            if (this.videoPlayer.paused() !== true) {
                this.error = '';
                //neues Markierungsobjekt anlegen
                const newAnnotation = {
                    session: this.sessionId,
                    student: this.group[0].id,
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
                //neuen Marker auf Video-Zeitleiste einfügen mithilfe von Videojs-markers
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
            this.annotations[annotationId].annotationText = text;
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
        //bestehende Markierung löschen
        removeAnnotation (annotationId) {
            if (confirm('Wollen Sie die Markierung wirklich endgültig löschen?')) {
                this.annotations.splice(annotationId, 1);
                //Marker entfernen
                this.videoPlayer.markers.remove([annotationId]);
            }
        },

        async getStudentName(studentIdToLookFor) {
            try {
            const studentsTemp = await StudentService.getStudents(this.sessionId);
            } catch (err) {
                this.error = err.message;
            }
            const desiredStudent = studentsTemp.find(student => student.id = studentIdToLookFor);
            const returnName = desiredStudent.firstName + ' ' + desiredStudent.lastName;
            return returnName;
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
                            AnnotationService.postAnnotations(element.session, element.student, element.annotationText, element.annotationStartTime, element.annotationEndTime, element.taskId, "Gruppenanalyse");
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
                        this.jumpingStarted = true;
                        //speichere Markierungen in die Datenbank
                        this.annotations.forEach(element => {
                            AnnotationService.postAnnotations(element.session, element.student, element.annotationText, element.annotationStartTime, element.annotationEndTime, element.taskId, "Gruppenanalyse");
                        });
                        //Beenden der in Intervallen ausgeführten Funktionen
                        this.intervalIds.forEach(element => {
                            clearInterval(element);
                        });
                        //in Students abspeichern, dass sie mit der Gruppenanalyse fertig sind
                        await StudentService.setStudentStatus(this.studentId, 'fertig_mit_Gruppenanalyse');
                        await StudentService.setStudentStatus(this.partnerId, 'fertig_mit_Gruppenanalyse');
                        //in group abspeichern, dass sie mit der Gruppenanalyse fertig ist
                        await GroupService.setGroupStatus(this.group[0].id, 'fertig_mit_Gruppenanalyse');
                        //zur Seite für Abschluss springen
                        this.$router.push('/analysisend');
                    }
                    } catch (er) {
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
                    return false;
                }
            });
            //Rückgabevariable weitergeben
            return feedback;
        },
        
        //wenn der Status der Gruppe auf Debriefing steht, dann automatisch dorthin weiterspringen -> wenn ein Schüler die Antwort absendet, dann kommt der zweite Schüler auch ins Debriefing
        jumpToDebriefingIfGroupFinished() {
            //wenn Gruppe Variable bereits befüllt
            if (this.group) {
                //wenn Gruppenstatus auf Debriefing
                if (this.group[0].status === "fertig_mit_Gruppenanalyse") {
                    //leite auf Abschluss Seite weiter
                    this.$router.push('/analysisend');
                }
            }
        },

        //Methoden für vue-beautiful-chat
        
        //Nachricht senden Ereignis bearbeiten: Zähler für neue Nachrichten hochsetzen; Nachricht der Nachrichtenliste hinzufügen mit Methode onMessageWasSent
        sendMessage (text) {
            if (text.length > 0) {
                this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
                this.onMessageWasSent({ author: 'me', type: 'text', data: { text } })
            }
        },
        //übergebene Nachricht der Nachrichtenliste hinzufügen; in Datenbank schreiben
        async onMessageWasSent (message) {
            const newMessageId = this.messageList.push(message);
            try {
            const messageId = await ChatMessageService.postChatMessage(message.type, this.studentId, message.data);
            //der Nachricht als Attribut ID die ID in der Datenbank hinzufügen
            this.messageList[newMessageId-1].id = messageId;
            } catch (err) {
                this.error = err.message;
            }
        },
        //behandelt Knopfdruck zum Öffnen des Chats: setzt isChatOpen Variable um und setzt neue Nachrichten Counter auf null
        openChat () {
            this.isChatOpen = true
            this.newMessagesCount = 0
        },
        //behandelt Knopfdruck zum Schließen des Chats: setzt isChatOpen Variable um
        closeChat () {
            this.isChatOpen = false
        },
        handleScrollToTop () {
            // called when the user scrolls message list to top
            // leverage pagination for loading another page of messages
        },
        //Behandlung des Ereignisses: Benutzer tippt
        handleOnType () {
        },
        //Bearbeitung einer Nachricht: Finden der zu bearbeitenden Nachricht in Nachrichtenliste; Setzen des bearbeitet Indikators; Ändern des Texts
        editMessage(message){
            const m = this.messageList.find(m=>m.id === message.id);
            m.isEdited = true;
            m.data.text = message.data.text;
        },
        //zyklisches Abrufen der neuen Chat-Nachrichten
        async getNewPartnerMessages() {
            try {
            const allPartnerMessages = await ChatMessageService.getChatMessages(this.partnerId);
            //nur neue Nachrichten sollen hinzugefügt werden -> Vergleich der IDs der Nachrichten; wenn neue gefunden, dann Array push
            for (var i = 0; i < allPartnerMessages.length; i++) {
                if (this.messageList.find(message => message.id === allPartnerMessages[i].id)) {
                    //nichts unternehmen -> ist keine neue Nachricht
                } else {
                    //neue Nachricht gefunden; der messageList hinzufügen; newMessagesCount hochsetzen
                    this.messageList.push(allPartnerMessages[i]);
                    this.newMessagesCount++;
                }
            }
            } catch (err) {
                this.error = err.message;
            }
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
        getAnnotationSource (studentId) {
            if (studentId === this.studentId) {
                return "Ihnen";
            } else {
                return this.partnerName;
            }
        }
    }
}
</script>