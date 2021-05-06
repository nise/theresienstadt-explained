<template>
  <track
    src="../assets/videos/transkript/theresienstadtmp4.de.vtt"
    default
    id="Vidtranskript"
    @load="initFirstCue"
  />
</template>

<style>
video::cue {
  color: white;
  font-size: 2rem;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>

<script>
//// vtt (and other file types) handling: https://forum.vuejs.org/t/vtt-handling/65657/2

export default {
  name: "Video-Transcript",
  props: {
    videoCtrlActive: Boolean,
  },
  methods: {
    initFirstCue() {
      let cueList = document.getElementById("Vidtranskript").track.cues;
      for (let i = 0; i < cueList.length; i++) {
        cueList[i].snapToLines = false;
        cueList[i].line = 85;
      }
    },
  },
  watch: {
    videoCtrlActive: function () {
      let track = document.getElementById("Vidtranskript").track;
      //let activeCueList = track.activeCues;
      let activeCueList = document.getElementById("Vidtranskript").track.activeCues;
      let cueList = track.cues;

      if (cueList.length > 0) {
        if (this.videoCtrlActive) {
          for (let i = 0; i < activeCueList.length; i++) {
            activeCueList[i].snapToLines = false;
            activeCueList[i].line = 85;
          }
          for (let i = 0; i < cueList.length; i++) {
            cueList[i].snapToLines = false;
            cueList[i].line = 85;
          }
        } else {
          for (let i = 0; i < activeCueList.length; i++) {
            activeCueList[i].snapToLines = false;
            activeCueList[i].line = 100;
          }
          for (let i = 0; i < cueList.length; i++) {
            cueList[i].snapToLines = false;
            cueList[i].line = 100;
          }
        }
      }
    },
  },
  mounted: function () {},
};
</script>