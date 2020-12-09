<!--
TODO:
- Statische Seite mit bibliografischen und filmografischen Angaben, durch Bilder angereichert und mit Kommentaren erläutert.
-->
<script>

import BibTexParser from "../bibtex_js";
import axios from "axios";

export default {
  name: "references",
  data: function(){
    return {
      theresienbib: null,
      bibparse: null,
    }
  },

  mounted: function(){
    this.bibparse = new BibTexParser();
    let _this = this;
    axios.get("/theresienbib").then(function(response){
      _this.bibparse.setInput(response.data);
      _this.bibparse.bibtex();
      _this.theresienbib = _this.bibparse.getEntries();
    })
  }
}
</script>

<template>
  <div class="container">
    <h1>Literatur und Film über den Film</h1>
    <br>
    <ul>
      <li v-for="entry in theresienbib" style="list-style-type:none">
         
        <div class = "row">
          <div v-if="entry.TITLE">
            <p class="dist"> Titel: {{entry.TITLE}}</p>
          </div>
          <div v-if="entry.JOURNAL">
            <p class="dist"> Journal: {{entry.JOURNAL}}</p>
          </div>
          <div v-if="entry.BOOKTITLE">
            <p class="dist"> Buchtitel: {{entry.BOOKTITLE}}</p>
          </div>
          <div v-if="entry.SHORTTITLE">
            <p class="dist"> Kurztitel: {{entry.SHORTTITLE}}</p>
          </div>

          <div v-if="entry.CHAPTER">
            <p class="dist"> Kapitel: {{entry.CHAPTER}}</p>
          </div>
        
        
        <div v-if="entry.BIBTEXTYPEKEY">
          <div v-if="entry.BIBTEXTYPEKEY === '@INCOLLECTION'">
            <p class="dist">Typ: Buchkapitel</p>
          </div>
          <div v-if="entry.BIBTEXTYPEKEY === '@ARTICLE'">
            <p class="dist">Typ: Journal</p> 
          </div>
          <div v-if="entry.BIBTEXTYPEKEY === '@BOOK'">
            <p class="dist">Typ: Buch</p>
          </div>
          <div v-if="entry.BIBTEXTYPEKEY === '@MISC'">
          </div>
        </div>
        
          <div v-if="entry.AUTHOR">
            <p class="dist">Autor: {{entry.AUTHOR}}</p>
          </div>
          <div v-if="entry.EDITOR">
            <p class="dist">Editor: {{entry.EDITOR}}</p>
          </div>
        

          <div v-if="entry.VOLUME">
            <p class="dist">Volume: {{entry.VOLUME}}</p>
          </div>
          <div v-if="entry.PAGES">
            <p class="dist">Seiten: {{entry.PAGES}} </p>
          </div>
          <div v-if="entry.LANGUAGE">
          <p class="dist">Sprache: {{entry.LANGUAGE}} </p>
          </div>

          <div v-if="entry.KEYWORDS">
            <p class="dist">Stichwörter: {{entry.KEYWORDS}}</p>
          </div>
        </div>
        
        

        <div class = "row">
          <div v-if="entry.PUBLISHER">
            <p class="dist">Verlag: {{entry.PUBLISHER}}</p>
          </div>
          <div v-if="entry.ISBN">
            <p class="dist">ISBN: {{entry.ISBN}}</p>
          </div>
          <div v-if="entry.ISSN">
            <p class="dist">ISSN: {{entry.ISSN}}</p>
          </div>
          <div v-if="entry.YEAR">
            <p class="dist">Escheinungsjahr: {{entry.YEAR}}</p>
          </div>
        </div>

        <div v-if="entry.ABSTRACT">
          <p class="dist">Abstrakt: {{entry.ABSTRACT}}</p>
        </div>
        <div v-if="entry.URL">
          <a :href="entry.URL">Link zur Quelle</a>
        </div>
        <div v-if="entry.FILE">
          <p class="dist">Dateipfad: {{entry.FILE}}</p>
        </div>
        <div v-if="entry.DOI">
          <p class="dist">DOI: {{entry.DOI}}</p>
        </div>
        <hr style="background-color:white">
      </li>


    </ul>
  </div>
</template>

<style>
.dist{
  margin-right: 10px;
}
</style>
