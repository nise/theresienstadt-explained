<template>
    <div class="container">
        <h1 class="display-4">Gruppenanalyse der Videos</h1>
        <p style="font-size:large; text-align:justify">
        Sie können das Video mit dem Player abspielen. Zur Markierung einer Stelle drücken Sie den Knopf "Markieren" unter der Aufgabenstellung.
        Anschließend sollten Sie die Stelle Ihrer Markierung begründen. Ihre Markierungen werden mit den Markierungen Ihres Partners synchronisiert. Wenn Sie Senden drücken, dann wird die Aufgabe für Ihre Gruppe abgeschlossen.</p>
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
                            <p v-else class="card-text"><b style="font-size:large">Markierung von Ihrem Partner</b><br>{{oldAnnotation.annotationText}}</p>
                            <hr>
                            <!-- Button zum Springen zu der Stelle im Video -->
                            <button class="btn btn-info" @click="jumpToAnnotationTime(oldAnnotation.annotationStartTime)">Zur Stelle im Video springen</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Anzeigen der Aufgabenstellung -->
            <div class="right col-md-5">
                <!-- Anzeige der Markierungen und der Aufgabenstellung unter dem Chat durch Verschachteln von rows in der bereits bestehenden row-->
                <div class="row">
                    <div class="alert alert-secondary col-md-12" role="alert">
                        <h4 class="alert-heading">Hier kommt der Chat hin</h4>
                        <hr>
                        <p style="font-size:large">Platzhalter</p>
                    </div>
                </div>
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
            oldAnnotations: []
        };
    },
    mounted() {
        this.player = this.$refs.player.player;
    },
    //Vuex Store
    computed: {
        ...mapState({
        studentId: "studentId",
        sessionId: "sessionId",
        partnerId: "partnerId"
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
        }
    },

}
</script>