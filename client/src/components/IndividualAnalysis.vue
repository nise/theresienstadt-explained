<template>
    <div class="container">
        <h1 class="display-4">Einzelanalyse des Videos</h1>
        <!-- Anzeigen der Aufgabenstellung -->
        <div id="Task">
            <div class="alert alert-secondary" role="alert">
                <h4 class="alert-heading">Aufgabenstellung</h4>
                <hr>
                <p style="font-size:large">Markieren Sie die Stellen im Video, in denen besonders sichtbar ist, dass die Aufnahmen gestellt wurden.</p>
            </div>
            <p style="font-size:large;"></p>
        </div>
        <!-- Div mit Video; Nutzung des Moduls "vue-plyr"; initialisiert in main.js -->
        <div id="Video">
            <vue-plyr>
                <video src="/theresienstadt.mp4" >
                    <source src="/theresienstadt.mp4" type="video/mp4" size="1080">
                </video>
            </vue-plyr>
        </div>
    </div>
</template>

<script>
//Vuex Import
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
import { mapActions } from 'vuex';
//Import des Plyr Videoplayers
import Plyr from 'plyr';
export default {
    name: 'IndividualAnalysis',
    //komponenteigener Datenstore
    data() {
        return {
        }
    },
    //Vuex Store
    computed: {
        ...mapState({
        studentId: "studentId"
        })
    },
    //bei Seitenaufruf ausführen
    async created() {
    },
    methods: {
    //Vuex Methoden: Getters, Mutations, Actions
    ...mapGetters({
    }),
    ...mapMutations([
      "CHANGE_STUDENT_ID"
    ]),
    ...mapActions({
    })
    }
}
</script>