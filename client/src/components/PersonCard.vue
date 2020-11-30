<template>
  <b-container
    class="ld xld odd bg-light"
    style="height: 210px; overflow-y: visible; height: auto"
    :style="{ display: this.hideself ? 'none' : 'block' }"
  >
    <b-row>
      <img style="height: 210px; width: 180px" :id="'personcard' + person.id" />

      <b-col>
        <h3 class="text-left ml-3">{{ person.shortname }}</h3>
        <p class="text-left ml-3">
          geboren {{ person.birth }} in {{ person.birth_place }} <br />
          gestorben {{ person.death }}, {{ person.death_place }}
        </p>
        <br />
        <br />
        <b-row class="ml-3">
          <p class="text-left">{{ person.profession }}</p>
          <b-button
            v-b-toggle="'collapse-' + person.id"
            class="mr-3"
            @click="togglebio"
            size="sm"
            squared
            variant="dark"
            style="
              background-color: black;
              height: 25px;
              position: absolute;
              right: 0px;
            "
            :style="{ display: this.isopenbio }"
            >Mehr...
          </b-button>
        </b-row>
      </b-col>
    </b-row>
    <b-row style="width: inherit">
      <b-collapse
        :id="'collapse-' + person.id"
        class="mt-2"
        style="width: inherit"
      >
        <br />
        <p class="text-left px-3 text-break">{{ person.bio }}</p>
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
          class="mr-4 mb-4"
          @click="togglebio"
          size="sm"
          squared
          variant="dark"
          style="background-color: black; height: 25px; float: right"
          >Weniger...
        </b-button>
      </b-collapse>
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
  },
};
</script>

<style>
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .xsd {
    width: 200px;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .ld {
    width: 500px;
  }
  .movieshotld {
    width: 108px;
    height: 84px;
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .xld {
    width: 600px;
  }
  .movieshotxld {
    width: 144px;
    height: 112px;
  }
}

/* Original design devices (screens 1900px and up) */
@media only screen and (min-width: 1900px) {
  .odd {
    width: 655px;
  }
  .movieshotodd {
    width: 180px;
    height: 140px;
  }
}
</style>