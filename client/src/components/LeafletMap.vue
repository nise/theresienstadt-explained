<template>
  <div class="mx-1" id="leaflet-map"></div>
</template>

<script>
/**
 * To be used with VideoMapMarker.vue
 * Description: see VideoMapMarker.vue
 */
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "LeafletMap",
  methods: {
    data() {
      return {
        leafletmap: null,
      };
    },
    gotoTime(time) {
      this.$emit("gotoTimerequest", time);
    },
    setView(latitude, longitude, zoomLevel = 15) {
      this.leafletmap.setView([latitude, longitude], zoomLevel);
    },
    createMarker(latitude, longitude, colour, Identifier, time) {
      // Reference: https://stackoverflow.com/questions/23567203/leaflet-changing-marker-color
      // ${...} not part of jQuery but ES6, see https://exploringjs.com/es6/ch_template-literals.html
      let _this = this;
      let custommarker = `
        background-color: ${colour};  
        width: 1.5rem;
        height: 1.5rem;
        display: block;
        left: -1.5rem;
        top: -1.5rem;
        position: relative;
        border-radius: 3rem 3rem 0;
        transform: rotate(45deg);
        border: 1px solid #FFFFFF`;

      let cIcon = leaflet.divIcon({
        className: "customMarker",
        iconAnchor: [0, 24],
        labelAnchor: [-6, 0],
        popupAnchor: [0, -36],
        html: `<span style="${custommarker}" />`,
      });
      // cIcon.addEventListener("click", function(){
      //   console.log("ah");
      // });
      let marker = leaflet
        .marker([latitude, longitude], { icon: cIcon })
        .addTo(this.leafletmap);

      marker._icon.id = Identifier;
      marker.addEventListener("click", function(){
        _this.gotoTime(time);
      })

      

      return marker;
    },
    changeMarkerColour(markerObj, colour) {
      markerObj._icon.firstChild.style.backgroundColor = colour;
    },
  },

  mounted: function () {
    this.leafletmap = leaflet.map("leaflet-map");
    leaflet
      .tileLayer(
        "https://api.mapbox.com/styles/v1/followerofnux/ckkfkh0wz038c17pc28efm6l7/tiles/256/{z}/{x}/{y}@2x?access_token=MAPBOX_TOKEN_REMOVED",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: ["a", "b", "c", "d"],
        }
      )
      .addTo(this.leafletmap);

    this.leafletmap.setView([50.51, 14.15], 15);

    this.leafletmap.removeControl(this.leafletmap.zoomControl);
    this.leafletmap.boxZoom.disable();
    this.leafletmap.doubleClickZoom.disable();
    this.leafletmap.dragging.disable();
    this.leafletmap.keyboard.disable();
    this.leafletmap.scrollWheelZoom.disable();
    this.leafletmap.touchZoom.disable();

  },
};
</script>

<style>
#leaflet-map {
  width: 98%;
  height: 256px;
  bottom: 0px;
}
</style>