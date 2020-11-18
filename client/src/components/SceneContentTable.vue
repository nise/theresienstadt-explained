

<script>
export default {
  name: "SceneContentTable",
  props: {},
  methods: {
    search() {
      return this.scenes;
    },
    gotoTime(time){
      this.$emit("gotoTimerequest", time);
    },
  },
  mounted: function () {
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
  data() {
    return {
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
  <div class="row video-bar scenes ml-1 mt-2">
    <h4>Szenen</h4>
    <ul class="scene-list">
      <li v-for="scene in search()">
        <a :class="'scene ' + scene.category.toLowerCase()" @click="gotoTime(scene.start)">{{
          scene.title
        }}</a>
        <i v-if="scene.description !== ''" class="fa fa-info"></i>
      </li>
    </ul>
  </div>
</template>

<style>
.scene-list {
  padding-left: 10px;
  text-align: left;
}
.scene-list li {
  list-style: none;
  display: block;
  width: auto;
}
.scene-list li a.scene {
  display: inline-block;
  padding: 1px 8px;
  white-space: nowrap;
}
</style>