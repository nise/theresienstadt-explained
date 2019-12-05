<template>
    <div class="container">Test</div>
</template>

<script>
//Vuex Import
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
import { mapActions } from 'vuex';
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