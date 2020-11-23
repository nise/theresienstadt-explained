<template>
  <div class="home">
    <br>
    <br>
    <h1>Protagonisten</h1>
    <br>
    <br>
    <b-container fluid>
      <b-row>
        <b-col sm="6">
              <input type="text" style="float:right;width:400px;" v-model="searchquery" 
                @keyup="getsearchquery" class="mx-1 form-control" placeholder="Suchen..." id="searchfield">
              <br>
              <br>
              <personcard class="my-4 mr-1" v-for="(person, index) in persons1"
                :key = "index"
                :person = "person"
                :ref = "'ref'+person.id">
              </personcard>
            </b-col>
          
        <b-col sm="6">
              <input type="text" style="float:left;width:400px;" class="mx-1 form-control" placeholder="Filter" id="filerfield">
              <br>
              <br>
              <personcard class="my-4 ml-1" v-for="(person, index) in persons2"
                :key = "index"
                :person = "person"
                :ref = "'ref'+person.id">
              </personcard>
            
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

import axios from 'axios';

import personcard from '@/components/PersonCard.vue';

// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

// const API_URL = "http://localhost:4000/message";

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
  name: 'home',
  components: {
    personcard
  },

  created: function(){
/*     this.giveArrID(this.persons);
    this.splitArrInTwo(this.persons, this.persons1, this.persons2); */

    
  },

  mounted: function(){
    this.getdata();
  },

  methods: {
    getdata: function(){
      let _this = this;
      axios.get('http://localhost:8080/ressources/Persons.json').then(function (response) {
        _this.persons = response.data;
        _this.giveArrID(_this.persons);
        _this.splitArrInTwo(_this.persons, _this.persons1, _this.persons2);
      });
    },

    getsearchquery: function (){
      if (this.searchquery.length > 1){
        this.search(this.persons, this.searchquery);
      }
      else if(this.states.displayingSearch){
        this.states.displaySearchResult = false;
        this.showAllCards();
      }
    },

    search: function (haystack, needle){
      let result = haystack.filter(el => el.shortname.toLowerCase().indexOf(needle.toLowerCase()) != -1);
      this.displaySearchResult(result);
    },

    displaySearchResult: function (result){
      this.states.displayingSearch = true;
      this.hideAllCards();
      for (let i = 0; i < result.length; i++){
        this.showCard(result[i].id);
      }
    },

    hideAllCards: function(){
      for (let i = 0; i < this.persons1.length; i++){
        this.$refs["ref"+this.persons1[i].id][0].hideself = true;
      }
      for (let i = 0; i < this.persons2.length; i++){
        this.$refs["ref"+this.persons2[i].id][0].hideself = true;
      }
    },

    showAllCards: function(){
      for (let i = 0; i < this.persons1.length; i++){
        this.$refs["ref"+this.persons1[i].id][0].hideself = false;
      }
      for (let i = 0; i < this.persons2.length; i++){
        this.$refs["ref"+this.persons2[i].id][0].hideself = false;
      }
    },

    showCard: function(cardID){
        this.$refs["ref"+cardID][0].hideself = false;   
    },

    splitArrInTwo: function (personarr, out1, out2){
      let size = personarr.length;

      for (let i = 0; i < size; i++)
      {
        if (i%2 == 0)
        {
          out1.push(personarr[i]); 
        }
        else
        {
          out2.push(personarr[i]);
        }
      }
    },
    giveArrID: function (personarr){
      let size = personarr.length;
      for (let i = 0; i < size; i++)
      {
        personarr[i].id = i
      }
    },
  },

  data: () => ({
    error: '',
    persons1: [],
    persons2: [],
    searchquery: '',
    states: {
      displayingSearch: false
    },
    initialCardState: {
      close: false,
      hideself: false
    },
    persons: [],
  })
}
</script>
