<template>
    <div class="container">
        <h1 class="display-4">Gruppenanalyse der Videos</h1>
        <p style="font-size:large; text-align:justify">
        Sie können das Video mit dem Player abspielen. Zur Markierung einer Stelle drücken Sie den Knopf "Markieren" unter der Aufgabenstellung.
        Anschließend sollten Sie die Stelle Ihrer Markierung begründen. Ihre Markierungen werden mit den Markierungen Ihres Partners synchronisiert. Wenn Sie Senden drücken, dann wird die Aufgabe für Ihre Gruppe abgeschlossen.</p>
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
        :showFile="true"
        :showTypingIndicator="showTypingIndicator"
        :colors="colors"
        :alwaysScrollToBottom="alwaysScrollToBottom"
        :messageStyling="messageStyling"
        @onType="handleOnType"
        @edit="editMessage" />
        <!-- Zweispaltiges Layout mit Bootstrap row und col -->
        <div class="row">
            <!-- Div mit Video; Nutzung des Moduls "vue-plyr"; initialisiert in main.js -->
            <div class="left col-md-7">
                <!-- Anzeige der alten Markierungen unter dem Video durch Verschachteln von rows in der bereits bestehenden row-->
                <div class="video row col-md-12">
                    <vue-plyr ref="player">
                        <video v-bind:src="task.videoPath">
                            <source v-bind:src="task.videoPath" type="video/mp4" />
                        </video>
                    </vue-plyr>
                </div>
                <br>
                <!-- Anzeige der alten Markierungen unter dem Video durch Verschachteln von rows in der bereits bestehenden row-->
                <div class="oldAnnotations row">
                    <h3 class="col-md-12">Markierungen aus der Individualanalyse</h3>
                    <!-- Erstelle so viele Annotation Elemente wie es Einträge im Array gibt -->
                    <div class="card col-md-12" v-for="(oldAnnotation, index) in oldAnnotations" v-bind:key="index">
                        <!-- Überschrift ist Zeitpunkt der Markierung-->
                        <div class="card-header" style="font-size:x-large">{{oldAnnotation.annotationStartTime}} s</div>
                        <div class="card-body">
                            <!-- Text wird angezeigt; key an Attribut gebunden und über @ Event geändert; v-if, v-else für Unterscheidung, von wem die Markierung ist-->
                            <p v-if="oldAnnotation.student === studentId" class="card-text"><b style="font-size:large">Markierung von Ihnen</b><br>{{oldAnnotation.annotationText}}</p>
                            <p v-else class="card-text"><b style="font-size:large">Markierung von {{partnerName}}</b><br>{{oldAnnotation.annotationText}}</p>
                            <hr>
                            <!-- Button zum Springen zu der Stelle im Video -->
                            <button class="btn btn-info" @click="jumpToAnnotationTime(oldAnnotation.annotationStartTime)">Zur Stelle im Video springen</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Anzeigen der Aufgabenstellung -->
            <div class="right col-md-5">
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
    </div>
</template>

<script>
//DONE: grundsätzliches Layout: Chat, Video, alte Markierungen, neue Markierungen
//DONE: Layout dementsprechend bauen
//TODO: Chat einbinden
//DONE: alte Markierungen einbinden
//DONE: Video einbinden
//TODO: neue Markierungen ermöglichen
//TODO: Absenden nur möglich machen, wenn Markierungen identisch sind -> einer macht für beide Markierungen?
//TODO: Navigation zum Beenden der Analyse

//Vuex Import
import { mapState } from 'vuex';
import { mapMutations } from 'vuex';

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
    //komponenteigener Datenstore
    data() {
        return {
            task: {},
            error: '',
            iteration: 1,
            player: null,
            student: null,
            group: null,
            iteration: 1,
            annotations: [],
            oldAnnotations: [],
            
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
            isChatOpen: true, // to determine whether the chat window should be open or closed
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
            messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
        }
    },
    mounted() {
        this.player = this.$refs.player.player;
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
        //Gruppe Objekt des aktuellen Studenten aus Datenbank holen und laufend aktualisieren -> wegen Statusänderungen
        setInterval(() => {this.getGroup()}, 3000);
        //jede Sekunde auf neue Chat Nachrichten des Partners prüfen
        setInterval(() => {this.getNewPartnerMessages()}, 1000);
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
        addAnnotation () {
            //Wiedergabe pausieren
            this.player.pause();
            //neues Markierungsobjekt anlegen
            const newAnnotation = {
                session: this.sessionId,
                student: this.group[0].id,
                annotationText: null,
                //auf volle Sekunden runden
                annotationStartTime: Math.round(this.player.currentTime),
                annotationEndTime: Math.round(this.player.currentTime),
                taskId: this.task.id
            }
            this.annotations.push(newAnnotation);
        },
        //Text der Markierung ändern
        changeAnnotationText(text, annotationId) {
            this.annotations[annotationId].annotationText = text;
        },
        //zu übergebener Zeit im Videoplayer springen
        jumpToAnnotationTime(timeToJump) {
            this.player.currentTime = timeToJump;
        },
        //bestehende Markierung löschen
        removeAnnotation (annotationId) {
            this.annotations.splice(annotationId, 1);
        },

        async getStudentName(studentIdToLookFor) {
            const studentsTemp = await StudentService.getStudents(this.sessionId);
            const desiredStudent = studentsTemp.find(student => student.id = studentIdToLookFor);
            const returnName = desiredStudent.firstName + ' ' + desiredStudent.lastName;
            return returnName;
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
            const messageId = await ChatMessageService.postChatMessage(message.type, this.studentId, message.data);
            //der Nachricht als Attribut ID die ID in der Datenbank hinzufügen
            this.messageList[newMessageId-1].id = messageId;
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
        }
    },

}
</script>