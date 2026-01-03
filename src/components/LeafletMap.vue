<template>
  <div id="leaflet-map"></div>
</template>

<script>
/**
 * To be used with VideoMapMarker.vue
 * Description: see VideoMapMarker.vue
 */
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "leaflet-map",
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
    createMarker(latitude, longitude, colour, Identifier, time, ttipText) {
      // Reference: https://stackoverflow.com/questions/23567203/leaflet-changing-marker-color
      // ${...} not part of jQuery but ES6, see https://exploringjs.com/es6/ch_template-literals.html
      let _this = this;

      let custommarker = `
        background-color: ${colour};  
        width: 1.5rem;
        height: 1.5rem;
        display: block;
        left: -0.8rem;
        top: -0.4rem;
        position: relative;
        border-radius: 3rem 3rem 0;
        transform: rotate(45deg);
        border: 1px solid #FFFFFF;
        z-index: 100;`;

      let cIcon = leaflet.divIcon({
        className: "customMarker",
        iconAnchor: [0, 24],
        labelAnchor: [-6, 0],
        popupAnchor: [0, -36],
        html: `<span id="${"MMIcon" + Identifier}" style="${custommarker}" />`,
      });

      let marker = leaflet
        .marker([latitude, longitude], { icon: cIcon })
        .addTo(this.leafletmap);

      marker._icon.id = "MM" + Identifier; // Identifier is the cuetext id of a .vtt (= 1, 2, 3, ...) => adding more info
      marker._icon.baseid = Identifier;

      marker.addEventListener("click", function () {
        _this.gotoTime(time);
      });
      marker.addEventListener("mouseover", () => {
        _this.showToolTip(Identifier);
      });
      marker.addEventListener("mouseout", () => {
        _this.hideToolTip(Identifier);
      });

      let ttip = this.createToolTip(ttipText, Identifier);
      let mmicon = document.getElementById("MMIcon" + Identifier);

      mmicon.appendChild(ttip);

      return marker;
    },
    changeMarkerState(markerObj, colour = "black", active) {
      markerObj._icon.firstChild.style.backgroundColor = colour;
      if (active) this.showToolTip(markerObj._icon.baseid);
      if (!active) this.hideToolTip(markerObj._icon.baseid);
    },

    showToolTip(idnum) {
      document.getElementById("MMTT" + idnum).style.visibility = "visible";
      let mmicon = document.getElementById("MMIcon" + idnum);
      mmicon.parentNode.style.zIndex = "999";
    },
    hideToolTip(idnum) {
      document.getElementById("MMTT" + idnum).style.visibility = "hidden";
      let mmicon = document.getElementById("MMIcon" + idnum);
      mmicon.parentNode.style.zIndex = "99";
    },

    createToolTip(text, id) {
      let ttip = document.createElement("div");
      ttip.id = "MMTT" + id; //MapMarkerToolTip
      ttip.style.visibility = "hidden";
      ttip.style.transformOrigin = "left";
      ttip.style.transform = "rotate(-45deg) translate(-50%,-50%)";
      ttip.style.backgroundColor = "black";
      ttip.style.colour = "white";
      ttip.style.width = "fit-content";
      ttip.style.width = "-moz-fit-content";
      ttip.style.position = "relative";
      ttip.style.top = "-10px";
      ttip.style.paddingLeft = "5px";
      ttip.style.paddingRight = "5px";
      ttip.style.borderRadius = "10px";
      ttip.style.zIndex = "-1";
      ttip.innerText = text;
      return ttip;
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
  width: 96%;
  height: 256px;
  bottom: 0px;
  color: gray;
  margin-left: 8px;
  margin-right: 8px;
}
.leaflet-control-attribution {
  color: gray;
}
.leaflet-control-attribution a {
  color: gray;
}
</style>
