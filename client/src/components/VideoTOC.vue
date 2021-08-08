<script>
import PortalVue from "portal-vue";
import axios from "axios";
//Vue.use(PortalVue);

export default {
  name: "video-toc",
  props: {
    videoElementduration: Number,
  },
  methods: {
    search() {
      return this.scenes;
    },
    gotoTime(time) {
      this.$emit("gotoTimerequest", time);
    },
    sortScenes(scenes) {
      scenes = scenes.sort((a, b) => {
        a.number = parseInt(a.number, 10);
        b.number = parseInt(b.number, 10);
        if (a.number < b.number) {
          return -1;
          // eslint-disable-next-line no-else-return
        } else if (a.number > b.number) {
          return 1;
        } else {
          return 0;
        }
      });
    },
    addCategory(scenelist) {
      for (let i = 0; i < scenelist.length; i++) {
        if (typeof scenelist[i].category == "undefined") {
          scenelist[i].category = "unbekannt";
        }
      }
    },
    /**Removes scenes with unuseable data entries */
    removeInvalid(scenelist) {
      for (let i = 0; i < scenelist.length; i++) {
        if (
          scenelist[i].start == -1 ||
          scenelist[i].start > this.videoElementduration
        ) {
          scenelist.splice(i, 1);
          i--;
        }
      }
    },
    removeUnknownCategory(scenelist) {
      for (let i = 0; i < scenelist.length; i++) {
        if (
          typeof scenelist[i].category == "undefined" ||
          scenelist[i].category == "unbekannt"
        ) {
          scenelist.splice(i, 1);
          i--;
        }
      }
    },
    styleSceneMarker(scene, videoElementduration) {
      return {
        left: (scene.start / videoElementduration) * 100 + "%",
        //width: ((scene.end - scene.start) / videoElementduration) * 100 + "%",
        width: "2px",
      };
    },
    /**
     * highlights markers '| |' on timeline when user hovers mouse over corresponding scene entry
     */
    highlightSceneMarker(markerid, event) {
      if (event.type === "mouseover") {
        document.getElementById(markerid).style.visibility = "visible";
        return;
      }
      if (event.type === "mouseout") {
        document.getElementById(markerid).style.visibility = "hidden";
        return;
      }
    },
    /**
     * highlights scene entry when user hovers mouse over corresponding marker on timeline
     * (disputable UX in this state)
     */
    highlightSceneLi(sceneLiID, event) {
      var sceneLiElement = document.getElementById(sceneLiID);
      if (event.type === "mouseover") {
        if (sceneLiElement.classList.contains("alltag")) {
          sceneLiElement.classList.add("alltaghover");
          return;
        }
        if (sceneLiElement.classList.contains("kultur")) {
          sceneLiElement.classList.add("kulturhover");
          return;
        }
        if (sceneLiElement.classList.contains("arbeit")) {
          sceneLiElement.classList.add("arbeithover");
          return;
        }
      }
      if (event.type === "mouseout") {
        if (sceneLiElement.classList.contains("alltag")) {
          sceneLiElement.classList.remove("alltaghover");
          return;
        }
        if (sceneLiElement.classList.contains("kultur")) {
          sceneLiElement.classList.remove("kulturhover");
          return;
        }
        if (sceneLiElement.classList.contains("arbeit")) {
          sceneLiElement.classList.remove("arbeithover");
          return;
        }
      }
    },
    setFilter(buttonNumber, buttonGroup) {
      if (this.selectedFilter === buttonGroup[buttonNumber].category)   // user clicks on already active category -> deselect category
        this.selectedFilter = "none";
      else this.selectedFilter = buttonGroup[buttonNumber].category;
      this.toggleButtonLook(buttonNumber, buttonGroup);
    },
    toggleButtonLook(buttonNumber, buttonGroup) {
      if (buttonGroup[buttonNumber].pressed) {
        // user presses an already active button? toggle it off
        buttonGroup[buttonNumber].pressed = false;
        document
          .getElementById(buttonGroup[buttonNumber].id)
          .classList.remove(buttonGroup[buttonNumber].class);
      } else {
        // user wants to switch to another filter
        for (let i = 0; i < buttonGroup.length; i++) {
          if (buttonGroup[i].pressed) {
            buttonGroup[i].pressed = false;
            document
              .getElementById(buttonGroup[i].id)
              .classList.remove(buttonGroup[i].class);
          }
        }
        buttonGroup[buttonNumber].pressed = true;
        document
          .getElementById(buttonGroup[buttonNumber].id)
          .classList.add(buttonGroup[buttonNumber].class);
      }
    },
    /**Function for conveniently setting a filter from outside this module, expectantly Video.vue
     * @argument category index on an array ("sceneSelectButtonGroup", mirrors array "topics" in Video.vue)
    */
    setFilterExt(category) {
      this.setFilter(category, this.sceneSelectButtonGroup);
    },
    keyupEmpty(){

    },
    getSceneData: function () {
      let _this = this;
      return new Promise((res, rej) => {
        axios.get("/scenes/all").then(function (response) {
          _this.rawscenes = response.data;
          res(response.data);
          rej(-1);
        });
      });
    },
  },
  mounted: function () {
    this.getSceneData().then(() => {
      this.sortScenes(this.rawscenes);
      this.removeUnknownCategory(this.rawscenes);
      //this.addCategory(this.rawscenes);         // uncomment this and comment call "removeUnknownCat" to add scenes with unknown category
      this.removeInvalid(this.rawscenes);         // removes scenes which start time is negative or is greater than film length
      this.scenes = this.rawscenes;
    });
  },
  data() {
    return {
      rawscenes: [],
      scenes: [],
      selectedFilter: "none",
      sceneSelectButtonGroup: [
        {
          category: "Alltag",
          id: "alltagbutton",
          class: "alltaghover",
          pressed: false,
        },
        {
          category: "Arbeit",
          id: "arbeitbutton",
          class: "arbeithover",
          pressed: false,
        },
        {
          category: "Kultur",
          id: "kulturbutton",
          class: "kulturhover",
          pressed: false,
        },
      ],
    };
  },
};
</script>

<template>
  <div>
    <div class="topics">
      <h4>{{ $t("videotoc.themeselect") }}</h4>
      <div class="row">
        <button
          class="btn btn-sm btn-outline-primary"
          :id="sceneSelectButtonGroup[0].id"
          @click="setFilter(0, sceneSelectButtonGroup)"
          @keyup="keyupEmpty"
        >
          {{ $t("videotoc.everydaylife") }}
        </button>
        <button
          class="btn btn-sm btn-outline-success"
          :id="sceneSelectButtonGroup[1].id"
          @click="setFilter(1, sceneSelectButtonGroup)"
        >
          {{ $t("videotoc.work") }}
        </button>
        <button
          class="btn btn-sm btn-outline-warning"
          :id="sceneSelectButtonGroup[2].id"
          @click="setFilter(2, sceneSelectButtonGroup)"
        >
          {{ $t("videotoc.culture") }}
        </button>
        
      </div>
    </div>
    <div class="scenes mt-2">
      <h4>{{ $t("videotoc.scenes") }}</h4>
      <ul class="scene-list">
        <li v-for="scene in search()" :key="scene.number">
          <a
            v-show="
              scene.category === selectedFilter || selectedFilter === 'none'
                ? true
                : false
            "
            :id="scene.number + 'li'"
            :class="'scene ' + scene.category.toLowerCase()"
            @mouseover="highlightSceneMarker(scene.number + 'marker', $event)"
            @mouseout="highlightSceneMarker(scene.number + 'marker', $event)"
            @click="gotoTime(scene.start)"
            >{{ scene.title }}</a
          >
          <i v-if="scene.description !== ''" class="fa fa-info"></i>
        </li>
      </ul>
    </div>
    <portal to="timeline-scene-marker">
      <div
        v-for="scene in search()"
        :key="scene.number + 'marker'"
        v-show="
          scene.category === selectedFilter || selectedFilter === 'none'
            ? true
            : false
        "
        class="scenemarker"
        :style="styleSceneMarker(scene, videoElementduration)"
        @mouseover="highlightSceneLi(scene.number + 'li', $event)"
        @mouseout="highlightSceneLi(scene.number + 'li', $event)"
        @click="gotoTime(scene.start)"
      >
        <div class="scenemarkertext" :id="scene.number + 'marker'">
          {{ scene.title }}
        </div>
      </div>
    </portal>
  </div>
</template>

<style>
.topics {
  justify-self: flex-start;
  background-color: #3b3b3bec;
  margin-top: 2px; /** Very small margin to bring visual top edge of class "right-bar" on same level as the video content area */
  padding-bottom: 10px;
  padding-top: 6px;
  flex: 0 0 78px;
}

.scenes {
  background-color: #3b3b3bec;
  padding-bottom: 10px;
  padding-top: 6px;
  overflow-y: scroll;
  flex: 1 1 300px;
}

.topics button {
  padding: 1px 10px;
  margin: 4px 10px;
  border-radius: 10px;
}

.scene-list {
  padding-left: 10px;
  text-align: left;
}
.scene-list li {
  list-style: none;
  display: block;
  width: auto;
  cursor: pointer;
}
.scene-list li a.scene {
  display: inline-block;
  padding: 1px 8px;
  white-space: nowrap;
}

.scenemarker {
  position: absolute;
  height: 20px;
  top: 10px;
  width: 2px;
  background-color: white;

  z-index: 1010;
  cursor: pointer;
  transform: translate(0%, -25%);
}

.scenemarker:after {
  content: "";
  position: absolute;
  left: 0px;
  top: 0px;
  width: 16px;
  height: 30px;
  z-index: 1010;
  transform: translate(-40%, -20%);
}

.scenemarker:hover .scenemarkertext {
  visibility: visible !important;
}

.scenemarker .scenemarkertext {
  font-size: 1.2rem;
  position: relative;
  bottom: 35px;
  width: fit-content;
  padding-left: 5px;
  padding-right: 5px;
  background-color: black;
  color: white;
  transform: translate(-50%, 0%);
  border-radius: 10px;

  visibility: hidden;
}
/**special classes to emulate ':hover' but triggered by mouseover from a distant html element*/
.kulturhover {
  background-color: #ffd800;
  border-radius: 10px;
  color: #111 !important;
}
.alltaghover {
  background-color: #0081c6;
  border-radius: 10px;
  color: #fff !important;
}
.arbeithover {
  background-color: #2ca500;
  border-radius: 10px;
  color: #fff !important;
}
a.kultur {
  color: #ffd800;
}
a.kultur:hover {
  background-color: #ffd800;
  border-radius: 10px;
  color: #fff;
}
a.alltag {
  color: #0081c6;
}
a.alltag:hover {
  background-color: #0081c6;
  border-radius: 10px;
  color: #111;
}
a.arbeit {
  color: #2ca500;
}
a.arbeit:hover {
  background-color: #2ca500;
  border-radius: 10px;
  color: #fff;
}
</style>