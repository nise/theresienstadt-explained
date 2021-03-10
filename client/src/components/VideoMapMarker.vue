<template>
  <track
    src="../assets/videos/mapMarker/mapMarker.vtt"
    id="mapmarkertrack"
    @load="setup($event)"
  />
</template>

<script>

export default {
  name: "VideoMapMarker",
  data() {
    return {
      activeCueArr: Array,

    }
  },


  methods: {
    setup(event) {
      this.activeCueArr = new Array();
      let _this = this;
      var ttrack = event.target.track;
      ttrack.mode = "hidden";


      for (let i = 0; i < ttrack.cues.length; i++){
        let cuetextObj = JSON.parse(ttrack.cues[i].text);
        cuetextObj.id = i+1;
        ttrack.cues[i].text = JSON.stringify(cuetextObj);
      }


      for (let i = 0; i < ttrack.cues.length; i++){
        this.$emit("requestMM", JSON.parse(ttrack.cues[i].text));
      }

      ttrack.addEventListener("cuechange", function(){
        let t = _this.trackingActiveCues(_this.activeCueArr, ttrack.activeCues);
        _this.$emit("requestMMColourChange",t);
      })
    },
/** Tracks if event "cuechange" is caused by a cue becoming active or inactive */
    trackingActiveCues(activeCueArr, activeCueTextTrack){
      let returnval = new Object();
      returnval.exit = -1;
      returnval.enter = -1;
      
      for(let i = 0; i < activeCueArr.length; i++){
        if (Object.values(activeCueTextTrack).indexOf(activeCueArr[i]) == -1){
          returnval.exit = activeCueArr[i];
          activeCueArr.splice(i, 1);
        }
      }     
      
      for (let i = 0; i < activeCueTextTrack.length; i++){
        if (activeCueArr.indexOf(activeCueTextTrack[i]) == -1){
          returnval.enter = activeCueTextTrack[i];
          activeCueArr.push(activeCueTextTrack[i]);
        }
      }
      return returnval;
    }
  },
  mounted: function () {},
};
</script>

<style>
</style>