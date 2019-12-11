<template>
    <div class="container">
        <div> <!-- TODO: nur anzeigen, wenn Status der Session noch nicht umgesetzt -->
            <h1>Bitte warten</h1>
            <p>Es sind noch nicht alle Schüler fertig mit der Analyse des Videos. Bitte warten Sie, bis alle fertig sind.</p>
            <!-- Anzeige der aktuell für diese Session registrierten Schüler -->
            <h4>Bereit zur Gruppenanalyse</h4>
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
    </div>
</template>

<script>
//DONE: Überprüfung, ob alle anderen Schüler mit der Individualanalyse fertig sind -> schreiben eines Attributs für Status in student, get Studenten mit diesem Status
//DONE: wenn in Warteposition, dann Anzeige, dass gewartet werden muss
//TODO: wenn alle Schüler fertig sind, dann Dyadenbildung auslösen -> erstmal über URL zu Backend lösen -> kann später in Lehrer Komponente eingebaut werden
//TODO: zufällige Bildung der Dyaden -> erstmal 1 mit 2, 3 mit 4, usw.
//TODO: gebildete Dyaden bei den Schülern anzeigen
//TODO: Weiterleitung der Schüler zu der Dyadenanalyse


    //SessionService Middleware importieren
    import SessionService from '../../SessionService';
    //StudentService Middleware importieren
    import StudentService from '../../StudentService';
    //Vuex Import
    import { mapState } from 'vuex';
    //Exports der Attribute, die aus den Eingabefeldern automatisch beschrieben werden
    export default {
        name: 'ShowPartners',
        data() {
            return {
            error: '',
            students: []
            }
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
            //Befüllen des Student Arrays mit Studenten, die bereits mit Individualanalyse fertig sind; Wiederholung alle 3s
            setInterval(()=>{this.getReadyStudents()}, 3000);
        },
        methods: {
            //Hilfsfunktion für setInterval; speichert Studenten mit Status waitingForGroupAnalysis in students Array
            async getReadyStudents() {
                this.students = await StudentService.getStudentsWithStatus(this.sessionId, 'waitingForGroupAnalysis')
            }
        }
    }
</script>