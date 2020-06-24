/* eslint-disable no-underscore-dangle */
/* eslint-disable vue/require-v-for-key */
/* eslint-disable */
<template>
  <div class="container text-left">
    <h1 class="mt-5 mb-4 ml-4 text-left">Die 38 Szenen des Films</h1>
    <div class="col-3 mb-3 ml-3">
      <input v-model="searchterm" placeholder="Suche">
    </div>  
    <div class="row">
      <div v-for="scene in search()" class="col-5 ml-5 mb-5 scene-box">
        <div class="row">
          <div class="col-3">
            <img src="../assets/dummy.png" />
          </div>
          <div class="col-9 pl-2 pt-2 pr-2 scene-content">
            <div class="body mb-2">
              <h3 class="title">{{ scene.number}}. {{ scene.title }}</h3>
              <div v-if="!scene.expanded" class="desc mb-2">{{ shorten(scene.description, 250) }}</div>
              <div v-if="scene.expanded" class="desc  mb-2">{{ scene.description }}</div>
              <div v-if="scene.expanded" class="details">
                <div v-if="scene.duration !== ''" class="item mb-1">Länge: {{scene.duration }} Sekunden</div>
                <div v-if="scene.status !== ''" class="item mb-1">Erhaltungszustand: {{scene.status}}</div>
                <div v-if="scene.locations !== ''" class="item mb-1">Orte:  {{scene.locations}}</div>
                <div v-if="scene.protagonists.length > 0"class="item mb-1">Personen: <ul><li v-for="p in scene.protagonists"><a href="">{{p}}</a></li></ul></div>
                <div v-if="scene.music !== ''" class="item mb-1">Hintergrundmusik: {{scene.music}}</div>
                <div v-if="scene.images.length > 0" class="item mb-1">Orte:  <ul><li v-for="o in scene.images">{{o}}, </li></ul></div>
              </div>
            </div>
            <div class="foot mt-2">
              <div class="category">{{ scene.category }}</div>
              <button
                v-if="!scene.expanded"
                @click="expand(scene.number)"
                class="btn btn-sm"
              >Mehr ...</button>
              <button
                v-if="scene.expanded"
                @click="expand(scene.number)"
                class="btn btn-sm"
              >Einklappen</button>
            </div>
          </div>
        </div>
      </div><!-- end for-->
      <div v-if="search().length === 0" class="col-10 p-3 mb-5 ml-5 box">
        Zu dem Begriff "{{searchterm}}" konnte nichts in den Szenen gefunden werden.
      </div>
    </div>
  </div>
</template>

<style>
.scene-box {
 display:inline-block !important; float:none !important;
  position: relative;
  background: #fff;
 
  padding-left: 0;
  text-align: left;
  height: auto;
  overflow: auto;
}

.scene-box .row {
  height: 100%;
}

.box{
  position: relative;
  background: #fff;
  padding-left: 0;
  text-align: left;
}

.scene-content {
  position: relative;
}

.scene-box img {
  height: 100%;
  max-width: 100%;
}

.scene-box .desc {
  font-size: 1em;
  font-family: Jost;
  display: inline-block;
}

.scene-box .title {
  font-size: 1.2em;
  font-family: Jost;
  font-weight: bold;
  width: 100%;
  display: inline-block;
}

.scene-box .body {
  min-height: 200px;
  padding-bottom:30px;
}

.scene-box .foot {
  position:absolute;
  bottom:4px;
  display:block;
  min-height: 20px;
  width: 95%;
  margin: 10px;
}

.scene-box .category {
  display:inline-block;
}

.scene-box button {
  background: #111;
  color: #fff;
  position:absolute;
  right:10px;
}

.scene-box button:hover {
  background-color: #c10000;
  color: #fff;
}

.scene-box button.btn:focus {
    outline: 0;
    box-shadow: 0 0 0 0.15rem  #c10000;
}

.row.flexRow   { display: flex;  flex-wrap: wrap;}

</style>

<script>
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

// const API_URL = "http://localhost:4000/message";

export default {
  name: "scenes",
  methods: {
    shorten(text, length) {
      return text.length > length ? text.substr(0, length - 4) + " ..." : text;
    },
    expand(id) {
      let scene = this.getScenebyId(id);
      if (scene.expanded === undefined) {
        scene.expanded = false;
      } else {
        scene.expanded = !scene.expanded;
      }
    },
   getScenebyId(id) {
      for(let i = 0; i < this.scenes.length; i++){
        if(this.scenes[i].number === id){
          return this.scenes[i];
        }
      }
    },
    search() {
      const _this = this;
      if (this.searchterm === '') {
        return this.scenes;
      } else {
        return this.scenes.filter(function(d) {
          return d.title.toLowerCase().includes(_this.searchterm.toLowerCase()) || d.description.toLowerCase().includes(_this.searchterm.toLowerCase());
          }).sort(function(a, b){
            a.number = parseInt(a.number, 10);
            b.number = parseInt(b.number, 10);
            if(a.number < b.number){
              return -1;
            } else if(a.number > b.number){
              return 1;
            } else{
              return 0;
            }
          });
      }
    }
  },
  data: () => ({
    error: '',
    searchterm: '',
    message:'',
    scenes: [
      {
        _id: {
          $oid: "5ba539c3e99589718c928bef"
        },
        expanded: false,
        protagonists: ["Karel Fischer", "Jo Spier"],
        images: [],
        title: "Titelsequenz",
        category: "Kultur",
        number: 1,
        source: "1",
        duration: "32:06",
        start: 0,
        status: "unvollständig",
        description:
          "Der von Karel Fischer geleitete Chor singt Mendelssohn-Bartholdys „Elias“.",
        music: "Felix Mendelsohn-Bartholdy: „Elias“",
        locations: "",
        updated_at: {
          $date: "2018-09-21T18:34:43.074Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928bf1"
        },
        expanded: false,
        protagonists: [],
        images: [],
        title: "Gericht",
        number: 11,
        source: "2",
        duration: "8:05",
        start: 340,
        status: "Unvollständig",
        description:
          "Das Gericht der jüdischen Selbstverwaltung. Ausschnitte einer Gerichtsverhandlung.",
        music: "",
        locations: "",
        updated_at: {
          $date: "2018-09-21T18:34:43.086Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928bf2"
        },
        expanded: false,
        protagonists: [],
        images: [],
        title: "Spielplatz",
        number: 16,
        source: "3",
        duration: "1:06:08",
        start: 445,
        status: "vollständig",
        description:
          "Schild mit der Aufschrift „Zum Spielplatz“. Kinder laufen in Zweierreihe durch den Stadtpark zum nahegelegenen Kinderpavillon. Dort befindet sich ein Sandkasten, wo sie gemeinsam spielen, trinken, tanzen und singen. Die Kinder halten außerhalb des Pavillions Mittagsschlaf. In einem Planschbecken spielen sie. Einige Kinder schaukeln draußen. Innenaufnahme eines Spielzimmers mit Schaukelpferden und Holzspielzeug.",
        music: "",
        locations: "",
        updated_at: {
          $date: "2018-09-21T18:34:43.087Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928bf0"
        },
        expanded: false,
        protagonists: [
          "Paul Eppstein",
          "Alfred Meissner",
          "Georg Gradnauer",
          "Léon Meyer",
          "Johann Friedländer",
          "Emil Sommer",
          "Max Friedinger",
          "Clara von Schultz"
        ],
        images: [],
        title: "Terrasse",
        number: 4,
        source: "",
        duration: "12:23",
        start: 87,
        status: "verschollen",
        description:
          "Terrasse mit Sonnenschirmen, Kellnerinnen servieren Limonade, Leute spazieren in dem sich anschließenden Garten auf und ab.",
        music: "",
        locations: "",
        updated_at: {
          $date: "2018-09-21T18:34:43.086Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928bf4"
        },
        expanded: false,
        protagonists: [],
        images: [],
        title: "Schmiede",
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
          $date: "2018-09-21T18:34:43.088Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928bf5"
        },
        expanded: false,
        protagonists: [],
        images: [],
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
          $date: "2018-09-21T18:34:43.088Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928bf6"
        },
        expanded: false,
        protagonists: [],
        images: [],
        title: "Abendfreizeit",
        number: 36,
        source: "5",
        duration: "1:54:24",
        start: 1374,
        status: "vollständig",
        description:
          "Leute erholen sich außerhalb von Holzbaracken, Szenen aus den Gemeinschaftsunterkünften. Outdoor facilities of the barracks with inhabitants, mostly women and children, on benches, chatting, reading. Inside a barrack of the women's accommodation, pan on the central corridor to separate living spaces with wooden tables and benches, double bunk beds separating the living spaces, partly covered with cloths. Several women and young girls reading, needle working, chatting in small groups, playing cards.",
        music: "",
        locations: "",
        updated_at: {
          $date: "2018-09-21T18:34:43.089Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928bf7"
        },
        expanded: false,
        protagonists: [],
        images: [],
        title: "Entstehungsgeschichte",
        number: 2,
        source: "1",
        duration: "50:10",
        start: 32,
        status: "vollständig",
        description:
          "Die Entstehungsgeschichte der Festung Theresienstadt, illustriert durch Zeichnungen von Jo Spier.",
        music: "",
        locations: "",
        updated_at: {
          $date: "2018-09-21T18:34:43.092Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928bf8"
        },
        expanded: false,
        protagonists: [],
        images: [],
        title: "Sport",
        number: 7,
        source: "",
        duration: "30:07",
        start: 185,
        status: "vollständig",
        description:
          "Sport auf einer der Basteien. Männer laufen und zwei Frauenmannschaften spielen Handball.",
        music: "",
        locations: "Bastei",
        updated_at: {
          $date: "2018-09-21T18:34:43.093Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928bfa"
        },
        expanded: false,
        protagonists: [],
        images: [],
        title: "Kinderoper",
        number: 17,
        source: "3",
        duration: "1:15:02",
        start: 511,
        status: "vollständig",
        description:
          "Schlussszene von Hand Krasas Kinderoper „Brundibár“. Der Kinderchor singt. Szenenwechsel zwischen den kostümierten Darstellern und den jungen Zuschauern.",
        music: "",
        locations: "",
        updated_at: {
          $date: "2018-09-21T18:34:43.094Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928bf3"
        },
        expanded: false,
        protagonists: [],
        images: [],
        title: "Verpflegung",
        number: 21,
        source: "",
        duration: "",
        start: -1,
        status: "verschollen",
        description:
          "in einer Zentralküche wird das Essen zubereitet.  Essen wird gegen Lebensmittelmarken ausgegeben. Leute essen gemeinsamen im Speisesaal.",
        music: "",
        locations: "Zentralküche",
        updated_at: {
          $date: "2018-09-21T18:34:43.087Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928bfb"
        },
        expanded: false,
        protagonists: [
          "Rolf Grabower",
          "Philipp Kozower",
          "Franzi Schneidhuber",
          "Elly von Bleichröder",
          "Frau von Hennicke",
          "D. Leon Neuberger "
        ],
        images: [],
        title: "Freilichtvariete",
        number: 22,
        source: "",
        duration: "",
        start: -1,
        status: "Aufnahme von den Dreharbeiten",
        description:
          "Im Freilichtvarieté auf einer Wiese außerhalb der Ghettomauern treten verschiedene Künstler auf, darunter eine Tänzerin, ein Musikduo (Akkordeon und Violine), ein deutsches Kabarett-Trio, eine Sängerin sowie Kurt Gerron selbst.",
        music: "",
        locations: "Wiese außerhalb d. Ghettos",
        updated_at: {
          $date: "2018-09-21T18:34:43.094Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928bfc"
        },
        expanded: false,
        protagonists: [],
        images: [],
        title: "Metallwerkstätten",
        number: 27,
        source: "4",
        duration: "1:01:16",
        start: 619,
        status: "vollständig",
        description:
          "Zwei Männer schmieden ein heißes Eisen. Werkstatt mit mehreren Feuern, Ambossen, Stanzen und Fräsen. Ein Mann schweißt.",
        music: "",
        locations: "",
        updated_at: {
          $date: "2018-09-21T18:34:43.094Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928bfd"
        },
        expanded: false,
        protagonists: [
          "Heinrich Klang",
          "Desider Friedmann",
          "David Cohen",
          "Ernst Kantorowicz;"
        ],
        images: [],
        title: "Zentralbücherei",
        number: 32,
        source: "5",
        duration: "28:09",
        start: 1113,
        status: "vollständig",
        description:
          "Street with a few passers-by, man reading a book while walking, elderly man opening glass door and entering the library. Elderly men entering the library, pan through the rooms of the library, users standing between bookshelves talking to each other. Shown: David Cohen, Heinrich Klang (judge/professor), Ernst Kantorowicz (professor, Frankfurt), Desider Friedmann",
        music: "",
        locations: "Zentralbücherei?",
        updated_at: {
          $date: "2018-09-21T18:34:43.095Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928bff"
        },
        expanded: false,
        protagonists: [],
        images: [],
        title: "Jazzband",
        number: 3,
        source: "",
        duration: "2:20",
        start: 82,
        status: "verschollen",
        description:
          "Stadtplatz mit Jazzband in einem Musikpavillon, die Zuhörer stehen oder sitzen auf Parkbänken.",
        music: "",
        locations: "",
        updated_at: {
          $date: "2018-09-21T18:34:43.098Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928c00"
        },
        expanded: false,
        protagonists: ["Julia Salinger"],
        images: [],
        title: "Theater",
        number: 8,
        source: "",
        duration: "4:24",
        start: 215,
        status: "Aufnahme von den Dreharbeiten",
        description:
          "Bühnenszenen aus Offenbachs Hoffmanns Erzählungen und aus dem jiddischen Stück „In mitt'n Weg“.",
        music: "",
        locations: "",
        updated_at: {
          $date: "2018-09-21T18:34:43.099Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928c01"
        },
        expanded: false,
        protagonists: [],
        images: [],
        title: "Läden",
        number: 13,
        source: "",
        duration: "",
        start: -1,
        status: "verschollen",
        description:
          "Leute warten auf die Öffnung der Geschäfte, Kunden in einem Herrenbekleidungsgeschäft.",
        music: "",
        locations: "",
        updated_at: {
          $date: "2018-09-21T18:34:43.099Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928c02"
        },
        expanded: false,
        protagonists: [],
        images: [],
        title: "Feuerwehr",
        number: 18,
        source: "",
        duration: "",
        start: -1,
        status: "verschollen",
        description:
          "Die Feuerwehr der jüdischen Selbstverwaltung rückt aus. Der Löschwagen verläßt die Feuerwehrstation. Die Feuerwehrmänner löschen ein Feuer.",
        music: "",
        locations: "",
        updated_at: {
          $date: "2018-09-21T18:34:43.100Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928c04"
        },
        expanded: false,
        protagonists: ["Rudolf Saudek"],
        images: [],
        title: "Töpferei",
        number: 28,
        source: "4",
        duration: "48:10",
        start: 681,
        status: "vollständig",
        description:
          "In einer Töpferwerkstatt fertigt eine Frau ein Gefäß auf einer Drehscheibe. Ein andere Frau modelliert kleine Pferde. Der Bildhauer Rudolf Saudek bei der Arbeit an einer Brunnenfigur.",
        music: "Jacques Offenbach: „Pariser Leben“",
        locations: "",
        updated_at: {
          $date: "2018-09-21T18:34:43.101Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928bf9"
        },
        expanded: false,
        protagonists: [],
        images: [],
        title: "Bank",
        number: 12,
        source: "",
        duration: "",
        start: -1,
        status: "verschollen",
        description:
          "Die Bank der jüdischen Selbstverwaltung: Geschäfte an den Bankschaltern, der Banktresor.",
        music: "",
        locations: "",
        updated_at: {
          $date: "2018-09-21T18:34:43.093Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928c05"
        },
        expanded: false,
        protagonists: [
          "Emil Utitz",
          "Leo Baeck",
          "Hermann Strauss",
          "Otto Stargardt",
          "Alexander Cohn",
          "Alfred Philippson",
          "Alfred Klein",
          "Prof. Klang",
          "Benjamin Murmelstein",
          "Artur Stein",
          "Leo Taussig",
          "Maximilian Adler",
          "Franzi Schneidhuber",
          "Elly von Bleichröder",
          ""
        ],
        images: [],
        title: "Vortrag",
        number: 33,
        source: "5",
        duration: "40:08",
        start: 1142,
        status: "vollständig",
        description:
          "Vortrag des Universitätsprofessors Emil Utitz. Im Publikum sind zahlreiche Wissenschaftler vertreten.",
        music: "Felix Mendelssohn-Bartholdy: „Sonate für Violintrio“",
        locations: "",
        updated_at: {
          $date: "2018-09-21T18:34:43.101Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928c06"
        },
        expanded: false,
        protagonists: [],
        images: [],
        title: "Schlussmontage",
        number: 38,
        source: "",
        duration: "",
        start: -1,
        status: "verschollen",
        description: "Schlußmontage",
        music: "",
        locations: "",
        updated_at: {
          $date: "2018-09-21T18:34:43.101Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928c07"
        },
        expanded: false,
        protagonists: [],
        images: [],
        title: "Kaffeehaus",
        number: 5,
        source: "",
        duration: "4:20",
        start: 101,
        status: "Aufnahme von den Dreharbeiten",
        description: "Abendliche Stimmung mit Musik und Tanz.",
        music: "",
        locations: "",
        updated_at: {
          $date: "2018-09-21T18:34:43.105Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928c09"
        },
        expanded: false,
        protagonists: [],
        images: [],
        title: "Postamt",
        number: 14,
        source: "",
        duration: "",
        start: -1,
        status: "verschollen",
        description:
          "Leute, die Pakete aus vielen verschiedenen Ländern abholen; ein Paket wird in der Unterkunft eines Ehepaares ausgepackt.",
        music: "",
        locations: "",
        updated_at: {
          $date: "2018-09-21T18:34:43.106Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928c0a"
        },
        expanded: false,
        protagonists: [],
        images: [],
        title: "Eisenbahner",
        number: 19,
        source: "",
        duration: "7:08",
        start: -1,
        status: "verschollen",
        description: "Gleisarbeiter reparieren einen Schienenabschnitt.",
        music: "",
        locations: "Gleise",
        updated_at: {
          $date: "2018-09-21T18:34:43.107Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928c0b"
        },
        expanded: false,
        protagonists: [],
        images: [],
        title: "Wächerei",
        number: 24,
        source: "",
        duration: "",
        start: -1,
        status: "verschollen",
        description: "Zentrale Wäscherei.",
        music: "",
        locations: "Wächerei",
        updated_at: {
          $date: "2018-09-21T18:34:43.107Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928c0c"
        },
        expanded: false,
        protagonists: [],
        images: [],
        title: "Werkstätten",
        number: 29,
        source: "",
        duration: "3:05:13",
        start: 729,
        status: "vollständig",
        description:
          "Die Szene zeigt die Herstellungs- und Reparaturwerkstätten in hölzernen Baracken außerhalb der Stadt. Schneider, Näherinnen und Schuhmacher sind bei der Arbeit zu sehen. Es werden Handtaschen und Geldbörsen hergestellt. Schneider bügeln Kleider. Ein anderer Schneider näht Hosen.Schneider arbeiten in einer großen Halle mit Nähmaschinen oder mit Hand. achines or by hand. Shoemakers sewing shoes, partly with sewing machines, working with material needed for production, hammer, and hollow punch. Shoemakers standing up together and leaving the facility. Women and men leaving the barracks in small groups or individually, walking along a street with a pylon, the barracks in the background.",
        music: "Felix Mendelssohn-Bartholdy: „Midsummer nights dream“",
        locations: "",
        updated_at: {
          $date: "2018-09-21T18:34:43.107Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928c0e"
        },
        expanded: false,
        protagonists: [],
        images: [],
        title: "Freizeit",
        number: 6,
        source: "1",
        duration: "1:27:07",
        start: 107,
        status: "vollständig",
        description:
          "Freizeit auf den Stadtwällen: Alte Männer spielen Schach und alte Frauen lesen. Leute genießen die Zeit auf den Stadtwällen. Leute sitzen auf Bänken, liegen allein oder in Gruppen auf Decken. Vier Mädchen machen Gymnastik. Ein Mann zeichnet, andere lesen, stricken oder baden in der Sonne. Blick auf die ländliche Umgebung.",
        music: "",
        locations: "Stadtwälle",
        updated_at: {
          $date: "2018-09-21T18:34:43.112Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928bfe"
        },
        expanded: false,
        protagonists: [
          "Philipp Kozower",
          "Gisela Kozower",
          "David Cohen",
          "Cornelia Cohen",
          ""
        ],
        images: [],
        title: "Abendessen",
        number: 37,
        source: "5",
        duration: "3:09",
        start: 1489,
        status: "Unvollständig",
        description:
          'Abendessen einer Familie (um den Tisch sitzen: Professor Cohen und Frau Cohen aus Amsterdam; Herr und Frau Kozower und Kinder aus Berlin).               ++++ Margry: „Die  Szene gibt vor, eine Familie aus Vater, Mutter, zwei Kindern und         Großeltern zu zeigen. Keinem der Filmemacher oder jedenfalls keinem der SS-Kontrolleure fiel auf, wie abwegig es war, öffentlich bekannte Personen, die wie die Ehepaare Cohen und Kozower auch noch aus verschiedenen Ländern kamen, einzusetzen, um mit ihnen eine "richtige Familie" darzustellen.“',
        music: "",
        locations: "",
        updated_at: {
          $date: "2018-09-21T18:34:43.095Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928c0f"
        },
        expanded: false,
        protagonists: ["Paul Eppstein", "Benjamin Murmelstein"],
        images: [],
        title: "Selbstverwaltung",
        number: 10,
        source: "2",
        duration: "1:58:16",
        start: 221,
        status: "vollständig",
        description:
          "Die jüdische Selbstverwaltung: eine Sitzung des Ältestenrates, die Ältesten hören einer Rede des Judenältesten Paul Eppstein zu.",
        music: "",
        locations: "",
        updated_at: {
          $date: "2018-09-21T18:34:43.113Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928c10"
        },
        expanded: false,
        protagonists: [],
        images: [],
        title: "Gesundheitswesen",
        number: 15,
        source: "3",
        duration: "1:36:01",
        start: 349,
        status: "vollständig",
        description:
          "Szenen aus den Ambulanzen, aus dem zentralen Krankenhaus; eine Operation; ein Krankenzimmer; Patienten sonnen sich im Garten der Klinik; das Kindererholungsheim; Kinder, die belegte Brote und Obst essen.",
        music: "",
        locations: "Krankenzimmer",
        updated_at: {
          $date: "2018-09-21T18:34:43.113Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928c11"
        },
        expanded: false,
        protagonists: [],
        images: [],
        title: "Landwirtschaft",
        number: 20,
        source: "",
        duration: "",
        start: 587,
        status: "verschollen",
        description:
          "(a) Gärtnerei außerhalb der Stadt: Gemüse und Kartoffeln, Seidenraupenzucht; (b) Enten- und Geflügelhaltung; (c) Ernte, eine Dreschmaschine bei der Arbeit; (d) das Wirtschaften auf dem Ackerland mit Ochsen.",
        music: "",
        locations: "",
        updated_at: {
          $date: "2018-09-21T18:34:43.113Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928c13"
        },
        expanded: false,
        protagonists: [],
        images: [],
        title: "Fußballspiel",
        number: 30,
        source: "4",
        duration: "2:54:04",
        start: 915,
        status: "vollständig",
        description:
          'Fußballspiel „Ligasieger gegen Pokalsieger“ im Hof der "Dresdner Kaserne". People heading towards gate, entering the gate, audience leaning out of the arcades on the first floor. Players passing the audience and running to the field in the courtyard of a former military barracks ("Dresdner Kaserne", lining up back to back, the referee welcoming the captains by handshake. The audience clustered around the field and in the arcades on the upper floors of the building. Kick-off, match scenes, end of the game, people leaving the field through the gate',
        music: "",
        locations: "Dresdner Kaserne",
        updated_at: {
          $date: "2018-09-21T18:34:43.114Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928c03"
        },
        expanded: false,
        protagonists: [
          "Kurt Gerron",
          "Rolf Grabower",
          "Philip Kozower",
          "Franzi Schneidhuber",
          "Elly von Bleichröder"
        ],
        images: [],
        title: "Schwimmen",
        number: 23,
        source: "",
        duration: "",
        start: -1,
        status: "verschollen",
        description: "Schwimmen im Flußbad der Eger.",
        music: "",
        locations: "Fluß Eger",
        updated_at: {
          $date: "2018-09-21T18:34:43.100Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928c14"
        },
        expanded: false,
        protagonists: [],
        images: [],
        title: "Schrebergärten",
        number: 35,
        source: "5",
        duration: "1:10:05",
        start: 1304,
        status: "vollständig",
        description:
          "Schrebergärten am Festungsgraben unterhalb der Stadtmauer. Leute arbeiten im Garten und gießen Blumen.",
        music: "",
        locations: "Festungsgraben",
        updated_at: {
          $date: "2018-09-21T18:34:43.115Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928c08"
        },
        expanded: false,
        protagonists: [],
        images: [],
        title: "Beginnender Werktag",
        number: 9,
        source: "",
        duration: "",
        start: -1,
        status: "verschollen",
        description:
          "Der Stadtplatz am Beginn eines Werktages: Gruppen singender Männer und Frauen mit geschulterten Spaten und Rechen marschieren singend zur Arbeit.",
        music: "",
        locations: "Stadtplatz",
        updated_at: {
          $date: "2018-09-21T18:34:43.106Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928c0d"
        },
        expanded: false,
        protagonists: [
          "Karel Ancerl",
          "Ernst Rosenthal",
          "Fritz Gutmann",
          "Julius Moritz",
          "Karl Meinhard",
          "Karl Löwenstein",
          "Leo Löwenstein",
          "Rudolf Saudek",
          "Heinrich Gans",
          "Heinrich Dessauer",
          "Ove Meyer",
          "Morits Oppenhejm",
          "Melanie Oppenhejm",
          "Franz Kahn",
          "Robert Mandler",
          "Erich Springer",
          "Elisabeth Czech",
          "Hans Krasa",
          "Pavel Haas "
        ],
        images: [],
        title: "Konzert",
        number: 34,
        source: "5",
        duration: "2:02:03",
        start: 1182,
        status: "vollständig",
        description:
          "Das Orchester unter der Leitung von Karel Ancerl spielt das Stück „Studie für Streichorchester“ von Pavel Haas.",
        music: "Pavel Haas: „Studie für Streichorchester“",
        locations: "",
        updated_at: {
          $date: "2018-09-21T18:34:43.108Z"
        },
        __v: 0
      },
      {
        _id: {
          $oid: "5ba539c3e99589718c928c12"
        },
        expanded: false,
        protagonists: [],
        images: [],
        title: "Maschinentischlerei",
        number: 25,
        source: "USHMM 59538",
        duration: "",
        start: -1,
        status: "verschollen",
        description:
          "In der Maschinentischlerei in einer früheren Reitschule wird Holz gesägt sowie Bretter und Bauteile für Holzbaracken hergestellt.",
        music: "",
        locations: "Tischlerei",
        updated_at: {
          $date: "2018-09-21T18:34:43.114Z"
        },
        __v: 0
      }
    ]
  })
  /* mounted() {
    fetch(API_URL)
      .then(response => response.json())
      .then(result => {
        this.message = result;
      });
  }, */
};
</script>
