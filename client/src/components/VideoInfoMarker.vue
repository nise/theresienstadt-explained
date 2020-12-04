<script>
export default {
  name: "VideoInfoMarker",
  props: {
    currentTime: Number,
    videoID: String,
    paused: Boolean,
  },
  methods: {
    closeTextBox(event){
      this.activeInfoTextBox.splice(0);
      this.$emit("playrequest");
      console.log(this.activeInfoTextBox);
    },
    displayTextBox(event){
      this.$emit("pauserequest");
      if (this.activeInfoTextBox.length > 0) this.activeInfoTextBox.splice(0);
      this.activeInfoTextBox.push(this.getpayload(event.target.id));
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
      console.log("on " + marker.title);
      this.activeMarkers.push(marker)
    },
    deleteMarker(marker){   //obsolete for now. deletion by splicing array
      console.log("off " + marker.title);
    }
  },
  mounted: function(){
    this.markers = this.markerStore.slice(0);
    this.sortbystart(this.markers);
    console.log(this.markers);
  },
  watch: {
    paused: function(){
      if (this.paused == false && this.activeInfoTextBox.length > 0){
        this.activeInfoTextBox.splice(0);
      }
    },
    currentTime: function(){
      if (Math.abs(this.currentTime - this.lastInterval) < 0.6)
      {
        this.markers.forEach((element, index) => {
          if (this.currentTime > element.start && this.currentTime < element.end){
            this.displayMarker(element);
            this.markers.splice(index, 1);
          }
        });

        if (this.activeMarkers.length > 0){
          this.activeMarkers.forEach((element, index) => {
            if (this.currentTime > element.end){
              this.deleteMarker(element);
              this.activeMarkers.splice(index, 1);
            }
          });
        }
      } else {    // if difference to last interval is higher than 0.6s, user clicked on timebar 
        this.activeMarkers.splice(0);
        this.activeInfoTextBox.splice(0);
        this.markers = this.markerStore;
      }
      this.lastInterval = this.currentTime;

    }
  },
  data(){
    return {
      lastInterval: 0,
      activeInfoTextBox: [],
      activeMarkers: [],
      markers: [],
      markerStore: [
        {
          title: 'Test1',
          content: '<b>Person</b> <p>TextTextText</p>',
          type: 'InfoBox',
          start: 1,
          end: 5,
          posX: '50%',
          posY: '50%',
          textBoxTop: '50px',
          textBoxBottom: '100px'

        },
        {
          title: 'Test2',
          content: 'Testest2',
          type: 'InfoBox',
          start: 3,
          end: 8,
          posX: '40%',
          posY: '40%',
          textBoxBottom: '100px'
        },
        {
          title: 'Test3',
          content: 'Testest3',
          type: 'InfoBox',
          start: 5,
          end: 10,
          posX: '60%',
          posY: '60%',
          textBoxBottom: '100px'
        },
      ],
    }
  }
}
</script>
  
<template>
<div>
  <div v-if="activeMarkers.length > 0">   <!-- v-if to prevent error on missing key when arr is empty -->
    <div v-for="marker in activeMarkers" :key = "marker.title"
      @click="displayTextBox"
      :id = "marker.title"
      class = "redInfoIconStyle"
      :style="{left: marker.posX, top: marker.posY}">
      i
    </div>
  </div>

  <div v-if="activeInfoTextBox.length > 0">   <!-- v-if to prevent error on missing key when arr is empty -->
    <div v-for="textbox in activeInfoTextBox" :key = "textbox.title"
      class = "infoTextBoxStyle" 
      :style = "[textbox.textBoxTop ? {top: textbox.textBoxTop} : {bottom: textbox.textBoxBottom}]"
      >
      <span v-html="textbox.content"></span>
      <b-button class = "infoTextBoxExitbuttonStyle"
        @click="closeTextBox">
        &times;
      </b-button>
    </div>
  </div>
</div>
</template>

<style>
.redInfoIconStyle{
  color: #fff;
  background-color: #f00;
  width: 40px;
  height: 40px;
  padding: 0px 0px 0px 0px;
  border-radius: 50%;
  position: absolute;
  z-index: 100;
  cursor: pointer;
  transform: translate(-50%, -50%);
}
.infoTextBoxStyle{
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