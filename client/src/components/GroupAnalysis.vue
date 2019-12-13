<template>
    <div class="container">
        <h1 class="display-4">Gruppenanalyse der Videos</h1>
        <p style="font-size:large; text-align:justify">
        Sie können das Video mit dem Player abspielen. Zur Markierung einer Stelle drücken Sie den Knopf "Markieren" unter der Aufgabenstellung.
        Anschließend sollten Sie die Stelle Ihrer Markierung begründen.</p>
    </div>
</template>

<script>
//TODO: grundsätzliches Layout: Chat, Video, alte Markierungen, neue Markierungen
//TODO: Layout dementsprechend bauen
//TODO: Chat einbinden
//TODO: alte Markierungen einbinden
//TODO: Video einbinden
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


export default {
    name: "GroupAnalysis",
    //komponenteigener Datenstore
    data() {
        return {
            task: {},
            error: '',
            iteration: 1,
            player: null
        };
    },
    mounted() {
        //Plyr Player referenzieren TODO: auskommentieren
        //this.player = this.$refs.player.player;
    },
    //Vuex Store
    computed: {
        ...mapState({
        studentId: "studentId",
        sessionId: "sessionId",
        partnerId: "partnerId",
        annotations: "annotations",
        })
    },
    //bei Seitenaufruf ausführen
    async created() {
    },
    methods: {
        
    },

}
</script>