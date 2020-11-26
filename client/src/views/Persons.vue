<template>
  <div class="home">
    <h1>Protagonisten</h1>
    <div v-for="person in persons" v-bind:key="person">{{ person.name }}</div>
  </div>
</template>

<script>
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);

import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

/**
 * shortname: String,
    name: String,
    surename: String,
    birth: String,
    death: String,
    birth_place: String,
    death_place: String,
    profession: String,
    bio: String,
    images: Array,
    updated_at: Date
 */

export default {
  name: "persons",
  data: () => ({
    error: "",
    persons: [],
  }),

  mounted() {
    let _this = this;
    axios
      .post("/persons/all")
      .then(function (response) {
        _this.persons = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {},
};
</script>
