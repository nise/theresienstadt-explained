<template>
  <track
    src="../assets/videos/transkript/theresienstadtmp4.de.vtt"
    default
    id="Vidtranskript"
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
      let firstCue = document.getElementById("Vidtranskript").track.cues[0];
      firstCue.snapToLines = false;
      firstCue.line = 85;
    },
  },
  watch: {
    videoCtrlActive: function () {
      let activeCueList =
        document.getElementById("Vidtranskript").track.activeCues;
      let track = document.getElementById("Vidtranskript").track;

      if (this.videoCtrlActive) {
        for (let i = 0; i < activeCueList.length; i++) {
          activeCueList[i].snapToLines = false;
          activeCueList[i].line = 85;
        }
        track.oncuechange = function () {
          for (let i = 0; i < this.activeCues.length; i++) {
            this.activeCues[i].snapToLines = false;
            this.activeCues[i].line = 85;
          }
        };
      } else {
        for (let i = 0; i < activeCueList.length; i++) {
          activeCueList[i].snapToLines = false;
          activeCueList[i].line = "auto";
        }
        track.oncuechange = function () {
          for (let i = 0; i < this.activeCues.length; i++) {
            this.activeCues[i].snapToLines = false;
            this.activeCues[i].line = "auto";
          }
        };
      }
    },
  },
};
</script>
