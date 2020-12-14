<template>
  <b-container
    class="odd bg-light"
    style="height: 210px; overflow-y: visible"
    :style="{ display: this.hideself ? 'none' : 'block' }"
  >
    <b-row>
      <img
        style="height: 210px; width: 180px; overflow:hidden;"
        :id="'personcard' + person.id"
        :src="getImagePath(person)"
        onerror="this.src='/img/person_icon.png'"
      />

      <b-col>
        <h3 class="text-left ml-3">{{ person.shortname }}</h3>
        <p class="text-left ml-3">
          geboren {{ person.birth }} in {{ person.birth_place }} <br />
          gestorben {{ person.death }}, {{ person.death_place }}
        </p>
        <br />
        <br />
        <b-row class="ml-3">
          <p class="text-left">{{ person.profession_short }}</p>
          <b-button
            v-b-toggle="'collapse-' + person.id"
            class="mr-3 mb-3"
            @click="togglebio"
            size="sm"
            squared
            variant="dark"
            style="
              background-color: black;
              position: absolute;
              right: 0px;
              bottom: 0px;
            "
            :style="{ display: this.isopenbio }"
            >Mehr...
          </b-button>
        </b-row>
      </b-col>
    </b-row>
    <b-row style="width: inherit">
      <div class="col-12">
      <b-collapse
        :id="'collapse-' + person.id"
        class="mt-2"
        style="width: inherit"
      >
        <br />
        <p v-if="person.bio" class="text-left px-3 text-break">
          {{ person.bio }}
        </p>
        <hr />

        <h5 class="text-left px-3">Sichtbar im Film</h5>
        <b-row>
          <b-col v-for="entries in moviescenes" v-bind:key="entries"
            ><img class="movieshotodd movieshotxld movieshotld"
          /></b-col>
        </b-row>
        <br />
        <b-button
          v-b-toggle="'collapse-' + person.id"
          class="mr-3 mb-3"
          @click="togglebio"
          size="sm"
          squared
          variant="dark"
          style="
            background-color: black;
            position: absolute;
            bottom: 0px;
            right: 0px;
          "
          >Weniger...
        </b-button>
      </b-collapse>
      </div>
    </b-row>
  </b-container>
</template>


<script>
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.css";
export default {
  name: "personcard",
  props: ["person"],
  data: () => ({
    isopenbio: "block",
    hideself: false,
    moviescenes: [1, 2, 3],
  }),

  methods: {
    togglebio: function () {
      this.isopenbio = this.isopenbio == "block" ? "none" : "block";
    },
    getImagePath(p) {
      let t = p.shortname.split(" ");
      return "/img/persons/" + t[1] + "_" + t[0] + ".jpg";
    },
  },
};
</script>

<style>
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
}

/* Original design devices (screens 1900px and up) */
@media only screen and (min-width: 1900px) {
}
</style>