<template>
  <track
    src="../assets/videos/mapMarker/mapMarker.vtt"
    id="mapmarkertrack"
    @load="setup($event)"
  />
</template>

<script>
/** To be used with LeafletMap.vue
 * 
 * This Module draws data from the .vtt and controls behaviour of LeafletMap.vue,
 * namely through emitting events "requestM(ap)M(arker)" and "requestM(ap)M(arker)ColourChange"
 * to parent module Video.vue. 
 * Video.vue then calls functions from LeafletMap.vue to respectively create a marker on the leaflet map
 * or change the colour of an existing marker 
 *
 */

export default {
  name: "VideoMapMarker",
  data() {
    return {
      activeCueArr: Array,
    };
  },

  methods: {
    setup(event) {
      this.activeCueArr = new Array();
      let _this = this;
      var ttrack = event.target.track;
      ttrack.mode = "hidden";

      for (let i = 0; i < ttrack.cues.length; i++) {
        let cuetextObj = JSON.parse(ttrack.cues[i].text);
        cuetextObj.id = i;
        ttrack.cues[i].text = JSON.stringify(cuetextObj);
      }

      for (let i = 0; i < ttrack.cues.length; i++){
        this.$emit("requestMM", JSON.parse(ttrack.cues[i].text));
      }

      ttrack.addEventListener("cuechange", function () {
        let t = _this.trackingActiveCues(_this.activeCueArr, ttrack.activeCues);
        _this.$emit("requestMMColourChange", t);
      });
    },
    /** Tracks if event "cuechange" is caused by a cue becoming active or inactive */
    trackingActiveCues(activeCueArr, activeCueTextTrack) {
      let returnval = new Object();
      returnval.exit = new Array();
      returnval.enter = new Array();

      for (let i = 0; i < activeCueArr.length; i++) {
        if (Object.values(activeCueTextTrack).indexOf(activeCueArr[i]) == -1) {
          returnval.exit.push(activeCueArr[i]);
          activeCueArr.splice(i, 1);
        }
      }

      for (let i = 0; i < activeCueTextTrack.length; i++) {
        if (activeCueArr.indexOf(activeCueTextTrack[i]) == -1) {
          returnval.enter.push(activeCueTextTrack[i]);
          activeCueArr.push(activeCueTextTrack[i]);
        }
      }
      return returnval;
    },
  },
  mounted: function () {
    
  },
};
</script>

<style>
</style>