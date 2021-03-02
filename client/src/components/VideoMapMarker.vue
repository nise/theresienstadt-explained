<template>
<div>
    <track
      src="../assets/videos/mapMarker/mapMarker.vtt"
      id="mapmarkertrack"
      @load="setup($event)"
      @error="setup($event)"
    />
    <portal target="leafletmap">
      <LeafletMap> </LeafletMap>
    </portal>
</div>
</template>

<script>

import leafletmap from "./LeafletMap";

export default {
  name: "VideoMapMarker",
  components: {
    LeafletMap: leafletmap,
  },

  methods: {
    setup(event) {
      //var ttrack = event.target.track;
      //ttrack.mode = "hidden";
      console.log(event.target.track);
    },
  },
  mounted: function () {},
};
</script>

<style>
</style>