<template>
  <div class="home">
    <div class="container-fluid intro">
      <img class="logo" src="../assets/logo-white-big.png" />
      <div class="blend"></div>
      <video class="intro-video" autoplay muted loop>
        <source src="../assets/intro.mp4" type="video/mp4" />
      </video>
      <div class="intro-box">
        {{ $t("home.introbox") }}
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
        <div class="rubrik-header">
          {{ $t("home.moviehead") }}
        </div>
        <div class="rubrik-container">
          <div class="rubrik-element">
            <router-link to="/film/player/everydaylife">
              <img class="rubrik-img" src="../assets/cat-1.png" />
            </router-link>
            <hr style="background-color: blue" />
            <p style="color: blue">
              <b>{{ $t("home.everydaylifehead") }}</b>
            </p>
            <p style="color: white">
              {{ $t("home.everydaylifebody") }}
            </p>
          </div>

          <div class="rubrik-element">
            <router-link to="/film/player/work">
              <img class="rubrik-img" src="../assets/cat-2.png" />
            </router-link>
            <hr style="background-color: green" />
            <p style="color: green">
              <b>{{ $t("home.workhead") }}</b>
            </p>
            <p style="color: white">
              {{ $t("home.workbody") }}
            </p>
          </div>

          <div class="rubrik-element">
            <router-link to="/film/player/culture">
              <img class="rubrik-img" src="../assets/cat-3.png" />
            </router-link>

            <hr style="background-color: yellow" />
            <p style="color: yellow">
              <b>{{ $t("home.culturehead") }}</b>
            </p>
            <p style="color: white">
              {{ $t("home.culturebody") }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <router-link to="/film/player">{{ $t("home.linktomovie") }}</router-link>

    <div class="container-fluid page-apps">
      <div class="container">
        <div class="row mb-4">
          <div class="col-md-5 mr-4 app-cell">
            <router-link to="/pages/news"
              ><img src="../assets/dummy.png"
            /></router-link>
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/pages/news">{{
                  $t("home.news-headline")
                }}</router-link>
              </div>
              <div class="cell-text">{{ $t("home.news-description") }}</div>
            </div>
          </div>
          <div class="col-md-6 app-cell">
            <router-link to="/pages/history"
              ><img src="../assets/home-dreharbeiten.png"
            /></router-link>
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/pages/history">{{
                  $t("home.origin-headline")
                }}</router-link>
              </div>
              <div class="cell-text">
                {{ $t("home.origin-description") }}
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-4 mr-5 pr-2">
          <div class="col-md-12 p-0 mr-5 app-cell">
            <router-link to="/pages/persons"
              ><img src="../assets/home-personen.png"
            /></router-link>
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/pages/persons">{{
                  $t("home.persons-headline")
                }}</router-link>
              </div>
              <div class="cell-text">
                {{ $t("home.scenes-description") }}
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-4">
          <div class="col-md-7 p-0 mr-4 app-cell">
            <router-link to="/pages/scenes">
              <img src="../assets/home-szenen.png" />
            </router-link>
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/pages/scenes">{{
                  $t("home.scenes-headline")
                }}</router-link>
              </div>
              <div class="cell-text">{{ $t("home.scenes-description") }}</div>
            </div>
          </div>
          <div class="col-md-4 p-0 app-cell">
            <router-link to="/pages/map">
              <img src="../assets/home-orte.png" />
            </router-link>
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/pages/map">{{
                  $t("home.places-headline")
                }}</router-link>
              </div>
              <div class="cell-text">
                {{ $t("home.places-description") }}
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-4">
          <div class="col-md-4 mr-4 app-cell">
            <div class="row">
              <div class="col-md-12 mb-4 app-cell">
                <router-link to="/pages/fake-video"
                  ><img src="../assets/home-fake.jpg"
                /></router-link>
                <div class="cell-box bottom">
                  <div class="cell-headline">
                    <router-link to="/pages/fake-video">{{
                      $t("home.fake-video-headline")
                    }}</router-link>
                  </div>
                  <div class="cell-text">
                    {{ $t("home.fake-video-description") }}
                  </div>
                </div>
              </div>
            </div>
            <div class="row mr-4">
              <div class="col-md-12 app-cell">sss</div>
            </div>
          </div>
          <div class="col-md-7 app-cell">
            <router-link to="/pages/propaganda"
              ><img src="../assets/home-unwahrheit.png"
            /></router-link>
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/pages/propaganda">{{
                  $t("home.propaganda-headline")
                }}</router-link>
              </div>
              <div class="cell-text">
                {{ $t("home.propaganda-description") }}
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-4 pr-4">
          <div class="col-md-3 mr-4 app-cell">
            <router-link to="/pages/guided-video"
              ><img src="../assets/dummy.png"
            /></router-link>
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/pages/guided-video">{{
                  $t("home.guided-video-headline")
                }}</router-link>
              </div>
              <div class="cell-text">
                {{ $t("home.guided-video-description") }}
              </div>
            </div>
          </div>
          <div class="col-md-5 mr-4 app-cell">
            <router-link to="/film/analysis"
              ><img src="../assets/home-analyse.png"
            /></router-link>
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/film/analysis">{{
                  $t("home.film-analysis-headline")
                }}</router-link>
              </div>
              <div class="cell-text">
                {{ $t("home.film-analysis-description") }}
              </div>
            </div>
          </div>
          <div class="col-md-3 app-cell">
            <router-link to="/pages/references"
              ><img src="../assets/home-literatur.png"
            /></router-link>
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/pages/references">
                  {{ $t("home.references-headline") }}
                </router-link>
              </div>
              <div class="cell-text">
                {{ $t("home.references-description") }}
              </div>
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
  props: {
    selectedLanguageFromHeader: String,
  },
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
  methods: {},
  watch: {
    selectedLanguageFromHeader: function () {
      console.log(this.selectedLanguageFromHeader);
    },
  },
};
</script>

<style>
.cell-text {
  color: #333;
}
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
  width: 21.87vw;
  height: 33.33vw;
  text-align: left;
  box-sizing: content-box;
  font-size: large;
}
.rubrik-img {
  width: 21.87vw;
  height: 20.31vw;
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
