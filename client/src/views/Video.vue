/* eslint-disable */
/* eslint-disable no-else-return */
/* eslint-disable import/no-amd */
/* eslint-disable no-unused-vars */
/* eslint-disable */
<script>
// import Video from '../js/Video.js';
// const videovue = new Video(store);
// const video = videovue.video;

import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import store from "../store";
// import Vi2 from '../js/vi2.main';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faPause } from '@fortawesome/free-solid-svg-icons'
import { faForward } from '@fortawesome/free-solid-svg-icons'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlay, faPause, faForward, faBackward);
Vue.component('font-awesome-icon', FontAwesomeIcon);

import moment from 'moment';
import VueMoment from 'vue-moment';
Vue.use(VueMoment, { moment });

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import annotations from '../components/Annotations'

// Choose Locale
//moment.locale('de');

export default {
  name: 'Video',
  components: {
    annotations
  },
  data() {
    return {
      scenes: [
        {
          _id: {
            $oid: "5ba539c3e99589718c928bf4"
          },
          expanded: false,
          protagonists: [],
          images: [],
          title: "Schmiede",
          category: "Alltag",
          number: 26,
          source: "4",
          duration: "22:15",
          start: 596,
          status: "vollständig",
          description:
            "In der Werkstatt eines Huf- Wagenschmieds beschlägt ein Hufschmied einen Ochsen. Der Ochse wird aus der Schmiede herausgeführt.",
          music: "",
          locations: "Schmiede",
          updated_at: {
            $date: "2018-09-21T18:34:43.088Z"
          },
          __v: 0
        },
        {
          _id: {
            $oid: "5ba539c3e99589718c928bf5"
          },
          expanded: false,
          protagonists: [],
          images: [],
          category: "Kultur",
          title: "Zentralbad",
          number: 31,
          source: "4,5",
          duration: "27:16",
          start: 1086,
          status: "vollständig",
          description:
            "Männer laufen in die Gemeinschaftsdusche und waschen sich. Männer verlassen das Zentralbad und laufen auf die Straße.",
          music: "",
          locations: "Zentralbad",
          updated_at: {
            $date: "2018-09-21T18:34:43.088Z"
          },
          __v: 0
        },
        {
          _id: {
            $oid: "5ba539c3e99589718c928bf6"
          },
          expanded: false,
          protagonists: [],
          images: [],
          title: "Abendfreizeit",
          number: 36,
          category: "Kultur",
          source: "5",
          duration: "1:54:24",
          start: 1374,
          status: "vollständig",
          description:
            "Leute erholen sich außerhalb von Holzbaracken, Szenen aus den Gemeinschaftsunterkünften. Outdoor facilities of the barracks with inhabitants, mostly women and children, on benches, chatting, reading. Inside a barrack of the women's accommodation, pan on the central corridor to separate living spaces with wooden tables and benches, double bunk beds separating the living spaces, partly covered with cloths. Several women and young girls reading, needle working, chatting in small groups, playing cards.",
          music: "",
          locations: "",
          updated_at: {
            $date: "2018-09-21T18:34:43.089Z"
          },
          __v: 0,
        },
      ],
      session:0,
      videoElement: null,
      paused: null,
      currentTime: 0,
      formatedTime: '00:00',
      timer: null,
      selectedPropagandaTechnique: '',
    };
  },
  methods: {
    log(data){
      data.session = this.session;
      axios.post('/log', { data: data})
        //.then(function (response) { })
        .catch(function (error) {
          console.log(error);
        });
    },
    videolog(data){
      data.session = this.session;
      axios.post('/logplayback', { data: data})
        //.then(function (response) {})
        .catch(function (error) {
          console.log(error);
        });
    },
    search() {
      return this.scenes;
    },
    updatePaused(event) {
      this.videoElement = event.target;
      this.paused = event.target.paused;
    },
    play() {
      this.timer = setInterval(this.updateAnnotaions, 500);
      this.videoElement.play();
    },
    pause() {
      this.videoElement.pause();
      clearInterval(this.timer);
    },
    forward(){},
    backward(){},
    updateAnnotaions(){
      this.currentTime = this.videoElement.currentTime;
    },
    momenwwwt: function () {
      return moment();
    },
    getXPosition(time){
      if(!this.videoElement){
        return 0;
      }
      return (time / this.videoElement.duration) * 100;
    },
    getProgressWidth(){
      if(!this.videoElement){
        return 0;
      }
      return (this.videoElement.currentTime / this.videoElement.duration) * 100;
    },
    clickTimeline(e){
      if(!this.videoElement){
        return 0;
      }
      let rect = e.target.getBoundingClientRect();
      this.videoElement.currentTime = ((e.clientX - rect.left) / (rect.right - rect.left)) * this.videoElement.duration;
      //console.log(e.clientX - rect.left, e.clientX, rect.left, rect.right);
    },
    gotoTime(time){
      if(!this.videoElement){
        return 0;
      }
      this.videoElement.currentTime = time;
    },
    hideAnnotations(){

    },
    // Annotations
    toggleForm(){
      this.showAnnotationForm = true;
    },
    deleteAnnotaion(id){
      for(var i = 0; i < this.annotations.length; i++){
        if(this.annotations[i].id === id){
          delete this.annotations[i];
        }
      }
    },
    saveannotation() {
      let newAnnotation =  {
        id: Math.ceil(Math.random()*10000000),
        start: this.currentTime, 
        end: this.currentTime+1, 
        type: this.selectedPropagandaTechnique, 
        content: {
          title: this.newannotationtitle,
          reason: this.newannotationreason
        }, 
        x: 50, 
        y: 50 
      };
      this.log(newAnnotation)
      this.annotations.push(newAnnotation);
      this.showAnnotationForm = false;
    },
    clearannotation() {
      this.showAnnotationForm = false;
      this.newannotationtime = 0;
      this.newannotationtitle = '';
      this.newannotationreason = '';
    },
  },
  computed: {
    playing() { return !this.paused; }
  },
  // eslint-disable-next-line object-shorthand
  mounted: function(){
    this.session = Math.ceil(Math.random()*100000);
    this.scenes = this.scenes.sort((a, b) => {
      a.number = parseInt(a.number, 10);
      b.number = parseInt(b.number, 10);
      if (a.number < b.number) {
        return -1;
        // eslint-disable-next-line no-else-return
      } else if (a.number > b.number) {
        return 1;
      } else {
        return 0;
      }
    });
  },
  watch: {
    // eslint-disable-next-line object-shorthand
    currentTime: function(c){ 
      this.videolog({session: this.session, playback: c, utc: (new Date()).getTime() });

      for(var i = 0; i < this.$refs.annotationscomp.annotations.length; i++){
        if( c >= this.$refs.annotationscomp.annotations[i].start && c < this.$refs.annotationscomp.annotations[i].end){
          this.$refs.annotationscomp.annotations[i].active ? this.showAnnotation(this.$refs.annotationscomp.annotations[i]) : null;
        }else{
          this.hideAnnotations(this.$refs.annotationscomp.annotations[i]);
        }
      }
/*
var annoLength = this.annotations.length;
            for (var i = 0; i < annoLength; i++) {
                var oAnn = this.annotations[i];
                if (iTime >= oAnn.displayPosition.t1 && iTime < (Number(oAnn.displayPosition.t1) + Number(oAnn.displayPosition.t2))) {
                    if (!oAnn.active) {
                        oAnn.active = true;
                        $(vi2.observer.player).trigger('annotation.begin.' + oAnn.type, [i, oAnn]);
                    }
                } else {
                    oAnn.active = false;
                    $(vi2.observer.player).trigger('annotation.end.' + oAnn.type, [i, oAnn]);
                }
            }
*/
      //return moment.duration(num, 'minutes');
      //num = num/60; 
      //this.formatedTime = ('0' + Math.floor(num) % 24).slice(-2) + ':' + ((num % 1)*60 + '0').slice(0, 2);//moment(currentTime).format('mm:ss');
    },
  },

};
</script>

<template>
  <div id="video">
    <div class="row">
      <div class="col-8 video-panel">
        <video
          ref="video"
          @canplay="updatePaused"
          @playing="updatePaused"
          @pause="updatePaused"
          class="col-12"
          disablepictureinpicture
          controlslist="nodownload"
        >
          <source src="../assets/videos/theresienstadt.mp4" type="video/mp4" />
          <!--<source src="../assets/videos/theresienstadt.webm" type='video/webm; codecs="vp8, vorbis"' />-->
          Video tag not supported. Download the video
          <a
            href="../assets/videos/theresienstadt.mp4"
          >here</a>.
        </video>
        <div class="video-controls col-12">
          <div class="timelines">
            <!--<div class="vi2-video-seeklink vi2-btn"></div>-->
            <!--<div class="timeline-top">
              <span :title="annotation.content.title" v-for="annotation in refs.annotationscomp.annotations" @click="gotoTime(annotation.start)" class="timeline-marker" :style="'left:'+getXPosition(annotation.start)+'%;'"></span>
            </div>-->
            <div @click="clickTimeline" class="timeline-main"></div>
            <div class="timeline-bottom"></div>
            <div :style="'width:' + getProgressWidth() + '%;'" class="timeline-progress"></div>
          </div>
          <div class="control-bar">
            <div class="video-play-pause vi2-btn mt-2" title="Play/Pause">
              <font-awesome-icon @click="backward" icon="backward" class="backward-btn mr-3" />
              <font-awesome-icon v-show="paused" @click="play" icon="play" class="pause-btn bigger"/>
              <font-awesome-icon v-show="playing" @click="pause" icon="pause" class="play-btn bigger"/>
              <font-awesome-icon @click="forward" icon="forward" class="forward-btn ml-3"/>
            </div>
            <div class="video-timer">{{ currentTime | moment('mm:ss') }}</div>
            <div class="vi2-volume-controls right"></div>
          </div>
        </div>
      </div>
      <!-- left bar-->
      <div class="col-4 pt-1 left-bar">
        <div hidden class="row video-bar topics ml-1 mt-2">
          <h4>Themenauswahl</h4>
          <div class="row">
            <button class="btn btn-sm btn-outline-warning">Alltag</button>
            <button class="btn btn-sm btn-outline-primary">Kultur</button>
            <button class="btn btn-sm btn-outline-success">Arbeit</button>
          </div>
        </div>
        <div class="row video-bar topics ml-1 mt-2">
          <h4>Propagandatechnik</h4>
          <div class="row">
            <select v-model="selectedPropagandaTechnique" class="ml-2">
              <option disabled value="">Bitte wählen Sie eine Technik aus</option>
              <option>Ästhetisierung</option>
              <option>Dekontextualisierung</option>
              <option>Kognitive Dissonanz</option>
              <option>Normaler Mensch</option>
              <option>Berufung auf berühmte Menschen</option>
              <option>Übertreibung</option>
              <option>Euphorie</option>
              <option>Wiederholung</option>
              <option>Berufung auf Autoritäten</option>
              <option>Halbwahrheit</option>
              <option>Rosinenpicken</option>
            </select>
          </div>
        </div>
        <annotations
          ref = "annotationscomp"
          :selectedPropagandaTechnique = "selectedPropagandaTechnique"
          :currentTime = "currentTime"
          @gotoTimerequest = "gotoTime">
        </annotations>
        <div hidden class="row video-bar scenes ml-1 mt-2">
          <h4>Szenen</h4>
          <ul class="scene-list">
            <li v-for="scene in search()">
              <a :class="'scene ' + scene.category.toLowerCase()">{{scene.title}}</a>
              <i v-if="scene.description !== ''" class="fa fa-info"></i>
            </li>
          </ul>
        </div>
        <div hidden class="row video-bar audio ml-1 mt-2">
          <h4>Tonspur</h4>
        </div>
        <div hidden class="row video-bar places ml-1 mt-2">
          <h4>Orte</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.bigger {
  font-size: 1.4em;
}
#video .row,
#video .row col-3 {
  margin-left: 0;
  margin-right: 0;
  max-height: clac(100vh - 32px);
  overflow-y: hidden;
  overflow: hidden;
}

/*body{
  overflow-y: hidden;
  overflow: hidden;
}*/
#video > .row > .col-8,
#video > .row > .col-4,
#video > .row .col-12 {
  margin: 0px;
  padding: 0px;
}

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

a.kultur {
  color: #2ca500;
}

a.kultur:hover {
  background-color: #2ca500;
  border-radius: 10px;
  color: #fff;
}

a.alltag {
  color: #ffd800;
}

a.alltag:hover {
  background-color: #ffd800;
  border-radius: 10px;
  color: #111;
}

a.arbeit {
  color: #0081c6;
}

a.arbeit:hover {
  background-color: #0081c6;
  border-radius: 10px;
  color: #fff;
}

.left-bar{
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}

/* Video */

video {
  width: 100%;
}

.video-panel {
  position: relative;
}

.video-panel .video-controls {
  display: none;
  height: 70px;
  opacity: 0.5;
  background-color: #3b3b3bec;
}

.video-panel video {
  z-index: 1;
}

.video-panel:hover .video-controls {
  display: block;
  position: absolute;
  bottom: 12px;
  z-index: 90;
}

.control-bar {
  padding-top:20px;
  color: #fff;
}

.video-play-pause > *{
 cursor: pointer;
}

.timelines {
  position:relative;
}

.timeline-main{
  position: absolute;
  top: 10px;
  left:0;
  height:10px;
  background-color: #fff;
  width:100%;
  opacity:0.3;
  z-index:1000;
  cursor: pointer;
}

.timeline-progress{
  height:10px;
  position: absolute;
  top: 10px;
  left:0;
  background-color: #c10000;
  z-index:990;
  cursor: pointer;
}

.timeline-marker {
  height:10px;
  width:10px;
  position: absolute;
  top: 4px;
  background-color: #c10000;
}

.timeline-marker:hover{
  height:14px;
  width:14px;
  top: 0px;
}

.video-timer{
  position: absolute;
  top: 30px;
  left: 10px;
  font-size: 0.9em;
}

/** Annotations */

.annotations {
  padding: 0 0px;
  color:#fff;
}

.annotations input{
  width:100%;
}
.annotations textarea{
  width:100%;
}

.annotations .annotation-list, .annotations .annotation-form {
  display:block;
  padding-left:10px !important;
}

.annotation-list ul{
  padding-left:0;
}

.annotation-list ul li {
  cursor: pointer;
  border-bottom: 1px solid #555;
  padding-left:6px;
}

.annotation-list ul li:hover{
  background-color: #555;
}

.annotation-list ul li .link{
  color: #fff;
  font-weight:bold;
}

.annotation-list .description {
  display:block;
  margin-left:50px;
  font-size: 0.9em;
  color:#999;

}

.left {
float:left;
}
.right {
float:right;
}
</style>
