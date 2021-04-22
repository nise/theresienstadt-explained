<script>

export default {
  name: "VideoInfoMarker",
  props: {
    currentTime: Number,
    videoID: String,
    paused: Boolean,
    clickedTimeline: Boolean,
  },

  methods:{

    closeTextBox(event){
      this.$emit("playrequest");
      event.target.parentElement.style.display = "none";
    },

    displayTextBox(id){
      let cuelist = document.getElementById("infomarkertrack").track.activeCues;
      for (let i = 0; i < cuelist.length; i++){
        document.getElementById(cuelist[i].id+"textbox").style.display = "none";
      }
      document.getElementById(id).style.display = "block";
      this.$emit("pauserequest");
    },

    setup(event){
      let _this = this;
      var player = document.getElementById(this.videoID);
      var videoPanel = document.querySelector(".video-panel");
      var ttrack = event.target.track;
      ttrack.mode = "hidden";

      for (let i=0; i < ttrack.cues.length; i++){
        var newmark = document.createElement("div");
        newmark.id = ttrack.cues[i].id;
        newmark.style.display = "none";
        newmark.innerHTML = "i";
        newmark.style.fontSize = "1.5em";
        newmark.style.color = "white";
        newmark.style.left = ttrack.cues[i].position+"%";
        newmark.style.top = ttrack.cues[i].line+"%";
        newmark.style.width = "40px";
        newmark.style.height = "40px";
        newmark.style.paddingTop = "2px";
        newmark.style.paddingBottom = "1px";
        newmark.style.backgroundColor = "red";
        newmark.style.position = "absolute";
        newmark.style.zIndex = 101;
        newmark.style.borderRadius = "50%";
        newmark.style.cursor = "pointer";
        newmark.onclick = function(){
          _this.displayTextBox(ttrack.cues[i].id+"textbox")
        }
        videoPanel.appendChild(newmark);

        var newtextbox = document.createElement("div");
        newtextbox.id =  ttrack.cues[i].id+"textbox";
        newtextbox.style.display = "none";
        newtextbox.style.opacity = "0.6";
        newtextbox.style.width = "72%";
        newtextbox.style.height = "150px";
        newtextbox.style.left = "50%";
        newtextbox.style.position = "absolute";
        newtextbox.style.zIndex = 100;
        newtextbox.style.transform = "translate(-50%)";
        if (ttrack.cues[i].line > 50){
          newtextbox.style.top = "50px";
        } else {
          newtextbox.style.bottom = "100px";
        }

        newtextbox.style.backgroundColor = "black";
        newtextbox.style.color = "white";
        newtextbox.innerHTML = ttrack.cues[i].text;
        newtextbox.style.textJustify = "auto";
        newtextbox.style.overflowWrap = "break-word";

        var textboxbutton = document.createElement("button");
        textboxbutton.style.width = "28px";
        textboxbutton.style.height = "28px";
        textboxbutton.style.borderRadius = "50%";
        textboxbutton.style.left = "-0.5%"
        textboxbutton.style.top = "-0.5%";
        textboxbutton.style.transform = "translate(-50%,-50%)";
        textboxbutton.style.backgroundColor = "white";
        textboxbutton.style.position =  "absolute";
        textboxbutton.style.color = "black";
        textboxbutton.innerHTML = "&times";
        textboxbutton.onclick = this.closeTextBox;

        newtextbox.appendChild(textboxbutton);

        videoPanel.appendChild(newtextbox);

      }
      //TODO: redo first for loop
      ttrack.addEventListener("cuechange", function(){
        for (let i = 0; i < this.cues.length; i++){
          document.getElementById(this.cues[i].id).style.display = "none";    // sets red info marker (see var newmark in setup())
        }
        for (let i = 0; i < this.activeCues.length; i++){
          document.getElementById(this.activeCues[i].id).style.display = "block";
        }
      })

    },
  },
  watch: {
    clickedTimeline: function(){
      if (this.clickedTimeline == true){
        this.$emit("ackclickTimeline");
        let cuelist;
        if (cuelist = document.getElementById("infomarkertrack").track.activeCues) {
          for (let i = 0; i < cuelist.length; i++){
            document.getElementById(cuelist[i].id+"textbox").style.display = "none";
          }
        }
      }
    },
    paused: function(){
      if (this.paused == false){
        let cuelist;
        if (cuelist = document.getElementById("infomarkertrack").track.activeCues) {
          for (let i = 0; i < cuelist.length; i++){
            document.getElementById(cuelist[i].id+"textbox").style.display = "none";
          }
        }
      }
    },
  },
  mounted: function(){
    this.track = document.getElementById("infomarkertrack").track;    // important for beforeDestroy: el "track" no longer available in DOM when beforeDestroy is called
  },

  beforeDestroy: function(){
    let cuelist = this.track.cues;
        if (cuelist) {
          for (let i = 0; i < cuelist.length; i++){
            document.getElementById(cuelist[i].id+"textbox").style.display = "none";
            document.getElementById(cuelist[i].id).style.display = "none";

          }
        }

  },
  
  data(){
    return {
      track: null,
    }
  }
}
</script>
  
<template>
  <track src="../assets/videos/infomarker/infomarker.de.vtt" id="infomarkertrack" @load="setup($event)"/>
</template>

<style>
video::cue {
  color: white;
  font-size: 2rem;
  background-color: rgba(0, 0, 0, 0.6);
}

/** REFERENCE. NOT USED */
.redInfoIconStyle{
  display: none;
  font-size: 1.5em;
  color: #fff;
  background-color: #f00;
  width: 40px;
  height: 40px;
  padding-top: 2px;
  padding-right: 1px;
  /*padding: 0px 0px 0px 0px;*/
  border-radius: 50%;
  position: absolute;
  z-index: 100;
  cursor: pointer;
  transform: translate(-50%, -50%);
}
.infoTextBoxStyle{
  text-justify: auto;
  overflow-wrap: break-word;
  color: #fff;
  background: #000 0% 0% no-repeat;
  width: 72%;         /* Thats about the ratio (width to viewport size) of the design specs */
  height: 150px;
  position:absolute;
  left: 50%;
  transform: translate(-50%);
  z-index: 101;
  opacity: 0.6;
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.infoTextBoxExitbuttonStyle{
  color: #000;
  background-color: #fff;
  width: 28px;
  height: 28px;
  padding: 0px 0px 0px 0px;
  border-radius: 50%;
  position: absolute;
  left: -0.5%;
  top: -0.5%;
  transform: translate(-50%, -50%);
}
</style>