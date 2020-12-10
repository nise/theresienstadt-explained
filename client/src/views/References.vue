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
      _this.removeCurlBraces();
      
    })
  },
  methods: {
    removeCurlBraces(){
      let regtest = RegExp(/\{|\}/gi);
      for (var val in this.theresienbib){
        for (var objval in this.theresienbib[val]){

          let noCurlBraces = this.theresienbib[val][objval]
          if (regtest.test(noCurlBraces)){
            this.theresienbib[val][objval] = noCurlBraces.replace(regtest, ' ');
          }
        }
      }
    }
  }
}
</script>

<template>
  <div class="container" style="background-color:white">
    <h1>Literatur und Film über den Film</h1>
    <br>
    <ul>
      <li v-for="entry in theresienbib" style="list-style-type:none; color:black; text-align:left;">
         
        <div class = "row">
          <template v-if="entry.BIBTEXTYPEKEY === '@BOOK'">
            <template v-if="entry.AUTHOR">
              <span class="dist">{{entry.AUTHOR}}.</span>
            </template>
            <template v-if="entry.YEAR">
              <span class="dist">({{entry.YEAR}}).</span>
            </template>
            <template v-if="entry.TITLE">
              <span class="dist">{{entry.TITLE}}.</span>
            </template>
            <template v-if="entry.EDITOR">
              <span class="dist">({{entry.EDITOR}}, Ed.)</span>
            </template>
            <template v-if="entry.PUBLISHER">
              <span class="dist">{{entry.PUBLISHER}}.</span>
            </template>
            <template v-if="entry.DOI">
              <span class="dist">. {{entry.DOI}}</span>
            </template>
          </template>
        
          <template v-if="entry.BIBTEXTYPEKEY === '@INCOLLECTION'">
            <template v-if="entry.AUTHOR">
              <span class="dist">{{entry.AUTHOR}}.</span>
            </template>
            <template v-if="entry.YEAR">
              <span class="dist">({{entry.YEAR}}).</span>
            </template>
            <template v-if="entry.TITLE">
                <span class="dist">{{entry.TITLE}}.</span>
            </template>
            <template v-if="entry.EDITOR">
              <span class="dist">({{entry.EDITOR}}, Ed.)</span>
            </template>
            <template v-if="entry.BOOKTITLE">
              <span class="dist">{{entry.BOOKTITLE}}</span>
            </template>
            <template v-if="entry.PAGES">
              <span class="dist">(pp.{{entry.PAGES}}).</span>
            </template>
            <template v-if="entry.PUBLISHER">
              <span class="dist">{{entry.PUBLISHER}}.</span>
            </template>
            <template v-if="entry.DOI">
              <a class="dist" :href="'https://doi.org/'+entry.DOI">DOI-Link</a>
            </template>
          </template>

          <template v-if="entry.BIBTEXTYPEKEY === '@ARTICLE'">
            <template v-if="entry.AUTHOR">
              <span class="dist">{{entry.AUTHOR}}.</span>
            </template>
            <template v-if="entry.YEAR">
              <span class="dist">({{entry.YEAR}}).</span>
            </template>
            <template v-if="entry.TITLE">
                <span class="dist">{{entry.TITLE}}.</span>
            </template>
            <template v-if="entry.JOURNAL">
                <span class="dist">{{entry.JOURNAL}}.</span>
            </template>
            <template v-if="entry.VOLUME">
                <span class="dist">{{entry.VOLUME}}.</span>
            </template>
            <template v-if="entry.PAGES">
              <span class="dist">({{entry.PAGES}}).</span>
            </template>
            <template v-if="entry.DOI">
              <a class="dist" :href="'https://doi.org/'+entry.DOI">DOI-Link</a>
            </template>
            <template v-if="entry.URL">
              <a class="dist" :href="entry.URL">URL-Link</a>
            </template>
          </template>

          <template v-if="entry.BIBTEXTYPEKEY === '@PHDTHESIS' || entry.BIBTEXTYPEKEY === '@MASTERSTHESIS'">
            <template v-if="entry.AUTHOR">
              <span class="dist">{{entry.AUTHOR}}.</span>
            </template>
            <template v-if="entry.YEAR">
              <span class="dist">({{entry.YEAR}}).</span>
            </template>
            <template v-if="entry.TITLE">
                <span class="dist">{{entry.TITLE}}.</span>
            </template>
            <template v-if="entry.SCHOOL">
                <span class="dist">{{entry.SCHOOL}}.</span>
            </template>
            <template v-if="entry.URL">
              <a class="dist" :href="entry.URL">URL-Link</a>
            </template>
          </template>

          <template v-if="entry.BIBTEXTYPEKEY === '@MISC'">
            <template v-if="entry.AUTHOR">
              <span class="dist">{{entry.AUTHOR}}.</span>
            </template>
            <template v-if="entry.YEAR">
              <span class="dist">({{entry.YEAR}}).</span>
            </template>
            <template v-if="entry.TITLE">
                <span class="dist">{{entry.TITLE}}.</span>
            </template>
            <template v-if="entry.EDITOR">
              <span class="dist">({{entry.EDITOR}}, Ed.)</span>
            </template>
            <template v-if="entry.JOURNAL">
              <span class="dist">{{entry.JOURNAL}},</span>
            </template>
            <template v-if="entry.PAGES && !entry.VOLUME">
              <span class="dist">(pp.{{entry.PAGES}})</span>
            </template>
            <template v-if="entry.PAGES && entry.VOLUME">
              <span class="dist">({{entry.VOLUME}} ed. pp.{{entry.PAGES}})</span>
            </template>
            <template v-if="entry.PUBLISHER">
              <span class="dist">{{entry.PUBLISHER}}</span>
            </template>
          </template>


          <template v-if="entry.BIBTEXTYPEKEY === '@INPROCEEDINGS'">
            <template v-if="entry.AUTHOR">
              <span class="dist">{{entry.AUTHOR}}.</span>
            </template>
            <template v-if="entry.YEAR">
              <span class="dist">({{entry.YEAR}}).</span>
            </template>
            <template v-if="entry.TITLE">
                <span class="dist">{{entry.TITLE}}.</span>
            </template>
            <template v-if="entry.BOOKTITLE">
              <span class="dist">{{entry.BOOKTITLE}}.</span>
            </template>
            <template v-if="entry.PAGES">
              <span class="dist">(pp.{{entry.PAGES}}).</span>
            </template>
          </template>


        </div>
        
         
        <br>
      </li>


    </ul>
  </div>
</template>

<style>
.dist{
  margin-right: 10px;
}
</style>
