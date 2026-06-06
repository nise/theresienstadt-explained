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
  name: "video-transcript",
  props: {
    videoCtrlActive: Boolean,
  },
  watch: {
    videoCtrlActive: {
      immediate: true,
      handler(active) {
        this.$nextTick(() => {
          const trackEl = document.getElementById("Vidtranskript");
          if (!trackEl) return;
          const track = trackEl.track;
          const line = active ? 75 : "auto";

          const applyLine = (cues) => {
            if (!cues) return;
            for (let i = 0; i < cues.length; i++) {
              cues[i].snapToLines = false;
              cues[i].line = line;
            }
          };

          applyLine(track.activeCues);

          track.oncuechange = function () {
            applyLine(this.activeCues);
          };
        });
      },
    },
  },
};
</script>
