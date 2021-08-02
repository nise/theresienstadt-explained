<script>
import axios from "axios";

export default {
  name: "VideoInfoMarker",
  props: {
    currentTime: Number,
    videoID: String,
    paused: Boolean,
    clickedTimeline: Boolean,
  },

  methods: {
    closeTextBox(event) {
      this.$emit("playrequest");
      event.target.parentElement.style.display = "none";
      //       event.target.parentElement.remove();  add this and redo watcher routines and add new textboxes to array for easier accesss
    },

    displayTextBox(id) {
      let cuelist = document.getElementById("infomarkertrack").track.activeCues;
      for (let i = 0; i < cuelist.length; i++) {
        let data = JSON.parse(cuelist[i].text);
        if (data.length) {
          for (let j = 0; j < data.length; j++) {
            document.getElementById(data[j].id + "textbox").style.display =
              "none";
          }
        } else {
          document.getElementById(data.id + "textbox").style.display = "none";
        }
      }
      document.getElementById(id).style.display = "block";
      this.$emit("pauserequest");
    },
    presetup(event){
      let dat = event.target.track;
      this.getPersonData().then((data) => {
        this.setup(dat);
      })
    },

    setup(track) {
      let _this = this;
      var player = document.getElementById(this.videoID);
      var videoPanel = document.querySelector(".video-panel");
      var ttrack = track;
      ttrack.mode = "hidden";

      for (let i = 0; i < ttrack.cues.length; i++) {
        var data = JSON.parse(ttrack.cues[i].text);

        if (data.length) {
          for (let j = 0; j < data.length; j++) {
            let newmark = this.createMarker(data[j]);
            videoPanel.appendChild(newmark);
            let newtextbox = this.createTextBox(data[j]);
            videoPanel.appendChild(newtextbox);
          }
        } else {
          let newmark = this.createMarker(data);
          videoPanel.appendChild(newmark);
          let newtextbox = this.createTextBox(data);
          videoPanel.appendChild(newtextbox);
        }
      }

      ttrack.addEventListener("cuechange", function () {
        let changingCue = _this.trackingActiveCues(
          _this.activeCueArr,
          this.activeCues
        );

        for (let i = 0; i < changingCue.exit.length; i++) {
          var data = JSON.parse(changingCue.exit[i].text);
          if (data.length) {
            for (let j = 0; j < data.length; j++) {
              document.getElementById(data[j].id).style.display = "none";
            }
          } else {
            document.getElementById(data.id).style.display = "none"; // sets red info marker (see var newmark in presetup())
          }
        }

        for (let i = 0; i < changingCue.enter.length; i++) {
          var data = JSON.parse(changingCue.enter[i].text);

          if (data.length) {
            for (let j = 0; j < data.length; j++) {
              document.getElementById(data[j].id).style.display = "block";
            }
          } else {
            document.getElementById(data.id).style.display = "block";
          }
        }
      });
    },
    createMarker(data) {
      let _this = this;
      var newmark = document.createElement("div");
      newmark.id = data.id;
      newmark.style.display = "none";
      newmark.innerHTML = "i";
      newmark.style.fontSize = "1.5em";
      newmark.style.color = "white";
      newmark.style.left = data.x + "%";
      newmark.style.top = data.y + "%";
      newmark.style.width = "40px";
      newmark.style.height = "40px";
      newmark.style.paddingTop = "2px";
      newmark.style.paddingBottom = "1px";
      newmark.style.backgroundColor = "red";
      newmark.style.position = "absolute";
      newmark.style.zIndex = 101;
      newmark.style.borderRadius = "50%";
      newmark.style.cursor = "pointer";
      newmark.onclick = function () {
        _this.displayTextBox(data.id + "textbox");
      };

      return newmark;
    },
    createTextBox(data) {
      let textboxContent;
      let personData = this.searchPerson(this.persons, data.name);
      if (personData == -1) textboxContent = "Kein Eintrag";            //TODO fill personData if -1
      else textboxContent = personData[0].profession;
      var newtextbox = document.createElement("div");
      newtextbox.id = data.id + "textbox";
      newtextbox.style.display = "none";
      newtextbox.style.opacity = "0.6";
      newtextbox.style.width = "72%";
      newtextbox.style.height = "150px";
      newtextbox.style.left = "50%";
      newtextbox.style.position = "absolute";
      newtextbox.style.zIndex = 100;
      newtextbox.style.transform = "translate(-50%)";
      if (data.y > 50) {
        newtextbox.style.top = "50px";
      } else {
        newtextbox.style.bottom = "100px";
      }

      newtextbox.style.backgroundColor = "black";
      newtextbox.style.color = "white";
      newtextbox.innerHTML = textboxContent;
      newtextbox.style.textJustify = "auto";
      newtextbox.style.overflowWrap = "break-word";

      var textboxbutton = document.createElement("button");
      textboxbutton.style.width = "28px";
      textboxbutton.style.height = "28px";
      textboxbutton.style.borderRadius = "50%";
      textboxbutton.style.left = "-0.5%";
      textboxbutton.style.top = "-0.5%";
      textboxbutton.style.transform = "translate(-50%,-50%)";
      textboxbutton.style.backgroundColor = "white";
      textboxbutton.style.position = "absolute";
      textboxbutton.style.color = "black";
      textboxbutton.innerHTML = "&times";
      textboxbutton.onclick = this.closeTextBox;

      newtextbox.appendChild(textboxbutton);

      return newtextbox;
    },
    /** Tracks if event "cuechange" is caused by a cue becoming active or inactive */
    trackingActiveCues(activeCueArr, activeCueTextTrack) {
      let returnval = new Object();
      returnval.exit = new Array();
      returnval.enter = new Array();

      for (let i = activeCueArr.length -1; i >= 0; i--) {
        if (Object.values(activeCueTextTrack).indexOf(activeCueArr[i]) == -1) {
          // has an active cue become inactive ?
          returnval.exit.push(activeCueArr[i]);
          activeCueArr.splice(i, 1);
        }
      }

      for (let i = 0; i < activeCueTextTrack.length; i++) {
        if (activeCueArr.indexOf(activeCueTextTrack[i]) == -1) {
          // has an inactive cue become active ?
          returnval.enter.push(activeCueTextTrack[i]);
          activeCueArr.push(activeCueTextTrack[i]);
        }
      }
      return returnval;
    },
    searchPerson: function (arr, needle) {
      /* 
      let result = arr.filter(
        (el) => JSON.stringify(el).toLowerCase().indexOf(needle.toLowerCase()) != -1
      );
      */
      let results = arr.filter(
        (el) =>
          (
            el.shortname.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          )
            .toLowerCase()
            .indexOf(needle.toLowerCase()) != -1
        // (el) =>
        //   (
        //     el.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "") +
        //     " " +
        //     el.surename.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        //   )
        //     .toLowerCase()
        //     .indexOf(needle.toLowerCase()) != -1
      );
      if (results.length == 0) return -1;
      return results;
    },
    getPersonData: function () {
      let _this = this;
      return new Promise((res, rej) => {
        axios.get("/persondata").then(function (response) {
          _this.persons = response.data;
          //console.log(response.data);
          res(response.data);
          rej(-1);
        });
      });
    },
  },
  watch: {
    clickedTimeline: function () {
      if (this.clickedTimeline == true) {
        this.$emit("ackclickTimeline");
        let cuelist;
        if (
          (cuelist = document.getElementById("infomarkertrack").track
            .activeCues)
        ) {
          for (let i = 0; i < cuelist.length; i++) {
            let data = JSON.parse(cuelist[i].text);
            document.getElementById(data[i].id + "textbox").style.display =
              "none";
          }
        }
      }
    },
    paused: function () {
      if (this.paused == false) {
        let cuelist;
        if (
          (cuelist = document.getElementById("infomarkertrack").track
            .activeCues)
        ) {
          for (let i = 0; i < cuelist.length; i++) {
            let data = JSON.parse(cuelist[i].text);
            if (data.length) {
              for (let j = 0; j < data.length; j++) {
                document.getElementById(data[j].id + "textbox").style.display =
                  "none";
              }
            } else {
              document.getElementById(data.id + "textbox").style.display =
                "none";
            }
          }
        }
      }
    },
  },
  mounted: function(){
    this.activeCueArr = new Array();
    this.persons = new Array();
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
  data() {
    return {
      track: null,
      activeCueArr: Array,
      persons: Array,
    };
  },
};
</script>
  
<template>
  <track
    src="../assets/videos/infomarker/infomarker.de.vtt"
    id="infomarkertrack"
    @load="presetup($event)"
  />
</template>

<style>
video::cue {
  color: white;
  font-size: 2rem;
  background-color: rgba(0, 0, 0, 0.6);
}

/** REFERENCE. NOT USED */
.redInfoIconStyle {
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
.infoTextBoxStyle {
  text-justify: auto;
  overflow-wrap: break-word;
  color: #fff;
  background: #000 0% 0% no-repeat;
  width: 72%; /* Thats about the ratio (width to viewport size) of the design specs */
  height: 150px;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  z-index: 101;
  opacity: 0.6;
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.infoTextBoxExitbuttonStyle {
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