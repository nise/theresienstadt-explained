<template>
  <div class="home">
    <div class="container-fluid intro">
      <img class="logo" src="../assets/logo-white-big.png" />
      <div class="blend"></div>
      <video class="intro-video" autoplay muted loop>
        <source src="../assets/intro.mp4" type="video/mp4" />
      </video>
      <div class="intro-box">
        Menschen, Orte und Propaganda im Film »Thersienstadt«
      </div>
      <div class="intro-box2"></div>
    </div>

    <!--<div>
      <b-button size="sm" @click="toggle">{{ show ? 'Hide' : 'Show' }} Alert</b-button>
      <b-alert v-model="show" class="mt-3" dismissible @dismissed="dismissed">Hello {{ name }}!</b-alert>
    </div>
    -->
    <div class="rubrik-background container-fluid page-apps">
      <div>
        <h1 class="">Der Film</h1>
        <div class="rubrik-container row">
          <div class="rubrik-element col-4">
            <router-link to="/film/player"> 
              <img class="rubrik-img" src="../assets/dummy.png"/>
            </router-link>
            <hr style="background-color: blue" />
            <p style="color: blue"><b>ALLTAG</b></p>
            <p style="color: white">
              Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum
              dolor sit amet, Lorem ipsum dolor sit amet,Lore
            </p>
          </div>

          <div class="rubrik-element col-4">
            <router-link to="/film/player"
              ><img class="rubrik-img" src="../assets/dummy.png"
            /></router-link>
            <hr style="background-color: green" />
            <p style="color: green"><b>ARBEIT</b></p>
            <p style="color: white">
              Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum
              dolor sit amet,
            </p>
          </div>

          <div class="rubrik-element col-4">
            <router-link to="/film/player"
              ><img class="rubrik-img" src="../assets/dummy.png"
            /></router-link>
            <hr style="background-color: yellow" />
            <p style="color: yellow"><b>KULTUR</b></p>
            <p style="color: white">
              Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum
              dolor sit amet,
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid page-apps">
      <div class="container">
        <div class="row mb-4">
          <div class="col-md-5 mr-4 app-cell">
            <img src="../assets/dummy.png" />
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/pages/news">Aktuelles</router-link>
              </div>
              <div class="cell-text">Aktuelles</div>
            </div>
          </div>
          <div class="col-md-6 app-cell">
            <img src="../assets/home-dreharbeiten.png" />
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/pages/history"
                  >Entstehungsgeschichte des Films</router-link
                >
              </div>
              <div class="cell-text">
                Dreharbeiten im Ghetto Theresienstadt 1942–1945,<br />
                von Eva Strusková, Jana Šplíchalová, Tomáš Fedorovič, Václav
                Kofroň
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-4 mr-5 pr-2">
          <div class="col-md-12 p-0 mr-5 app-cell">
            <img src="../assets/home-personen.png" />
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/pages/persons"
                  >Personen der Zeitgeschichte im Film</router-link
                >
              </div>
              <div class="cell-text"></div>
            </div>
          </div>
        </div>

        <div class="row mb-4">
          <div class="col-md-7 p-0 mr-4 app-cell">
            <img src="../assets/home-szenen.png" />
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/pages/scenes"
                  >Die 38 Szenen des Films</router-link
                >
              </div>
              <div class="cell-text"></div>
            </div>
          </div>
          <div class="col-md-4 p-0 app-cell">
            <img src="../assets/home-orte.png" />
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/pages/map"
                  >Drehorte und Schauplätze</router-link
                >
              </div>
              <div class="cell-text"></div>
            </div>
          </div>
        </div>

        <div class="row mb-4">
          <div class="col-md-4 mr-4 app-cell">
            <div class="row">
              <div class="col-md-12 mb-4 app-cell">
                <img src="../assets/home-fake.jpg" />
                <div class="cell-box bottom">
                  <div class="cell-headline">
                    <router-link to="/pages/fake-video">FakeVideo</router-link>
                  </div>
                  <div class="cell-text"></div>
                </div>
              </div>
            </div>
            <div class="row mr-4">
              <div class="col-md-12 app-cell">sss</div>
            </div>
          </div>
          <div class="col-md-7 app-cell">
            <img src="../assets/home-unwahrheit.png" />
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/pages/propaganda"
                  >Manipulation und Propaganda im Film</router-link
                >
              </div>
              <div class="cell-text">
                Der Film Theresienstadt dokumentierte nicht die Wirklichkeit im
                KZ, sondern
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-4 pr-4">
          <div class="col-md-3 mr-4 app-cell">
            <img src="../assets/dummy.png" />
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/pages/guided-video"
                  >Geführte Filmvorführung</router-link
                >
              </div>
              <div class="cell-text"></div>
            </div>
          </div>
          <div class="col-md-5 mr-4 app-cell">
            <img src="../assets/home-analyse.png" />
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/film/analysis"
                  >Filmanalyse in Gruppenarbeit</router-link
                >
              </div>
              <div class="cell-text"></div>
            </div>
          </div>
          <div class="col-md-3 app-cell">
            <img src="../assets/home-literatur.png" />
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/pages/references"
                  >Literatur und Filme über den Propagandafilm</router-link
                >
              </div>
              <div class="cell-text"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//const API_URL = 'http://localhost:4000/message'
// {{ message }}
export default {
  name: "home",
  data: () => ({
    error: "",
    message: "",
  }),

  mounted() {
    /* fetch(API_URL)
      .then(response => response.json())
      .then((result) => {
        this.message = result
      }) */
  },
  methods: {
    test() {
      console.log("test");
    },
  },
};
</script>


<style>
.rubrik-background {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 62.5vw;
  background-image: url(../assets/home-personen.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.rubrik-container {
  display: flex;
  justify-content: center;
  /*align-items: center;*/
  width: 95vw;
  height: 44.5vw; /**odd width and height dimensions calculated as ratios specified in reference design */
  min-height: 600px;
  background-color: #000;
  opacity: 0.7;
  backdrop-filter: blur(5px); /*backdrop filters still not working*/
  -webkit-backdrop-filter: blur(5px);
}
.rubrik-element {
  
  height: 33.33vw;
  text-align: left;
  box-sizing: content-box;
  font-size: large;
}
.rubrik-img {
  cursor: pointer;
}
.rubrik-img:hover {
  filter: brightness(120%);
}
.rubrik-header {
  width: 21.87vw;
  height: 100px;
  top: 0%;
  left: -25.7%;
  z-index: 100;
  transform: translate(0%, 50%);
  display: inline-block; /**taken from h1 in app.vue */
  position: relative;
  text-align: left;
  padding: 27px 47px 27px 47px;
  background-color: #c10000;
  color: white;
  letter-spacing: 2.8px;
  font-family: Jost;
  font-size: 2em;
  font-weight: bold;
  text-transform: uppercase;
}
.cell-headline a {
  color: #2a2a2a;
}
.cell-headline a:hover {
  color: #2a2a2a;
}
</style>
