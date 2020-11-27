/* eslint-disable no-underscore-dangle */
/* eslint-disable vue/require-v-for-key */
/* eslint-disable */
<template>
  <div class="container text-left">
    <h1 class="mt-5 mb-4 ml-4 text-left">Die 38 Szenen des Films</h1>
    <div class="col-3 mb-3 ml-3">
      <input v-model="searchterm" placeholder="Suche">
    </div>  
    <div class="row">
      <div v-for="scene in search()" v-bind:key="scene" class="col-5 ml-5 mb-5 scene-box">
        <div class="row">
          <div class="col-3">
            <img src="../assets/dummy.png" />
          </div>
          <div class="col-9 pl-2 pt-2 pr-2 scene-content">
            <div class="body mb-2">
              <h3 class="title">{{ scene.number}}. {{ scene.title }}</h3>
              <div v-if="!scene.expanded" class="desc mb-2">{{ shorten(scene.description, 250) }}</div>
              <div v-if="scene.expanded" class="desc  mb-2">{{ scene.description }}</div>
              <div v-if="scene.expanded" class="details">
                <div v-if="scene.duration !== ''" class="item mb-1">Länge: {{scene.duration }} Sekunden</div>
                <div v-if="scene.status !== ''" class="item mb-1">Erhaltungszustand: {{scene.status}}</div>
                <div v-if="scene.locations !== ''" class="item mb-1">Orte:  {{scene.locations}}</div>
                <div v-if="scene.protagonists.length > 0"class="item mb-1">Personen: <ul><li v-for="p in scene.protagonists"><a href="">{{p}}</a></li></ul></div>
                <div v-if="scene.music !== ''" class="item mb-1">Hintergrundmusik: {{scene.music}}</div>
                <div v-if="scene.images.length > 0" class="item mb-1">Orte:  <ul><li v-for="o in scene.images">{{o}}, </li></ul></div>
              </div>
            </div>
            <div class="foot mt-2">
              <div class="category">{{ scene.category }}</div>
              <button
                v-if="!scene.expanded"
                @click="expand(scene.number)"
                class="btn btn-sm"
              >Mehr ...</button>
              <button
                v-if="scene.expanded"
                @click="expand(scene.number)"
                class="btn btn-sm"
              >Einklappen</button>
            </div>
          </div>
        </div>
      </div><!-- end for-->
      <div v-if="search().length === 0" class="col-10 p-3 mb-5 ml-5 box">
        Zu dem Begriff "{{searchterm}}" konnte nichts in den Szenen gefunden werden.
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);

import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

export default {
  name: "scenes",
  data: () => ({
    error: '',
    searchterm: '',
    message:'',
    scenes: []
  }),

  mounted() {
    let _this = this;
    console.log('mount scene');
    axios
      .post("/scenes/all")
      .then(function (response) { 
        console.log(response)
        _this.scenes = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });

  },

  created() {
    this.search().forEach(function(val){
      console.log(val.title+' \n '+val.description+' \\');
    })
  },
  methods: {
    shorten(text, length) {
      return text.length > length ? text.substr(0, length - 4) + " ..." : text;
    },
    expand(id) {
      let scene = this.getScenebyId(id);
      if (scene.expanded === undefined) {
        scene.expanded = false;
      } else {
        scene.expanded = !scene.expanded;
      }
    },
   getScenebyId(id) {
      for(let i = 0; i < this.scenes.length; i++){
        if(this.scenes[i].number === id){
          return this.scenes[i];
        }
      }
    },
    search() { 
      const _this = this;
      if (this.searchterm === '') {
        return this.scenes.sort(function(a, b){
            a.number = parseInt(a.number, 10);
            b.number = parseInt(b.number, 10);
            if(a.number < b.number){
              return -1;
            } else if(a.number > b.number){
              return 1;
            } else{
              return 0;
            }
          });
      } else {
        return this.scenes.filter(function(d) {
          return d.title.toLowerCase().includes(_this.searchterm.toLowerCase()) || d.description.toLowerCase().includes(_this.searchterm.toLowerCase());
          }).sort(function(a, b){
            a.number = parseInt(a.number, 10);
            b.number = parseInt(b.number, 10);
            if(a.number < b.number){
              return -1;
            } else if(a.number > b.number){
              return 1;
            } else{
              return 0;
            }
          });
      }
    }
  }
};
</script>

<style>
.scene-box {
 display:inline-block !important; float:none !important;
  position: relative;
  background: #fff;
 
  padding-left: 0;
  text-align: left;
  height: auto;
  overflow: auto;
}

.scene-box .row {
  height: 100%;
}

.box{
  position: relative;
  background: #fff;
  padding-left: 0;
  text-align: left;
}

.scene-content {
  position: relative;
}

.scene-box img {
  height: 100%;
  max-width: 100%;
}

.scene-box .desc {
  font-size: 1em;
  font-family: Jost;
  display: inline-block;
}

.scene-box .title {
  font-size: 1.2em;
  font-family: Jost;
  font-weight: bold;
  width: 100%;
  display: inline-block;
}

.scene-box .body {
  min-height: 200px;
  padding-bottom:30px;
}

.scene-box .foot {
  position:absolute;
  bottom:4px;
  display:block;
  min-height: 20px;
  width: 95%;
  margin: 10px;
}

.scene-box .category {
  display:inline-block;
}

.scene-box button {
  background: #111;
  color: #fff;
  position:absolute;
  right:10px;
}

.scene-box button:hover {
  background-color: #c10000;
  color: #fff;
}

.scene-box button.btn:focus {
    outline: 0;
    box-shadow: 0 0 0 0.15rem  #c10000;
}

.row.flexRow   { display: flex;  flex-wrap: wrap;}

</style>