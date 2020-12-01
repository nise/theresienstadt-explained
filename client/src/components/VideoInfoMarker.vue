<script>
export default {
  name: "VideoInfoMarker",
  props: {
    currentTime: Number,
    videoID: String,
  },
  methods: {
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
      let videoparent = document.getElementById(this.videoID);
      let newmarker = document.createElement("div");
      document.querySelector(".video-panel").appendChild(newmarker);
      newmarker.id = marker.title;
      newmarker.style.width = '50px';
      newmarker.style.height = '50px';
      /* newmarker.style.left = (videoparent.offsetLeft + 50) + 'px';
      newmarker.style.top = (videoparent.offsetTop + 100) + 'px'; */
      newmarker.style.left = marker.posX;
      newmarker.style.top = marker.posY;
      newmarker.style.border = '2px solid #a64ceb';
      newmarker.style.position = "absolute";
      newmarker.style.zIndex = 100;
    },
    deleteMarker(marker){
      console.log("off " + marker.title);
      let todelete = document.getElementById(marker.title);
      document.querySelector(".video-panel").removeChild(todelete);
    }
  },
  mounted: function(){
    this.markers = this.markerStore.slice(0);
    this.sortbystart(this.markers);
    console.log(this.markers);
  },
  watch: {
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
      } else {
        this.markers = this.markerStore.slice(0);
      }
      this.lastInterval = this.currentTime;

    }
  },
  data(){
    return {
      lastInterval: 0,
      activeMarkers: [],
      markers: [],
      markerStore: [
        {
          title: 'Test1',
          content: 'Testest',
          type: 'InfoBox',
          start: 1,
          end: 5,
          posX: '30%',
          posY: '50%',
        },
        {
          title: 'Test2',
          content: 'Testest',
          type: 'InfoBox',
          start: 3,
          end: 8,
          posX: '40%',
          posY: '60%',
        },
        {
          title: 'Test3',
          content: 'Testest',
          type: 'InfoBox',
          start: 5,
          end: 10,
          posX: '50%',
          posY: '70%',
        },
      ],
    }
  }
}
</script>

<template>
  
</template>

<style>

</style>