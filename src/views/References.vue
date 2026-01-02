<script>
import BibTexParser from "../bibtex_js";
import axios from "axios";

export default {
  name: "references",
  data: function () {
    return {
      theresienbib: [],
      bibparse: [],
      filter: "",
      tags: [],
      filmography: [],
      loadError: false,
    };
  },

  mounted: function () {
    this.bibparse = new BibTexParser();
    let _this = this;
    axios
      .get("./data/references_literature.bib")
      .then(function (response) {
        _this.bibparse.setInput(response.data);
        _this.bibparse.bibtex();
        _this.theresienbib = _this.bibparse.getEntries();
        _this.removeCurlBraces();
        _this.attachKeywords(_this.bibparse.getEntries());
      })
      .catch(function (error) {
        console.error("Error loading bibliography:", error);
        // Optional: Show user-friendly message
        _this.theresienbib = [];
        // Or set an error flag
        _this.loadError = true;
      });

    axios
      .get("./data/references_filmography.json")
      .then(function (response) {
        console.log(response);
        _this.filmography = response.data.filmography.sort(function (a, b) {
          return b.year - a.year;
        });
      })
      .catch(function (error) {
        console.error("Error loading filmography:", error);
        // Optional: Show user-friendly message
        _this.filmography = [];
        // Or set an error flag
        _this.loadError = true;
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
      if (this.theresienbib.length == 0) return;
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
          const getLastName = (entry) => {
            if (!entry.AUTHOR) return "";
            const firstAuthor = entry.AUTHOR.split(" and ")[0].trim();
            if (firstAuthor.includes(",")) {
              return firstAuthor.split(",")[0].trim().toLowerCase();
            }
            const parts = firstAuthor.split(" ");
            return parts[parts.length - 1].trim().toLowerCase();
          };

          const lastNameA = getLastName(a);
          const lastNameB = getLastName(b);

          // First sort by last name
          const nameComparison = lastNameA.localeCompare(lastNameB);

          // If names are equal, sort by year (descending)
          if (nameComparison === 0) {
            return b.YEAR - a.YEAR;
          }

          return nameComparison;
        });
      /*.sort(function (a, b) {
          return b.YEAR - a.YEAR;
        });*/
    },

    removeCurlBraces() {
      if (this.theresienbib.length == 0) return;
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

    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        // Optional: update URL hash without router interference
        // window.history.replaceState(null, null, `#${sectionId}`);
      }
    },
  },
};
</script>

<template>
  <div class="container" style="text-align: left">
    <h1 class="my-5" style="text-align: left">
      {{ $t("references.h1") }}
    </h1>
    <div style="background-color: white" class="pt-4 pb-3 px-3">
      <h2 class="mt-4 mb-5">{{ $t("references.films_headline") }}</h2>
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
      <h2 class="mt-5">{{ $t("references.literature_headline") }}</h2>
      <div class="row">
        <div class="col-9">
          <div v-if="filter != ''">
            {{ $t("references.filter_as") }} "{{ filter }}"
            <div class="btn btn-sm btn-primary ml-3" @click="filter = ''">
              {{ $t("references.filter_remove") }}
            </div>
          </div>
          <div v-if="filter == ''">
            <ul class="nav nav-pills">
              <li v-if="filteredBibliography(['@BOOK']).length > 0">
                <b-badge
                  class="mr-2 badge-link"
                  @click.prevent="scrollToSection('BOOK')"
                  variant="secondary"
                  >{{ $t("references.type_monography") }}</b-badge
                >
              </li>
              <li v-if="filteredBibliography(['@INCOLLECTION']).length > 0">
                <b-badge
                  class="mr-2 badge-link"
                  @click.prevent="scrollToSection('INCOLLECTION')"
                  variant="secondary"
                  >{{ $t("references.type_incollection") }}</b-badge
                >
              </li>
              <li v-if="filteredBibliography(['@ARTICLE']).length > 0">
                <b-badge
                  class="mr-2 badge-link"
                  @click.prevent="scrollToSection('ARTICLE')"
                  variant="secondary"
                  >{{ $t("references.type_article") }}</b-badge
                >
              </li>
              <li v-if="filteredBibliography(['@INPROCEDINGS']).length > 0">
                <b-badge
                  class="mr-2 badge-link"
                  @click.prevent="scrollToSection('INPROCEEDINGS')"
                  variant="secondary"
                  >{{ $t("references.type_inproceedings") }}</b-badge
                >
              </li>
              <li
                v-if="
                  filteredBibliography(['@PHDTHESIS', '@MASTERTHESIS']).length >
                  0
                "
              >
                <b-badge
                  class="mr-2 badge-link"
                  @click.prevent="scrollToSection('PHDTHESIS')"
                  variant="secondary"
                  >{{ $t("references.type_theses") }}</b-badge
                >
              </li>
              <li v-if="filteredBibliography(['@MISC']).length > 0">
                <b-badge
                  class="mr-2 badge-link"
                  @click.prevent="scrollToSection('MISC')"
                  variant="secondary"
                  >{{ $t("references.type_misc") }}</b-badge
                >
              </li>
            </ul>
          </div>

          <h3
            v-if="filteredBibliography(['@BOOK']).length > 0"
            class="mt-5 ml-0 mb-1"
            id="book"
          >
            {{ $t("references.type_monography") }}
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
            id="INCOLLECTION"
          >
            {{ $t("references.type_incollection") }}
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
            id="ARTICLE"
          >
            {{ $t("references.type_article") }}
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
            id="INPROCEEDINGS"
          >
            {{ $t("references.type_inproceedings") }}
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
            id="PHDTHESIS"
          >
            {{ $t("references.type_theses") }}
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
            id="MISC"
          >
            {{ $t("references.type_misc") }}
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
        <div class="col-3">
          <h4 class="mt-5">{{ $t("references.keywords") }}</h4>
          <b-badge
            v-for="tag in tags"
            :key="tag"
            href="#"
            @click.prevent="applyFilter(tag)"
            class="mr-3 tag-link"
            variant="light"
            >{{ tag }}
          </b-badge>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  text-decoration: none;
  color: #c10000;
  font-family: Arial, Helvetica, sans-serif;
}
.badge-link {
  cursor: pointer;
  font-size: 1.2 !important;
}
.badge-link:hover {
  background-color: #c10000;
  color: #fff;
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
