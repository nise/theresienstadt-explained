<template>
    <div class="container">
        <!-- Anzeige eines Fehlers, falls vorhanden -->
        <div class="alert alert-danger" role="alert" v-if="error">
            Fehler: {{this.error}}
        </div>
        <h1>Tracking</h1>
        <label for="basic-url">Die Session wurde gestartet. Bitte geben Sie untenstehende URL an die Teilnehmer weiter. Unten können Sie sehen, in welcher Phase sich die Teilnehmer befinden. Sobald alle Teilnehmer mit der Individualanalyse fertig sind, können Sie über den Knopf "Gruppenbildung starten" die Bildung der Zweiergruppen auslösen.</label>
        <!-- Anzeige der URL für die Schüler zum Registrieren -->
        <div>
            <div class="input-group mb-3">
                <div class="input-group-prepend" style="margin: auto">
                    <!-- Nutzung des Packages vue-clipboard2 zum Kopieren: v-clipboard -->
                    <button class="btn btn-outline-primary" type="button" v-clipboard:copy="url">Kopieren</button>
                    <span class="input-group-text">{{url}}</span>
                </div>
            </div>
        </div>
        <hr>
        <!-- Button zum Starten der Session, wenn gerade Teilnehmerzahl -->
        <h4>Starten der Session</h4>
        <button class="btn btn-info" @click="startSession">Start der Session</button>
        <p v-if="startSessionSuccess">Die Session wurde erfolgreich gestartet</p>
        <hr>
        <!-- Button zum Auslösen der Gruppenbildung der Schüler -->
        <h4>Gruppenbildung</h4>
        <button class="btn btn-success" @click="startBuildingGroups">Gruppenbildung starten</button>
        <p v-if="groupBuildingSuccess">Die Gruppen wurden erfolgreich gebildet</p>
        <hr>
        <h4>Status der Schüler</h4>
        <!-- Anzeige der Schüler mit Namen und Status; Anzeige basierend auf laufend befülltem Student Array -->
        <div class="row">
            <div class="col-sm-4" v-for="(student, index) in students" v-bind:key="index">
                <div class="card border-dark mb-3" style="width: 18rem;">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><b>{{student.status}}</b></li>
                        <li class="list-group-item">{{student.id}}</li>
                        <li class="list-group-item">{{student.firstName}}</li>
                        <li class="list-group-item">{{student.lastName}}</li>
                        <div v-if="student.partner" class="card-footer">{{student.partner}}</div>
                    </ul>
                </div>
            </div>
        </div>
        <!-- Legende -->
        <hr>
        <h4>Legende</h4>
        <div class="card border-dark mb-3" style="width:18rem; margin:auto">
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><b>Status</b></li>
                <li class="list-group-item">Student-ID</li>
                <li class="list-group-item">Vorname</li>
                <li class="list-group-item">Nachname</li>
                <div class="card-footer">Partner-ID (nach Gruppenbildung)</div>
            </ul>
        </div>
    </div>
</template>

<script>
//Import des StudentService zum Anzeigen der Studentennamen und -status
import StudentService from '../../StudentService';

//Import des GroupBuildingService zum Bilden der Gruppen
import GroupBuildingService from '../../GroupBuildingService';

//Import des SessionService zum Umsetzen des Session Status
import SessionService from '../../SessionService';

//Vuex Import
import { mapState } from 'vuex';

export default {
    name: 'Tracking',
    data() {
        return {
            error: '',
            url: '',
            students: new Array,
            groupBuildingSuccess: '',
            startSessionSuccess: ''
        }
    },
    //Vuex Store
    computed: {
        ...mapState({
        sessionId: "sessionId"
        })
    },
    created() {
        //URL zum Kopieren erstellen
        this.createStudentUrl();
        //laufende Aktualisierung des Studentenstatus -> alle 3s
        setInterval(() => {this.getStudentsWithStatus()}, 3000);
    },
    methods: {
        //erzeugt die URL für die Studenten zum Registrieren
        createStudentUrl() {
            this.url = window.location.origin + '/#/?session=' + this.sessionId;
        },
        //liest alle Studenten der aktuellen Session in students Variable ein
        async getStudentsWithStatus() {
            try {
            this.students = await StudentService.getStudents(this.sessionId);
            } catch (err) {
                this.error = err.message;
            }
        },
        //löst Gruppenbildung aus und schreibt in Variable groupBuildingSuccess, wenn erfolgreich
        async startBuildingGroups() {
            //nur Gruppenbildung erlauben, wenn alle Schüler im richtigen Status, sonst Fehlermeldung
            if (this.checkIfReadyForGroupBuilding()) {
                try {
                this.error = '';
                this.groupBuildingSuccess = 'Bitte warten. Die Gruppen werden nun automatisch gebildet';
                this.groupBuildingSuccess = await GroupBuildingService.getGroupBuilding(this.sessionId);
                } catch (err) {
                    this.error = err.message;
                }
            } else {
                this.error = "Bitte warten Sie, bis alle Schüler die Individualanalyse vollendet haben";
            }
        },
        //prüft, ob alle Schüler den richtigen Status "waitingForGroupAnalysis" für die Gruppenbildung haben
        checkIfReadyForGroupBuilding() {
            let feedback = true;
            this.students.forEach(student => {
                if (student.status === 'waitingForGroupAnalysis') {
                    feedback = true;
                } else {
                    return false;
                }
            });
            return feedback;
        },
        //prüft, ob gerade Teilnehmerzahl; wenn ja, dann wird Session gestartet über Umsetzen des Status
        startSession() {
            //wenn gerade Teilnehmerzahl
            if (this.students.length % 2 === 0 && this.students.length !== 0) {
                this.error = '';
                //rufe Middleware auf und setze Status der Session mit aktueller Session ID auf "Individualanalyse"
                SessionService.setSessionStatus(this.sessionId, 'Individualanalyse');
                this.startSessionSuccess = true;
            } else { //sonst: Fehler zurückgeben
                this.error = 'Die Anzahl der Schüler ist nicht gerade. Bitte stellen Sie sicher, dass eine gerade Anzahl an Schülern angemeldet ist.';
                return this.error;
            }
        }
    },
}
</script>