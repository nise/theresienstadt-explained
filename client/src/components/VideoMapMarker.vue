<template>
  <track
    src="../assets/videos/mapMarker/mapMarker.vtt"
    id="mapmarkertrack"
    @load="setup($event)"
    @error="setup($event)"
  />
</template>

<script>

export default {
  name: "VideoMapMarker",


  methods: {
    setup(event) {
      var ttrack = event.target.track;
      ttrack.mode = "hidden";
      let test = event.target.track.cues[0].text;
      let t1 = JSON.parse(test);
      console.log(t1.lat);

      for (let i = 0; i < ttrack.cues.length; i++){
        this.$emit("requestMM", JSON.parse(ttrack.cues[i].text));
      }

      ttrack.addEventListener("cuechange", function(){
        
      })
    },
  },
  mounted: function () {},
};
</script>

<style>
</style>