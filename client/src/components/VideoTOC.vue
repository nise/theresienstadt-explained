<script>
import PortalVue from "portal-vue";
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
    sortScenes() {
      this.scenes = this.scenes.sort((a, b) => {
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
    styleSceneMarker(scene, videoElementduration) {
      return{
        left: (scene.start/videoElementduration)*100 +'%',
        width: ((scene.end-scene.start)/videoElementduration)*100 +'%',
      }
    },
    /**
     * highlights markers '| |' on timeline when user hovers mouse over corresponding scene entry 
     */
    highlightSceneMarker(markerid, event) {
      if (event.type === 'mouseover') {
        document.getElementById(markerid).style.borderWidth = "5px";
        return;
      }
      if (event.type === 'mouseout') {
        document.getElementById(markerid).style.borderWidth = "2px";
        return;
      }
    },
    /**
     * highlights scene entry when user hovers mouse over corresponding marker on timeline
     * (disputable UX in this state)
     */
    highlightSceneLi(sceneLiID, event) {
      var sceneLiElement = document.getElementById(sceneLiID);
      if (event.type === 'mouseover') {
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
      if (event.type === 'mouseout') {
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
      if (this.selectedFilter === buttonGroup[buttonNumber].category) this.selectedFilter = 'none';
      else this.selectedFilter = buttonGroup[buttonNumber].category;
      this.toggleButtonLook(buttonNumber, buttonGroup);
    },
    toggleButtonLook(buttonNumber, buttonGroup) {
      if (buttonGroup[buttonNumber].pressed) {    // user presses an already active button? toggle it off
        buttonGroup[buttonNumber].pressed = false;
        document.getElementById(buttonGroup[buttonNumber].id).classList.remove(buttonGroup[buttonNumber].class);
      } else {    // user wants to switch to another filter
        for (let i = 0; i < buttonGroup.length; i++){
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
    this.sortScenes();
  },
  data() {
    return {
      selectedFilter: 'none',
      sceneSelectButtonGroup: [
        {
          category: 'Alltag',
          id: 'alltagbutton',
          class: 'alltaghover',
          pressed: false
        },
        {
          category: 'Kultur',
          id: 'kulturbutton',
          class: 'kulturhover',
          pressed: false
        },
        {
          category: 'Arbeit',
          id: 'arbeitbutton',
          class: 'arbeithover',
          pressed: false
        }
      ],
      scenes: [
        {
          _id: {
            $oid: "5ba539c3e99589718c928bf4",
          },
          expanded: false,
          protagonists: [],
          images: [],
          title: "Schmiede",
          category: "Alltag",
          number: 26,
          source: "4",
          duration: "22:15",
          start: 596,
          end: 1000,
          status: "vollständig",
          description:
            "In der Werkstatt eines Huf- Wagenschmieds beschlägt ein Hufschmied einen Ochsen. Der Ochse wird aus der Schmiede herausgeführt.",
          music: "",
          locations: "Schmiede",
          updated_at: {
            $date: "2018-09-21T18:34:43.088Z",
          },
          __v: 0,
        },
        {
          _id: {
            $oid: "5ba539c3e99589718c928bf5",
          },
          expanded: false,
          protagonists: [],
          images: [],
          category: "Kultur",
          title: "Zentralbad",
          number: 31,
          source: "4,5",
          duration: "27:16",
          start: 1086,
          end: 1300,
          status: "vollständig",
          description:
            "Männer laufen in die Gemeinschaftsdusche und waschen sich. Männer verlassen das Zentralbad und laufen auf die Straße.",
          music: "",
          locations: "Zentralbad",
          updated_at: {
            $date: "2018-09-21T18:34:43.088Z",
          },
          __v: 0,
        },
        {
          _id: {
            $oid: "5ba539c3e99589718c928bf6",
          },
          expanded: false,
          protagonists: [],
          images: [],
          title: "Abendfreizeit",
          number: 36,
          category: "Kultur",
          source: "5",
          duration: "1:54:24",
          start: 1374,
          end: 1450,
          status: "vollständig",
          description:
            "Leute erholen sich außerhalb von Holzbaracken, Szenen aus den Gemeinschaftsunterkünften. Outdoor facilities of the barracks with inhabitants, mostly women and children, on benches, chatting, reading. Inside a barrack of the women's accommodation, pan on the central corridor to separate living spaces with wooden tables and benches, double bunk beds separating the living spaces, partly covered with cloths. Several women and young girls reading, needle working, chatting in small groups, playing cards.",
          music: "",
          locations: "",
          updated_at: {
            $date: "2018-09-21T18:34:43.089Z",
          },
          __v: 0,
        },
      ],
    };
  },
};
</script>

<template>
  <div>
    <div class="row video-bar topics ml-1 mt-2">
      <h4>Themenauswahl</h4>
      <div class="row">
        <button class="btn btn-sm btn-outline-primary" 
          :id="sceneSelectButtonGroup[0].id" @click="setFilter(0, sceneSelectButtonGroup)">Alltag</button>
        <button class="btn btn-sm btn-outline-warning" 
          :id="sceneSelectButtonGroup[1].id" @click="setFilter(1, sceneSelectButtonGroup)">Kultur</button>
        <button class="btn btn-sm btn-outline-success" 
          :id="sceneSelectButtonGroup[2].id" @click="setFilter(2, sceneSelectButtonGroup)">Arbeit</button>
      </div>
    </div>
    <div class="row video-bar scenes ml-1 mt-2">
      <h4>Szenen</h4>
      <ul class="scene-list">
        <li v-for="scene in search()" :key="scene.number">
          <a
            v-show="(scene.category === selectedFilter || selectedFilter === 'none') ? true : false"
            :id ="scene.number+'li'"
            :class="'scene ' + scene.category.toLowerCase()"
            @mouseover="highlightSceneMarker(scene.number+'marker', $event)"
            @mouseout="highlightSceneMarker(scene.number+'marker', $event)"
            @click="gotoTime(scene.start)"
            >{{ scene.title }}</a
          >
          <i v-if="scene.description !== ''" class="fa fa-info"></i>
        </li>
      </ul>
    </div>
    <portal to="timeline-scene-marker">
      <div v-for ="scene in search()" :key ="scene.number+'marker'"
        v-show="(scene.category === selectedFilter || selectedFilter === 'none') ? true : false"
        :id ="scene.number+'marker'"
        class ="scenemarker" 
        :style ="styleSceneMarker(scene, videoElementduration)"
        @mouseover="highlightSceneLi(scene.number+'li', $event)"
        @mouseout="highlightSceneLi(scene.number+'li', $event)">
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
.video-bar.topics .row {
  content-align: center;
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

.scenemarker {
  position: absolute;
  height: 20px;
  top: 10px;
  border-color: white;
  border-left-style: solid;
  border-right-style: solid;
  border-width: 2px;
  z-index: 995;
  cursor: pointer;
  transform: translate(0%,-25%);
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
  color: #111;
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