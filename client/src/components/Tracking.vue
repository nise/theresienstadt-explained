<template>
    <div class="container">
        <!-- Anzeige eines Fehlers, falls vorhanden -->
        <div class="alert alert-danger" role="alert" v-if="error">
            Fehler: {{this.error}}
        </div>
        <h1>Überwachung</h1>
        <div v-if="showStep3And4">
            <h4>Schritt 3: Weitergabe der URL an die Teilnehmer</h4>
            <p>Die Session wurde gestartet. Bitte geben Sie untenstehende URL an die Teilnehmer weiter. Die Teilnehmer erhalten unter dem Link die Möglichkeit zur Registrierung.</p>
            <!-- Anzeige der URL für die Schüler zum Registrieren; nur solange, bis Session gestartet -->
            <div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend" style="margin: auto">
                        <!-- Nutzung des Packages vue-clipboard2 zum Kopieren: v-clipboard -->
                        <button class="btn btn-outline-primary inputbutton" type="button" v-clipboard:copy="url">Kopieren</button>
                        <span class="input-group-text">{{url}}</span>
                    </div>
                </div>
            </div>
            <hr>
        </div>
        <div v-if="showStep3And4">
            <!-- Button zum Starten der Session, wenn gerade Teilnehmerzahl; wird nur solange angezeigt, bis Session gestartet -->
            <h4>Schritt 4: Start der Individualphase</h4>
            <p>Bitte warten Sie nun, bis sich alle Teilnehmer registriert haben. Unten erhalten Sie einen Überblick, welche Teilnehmer bereits registriert sind. Immer, wenn eine gerade Anzahl an Teilnehmern registriert ist, erscheint hier ein Knopf zum Starten der Individualphase. Bitte drücken Sie den Knopf erst, wenn alle Teilnehmer angemeldet sind. Nach dem Start der Individualphase wird den Teilnehmern automatisch ein Knopf angezeigt, um zur Individualanalyse zu navigieren.</p>
            <button class="btn btn-primary" @click="startSession">Start der Individualphase</button>
            <p v-if="this.individualPhaseStarted">Bitte warten. Die Individualphase wird gestartet.</p>
            <hr>
        </div>
        <div v-if="showStep5">
            <!-- Button zum Auslösen der Gruppenbildung der Schüler; wird nur solange angezeigt, bis Gruppen gebildet -->
            <h4>Schritt 5: Start der Gruppenphase</h4>
            <p>Der Start der Individualphase war erfolgreich. Bitte warten Sie nun, bis alle Teilnehmer die Individualanalyse des Videomaterials abgeschlossen haben. Unten erhalten Sie einen Überblick, welche Teilnehmer bereits mit der Individualanalyse fertig sind. Wenn alle Teilnehmer fertig sind, erscheint unten ein Knopf zum Start der Gruppenphase. Bitte drücken Sie den Knopf, wenn Sie die Gruppenphase starten möchten. Die Teilnehmer werden automatisch Zweiergruppen zugeordnet. Nach der Betätigung des Knopfes wird den Teilnehmern ihr jeweiliger Partner angezeigt. Außerdem wird ihnen ein Knopf angezeigt, um zur Gruppenanalyse zu navigieren.</p>
            <button class="btn btn-primary" @click="startBuildingGroups">Start der Gruppenphase</button>
            <p v-if="this.groupBuildingStarted">Bitte warten. Die Gruppenbildung wird durchgeführt</p>
            <hr>
        </div>
        <!-- Button zur Navigation zum Debriefing; wird erst dann angezeigt, wenn Gruppen gebildet -->
        <div v-if="showStep6">
            <h4>Navigation zu Schritt 6: Nachbearbeitung</h4>
            <p>Der Start der Gruppenphase war erfolgreich. Sobald alle Teilnehmer die Gruppenphase abgeschlossen haben, erscheint hier ein Knopf zur Navigation zur Nachbearbeitung. Bitte drücken Sie den Knopf, wenn Sie die Nachbearbeitung starten möchten.</p>
            <button class="btn btn-primary" v-if="allParticipantsFinished === true" @click="navigateToDebriefing">Navigation zur Nachbearbeitung</button>
            <hr>
        </div>
        <h4>Status der Teilnehmer</h4>
        <!-- Anzeige der Schüler mit Namen und Status; Anzeige basierend auf laufend befülltem Student Array -->
        <b-table fixed bordered responsive="sm" small
        :items="students" 
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"       
        >
        <!-- Anzeige eines Löschbuttons für die Schüler, wenn Status vor Gruppenanalyse --> 
        <template v-slot:cell(actions)="data">
            <button class="btn btn-secondary" v-if="showStep3And4 || showStep5" @click="removeStudent(data.item.id)">Schüler entfernen</button>
        </template>
        </b-table>
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
            groupBuildingStarted: '',
            individualPhaseStarted: '',
            partnerObject: null,
            groupBuildingSuccess: '',
            startSessionSuccess: '',
            session: null,
            allParticipantsFinished: false,
            //Steuerung der Tabelle
            sortDesc: false,
            sortBy: "status",
            fields: [
                {
                    key: 'firstName',
                    label: 'Vorname',
                    sortable: true
                },
                {
                    key: 'lastName',
                    label: 'Nachname',
                    sortable: true
                },
                {
                    key: 'status',
                    label: 'Status',
                    sortable: true
                },
                {
                    key: 'partnerName',
                    label: 'Partner',
                    sortable: true
                },
                {
                    key: 'actions',
                    label: 'Aktionen',
                }
            ]
        }
    },
    asyncComputed: {
       //sollen Schritt 3 und 4 angezeigt werden? Ja, wenn Session noch nicht gestartet
        async showStep3And4() {
        //Session holen, um Status auszulesen
        this.session = await SessionService.getSessionsWithId(this.sessionId);
            if (this.session[0].status === 'Aufgaben_gepflegt') {
                return true;
            } //sonst false
            return false;
        },
        //soll Schritt 5 angezeigt werden? Ja, wenn Gruppenbildung noch nicht durchgeführt und Session gestartet wurde oder wenn Session bereits in dieser Phase
        async showStep5() {
        //Session holen, um Status auszulesen
        this.session = await SessionService.getSessionsWithId(this.sessionId);
            if (this.groupBuildingSuccess !== true) {
                if (this.startSessionSuccess === true) {
                    return true;
                }
            }
            if (this.session[0].status === 'Individualanalyse') {
                return true;
            }
            return false;
        },
        //soll Schritt 6 angezeigt werden? Ja, wenn Gruppenbildung durchgeführt, oder wenn Session bereits in dieser Phase
        async showStep6() {
            //Session holen, um Status auszulesen
            this.session = await SessionService.getSessionsWithId(this.sessionId);
            if (this.groupBuildingSuccess === true) {
                return true;
            }
            if (this.session[0].status === 'Gruppenanalyse') {
                return true;
            }
            return false;
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
        //laufende Überprüfung, ob alle Teilnehmer mit der Gruppenanalyse fertig sind
        setInterval(() => {this.checkIfAllStudentsHaveFinished()}, 3000);
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
                this.error = '';
                //wenn Teilnehmerzahl gerade
                if (this.students.length % 2 === 0 && this.students.length !== 0) {
                    try {
                    this.error = '';
                    this.groupBuildingStarted = true;
                    await GroupBuildingService.getGroupBuilding(this.sessionId);
                    this.groupBuildingSuccess = true;
                    this.refresh();
                    } catch (err) {
                        this.error = err.message;
                    }
                } else {
                    this.error = 'Die Anzahl der Teilnehmer ist nicht gerade. Bitte stellen Sie sicher, dass eine gerade Anzahl an Teilnehmern angemeldet ist.';
                }
            } else {
                this.error = "Bitte warten Sie, bis alle Teilnehmer die Individualanalyse vollendet haben";
            }
        },
        //prüft, ob alle Schüler den richtigen Status "waitingForGroupAnalysis" für die Gruppenbildung haben; wenn ja, true; wenn nein, false
        checkIfReadyForGroupBuilding() {
            for (var i=0; i<this.students.length; i++) {
                if (this.students[i].status !== 'wartend_auf_Gruppenanalyse') {
                    return false;
                }
                return true;
            }
        },
        //prüft, ob gerade Teilnehmerzahl; wenn ja, dann wird Session gestartet über Umsetzen des Status
        async startSession() {
            //wenn gerade Teilnehmerzahl
            if (this.students.length % 2 === 0 && this.students.length !== 0) {
                this.individualPhaseStarted = true;
                this.error = '';
                //rufe Middleware auf und setze Status der Session mit aktueller Session ID auf "Individualanalyse"
                await SessionService.setSessionStatus(this.sessionId, 'Individualanalyse');
                this.startSessionSuccess = true;
                this.refresh();
            } else { //sonst: Fehler zurückgeben
                this.error = 'Die Anzahl der Teilnehmer ist nicht gerade. Bitte stellen Sie sicher, dass eine gerade Anzahl an Teilnehmern angemeldet ist.';
                return this.error;
            }
        },
        //Überprüft, ob bei allen Studenten Status "fertig_mit_Gruppenanalyse" vorliegt; wenn ja, dann Schreiben von "true" in Variable allParticipantsFinished
        checkIfAllStudentsHaveFinished() {
            for (var i = 0; i < this.students.length; i++) {
                if (this.students[i].status !== 'fertig_mit_Gruppenanalyse') {
                    this.allParticipantsFinished = false;
                    return;
            }
        }
        this.allParticipantsFinished = true;
        return;
        },
        //navigiert zur Komponente "Debriefing"
        navigateToDebriefing() {
            this.$router.push("/Debriefing");
        },
        refresh() {
            this.$asyncComputed.showStep3And4.update();
            this.$asyncComputed.showStep5.update();
            this.$asyncComputed.showStep6.update();
        },
        //entfernt einen Schüler aus der Session nach einer Sicherheitsabfrage
        async removeStudent(studentIdToRemove) {
            if (confirm('Wollen Sie den Schüler wirklich endgültig löschen?')) {
                //Student aus Datenbank entfernen
                await StudentService.deleteStudent(studentIdToRemove);
                var thisHelper = this;
                //Student in lokalem Array finden und entfernen
                this.students.find(function (student, index) {
                    if (student.id === studentIdToRemove) {
                        thisHelper.students.splice(index);
                    }
                })
            }
        }
    }
}
</script>