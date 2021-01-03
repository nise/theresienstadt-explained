<template>
  <track src="../assets/videos/transkript/theresienstadtmp4.de.vtt" default id ="Vidtranskript"/>
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
};
</script>