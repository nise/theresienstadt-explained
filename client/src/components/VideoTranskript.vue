<template>
  <track src="../assets/videos/transkript/theresienstadtmp4.de.vtt" default />
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
    name: "Video-Transkript",
    methods:
    {
      test(){
      var test = document.getElementById("tracktrack").getAttribute("track");
        console.log(test)
      },
      fart()
      {
        console.log("ha");
      }
    },
    mounted: function(){
      var el = document.getElementById("tracktrack");
      console.log(el.src);
        el.oncuechange = (event) => {
  let cues = event.target.track.activeCues;
  console.log(cues);
}
        
    }
}
</script>