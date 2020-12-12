<!--
TODO:
- Statische Seite mit bibliografischen und filmografischen Angaben, durch Bilder angereichert und mit Kommentaren erläutert.
-->
<script>
import BibTexParser from "../bibtex_js";
import axios from "axios";

export default {
  name: "references",
  data: function () {
    return {
      theresienbib: null,
      bibparse: null,
      filter: "",
      tags: [],
      filmography: [
        {
          title_original: "Shtikat Haarchion",
          title_other: "A Film Unfinished (int.), Geheimsache Ghettofilm (dt.)",
          year: "2010",
          productioncountry: "Israel, Deutschland",
          language_original: "Englisch",
          length: "90 Minuten",
          regie: "Yael Heronski",
          Drehbuch: "Yael Heronski",
          production: "Itay Ken Tor, Noemi Schory",
          music: "Yishai Adar",
          camera: "Itai Ne'eman",
          cut: "Joel Alexis",
          other_people:
            "Janusz Hammerszmit, Axel Thielmann, Eliezer Niborski, Alexander Senderovich, Mendy Cahan, Gera Sandler, Hava Alberstein",
          iMDb: "https://www.imdb.com/title/tt1568923/",
          description:
            "Die Regisseurin Yael Hersonski stellt in Shtikat Haarchion den Rohschnitt eines nationalsozialistischen Propagandafilms aus dem Warschauer Getto ins Zentrum ihres Dokumentarfilms. Im Mai 1942 entstanden, zeigen die Aufnahmen die vermeintlichen Lebensumstände im Warschauer Getto; gezeigt werden scheinbare Alltagsszenen. Die Rohfassung ohne Tonspur aus dem Deutschen Bundesarchiv wird angereichert durch Zeitzeugenberichte und nicht verwendete Szenen der Originalaufnahmen die in den 1990er Jahren wieder aufgefunden wurden. Diese zusätzlichen Aufnahmen ermöglichen Hersonski die propagandistische Inszenierung der Filmaufnahmen zu zeigen. Die Aufarbeitung vermittelt einen Eindruck wie Kameraführung, Schnitt und szenische Gestaltung ihre manipulative Wirkung entfalten können. 'Shtikat Haarchion' beschäftigt sich zwar nicht unmittelbar mit den Aufnahmen aus Theresienstadt, arbeitet aber einen thematisch vergleichbaren nationalsozialistischen Propagandafilm auf und bildet einen Anhaltspunkt für die filmische Aufarbeitung solcher historischer Quellen.",
        },
        {
          title_original: "Liga Terezin",
          title_other: "",
          year: "2013",
          productioncountry: "Tschechische Republik, Israel",
          language_original: "Hebräisch",
          length: "90 Minuten",
          regie: "Michael Schwartz",
          script: "",
          production: "",
          music: "",
          camera: "Avi Kanner",
          cut: "",
          other_people: "Oded Breda",
          iMDb: "https://www.imdb.com/title/tt2798634/",
          description:
            "Der israelische Dokumentarfilm nähert sich dem Thema Theresienstadt über den Fußball. Der ehemalige Leiter des „Beit Terezin“, einer israelischen Gedenkstätte für das KZ Theresienstadt, hatte in den Aufnahmen aus Theresienstadt seinen Onkel bei einem Fußballspiel der „Liga Theresienstadt“ erkannt und folgt in der Dokumentation den Spuren dieser „Fußball-Liga“ wie sie in der propagandistischen Darstellung der nationalsozialistischen Aufnahmen aus Theresienstadt gezeigt wurde. Die Filmemacher schlagen dabei einen Bogen von den Fußball-Aufnahmen aus dem KZ und den Zeitzeugenberichten zu Antisemitismus im modernen Fußball.",
        },
      ],
    };
  },

  mounted: function () {
    this.bibparse = new BibTexParser();
    let _this = this;
    axios.get("/references/bibliography").then(function (response) {
      _this.bibparse.setInput(response.data);
      _this.bibparse.bibtex();
      _this.theresienbib = _this.bibparse.getEntries();
      _this.removeCurlBraces();
      _this.attachKeywords(_this.bibparse.getEntries());
    });
    
    axios.get("/references/filmography").then(function (response) { console.log(response)
      _this.filmography = response.data.filmography;
    });
  },
  methods: {

    attachKeywords: function (bib) {
      let tmp = "";
      for (var i in this.theresienbib) {
        if (this.theresienbib.hasOwnProperty(i)) {
          if(this.theresienbib[i].KEYWORDS){
            //this.theresienbib[i].tags = this.theresienbib[i].KEYWORDS.split(", ");
            this.theresienbib[i].tags = this.theresienbib[i].KEYWORDS.length > 0 ? this.theresienbib[i].KEYWORDS.split(", ") : [];
            tmp = tmp + this.theresienbib[i].KEYWORDS.toString() + ", ";
          }
        }
      }
      this.tags = [...new Set(tmp.split(", "))];
    },

    applyFilter: function (key) {
      this.filter = key;
    },

    filteredBibliography: function () { 
      if (this.filter === "") {
        return this.theresienbib;
      }
     let _this = this;
      let f = Object.values(this.theresienbib).filter(function(d){ 
        if(d.tags){
          return d.tags.indexOf(_this.filter) > 0;
        }
        return false;
        });
      return f;
    },

    removeCurlBraces() {
      let regtest = RegExp(/\{|\}/gi);
      for (var val in this.theresienbib) {
        for (var objval in this.theresienbib[val]) {
          let noCurlBraces = this.theresienbib[val][objval];
          if (regtest.test(noCurlBraces)) {
            this.theresienbib[val][objval] = noCurlBraces.replace(regtest, "");
          }
        }
      }
    },
  },
};
</script>

<template>
  <div class="container" style="text-align: left">
    <h1 class="my-5" style="text-align: left">Literatur und Film über den Film</h1>
    <div style="background-color: white" class="pt-4 pb-3 px-3">
      
      
      <h2 class="mt-4">Filme</h2>
      <div v-for="film in filmography" :key="film" class="row mt-3">
        <h4 class="col-12 film-headline">{{ film.title_original }} <span v-if="film.title_other">({{film.title_other}})</span></h4>
        <div class="col-3">
          <img :scr="'img/'+film.cover" style="width:100%;"/>
        </div>
        <div class="col-9">
          <span v-if="film.productioncountry">{{film.productioncountry}}</span>, <span v-if="film.year">{{film.year}}</span>, <span v-if="film.length">{{film.length}}</span>
          <br />
          <span v-if="film.description" class="col-12 normal-text">{{film.description}}</span>
        </div>
        <hr>
      </div>



      <h2 class="mt-4">Literatur</h2>
      <div class="row">
        <div class="col-3">
          <h4>Schlüsselwörter</h4>
          <span v-for="tag in tags" :key="tag" @click="applyFilter(tag)" class="mx-1 tag-link">{{tag}} </span>
        </div>
        <div class="col-9">
          <div v-if="filter != ''">Gefiltert nach "{{filter}}" <div class="btn btn-sm btn-primary ml-3" @click="filter=''">Filter aufheben</div></div>
          
          <h4>Monographien</h4>
          <ul class="mr-4 ml-1 px-0">
            <li
              v-for="entry in filteredBibliography()"
              :key="entry"
              class="mb-3"
              style="list-style-type: none; color: black; text-align: left"
            >
              <div class="">
                <template v-if="entry.BIBTEXTYPEKEY === '@BOOK'">
                  <template v-if="entry.AUTHOR">
                    <span class="dist"> {{ entry.AUTHOR }}.</span>
                  </template>
                  <template v-if="entry.YEAR">
                    <span class="dist"> ({{ entry.YEAR }}).</span>
                  </template>
                  <template v-if="entry.TITLE">
                    <span class="dist"> {{ entry.TITLE }}.</span>
                  </template>
                  <template v-if="entry.EDITOR">
                    <span class="dist"> ({{ entry.EDITOR }}, Ed.)</span>
                  </template>
                  <template v-if="entry.PUBLISHER">
                    <span class="dist"> {{ entry.PUBLISHER }}.</span>
                  </template>
                  <template v-if="entry.DOI">
                    <span class="dist"> . {{ entry.DOI }}</span>
                  </template>
                </template>

                <template v-if="entry.BIBTEXTYPEKEY === '@INCOLLECTION'">
                  <template v-if="entry.AUTHOR">
                    <span class="dist"> {{ entry.AUTHOR }}.</span>
                  </template>
                  <template v-if="entry.YEAR">
                    <span class="dist"> ({{ entry.YEAR }}).</span>
                  </template>
                  <template v-if="entry.TITLE">
                    <span class="dist"> {{ entry.TITLE }}.</span>
                  </template>
                  <template v-if="entry.EDITOR">
                    <span class="dist"> ({{ entry.EDITOR }}, Ed.)</span>
                  </template>
                  <template v-if="entry.BOOKTITLE">
                    <span class="dist"> {{ entry.BOOKTITLE }}</span>
                  </template>
                  <template v-if="entry.PAGES">
                    <span class="dist"> (pp.{{ entry.PAGES }}).</span>
                  </template>
                  <template v-if="entry.PUBLISHER">
                    <span class="dist"> {{ entry.PUBLISHER }}.</span>
                  </template>
                  <template v-if="entry.DOI">
                    <a class="dist" :href="'https://doi.org/' + entry.DOI"
                      >DOI-Link</a
                    >
                  </template>
                </template>

                <template v-if="entry.BIBTEXTYPEKEY === '@ARTICLE'">
                  <template v-if="entry.AUTHOR">
                    <span class="dist"> {{ entry.AUTHOR }}.</span>
                  </template>
                  <template v-if="entry.YEAR">
                    <span class="dist"> ({{ entry.YEAR }}).</span>
                  </template>
                  <template v-if="entry.TITLE">
                    <span class="dist"> {{ entry.TITLE }}.</span>
                  </template>
                  <template v-if="entry.JOURNAL">
                    <span class="dist"> {{ entry.JOURNAL }}.</span>
                  </template>
                  <template v-if="entry.VOLUME">
                    <span class="dist"> {{ entry.VOLUME }}.</span>
                  </template>
                  <template v-if="entry.PAGES">
                    <span class="dist"> ({{ entry.PAGES }}).</span>
                  </template>
                  <template v-if="entry.DOI">
                    <a class="dist" :href="'https://doi.org/' + entry.DOI"
                      >DOI-Link</a
                    >
                  </template>
                  <template v-if="entry.URL">
                    <a class="dist" :href="entry.URL">URL</a>
                  </template>
                </template>

                <template
                  v-if="
                    entry.BIBTEXTYPEKEY === '@PHDTHESIS' ||
                    entry.BIBTEXTYPEKEY === '@MASTERSTHESIS'
                  "
                >
                  <template v-if="entry.AUTHOR">
                    <span class="dist"> {{ entry.AUTHOR }}.</span>
                  </template>
                  <template v-if="entry.YEAR">
                    <span class="dist"> ({{ entry.YEAR }}).</span>
                  </template>
                  <template v-if="entry.TITLE">
                    <span class="dist"> {{ entry.TITLE }}.</span>
                  </template>
                  <template v-if="entry.SCHOOL">
                    <span class="dist"> {{ entry.SCHOOL }}.</span>
                  </template>
                  <template v-if="entry.URL">
                    <a class="dist" :href="entry.URL">URL</a>
                  </template>
                </template>

                <template v-if="entry.BIBTEXTYPEKEY === '@MISC'">
                  <template v-if="entry.AUTHOR">
                    <span class="dist"> {{ entry.AUTHOR }}.</span>
                  </template>
                  <template v-if="entry.YEAR">
                    <span class="dist"> ({{ entry.YEAR }}).</span>
                  </template>
                  <template v-if="entry.TITLE">
                    <span class="dist"> {{ entry.TITLE }}.</span>
                  </template>
                  <template v-if="entry.EDITOR">
                    <span class="dist"> ({{ entry.EDITOR }}, Ed.)</span>
                  </template>
                  <template v-if="entry.JOURNAL">
                    <span class="dist"> {{ entry.JOURNAL }},</span>
                  </template>
                  <template v-if="entry.PAGES && !entry.VOLUME">
                    <span class="dist"> (pp.{{ entry.PAGES }})</span>
                  </template>
                  <template v-if="entry.PAGES && entry.VOLUME">
                    <span class="dist"
                      > ({{ entry.VOLUME }} ed. pp.{{ entry.PAGES }})</span
                    >
                  </template>
                  <template v-if="entry.PUBLISHER">
                    <span class="dist"> {{ entry.PUBLISHER }}</span>
                  </template>
                </template>

                <template v-if="entry.BIBTEXTYPEKEY === '@INPROCEEDINGS'">
                  <template v-if="entry.AUTHOR">
                    <span class="dist"> {{ entry.AUTHOR }}.</span>
                  </template>
                  <template v-if="entry.YEAR">
                    <span class="dist"> ({{ entry.YEAR }}).</span>
                  </template>
                  <template v-if="entry.TITLE">
                    <span class="dist"> {{ entry.TITLE }}.</span>
                  </template>
                  <template v-if="entry.BOOKTITLE">
                    <span class="dist"> {{ entry.BOOKTITLE }}.</span>
                  </template>
                  <template v-if="entry.PAGES">
                    <span class="dist"> (pp.{{ entry.PAGES }}).</span>
                  </template>
                </template>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.dist::after {
  content: " ";
}

.dist {
  font-weight: 100;
  display: inline;
  line-height: 1.2em;
  word-wrap: break-word !important;
}
.tag-link {
  cursor:pointer;
  font-size:0.8;
  color: #555;
  font-family: Arial, Helvetica, sans-serif;
}
.tag-link:hover{
  color:#c10000;
}
.normal-text{
  font-family: Arial, Helvetica, sans-serif;
  font-size:1em;
}
.film-headline{
  color:black;
  font-size: 1.1em;
}
</style>
