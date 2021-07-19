<template>
  
  <b-container
    :id="getShortName(person)"
    class="odd bg-light"
    style="min-height: 210px; overflow-y: visible; text-align:left;"
    :style="{ display: this.hideself ? 'none' : 'block' }"
  >
  
    <b-row :id ="'personcardrow' + person.id">
      <img v-if="person.image==='JA'"
        style="height: 210px; width: 180px; overflow:hidden;"
        :id="'personcard' + person.id"
        :src="getImagePath(person)"
        onerror="this.src='/img/person_icon.png'"
      />
      <img v-if="person.image!=='JA'"
        style="height: 210px; width: 180px; overflow:hidden;"
        :id="'personcard' + person.id"
        :src="'/img/person_icon.png'"
      />

      <b-col :id ="'personcardcol' + person.id">
        <h3 class="ml-0 mt-2">{{ person.title }} {{ person.name }} {{ person.surename }}</h3>
        <p class="ml-1">
          <div v-if="person.birth_date != 'unbekannt' || person.birth_place != 'unbekannt'"> 
            {{$t("personcard.born")}} {{ person.birth_date }} {{$t("personcard.bornin")}} {{ person.birth_place }}
          </div>
          <div v-if="person.death != 'unbekannt' || person.death_place != 'unbekannt'">
            {{$t("personcard.death")}} {{ person.death }}, {{ person.death_place }}
          </div>
        </p>
        <b-row class="ml-0">
          <p v-if="person.branch && person.branch !== 'k.A.'" class="text-left mt-1">{{$t("personcard.branch")}} {{ person.branch }}</p>
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
            >{{$t("personcard.button_more")}}
          </b-button>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
          <!-- b-button (Weniger...) in b-collapse had different position than b-button above (Mehr...) 
          (see issue #41). fixed by removing style="width: inherit" from b-row (was obsolete anyway)
          Additional: b-button also had different position during transition phase of b-collapse.
          fixed by removing padding from parent of b-collapse, assumingly because padding is not animated.
          put the padding on b-collapse instead -->
      <b-col class ="px-0">
        <b-collapse
          :id="'collapse-' + person.id"
          class="px-3"      
          >
          <p v-if="person.bio" class="px-3 text-break">{{ person.bio }}</p>
          <hr />
          <ul class="ml-1 pl-1 mb-5" style="list-style-type: '- ';">
          <li v-if="person.nationality" class="mb-1">{{$t("personcard.nationality")}} {{ person.nationality }}</li>
          <li v-if="person.profession" class="mb-1">{{$t("personcard.profession")}} {{ person.profession }}</li>
          <li v-if="person.spouse" class="mb-1">{{$t("personcard.spouse")}} {{person.spouse}}</li> 
          <li v-if="person.children" class="mb-1">{{$t("personcard.children")}} {{person.children}}</li>
          </ul>
          
          <h5 v-if="person.moviescenes" class="pr-3">{{$t("personcard.inmovie")}}</h5>
          <b-row class="mb-1">
            <b-col v-for="entries in person.moviescenes" v-bind:key="entries"> 
              <img class="movieshotodd movieshotxld movieshotld"/>
            </b-col>
          </b-row>
        
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
            >{{$t("personcard.button_less")}}
          </b-button>
        </b-collapse>
      </b-col>
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
      let returnstr;
      returnstr = "/img/persons/" + this.getShortName(p) + ".jpg";
      return returnstr;
    },
    getShortName(p) {
      //let t = p.shortname.split(" ");
      //return t[0] + "_" + t[1];
      return p.shortname.replace(/\ /g, "_");
    },
    loadImage(url) {
      return new Promise((resolve, reject) => {
        let img = new Image(180, 210);
        img.addEventListener("load", (img) => resolve(img));
        img.addEventListener("error", (img) => reject(img));
        img.src = url;
      });
    },
  },
  mounted: function () {
    // let pimg;
    // this.loadImage(this.getImagePath(this.person))
    //   .then((img) => {
    //     pimg = img.target;
    //   })
    //   .catch((img) => {
    //     pimg = img.target;
    //     pimg.src = "/img/person_icon.png";
    //   }).finally(() => {
    //     pimg.id = "personcard" + this.person.id;
    //     pimg.style.overflow = "hidden";
    //     let col = document.getElementById("personcardcol" + this.person.id);
    //     document
    //   .getElementById("personcardrow" + this.person.id)
    //   .insertBefore(pimg, col);
    //   });
  },
};
</script>

<style>
.collapsing {
  padding-right: 0px;
  margin-right: 0px;
}
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