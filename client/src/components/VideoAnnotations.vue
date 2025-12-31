<script>
import Vue from "vue";
import VueMoment from "vue-moment";
Vue.use(VueMoment);
import PortalVue from "portal-vue";
Vue.use(PortalVue);

export default {
  name: "video-annotations",
  props: {
    selectedPropagandaTechnique: String,
    currentTime: Number,
    videoElementduration: Number,
  },
  data() {
    return {
      selectedPropagandaTechnique: "",
      showAnnotationForm: false,
      newannotationtitle: "",
      newannotationreason: "",
      newannotationtime: "",
      annotations: [],
      val: 2,
    };
  },
  methods: {
    toggleForm() {
      this.showAnnotationForm = true;
    },
    deleteAnnotaion(id) {
      for (var i = 0; i < this.annotations.length; i++) {
        if (this.annotations[i].id === id) {
          delete this.annotations[i];
        }
      }
    },
    saveannotation() {
      let newAnnotation = {
        id: Math.ceil(Math.random() * 10000000),
        start: this.currentTime,
        end: this.currentTime + 1,
        type: this.selectedPropagandaTechnique,
        content: {
          title: this.newannotationtitle,
          reason: this.newannotationreason,
        },
        x: 50,
        y: 50,
      };
      //this.log(newAnnotation)
      this.annotations.push(newAnnotation);
      this.showAnnotationForm = false;
    },
    clearannotation() {
      this.showAnnotationForm = false;
      this.newannotationtime = 0;
      this.newannotationtitle = "";
      this.newannotationreason = "";
    },
    gotoTime(time) {
      this.$emit("gotoTimerequest", time);
    },
    getXPosition(time) {
      return (time / this.videoElementduration) * 100;
    },
  },
};
</script>

<template>

<div>
  <div class="row video-bar topics ml-1 mt-2">
          <h4>{{$t("videoannotations.propagandatechnique")}}</h4>
          <div class="row">
            <select v-model="selectedPropagandaTechnique" class="ml-2">
              <option disabled value="">{{$t("videoannotations.choosetechnique")}}</option>
              <option>{{$t("videoannotations.opt1")}}</option>
              <option>{{$t("videoannotations.opt2")}}</option>
              <option>{{$t("videoannotations.opt3")}}</option>
              <option>{{$t("videoannotations.opt4")}}</option>
              <option>{{$t("videoannotations.opt5")}}</option>
              <option>{{$t("videoannotations.opt6")}}</option>
              <option>{{$t("videoannotations.opt7")}}</option>
              <option>{{$t("videoannotations.opt8")}}</option>
              <option>{{$t("videoannotations.opt9")}}</option>
              <option>{{$t("videoannotations.opt10")}}</option>
              <option>{{$t("videoannotations.opt11")}}</option>
            </select>
          </div>
        </div>
    <portal to="timeline-annotation-marker">
        <span :title="annotation.content.title" v-for="annotation in annotations" v-bind:key="annotation" @click="gotoTime(annotation.start)" class="timeline-marker" :style="'left:'+getXPosition(annotation.start)+'%;'"></span>
    </portal>
    <div class="row video-bar annotations ml-1 mt-2">
        <h4>{{$t("videoannotations.markings")}}</h4>
        <button v-if="!showAnnotationForm" @click="toggleForm" class="btn btn-primary btn-sm left ml-2">{{$t("videoannotations.newmark")}}</button>
        <div v-if="showAnnotationForm" class="annotation-form col-12">
            <div class="time left">{{$t("videoannotations.timepoint")}}: {{ currentTime | moment('mm:ss') }}</div>
            <input v-model="newannotationtitle" placeholder="Geben Sie der Markierung einen Titel"></input><br>
            <textarea v-model="newannotationreason" placeholder="Begründen Sie, warum die markierte Stelle eine Manipulation darstellt"></textarea><br>
            <button @click="saveannotation" class="btn btn-primary left">{{$t("videoannotations.safe")}}</button>
            <button @click="clearannotation" class="btn btn-link right">{{$t("videoannotations.discard")}}</button>
        </div>
        <br/>
        <br/>
        <br/>
        <div class="annotation-list col-12">
            <ul class="scene-list">
                <li v-for="annotation in annotations" v-bind:key="annotations" @click="gotoTime(annotation.start)">
                    <a class="link">
                        {{ annotation.start | moment('mm:ss') }} {{ annotation.content.title}} <i @click="deleteAnnotation(annotation.id)" class="fa fa-info right mr-2"></i>
                    </a>
                    <div class="description">{{ annotation.content.reason }}</div>    
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<style scoped>
h4 {
  display: block;
  font-family: Jost;
  font-weight: bold;
  font-size: 14px;
  color: #fff;
  text-align: left;
  width: 90%;
  border-bottom: 1px solid #fff;
  margin: 2px 10px 10px 10px;
}

.video-bar {
  display: inline-block;
  background-color: #3b3b3bec;
  width: 96%;
  padding-bottom: 10px;
  padding-top: 6px;
}

.video-bar.topics .row {
  content-align: center;
}
.video-bar.topics button {
  padding: 1px 10px;
  margin: 4px 10px;
  border-radius: 10px;
}

.scene-list {
  padding-left: 10px;
  text-align: left;
}
.scene-list li {
  list-style: none;
  display: block;
  width: auto;
}
.scene-list li a.scene {
  display: inline-block;
  padding: 1px 8px;
  white-space: nowrap;
}

.timeline-marker {
  height: 10px;
  width: 10px;
  position: absolute;
  top: 4px;
  background-color: #c10000;
}

.timeline-marker:hover {
  height: 14px;
  width: 14px;
  top: 0px;
}

/** Annotations */

.annotations {
  padding: 0 0px;
  color: #fff;
}

.annotations input {
  width: 100%;
}
.annotations textarea {
  width: 100%;
}

.annotations .annotation-list,
.annotations .annotation-form {
  display: block;
  padding-left: 10px !important;
}

.annotation-list ul {
  padding-left: 0;
}

.annotation-list ul li {
  cursor: pointer;
  border-bottom: 1px solid #555;
  padding-left: 6px;
}

.annotation-list ul li:hover {
  background-color: #555;
}

.annotation-list ul li .link {
  color: #fff;
  font-weight: bold;
}

.annotation-list .description {
  display: block;
  margin-left: 50px;
  font-size: 0.9em;
  color: #999;
}

.left {
  float: left;
}
.right {
  float: right;
}
</style>