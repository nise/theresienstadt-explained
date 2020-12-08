<script>

import axios from 'axios';


export default {
  name: "VideoInfoMarker",
  props: {
    currentTime: Number,
    videoID: String,
    paused: Boolean,
    clickedTimeline: Boolean,
  },
  methods: {
    getdata: function(){
      let _this = this;
      axios.get('/markerdata').then(function (response) {
        _this.markerStore = response.data.slice(0);
        _this.markers = _this.markerStore.slice(0);
        _this.sortbystart(_this.markers);
        _this.textbox = _this.markers[0];
      });
    },
    closeTextBox(){
      this.$emit("playrequest");
      this.infoTextBoxVisible = false;
    },
    displayTextBox(event){
      this.$emit("pauserequest");
      if (this.infoTextBoxVisible == true){
        this.infoTextBoxVisible = false;
      }
      this.textbox = this.getpayload(event.target.id);
      this.infoTextBoxVisible = true;
    },

    getpayload(id){
      for (let i = 0; i < this.activeMarkers.length; i++){
        if (this.activeMarkers[i].title === id){
          return this.activeMarkers[i];
        }
      }
    },
    sortbystart(markers){
      markers.sort(function(a,b){
        if (a.start < b.start) return -1;
        if (a.start > b.start) return 1;
        return 0;
      });
    },
    displayMarker(marker){
      this.activeMarkers.push(marker);
      document.getElementById(marker.title).style.display = 'block';
    },
    hideMarker(marker){
      document.getElementById(marker.title).style.display = 'none';
    }
  },
  mounted: function(){
    this.getdata();

  },
  watch: {
    clickedTimeline: function(){
      if (this.clickedTimeline == true){
        this.$emit("ackclickTimeline");
        for (let i = 0; i < this.activeMarkers.length; i++){
          this.hideMarker(this.activeMarkers[i]);
        }
        this.activeMarkers.splice(0);
        this.markerstart = 0;
        this.closeTextBox();
      }
    },
    paused: function(){
      if (this.paused == false && this.infoTextBoxVisible){
        this.closeTextBox();
      }
    },
    currentTime: function(){
      
      if (this.markerstart + 5 > this.markers.length){
        this.markerend = this.markers.length
      } else {
        this.markerend = this.markerstart + 5;
      }


      for (let i = this.markerstart; i < this.markerend; i++){
        if (this.currentTime > this.markers[i].start && this.currentTime < this.markers[i].end){
          this.displayMarker(this.markers[i]);
          this.markerstart = i+1;
        }
      }

      for (let i = 0; i < this.activeMarkers.length; i++){
        if (this.currentTime > this.activeMarkers[i].end){
          this.hideMarker(this.activeMarkers[i]);
          this.activeMarkers.splice(i, 1);
        }
      }
      
      this.lastInterval = this.currentTime;
    }
  },
  data(){
    return {
      markerstart: 0,
      markerend: 0,
      infoTextBoxVisible: false,
      textbox: null,
      lastInterval: 0,
      activeInfoTextBox: [],
      activeMarkers: [],
      markers: [],
      markerStore: []
    }
  }
}
</script>
  
<template>
<div>
  <div v-if="markerStore.length > 0">   <!-- v-if to prevent error on missing key when arr is empty -->
    <div v-for="marker in markerStore" :key = "marker.title"
      @click="displayTextBox"
      :id = "marker.title"
      class = "redInfoIconStyle"
      :style="{left: marker.posX+'%', top: marker.posY+'%'}">
      &#x0069;
    </div>
  </div>

  <transition name="fade">
    <div v-if="infoTextBoxVisible"
      
      :id = "textbox.title + 'textbox'"
      class = "infoTextBoxStyle" 
      :style = "[(textbox.posY > 50) ? {top: '50px'} : {bottom: '100px'}]"
      >
      <span v-html="textbox.content"></span>
      <b-button class = "infoTextBoxExitbuttonStyle"
        @click="closeTextBox">
        &times;
      </b-button>
    </div>
  </transition>
</div>
</template>

<style>
.redInfoIconStyle{
  display: none;
  font-size: 1.5em;
  color: #fff;
  background-color: #f00;
  width: 40px;
  height: 40px;
  padding-top: 2px;
  padding-right: 1px;
  /*padding: 0px 0px 0px 0px;*/
  border-radius: 50%;
  position: absolute;
  z-index: 100;
  cursor: pointer;
  transform: translate(-50%, -50%);
}
.infoTextBoxStyle{
  text-justify: auto;
  overflow-wrap: break-word;
  color: #fff;
  background: #000 0% 0% no-repeat;
  width: 72%;         /* Thats about the ratio (width to viewport size) of the design specs */
  height: 150px;
  position:absolute;
  left: 50%;
  transform: translate(-50%);
  z-index: 101;
  opacity: 0.6;
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.infoTextBoxExitbuttonStyle{
  color: #000;
  background-color: #fff;
  width: 28px;
  height: 28px;
  padding: 0px 0px 0px 0px;
  border-radius: 50%;
  position: absolute;
  left: -0.5%;
  top: -0.5%;
  transform: translate(-50%, -50%);
}
</style>