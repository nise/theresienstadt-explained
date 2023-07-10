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
      filmography: [],
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

    axios.get("/references/filmography").then(function (response) {
      console.log(response);
      _this.filmography = response.data.filmography.sort(function (a, b) {
        return b.year - a.year;
      });
    });
  },
  methods: {
    attachKeywords: function (bib) {
      let tmp = "";
      for (var i in this.theresienbib) {
        if (this.theresienbib.hasOwnProperty(i)) {
          if (this.theresienbib[i].KEYWORDS) {
            //this.theresienbib[i].tags = this.theresienbib[i].KEYWORDS.split(", ");
            this.theresienbib[i].tags =
              this.theresienbib[i].KEYWORDS.length > 0
                ? this.theresienbib[i].KEYWORDS.split(", ")
                : [];
            tmp = tmp + this.theresienbib[i].KEYWORDS.toString() + ", ";
          }
        }
      }
      this.tags = [...new Set(tmp.split(", "))];
    },

    applyFilter: function (key) {
      this.filter = key;
    },

    filteredBibliography: function (publication_types) {
      let _this = this;
      return Object.values(this.theresienbib)
        .filter(function (d) {
          if (d.tags) {
            return _this.filter === ""
              ? publication_types.indexOf(d.BIBTEXTYPEKEY) != -1
              : d.tags.indexOf(_this.filter) > 0 &&
                  publication_types.indexOf(d.BIBTEXTYPEKEY) != -1;
          }
          return false;
        })
        .sort(function (a, b) {
          return b.YEAR - a.YEAR;
        });
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
    <h1 class="my-5" style="text-align: left">
      {{$t("references.h1")}}
    </h1>
    <div style="background-color: white" class="pt-4 pb-3 px-3">
      <h2 class="mt-4 mb-5">Filme</h2>
      <div v-for="film in filmography" :key="film" class="row mb-5">
        <div class="col-3">
          <img :src="'/img/film/' + film.cover" style="width: 100%" />
        </div>
        <div class="col-9">
          <h4 class="col-12 film-headline pl-0">
            {{ film.title_original }}
            <span v-if="film.title_other">({{ film.title_other }})</span>
          </h4>
          <span v-if="film.productioncountry">{{ film.productioncountry }}</span
          >, <span v-if="film.year">{{ film.year }}</span
          >, <span v-if="film.length">{{ film.length }}</span>
          <br />
          <span v-if="film.description" class="col-12 normal-text">{{
            film.description
          }}</span>
        </div>
        <hr />
      </div>
    </div>

    <div style="background-color: white" class="my-5 pt-4 pb-3 px-3">
      <h2 class="mt-5">Literatur</h2>
      <div class="row">
        <div class="col-3">
          <h4 class="mt-5">Schlüsselwörter</h4>
          <span
            v-for="tag in tags"
            :key="tag"
            @click="applyFilter(tag)"
            class="mx-1 tag-link"
            >{{ tag }}
          </span>
        </div>
        <div class="col-9">
          <div v-if="filter != ''">
            Gefiltert nach "{{ filter }}"
            <div class="btn btn-sm btn-primary ml-3" @click="filter = ''">
              Filter aufheben
            </div>
          </div>

          <h3
            v-if="filteredBibliography(['@BOOK']).length > 0"
            class="mt-5 ml-0 mb-1"
          >
            Monographien
          </h3>
          <ul class="mr-4 ml-1 px-0">
            <li
              v-for="entry in filteredBibliography('@BOOK')"
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
              </div>
            </li>
          </ul>

          <h3
            v-if="filteredBibliography(['@INCOLLECTION']).length > 0"
            class="mt-5 ml-0 mb-1"
          >
            Buchbeiträge
          </h3>
          <ul class="mr-4 ml-1 px-0">
            <li
              v-for="entry in filteredBibliography(['@INCOLLECTION'])"
              :key="entry"
              class="mb-3"
              style="list-style-type: none; color: black; text-align: left"
            >
              <div class="">
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
              </div>
            </li>
          </ul>

          <h3
            v-if="filteredBibliography(['@ARTICLE']).length > 0"
            class="mt-5 ml-0 mb-1"
          >
            Zeitschriftenartikel
          </h3>
          <ul class="mr-4 ml-1 px-0">
            <li
              v-for="entry in filteredBibliography(['@ARTICLE'])"
              :key="entry"
              class="mb-3"
              style="list-style-type: none; color: black; text-align: left"
            >
              <div class="">
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
              </div>
            </li>
          </ul>

          <h3
            v-if="filteredBibliography(['@INPROCEDINGS']).length > 0"
            class="mt-5 ml-0 mb-1"
          >
            Tagungsbeiträge
          </h3>
          <ul class="mr-4 ml-1 px-0">
            <li
              v-for="entry in filteredBibliography(['@INPROCEDINGS'])"
              :key="entry"
              class="mb-3"
              style="list-style-type: none; color: black; text-align: left"
            >
              <div class="">
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

          <h3
            v-if="
              filteredBibliography(['@PHDTHESIS', '@MASTERTHESIS']).length > 0
            "
            class="mt-5 ml-0 mb-1"
          >
            Dissertationen
          </h3>
          <ul class="mr-4 ml-1 px-0">
            <li
              v-for="entry in filteredBibliography([
                '@PHDTHESIS',
                '@MASTERSTHESIS',
              ])"
              :key="entry"
              class="mb-3"
              style="list-style-type: none; color: black; text-align: left"
            >
              <div class="">
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
              </div>
            </li>
          </ul>

          <h3
            v-if="filteredBibliography(['@MISC']).length > 0"
            class="mt-5 ml-0 mb-1"
          >
            Sonstige
          </h3>
          <ul class="mr-4 ml-1 px-0">
            <li
              v-for="entry in filteredBibliography(['@MISC'])"
              :key="entry"
              class="mb-3"
              style="list-style-type: none; color: black; text-align: left"
            >
              <div class="">
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
                    <span class="dist">
                      ({{ entry.VOLUME }} ed. pp.{{ entry.PAGES }})</span
                    >
                  </template>
                  <template v-if="entry.PUBLISHER">
                    <span class="dist"> {{ entry.PUBLISHER }}</span>
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

h4 {
  color: #555;
  font-size: 1.1em;
  font-weight: bold;
  margin-left: 0;
}

h3 {
  color: #555;
  font-weight: bold;
}

.dist {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1;
  font-weight: 100;
  display: inline;
  line-height: 1.1em;
  word-wrap: break-word !important;
}
.tag-link {
  cursor: pointer;
  font-size: 0.8;
  color: #555;
  font-family: Arial, Helvetica, sans-serif;
}
.tag-link:hover {
  color: #c10000;
}
.normal-text {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  padding-left: 0;
}
.film-headline {
  color: black;
  font-size: 1.2em;
}
</style>
