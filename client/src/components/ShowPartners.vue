<template>
    <div class="container">
        <!-- Anzeige der Anweisung, dass gewartet werden soll, nur, wenn Dyadenbildung noch nicht stattgefunden hat -->
        <div v-if="sessionStatus!=='groupAnalysis'">
            <h1>Bitte warten</h1>
            <p>Es sind noch nicht alle Teilnehmer fertig mit der Analyse des Videos. Bitte warten Sie, bis alle fertig sind.</p>
            <!-- Anzeige der aktuell für diese Session registrierten Schüler -->
            <h4>Teilnehmer in Warteposition</h4>
            <div class="row">
                <div class="col-sm-4"
                    v-for="student in students"
                    v-bind:key="student._id">
                    <div class="card border-dark mb-3" style="width: 18rem;">
                        <ul class = "list-group list-group-flush">
                            <li class="list-group-item">{{student.firstName}}</li>
                            <li class="list-group-item">{{student.lastName}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- wenn Dyadenbildung stattgefunden hat, dann zeige jedem Schüler seinen zugeteilten Partner an und ermögliche die Navigation zur Gruppenanalyse -->
        <div v-if="sessionStatus==='groupAnalysis'">
            <h1>Ihr Partner für die Gruppenarbeit</h1>
            <p>Unten sehen Sie Ihre/-n zugeteilten Partner/-in für die Gruppenarbeit. Sie können nun über den Knopf "Weiter" fortfahren.</p>
            <hr>
            <!-- Anzeige der Daten des Partners über partnerId und API -->
            <div class="card border-dark mx-auto" style="width: 18rem">
                <ul class = "list-group list-group-flush">
                    <li class="list-group-item"><b>{{partner.firstName}}</b></li>
                    <li class="list-group-item"><b>{{partner.lastName}}</b></li>
                </ul>
            </div>
            <hr>
            <!-- Button zur Navigation zur Dyadenanalyse -->
        <button class="btn btn-primary" @click="navigateToGroupAnalysis">Weiter</button>
        </div>
    </div>
</template>

<script>
    //SessionService Middleware importieren
    import SessionService from '../../SessionService';
    //StudentService Middleware importieren
    import StudentService from '../../StudentService';
    //Vuex Import
    import { mapState } from 'vuex';
    import { mapMutations } from 'vuex';
    //Exports der Attribute, die aus den Eingabefeldern automatisch beschrieben werden
    export default {
        name: 'ShowPartners',
        data() {
            return {
            error: '',
            students: [],
            session: null,
            sessionStatus: '',
            partner: null
            }
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
            //Befüllen des Student Arrays mit Studenten, die bereits mit Individualanalyse fertig sind; Wiederholung alle 3s
            setInterval(()=>{this.getReadyStudents()}, 3000);
            //Befüllen der Session Status Variable mit dem aktuellen Session Status; Wiederholung alle 3s
            setInterval(() => {this.getSessionStatus()}, 3000);
        },
        async mounted() {

        },
        methods: {
            ...mapMutations([
                "CHANGE_PARTNER_ID",
                "CHANGE_PARTNER_NAME"
            ]),
            //Hilfsfunktion für setInterval; speichert Studenten mit Status waitingForGroupAnalysis in students Array; schreibt außerdem partner in partner Objekt, wenn Studenten geladen
            async getReadyStudents() {
                try {
                this.students = await StudentService.getStudentsWithStatus(this.sessionId, 'waitingForGroupAnalysis');
                } catch (err) {
                    this.error = err.message;
                }
                if (this.students.find(element => element.id === this.studentId)) {
                    const currentStudent = this.students.find(element => element.id === this.studentId);
                    const partnerId = currentStudent.partner;
                    this.partner = this.students.find(element => element.id === partnerId);
                    //Partnername für GroupAnalysis in Vuex Store schreiben
                    this.CHANGE_PARTNER_NAME(this.partner.firstName + ' ' + this.partner.lastName);
                }
            },
            //Hilfsfunktion für setInterval; speichert Daten dieser Session in Objekt session und liest den aktuellen Status in Variable sessionStatus aus
            async getSessionStatus() {
                try {
                this.session = await SessionService.getSessionsWithId(this.sessionId);
                this.sessionStatus = this.session[0].status;
                } catch (err) {
                    this.error = err.message;
                }
            },

            //leitet weiter zur Komponente GroupAnalysis und schreibt neuen Status in student; speichert Partner in VueX Store
            navigateToGroupAnalysis: function() {
                this.CHANGE_PARTNER_ID(this.partner.id);
                StudentService.setStudentStatus(this.studentId, 'groupAnalysis')
                this.$router.push('/groupanalysis')
            }
        }
    }
</script>