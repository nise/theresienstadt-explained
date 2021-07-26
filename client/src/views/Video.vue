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

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { faForward } from "@fortawesome/free-solid-svg-icons";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPlay, faPause, faForward, faBackward);
Vue.component("font-awesome-icon", FontAwesomeIcon);

import moment from "moment";
import VueMoment from "vue-moment";
Vue.use(VueMoment, { moment });

import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

import videoTranskript from "../components/VideoTranskript";
import videoTOC from "../components/VideoTOC";
import videoAnnotations from "../components/VideoAnnotations";
import videoInfoMarker from "../components/VideoInfoMarker";
import videoMapMarker from "../components/VideoMapMarker";
import leafletmap from "../components/LeafletMap";

// Choose Locale
//moment.locale('de');

export default {
  props: ["modus", "timejumpOrTopic"],
  components: {
    "Video-Transcript": videoTranskript,
    "Video-TOC": videoTOC,
    "Video-Annotations": videoAnnotations,
    "Video-InfoMarker": videoInfoMarker,
    "Video-MapMarker": videoMapMarker,
    "Leaflet-Map": leafletmap,
  },
  data() {
    return {
      session: 0,
      featureSets: {
        basic: [],
        player: ["toc", "transcript"],
        analysis: ["annotations"],
      },
      topics: ["everydaylife", "work", "culture"],
      videoElement: null,
      videoPlayerID: "videoplayer",
      paused: true,
      currentTime: 0,
      formatedTime: "00:00",
      timer: null,
      clickTimelineNotify: false,
      showTranskript: true,
      timerCursor: null,
      videoPanel: null,
      showVideoControls: true,
      /**VideoMapMarker and Leafletmap */
      mapMarkerStore: Array,
    };
  },
  methods: {
    initVars() {
      this.mapMarkerStore = new Array();
    },
    log(data) {
      data.session = this.session;
      axios
        .post("/log", { data: data })
        //.then(function (response) { })
        .catch(function (error) {
          console.log(error);
        });
    },
    videolog(data) {
      return; // xxx: for testing disabled
      data.session = this.session;
      axios
        .post("/logplayback", { data: data })
        //.then(function (response) {})
        .catch(function (error) {
          console.log(error);
        });
    },
    afterVideoLoad() {
      this.processURLProps();
    },

    // only processes URL prop 'timejumpOrTopic'
    processURLProps() {
      let index;
      if (this.timejumpOrTopic) {
        index = this.topics.indexOf(this.timejumpOrTopic)
        if (index !== -1) {
          this.setTopic(index);
        } else {
          this.decodeTimejump(this.timejumpOrTopic);
        }
      }
    },
    /** decodes URL prop to find out which videotime to jump to */
    decodeTimejump(propTimeJump) {
      let testNonDigit = RegExp(/\D/g);
      let testMinutesAndSeconds = RegExp(/(\d*:\d*)/g);

      let mins;
      let secs;
      let desiredTime;

      if (!testNonDigit.test(propTimeJump)) {
        // desired time is in [s]
        desiredTime = parseInt(propTimeJump);
        this.gotoTime(desiredTime);
        return;
      }
      if (testMinutesAndSeconds.test(propTimeJump)) {
        // desired time is in [m:s]
        mins = propTimeJump.match(/(\d+):/g);
        secs = propTimeJump.match(/:(\d+)/g);
        if (mins) {
          mins = mins[0].replace(":", "");
        } else mins = 0;
        if (secs) {
          secs = secs[0].replace(":", "");
        } else secs = 0;

        desiredTime = parseInt(mins) * 60 + parseInt(secs);
        this.gotoTime(desiredTime);
      }
    },
    /**@argument desiredTopic is simply an index of an array, dictated by array "topics" */
    setTopic(desiredTopic) {
      this.$refs["vid-toc-ref"].setFilterExt(desiredTopic);
    },
    isModusFeatures(feature) {
      return this.featureSets[this.modus].indexOf(feature) !== -1;
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
      this.paused = false;
      this.updateCountdown();
      this.videoElement.play();
    },
    /**
     * "this.paused" is updated by event handler of <video> calling "updatePaused" when <video> enters paused state
     * however this change on "paused" comes in too late when stopCountdown() is called, so its already changed here
     */
    pause() {
      this.videoElement.pause();
      this.paused = true;
      clearInterval(this.timer);
      this.stopCountdown();
      this.showVideoControls = true;
    },
    forward() {},
    backward() {},
    updateAnnotaions() {
      this.currentTime = this.videoElement.currentTime;
    },
    momenwwwt: function () {
      return moment();
    },
    getXPosition(time) {
      if (!this.videoElement) {
        return 0;
      }
      return (time / this.videoElement.duration) * 100;
    },
    getProgressWidth() {
      if (!this.videoElement) {
        return 0;
      }
      return (this.videoElement.currentTime / this.videoElement.duration) * 100;
    },
    clickTimeline(e) {
      if (!this.videoElement) {
        return 0;
      }
      this.clickTimelineNotify = true;
      let rect = e.target.getBoundingClientRect();
      this.videoElement.currentTime =
        ((e.clientX - rect.left) / (rect.right - rect.left)) *
        this.videoElement.duration;
      this.currentTime = this.videoElement.currentTime;
      //console.log(e.clientX - rect.left, e.clientX, rect.left, rect.right);
    },
    gotoTime(time) {
      if (!this.videoElement) {
        return 0;
      }
      this.videoElement.currentTime = time;
      this.currentTime = time;
    },
    hideAnnotations() {
      this.showAnnotationForm = false;
    },
    toggleForm() {
      this.showAnnotationForm = true;
    },
    videoControlAddCommand() {
      let _this = this;
      window.addEventListener("keypress", function () {
        _this.togglePlayPause(event);
      });
      window.addEventListener("keydown", function () {
        _this.skip5s(event);
      });
    },
    togglePlayPause(event) {
      switch (event.code) {
        case "Space":
          if (this.playing) {
            this.pause();
            this.showVideoControls = true;
          } else {
            this.play();
            this.updateCountdown();
          }
          break;
        default:
      }
    },
    skip5s(event) {
      switch (event.keyCode) {
        case 37:
          this.videoElement.currentTime -= 5;
          this.currentTime = this.videoElement.currentTime;
          this.updateCountdown();
          break;

        case 39:
          this.videoElement.currentTime += 5;
          this.currentTime = this.videoElement.currentTime;
          this.updateCountdown();
          break;
      }
    },
    toggleTranskript() {
      let videoTT = document.getElementById("videoplayer").textTracks;

      // if (this.showTranskript) {
      //   for (let i = 0; i < videoTT.length; i++) {
      //     videoTT[i].mode = "disabled";
      //   }
      // } else {
      //   for (let i = 0; i < videoTT.length; i++) {
      //     videoTT[i].mode = "showing";
      //     if (videoTT[i].id == "mapmarkertrack") videoTT[i].mode = "hidden";
      //     if (videoTT[i].id == "infomarkertrack") videoTT[i].mode = "hidden";
      //   }
      // }

      this.showTranskript = !this.showTranskript;
    },
    enableAllTextTracks() {
      let videoTT = document.getElementById("videoplayer").textTracks;
      for (let i = 0; i < videoTT.length; i++) {
        if (videoTT[i].mode == "disabled") videoTT[i].mode = "showing";
      }
    },
    updateCountdown() {
      // hides video control elements x seconds after user moved mouse
      if (!this.paused) {
        clearTimeout(this.timerCursor);
        this.videoPanel.style.cursor = "auto";
        let _this = this;
        this.showVideoControls = true;
        this.timerCursor = setTimeout(function () {
          _this.videoPanel.style.cursor = "none";
          _this.showVideoControls = false;
        }, 5000);
      }
    },
    stopCountdown() {
      this.videoPanel.style.cursor = "auto";
      clearTimeout(this.timerCursor);
      if (!this.paused) {
        this.showVideoControls = false;
      }
    },
    test(event) {
      console.log(event);
    },
    /** Creates and returns a marker on the leafletmap
     *  Caller: <Video-MapMarker>
     *  Target: <Leaflet-Map>
     */
    acquireMM(event) {
      this.mapMarkerStore.push(
        this.$refs["leafletref"].createMarker(
          event.lat,
          event.long,
          "black",
          event.id,
          event.time,
          event.descr
        )
      );
    },
    /** Changes colour of a marker on the leafletmap
     *  Caller: <Video-MapMarker>
     *  Target: <Leaflet-Map>
     */
    changeMMState(event) {
      if (event.enter.length > 0) {
        for (let i = 0; i < event.enter.length; i++) {
          this.$refs["leafletref"].changeMarkerState(
            this.mapMarkerStore[JSON.parse(event.enter[i].text).id],
            "white",
            true
          );
        }
      }
      if (event.exit.length > 0) {
        for (let i = 0; i < event.exit.length; i++) {
          this.$refs["leafletref"].changeMarkerState(
            this.mapMarkerStore[JSON.parse(event.exit[i].text).id],
            "black",
            false
          );
        }
      }
    },
  },
  computed: {
    visibleVidCtrl() {
      if (this.showVideoControls) return "display: block";
      else return "display: none";
    },
    playing() {
      return !this.paused;
    },
  },
  // eslint-disable-next-line object-shorthand
  mounted: function () {
    this.videoPanel = document.getElementsByClassName("video-panel")[0];
    this.session = Math.ceil(Math.random() * 100000);
    this.videoControlAddCommand();
    if (this.isModusFeatures("transcript")) {
      this.enableAllTextTracks();
    }
    this.initVars();
  },
  watch: {
    // eslint-disable-next-line object-shorthand
    currentTime: function (c) {
      this.videolog({
        session: this.session,
        playback: c,
        utc: new Date().getTime(),
      });
      if (this.isModusFeatures("annotations")) {
        for (
          var i = 0;
          i < this.$refs.annotationscomp.annotations.length;
          i++
        ) {
          if (
            c >= this.$refs.annotationscomp.annotations[i].start &&
            c < this.$refs.annotationscomp.annotations[i].end
          ) {
            this.$refs.annotationscomp.annotations[i].active
              ? this.showAnnotation(this.$refs.annotationscomp.annotations[i])
              : null;
          } else {
            this.hideAnnotations(this.$refs.annotationscomp.annotations[i]);
          }
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
  <div
    id="video"
    @mousemove="updateCountdown('video-panel')"
    @mouseleave="stopCountdown()"
  >
    <div class="row">
      <div class="col-8 video-panel">
        <video
          ref="video"
          :id="videoPlayerID"
          @canplay="updatePaused"
          @playing="updatePaused"
          @pause="updatePaused"
          @canplaythrough.once="afterVideoLoad()"
          class="col-12"
          disablepictureinpicture
          controlslist="nodownload"
        >
          <Video-MapMarker
            @requestMM="acquireMM"
            @requestMMColourChange="changeMMState"
          >
          </Video-MapMarker>

          <Video-InfoMarker
            v-if="isModusFeatures('transcript') && showTranskript"
            :currentTime="currentTime"
            :videoID="videoPlayerID"
            :paused="paused"
            :clickedTimeline="clickTimelineNotify"
            @ackclickTimeline="clickTimelineNotify = false"
            @pauserequest="pause"
            @playrequest="play"
          >
          </Video-InfoMarker>
          <source src="../assets/videos/theresienstadt.mp4" type="video/mp4" />
          <Video-Transcript
            v-if="isModusFeatures('transcript') && showTranskript"
            :videoCtrlActive="showVideoControls"
          >
          </Video-Transcript>
          <!--<source src="../assets/videos/theresienstadt.webm" type='video/webm; codecs="vp8, vorbis"' />-->
          Video tag not supported. Download the video
          <a href="../assets/videos/theresienstadt.mp4">here</a>.
        </video>
        <div class="video-controls col-12" :style="visibleVidCtrl">
          <div class="timelines">
            <!--<div class="vi2-video-seeklink vi2-btn"></div>-->
            <div class="timeline-top">
              <portal-target name="timeline-annotation-marker"> </portal-target>
            </div>
            <portal-target name="timeline-scene-marker"> </portal-target>

            <div @click="clickTimeline" class="timeline-main"></div>
            <div class="timeline-bottom"></div>
            <div
              :style="'width:' + getProgressWidth() + '%;'"
              class="timeline-progress"
            ></div>
          </div>
          <div class="control-bar">
            <div class="video-play-pause vi2-btn mt-2" title="Play/Pause">
              <font-awesome-icon
                @click="backward"
                icon="backward"
                class="backward-btn mr-3"
              />
              <font-awesome-icon
                v-show="paused"
                @click="play"
                icon="play"
                class="pause-btn bigger"
              />
              <font-awesome-icon
                v-show="playing"
                @click="pause"
                icon="pause"
                class="play-btn bigger"
              />
              <font-awesome-icon
                @click="forward"
                icon="forward"
                class="forward-btn ml-3"
              />
            </div>
            <div class="video-timer">{{ currentTime | moment("mm:ss") }}</div>
            <button
              v-if="isModusFeatures('transcript')"
              class="video-toggle-transkript"
              type="button"
              @mousedown="toggleTranskript"
              title="Untertitel an/aus"
            >
              <img
                class="subtitleIcon"
                src="../assets/icons/subtitleIcon.svg"
              />
              <div class="redbar" :class="{ active: showTranskript }"></div>
            </button>
            <div class="vi2-volume-controls right"></div>
          </div>
        </div>
      </div>
      <!-- right bar-->
      <div class="col-4 right-bar">
        <Video-TOC
          class="vid-toc"
          v-if="isModusFeatures('toc') && videoElement"
          ref="vid-toc-ref"
          :videoElementduration="videoElement.duration"
          @gotoTimerequest="gotoTime"
        ></Video-TOC>

        <Video-Annotations
          class="vid-anno"
          v-if="isModusFeatures('annotations') && videoElement"
          ref="annotationscomp"
          :selectedPropagandaTechnique="selectedPropagandaTechnique"
          :currentTime="currentTime"
          :videoElementduration="videoElement.duration"
          @gotoTimerequest="gotoTime"
        >
        </Video-Annotations>

        <div hidden class="row video-bar audio mt-2">
          <h4>{{ $t("video.audiotrack") }}</h4>
        </div>
        <div class="places mt-2">
          <h4 class="mt-2">{{ $t("video.places") }}</h4>
          <Leaflet-Map
            class="vid-map"
            ref="leafletref"
            @gotoTimerequest="gotoTime"
          >
          </Leaflet-Map>
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

.vid-toc {
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 500px;
  width: 98%;
  margin-left: 4px;
}
.vid-anno {
  height: 40vh;
}

.vida-map {
  flex-basis: 300px;
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

.places {
  justify-self: flex-end;
  flex: 0 0 300px;
  background-color: #3b3b3bec;
  width: 98%;
  margin-bottom: 12px;
  margin-left: 4px;
}

.right-bar {
  display: flex;
  flex-flow: column nowrap;
  max-height: 100%;
  width: 96%;
}

/* Video */

video {
  width: 100%;
}

.video-panel {
  position: relative;
}

.video-panel .video-controls {
  display: block;
  height: 70px;
  opacity: 0.5;
  bottom: 12px;
  z-index: 90;
  position: absolute;
  background-color: #3b3b3bec;
  position: absolute;
  bottom: 12px;
  z-index: 90;
}

.video-panel video {
  z-index: 1;
}
/*
.video-panel:hover .video-controls {
  display: block;
  position: absolute;
  bottom: 12px;
  z-index: 90;
}
*/
.control-bar {
  padding-top: 20px;
  color: #fff;
}

.video-play-pause > * {
  cursor: pointer;
}

.timelines {
  position: relative;
}

.timeline-main {
  position: absolute;
  top: 10px;
  left: 0;
  height: 10px;
  background-color: #fff;
  width: 100%;
  opacity: 0.3;
  z-index: 1000;
  cursor: pointer;
}

.timeline-progress {
  height: 10px;
  position: absolute;
  top: 10px;
  left: 0;
  background-color: #c10000;
  z-index: 990;
  cursor: pointer;
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

.video-timer {
  position: absolute;
  top: 30px;
  left: 10px;
  font-size: 0.9em;
}
.video-toggle-transkript .redbar {
  opacity: 0;
  height: 2px;
  width: 25px;
  border-radius: 2px;
  background-color: red;
  position: relative;
  top: 2px;
  transition: opacity 1s ease;
}
.video-toggle-transkript .redbar.active {
  opacity: 1;
  height: 2px;
  width: 25px;
  border-radius: 2px;
  background-color: red;
  position: relative;
  top: 2px;
  transition: opacity 1s ease;
}

.video-toggle-transkript {
  position: absolute;
  top: 30px;
  right: 5px;
  /*background-color: gray;
  opacity: 0.8;*/
  background-color: inherit;
  opacity: 1;
  border: none;
}

.video-toggle-transkript:focus {
  border: none;
  outline: none;
}

.video-toggle-transkript:hover {
  opacity: 0.7;
}

.subtitleIcon {
  width: 25px;
  height: 25px;
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
