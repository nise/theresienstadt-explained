<template>
  <div class="mx-1" id="leaflet-map">
  </div>
</template>

<script>
import leafleft from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
name: 'LeafletMap',

mounted: function() {
      this.leafletmap = leafleft.map('leaflet-map');
    /* this.leafletmap = leafleft.map('leaflet-map', {
      center: [50.513, 14.16],
      zoom: 13,
      preferCanvas: true,
      dragging: false
    }); */
    leafleft.tileLayer( 'https://api.mapbox.com/styles/v1/followerofnux/ckkfkh0wz038c17pc28efm6l7/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZm9sbG93ZXJvZm51eCIsImEiOiJja2tmaGV6YTkwYnB1MnZud2V6bDVlaWc1In0.gFN0_B9BR5KjzltaD9Sbuw', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: ['a','b','c','d'],
    //z: 10,
    //x: this.lat2tile(50.513, 10),
    //y: this.lon2tile(14.16,10)

    }).addTo( this.leafletmap );
    this.leafletmap.setView([50.510, 14.15],15);
    this.leafletmap.eachLayer(function(layer){
    console.log(layer);
});
}
}
</script>

<style>
#leaflet-map {
  width: 98%;
  height: 256px;
  bottom: 0px;
}
</style>