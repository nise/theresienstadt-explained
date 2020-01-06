<template>
    <div class="container">
        <!-- Anzeige eines Fehlers, falls vorhanden -->
        <div class="alert alert-danger" role="alert" v-if="error">
            Fehler: {{this.error}}
        </div>
        <h1>Session-Bearbeitung</h1>
        <p>Sie können unten die erstellten Sessions bearbeiten. Alle Sessions sind in der Tabelle dargestellt. Über die Knöpfe unter Aktionen können Sie Sessions bearbeiten, löschen und in sie zurückspringen. Wenn Sie gerade von einer Session kommen, dann haben Sie über den Knopf "Zurück" unten die Möglichkeit, zu ihr zurückzukehren.</p>
        <hr>
        <!-- Anzeige der Sessions in einer Tabelle, Knöpfe mit Typicons und Popover für Aktionen -->
        <h4>Sessions</h4>
        <b-table class="col-md-12" bordered small :items="sessions" :fields="fields" responsive="sm" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc">
            <!-- Anzeige des Datums in gut lesbarem Format -->
            <template v-slot:cell(date)="data">
                {{showDateInTTMMJJJJHHMMSS(data.value)}}
            </template>
            <!-- Anzeige der Buttons für Aktionen löschen, ändern Aufgaben, ändern Session Daten abspringen; Button abspringen nur wenn Aufgaben bereits erstellt; Button ändern Aufgaben nur, wenn Status gleich Aufgaben_gepflegt; Button ändern Sessiondaten nur, wenn Status gleich Aufgaben_gepflegt oder neue_Session -->
            <template v-slot:cell(actions)="data">
                <button v-if="data.item.status !== 'neue_Session'" v-b-tooltip.hover title="Springe zur Überwachung dieser Session" style="font-size:large;" class="btn btn-sm typcn typcn-arrow-forward inputbutton" @click="jumpToSessionTracking(data.item.id)"></button><button v-if="data.item.status === 'Aufgaben_gepflegt'" v-b-tooltip.hover title="Ändern der Aufgaben" style="font-size:large;" class="btn btn-sm typcn typcn-th-list inputbutton" @click="changeSessionTasks(data.item.id)"></button><button v-b-tooltip.hover title="Löschen dieser Session" style="font-size:large;" class="btn btn-sm typcn typcn-trash inputbutton" @click="deleteSession(data.item.id)"></button>
            </template>
        </b-table>
        <button class="btn btn-primary" v-if="this.sessionId" @click="$router.go(-1)">Zurück</button>
    </div>
</template>

<script>
//Vuex Import
import { mapState } from 'vuex';
import { mapMutations } from 'vuex';

//Session Service Import
import SessionService from '../../SessionService';

export default {
    name: "ModifySession",
    data() {
        return {
            error: null,
            sessions: null,
            //Einstellungen für b-table
            sortBy: 'date',
            sortDesc: true,
            fields: [
                {
                    key: 'name',
                    label: 'Session-Name',
                    sortable: true
                },
                {
                    key: 'date',
                    label: 'Datum und Uhrzeit',
                    sortable: true
                },
                {
                    key: "status",
                    label: "Status",
                    sortable: true
                },
                {
                    key: "actions",
                    label: "Aktionen",
                },
            ],
        }
    },
    //Vuex Store
    computed: {
        //Vuex Store
        ...mapState({
        sessionId: "sessionId",
        })
    },
    async created() {
        //befülle Session Array zur Anzeige in der Tabelle
        try {
            this.sessions = await SessionService.getSessions();
        } catch (err) {
            this.error = err.message;
        }
    },
    methods: {
        //Mutationen für Vuex
        ...mapMutations([
        "CHANGE_SESSION_ID"
        ]),
        //Anzeige eines Datums in Javascript Format als TT.MM.JJJJ HH:MM:SS, z.B. 01.01.2020 10:00:00
        showDateInTTMMJJJJHHMMSS(date) {
            //Ermittlung Tag, Monat, Jahr
            var dayMonthYear = date.split('-');
            //Jahr ist auslesbar
            var year = dayMonthYear[0];
            //Monat ist auslesbar
            var month = dayMonthYear[1];
            //Tag ist noch nicht auslesbar, erneute Aufteilung, dann speichern
            var dayAndTime = dayMonthYear[2];
            dayAndTime = dayAndTime.split('T');
            var day = dayAndTime[0];
            //Auftrennung der Uhrzeit
            var time = dayAndTime[1];
            var splitTime = time.split(':');
            //Stunde ist auslesbar
            var hour = splitTime[0];
            //Minute ist auslesbar
            var minute = splitTime[1];
            //Sekunde ist noch nicht auslesbar, erneute Aufteilung, dann speichern
            var secondAndRest = splitTime[2];
            var splitSecondAndRest = secondAndRest.split('.');
            var second = splitSecondAndRest[0];
            //Rückgabe der neu formatierten Daten
            return day + '.' + month + '.' + year + ' ' + hour + ':' + minute + ':' + second;
        },
        //setzt die ausgewählte Session als aktuelle Session und springt zur Tracking Seite
        jumpToSessionTracking(sessionId) {
            this.CHANGE_SESSION_ID(sessionId);
            this.$router.push('/tracking');
        },
        //setzt die ausgewählte Session als aktuelle Session und springt zur Aufgabenbearbeitungs-Seite
        changeSessionTasks(sessionId) {
            this.CHANGE_SESSION_ID(sessionId);
            this.$router.push('/createtasks');
        },
        //löscht ausgewählte Session aus Datenbank und lokalem Session Array, wenn Sicherheitsabfrage bestätigt wird
        async deleteSession(sessionId) {
            if(confirm('Wollen Sie die Session wirklich endgültig löschen?')) {
                try {
                    //lösche aus Datenbank
                    await SessionService.deleteSessions(sessionId);
                } catch (err) {
                    this.error = err.message;
                }
                //finde Session im Array und lösche sie
                var idToDelete;
                this.sessions.find(function (session, index) {
                    if (session.id === sessionId) {
                        idToDelete = index;
                    }
                })
                this.sessions.splice(idToDelete, 1);
            }
        }
    },
}
</script>