<template>
  <div class="home">
    <br />
    <br />
    <h1>Protagonisten</h1>
    <br />
    <br />
    <b-container fluid>
      <b-row>
        <b-col sm="6">
          <input
            type="text"
            style="float: right; width: 400px"
            v-model="searchquery"
            @keyup="getsearchquery"
            class="mx-1 form-control"
            placeholder="Suchen..."
            id="searchfield"
          />
          <br />
          <br />
          <personcard
            class="my-4 mr-1"
            v-for="(person, index) in persons1"
            :key="index"
            :person="person"
            :ref="'ref' + person.id"
          >
          </personcard>
        </b-col>

        <b-col sm="6">
          <input
            type="text"
            style="float: left; width: 400px"
            class="mx-1 form-control"
            placeholder="Filter"
            id="filerfield"
          />
          <br />
          <br />
          <personcard
            class="my-4 ml-1"
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
// TODO: implement filter

import Vue from "vue";
import BootstrapVue from "bootstrap-vue";

//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);

import axios from "axios";

import personcard from "@/components/PersonCard.vue";

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
  name: "home",
  components: {
    personcard,
  },

  mounted: function () {
    //this.getdata();
    this.splitArrInTwo(this.persons, this.persons1, this.persons2);
  },

  methods: {
    getdata: function () {
      let _this = this;
      axios.get("/persondata").then(function (response) {
        _this.persons = response.data;
        _this.giveArrID(_this.persons);
        _this.splitArrInTwo(_this.persons, _this.persons1, _this.persons2);
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

    search: function (haystack, needle) {
      let result = haystack.filter(
        (el) => el.shortname.toLowerCase().indexOf(needle.toLowerCase()) != -1
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

    splitArrInTwo: function (personarr, out1, out2) {
      let size = personarr.length;

      for (let i = 0; i < size; i++) {
        if (i % 2 == 0) {
          out1.push(personarr[i]);
        } else {
          out2.push(personarr[i]);
        }
      }
    },
    giveArrID: function (personarr) {
      let size = personarr.length;
      for (let i = 0; i < size; i++) {
        personarr[i].id = i;
      }
    },
  },

  data: () => ({
    error: "",
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
    persons: [
      {
        shortname: "Maximilian Adler",
        name: "Maximilian",
        surename: "Adler",
        birth: "21.09.1884",
        birth_place: "Budweis",
        death: "16.10.1944",
        death_place: "KZ Auschwitz",
        profession: "Philologe und Hochschullehrer",
        bio: "",
        updated_at: { $date: "2018-09-21T18:34:42.989Z" },
        id: 0,
      },
      {
        shortname: "Karel Ancerl",
        name: "Karel",
        surename: "Ančerl",
        birth: "22.03.1905",
        birth_place: "Tučapy",
        death: "",
        death_place: "Toronto",
        profession: "Dirigent",
        bio:
          "Ančerl war ein bekannter tschechischer Dirigent. Am 16. November 1942 wurde er nach Theresienstadt deportiert, wo er 1943 ein Kammerorchester gründete, das bei der Interpretation großer musikalischer Werke im Ghetto hohes Niveau erreichte.\nAm 16. Oktober 1944 wurde er nach Auschwitz deportiert und kam später in andere Konzentrationslager. Nach der Befreiung arbeitete er \nbeim tschechischen Rundfunk. Ab 1950 war er Chefdirigent der Tschechischen Philharmoniker.\n\nQuelle:http://www.ghetto-theresienstadt.info/pages/a/ancerlk.htm",
        updated_at: { $date: "2018-09-21T18:34:42.990Z" },
        id: 1,
      },
      {
        shortname: "Leo Baeck",
        name: "Leo",
        surename: "Baeck",
        birth: "23.05.1873",
        birth_place: "Lissa",
        death: "02.11.1956",
        death_place: "London",
        profession: "Rabbiner",
        bio:
          "Leo Baeck wird am 23. Mai in Lissa (heute Lezno/Polen \nEr wird früh in der jüdischen Kultur und Religion unterrichtet. Er besucht das konservative „Jüdisch-Theologische Seminar“ von Breslau (Wroclaw)und bis 1894 das Philosophische Seminar der Universität Breslau. Zum weiteren Studium der Philosophie, Geschichte und Religionsphilosophie zieht er nach Berlin. Er beginnt das Rabbinatsstudium an der liberalen „Lehranstalt für die Wissenschaft des Judentums“.\nBaeck promoviert 1895 und veröffentlicht seine vielbeachtete Dissertation über „Spinozas erste Einwirkungen auf Deutschland“. Im Herbst des Jahres geht er als junger Rabbiner nach Oppeln (Opole).\nEr wird zum führenden Vertreter des jüdischen Liberalismus. 1907 – 1912, Baeck ist Rabbiner in Düsseldorf. 1912 wird Baeck als Rabbiner nach Berlin berufen und arbeitet in der neu errichteten Synagoge in der Fasanenstraße. Zudem wird er Dozent an der „Hochschule für die Wissenschaft des Judentums“.\nWährend des 1. Weltkrieges wird Baeck Feldrabbiner an der West- und Ostfront.\n1933 – 1943, trotz mehrfacher Gelegenheit zur Emigration bleibt Baeck bei seiner Gemeinde, um den deutschen Juden in den Jahren der Diskriminierung und der Verfolgung beizustehen. Er organisiert die Emigration von Juden.\nAls am 1. Nov. 1938 der jüdische Religionsphilosoph Martin Buber aus Deutschland emigriert, ist Baeck der letzte hohe Repräsentant des Judentums in Deutschland. \n1943 wird Baeck zusammen mit seiner Familie in das Ghetto Theresienstadt deportiert. Dort unterstützt er die Gefangenen durch Vorträge und Predigten. Schwer misshandelt überlebt Baeck. Seine vier Schwestern sind im Ghetto umgekommen.\nIm Juli 1945 läßt sich Leo Baeck in London nieder. Ab 1948 bemüht er sich in ganz Deutschland um Versöhnung und Dialoge zwischen Juden und Christen. Die Wiederaufnahme der von ihm 1919 initiierten Gespräche zwischen den Glaubensgruppen ist ihm zunächst wichtiger als die Bestrafung der Schuldigen am Völkermord an den europäischen Juden. Neben seinen repräsentativen Funktionen beginnt Baeck eine umfangreiche Lehrtätigkeit an verschiedenen Universitäten in Europa und den USA. Leo Baeck stirbt am 2. November 1956 in London\nQuelle:http://www.ghetto-theresienstadt.info/pages/b/baeckl.htm",
        updated_at: { $date: "2018-09-21T18:34:42.990Z" },
        id: 2,
      },
    ],
  }),
};
</script>
