<template>
  <div class="home">
    <h1 class="my-5 text-left" style="text-align:left;">{{$t("persons.h1")}}</h1>
    <b-container fluid class="mx-auto col-10">
      <b-row class="mb-4">
        <b-col sm="6">
          <input
            type="text"
            style="
              width: 400px;
              border: solid 2px #fff;
              border-radius: 18px;
              color: #fff;
              background-color:#000;
              "
            v-model="searchquery"
            @keyup="getsearchquery"
            class="mx-1 form-control"
            :placeholder="$t('persons.searchfield')"
            id="searchfield"
          />
        </b-col>
        <b-col sm="6">
          <input
            hidden
            type="text"
            style="float: left; width: 400px;"
            class="mx-1 form-control"
            placeholder="Filter"
            id="filerfield"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="6">
          <personcard
            class="mb-4 mt-0 mr-4"
            v-for="(person, index) in persons1"
            :key="index"
            :person="person"
            :ref="'ref' + person.id"
          >
          </personcard>
        </b-col>
        <b-col sm="6">
          <personcard
            class="mb-4 mt-0 ml-0"
            v-for="(person, index) in persons2"
            :key="index"
            :person="person"
            :ref="'ref' + person.id"
          >
          </personcard>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";

Vue.use(BootstrapVue);

import axios from "axios";

import personcard from "@/components/PersonCard.vue";

export default {
  name: "home",
  components: {
    personcard,
  },
  
  data: () => ({
    error: "",
    persons: [],
    persons1: [],
    persons2: [],
    searchquery: "",
    states: {
      displayingSearch: false,
    },
    initialCardState: {
      close: false,
      hideself: false,
    },
   
    persons: [],

  }),

  mounted: function () {
    this.getdata();
  },

  methods: {

    getdata: function () {
      let _this = this;
      axios.get("/persondata").then(function (response) {
        _this.persons = _this.giveArrID(response.data);
        _this.splitArrInTwo(_this.persons);
      });
    },

    getsearchquery: function () {
      if (this.searchquery.length > 1) {
        this.search(this.persons, this.searchquery);
      } else if (this.states.displayingSearch) {
        this.states.displaySearchResult = false;
        this.showAllCards();
      }
    },

    search: function (arr, needle) {
      /* 
      let result = arr.filter(
        (el) => JSON.stringify(el).toLowerCase().indexOf(needle.toLowerCase()) != -1
      );
      */
      let result = arr.filter(
        (el) => (el.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          + " " + el.surename.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
          .toLowerCase().indexOf(needle.toLowerCase()) != -1
      );
      
      this.displaySearchResult(result);
    },

    displaySearchResult: function (result) {
      this.states.displayingSearch = true;
      this.hideAllCards();
      for (let i = 0; i < result.length; i++) {
        this.showCard(result[i].id);
      }
    },

    hideAllCards: function () {
      for (let i = 0; i < this.persons1.length; i++) {
        this.$refs["ref" + this.persons1[i].id][0].hideself = true;
      }
      for (let i = 0; i < this.persons2.length; i++) {
        this.$refs["ref" + this.persons2[i].id][0].hideself = true;
      }
    },

    showAllCards: function () {
      for (let i = 0; i < this.persons1.length; i++) {
        this.$refs["ref" + this.persons1[i].id][0].hideself = false;
      }
      for (let i = 0; i < this.persons2.length; i++) {
        this.$refs["ref" + this.persons2[i].id][0].hideself = false;
      }
    },

    showCard: function (cardID) {
      this.$refs["ref" + cardID][0].hideself = false;
    },

    splitArrInTwo: function (personarr) {
      for (let i = 0; i < personarr.length; i++) {
        if (i % 2 == 0) {
          this.persons1.push(personarr[i]);
        } else {
          this.persons2.push(personarr[i]);
        }
      }
    },

    giveArrID: function (personarr) {
      let size = personarr.length;
      for (let i = 0; i < size; i++) {
        personarr[i].id = i;
        personarr[i].shortname = personarr[i].shortname ? personarr[i].shortname : personarr[i].surename+' '+Math.ceil(100*Math.random()); 
      }
      return personarr;
    },
  }
};
</script>
