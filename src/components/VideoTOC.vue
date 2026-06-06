<script>
import axios from "axios";

export default {
  name: "video-toc",
  props: {
    videoElementduration: Number,
    currentTime: Number,
  },
  computed: {
    activeSceneNumber() {
      if (!this.scenes.length || this.currentTime == null) return null;
      let active = null;
      for (const scene of this.scenes) {
        if (scene.start >= 0 && scene.start <= this.currentTime) {
          if (!active || scene.start > active.start) {
            active = scene;
          }
        }
      }
      return active ? active.number : null;
    },
  },
  methods: {
    search() {
      return this.scenes;
    },
    gotoTime(time) {
      this.$emit("gotoTimerequest", time);
    },
    sortScenes() {
      this.scenes = this.scenes.sort((a, b) => {
        a.number = parseInt(a.number, 10);
        b.number = parseInt(b.number, 10);
        if (a.number < b.number) return -1;
        if (a.number > b.number) return 1;
        return 0;
      });
    },
    styleSceneMarker(scene, videoElementduration) {
      return {
        left: (scene.start / videoElementduration) * 100 + "%",
        width: ((scene.end - scene.start) / videoElementduration) * 100 + "%",
      };
    },
    highlightSceneMarker(markerid, event) {
      const el = document.getElementById(markerid);
      if (!el) return;
      el.style.borderWidth = event.type === "mouseover" ? "5px" : "2px";
    },
    highlightSceneLi(sceneLiID, event) {
      const el = document.getElementById(sceneLiID);
      if (!el) return;
      const categories = ["alltag", "kultur", "arbeit"];
      const hoverClasses = { alltag: "alltaghover", kultur: "kulturhover", arbeit: "arbeithover" };
      for (const cat of categories) {
        if (el.classList.contains(cat)) {
          if (event.type === "mouseover") el.classList.add(hoverClasses[cat]);
          else el.classList.remove(hoverClasses[cat]);
          return;
        }
      }
    },
    setFilter(buttonNumber, buttonGroup) {
      if (this.selectedFilter === buttonGroup[buttonNumber].category)
        this.selectedFilter = "none";
      else this.selectedFilter = buttonGroup[buttonNumber].category;
      this.toggleButtonLook(buttonNumber, buttonGroup);
    },
    toggleButtonLook(buttonNumber, buttonGroup) {
      if (buttonGroup[buttonNumber].pressed) {
        buttonGroup[buttonNumber].pressed = false;
        document.getElementById(buttonGroup[buttonNumber].id).classList.remove(buttonGroup[buttonNumber].class);
      } else {
        for (let i = 0; i < buttonGroup.length; i++) {
          if (buttonGroup[i].pressed) {
            buttonGroup[i].pressed = false;
            document.getElementById(buttonGroup[i].id).classList.remove(buttonGroup[i].class);
          }
        }
        buttonGroup[buttonNumber].pressed = true;
        document.getElementById(buttonGroup[buttonNumber].id).classList.add(buttonGroup[buttonNumber].class);
      }
    },
  },
  mounted: function () {
    axios.get("./data/Scenes2020new.json").then((response) => {
      this.scenes = response.data;
      this.sortScenes();
    });
  },
  data() {
    return {
      selectedFilter: "none",
      sceneSelectButtonGroup: [
        { category: "Alltag", id: "alltagbutton", class: "alltaghover", pressed: false },
        { category: "Kultur", id: "kulturbutton", class: "kulturhover", pressed: false },
        { category: "Arbeit", id: "arbeitbutton", class: "arbeithover", pressed: false },
      ],
      scenes: [],
    };
  },
};
</script>

<template>
  <div>
    <div class="row video-bar topics ml-1 mt-2">
      <h4>Themenauswahl</h4>
      <div class="row">
        <button
          class="btn btn-sm btn-outline-primary"
          :id="sceneSelectButtonGroup[0].id"
          @click="setFilter(0, sceneSelectButtonGroup)"
        >Alltag</button>
        <button
          class="btn btn-sm btn-outline-warning"
          :id="sceneSelectButtonGroup[1].id"
          @click="setFilter(1, sceneSelectButtonGroup)"
        >Kultur</button>
        <button
          class="btn btn-sm btn-outline-success"
          :id="sceneSelectButtonGroup[2].id"
          @click="setFilter(2, sceneSelectButtonGroup)"
        >Arbeit</button>
      </div>
    </div>
    <div class="row video-bar scenes ml-1 mt-2">
      <h4>Szenen</h4>
      <ul class="scene-list">
        <li v-for="scene in search()" :key="scene.number" :class="{ 'scene-lost-item': scene.start < 0 }">
          <span
            v-if="scene.start < 0"
            v-show="(scene.category || '') === selectedFilter || selectedFilter === 'none'"
            :id="scene.number + 'li'"
            class="scene scene-lost"
          >{{ scene.title }}</span>
          <a
            v-else
            v-show="(scene.category || '') === selectedFilter || selectedFilter === 'none'"
            :id="scene.number + 'li'"
            :class="['scene', (scene.category || '').toLowerCase(), { 'scene-active': scene.number === activeSceneNumber }]"
            @mouseover="highlightSceneMarker(scene.number + 'marker', $event)"
            @mouseout="highlightSceneMarker(scene.number + 'marker', $event)"
            @click="gotoTime(scene.start)"
          >{{ scene.title }}</a>
        </li>
      </ul>
    </div>
    <portal to="timeline-scene-marker">
      <div
        v-for="scene in search()"
        :key="scene.number + 'marker'"
        v-show="scene.start >= 0 && ((scene.category || '') === selectedFilter || selectedFilter === 'none')"
        :id="scene.number + 'marker'"
        class="scenemarker"
        :style="styleSceneMarker(scene, videoElementduration)"
        @mouseover="highlightSceneLi(scene.number + 'li', $event)"
        @mouseout="highlightSceneLi(scene.number + 'li', $event)"
        @click="gotoTime(scene.start)"
      >
        <span class="scene-tooltip">{{ scene.title }}</span>
      </div>
    </portal>
  </div>
</template>

<style>
.video-bar {
  display: inline-block;
  background-color: #3b3b3bec;
  width: 96%;
  padding-bottom: 10px;
  padding-top: 6px;
}
.video-bar.topics {
  position: sticky;
  top: 0;
  z-index: 50;
}
.video-bar.topics .row {
  justify-content: center;
}
.video-bar.topics button {
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
a.scene-active {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}
.scene-lost-item {
  cursor: default;
}
span.scene-lost {
  display: inline-block;
  padding: 1px 8px;
  white-space: nowrap;
  color: #888;
  text-decoration: line-through;
}

.scenemarker {
  position: absolute;
  height: 20px;
  top: 10px;
  border-color: white;
  border-left-style: solid;
  border-right-style: solid;
  border-width: 2px;
  z-index: 1010;
  cursor: pointer;
  transform: translate(0%, -25%);
}
.scene-tooltip {
  display: none;
  position: absolute;
  bottom: 130%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  padding: 2px 7px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 1100;
}
.scenemarker:hover .scene-tooltip {
  display: block;
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
a.kultur { color: #ffd800; }
a.kultur:hover { background-color: #ffd800; border-radius: 10px; color: #fff; }
a.alltag { color: #0081c6; }
a.alltag:hover { background-color: #0081c6; border-radius: 10px; color: #111; }
a.arbeit { color: #2ca500; }
a.arbeit:hover { background-color: #2ca500; border-radius: 10px; color: #fff; }
</style>
