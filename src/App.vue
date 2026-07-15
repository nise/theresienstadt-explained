<template>
  <div id="app">
    <div class="nav-head pl-1">
      <img
        src="./assets/icons/favicon-32x32.png"
        class="mr-2"
        style="width: 20px"
      />
      <span
        class="routing"
        v-if="this.$route.path !== '/home' && this.$route.path !== '/'"
      >
        <router-link to="/">{{ $t("app.backbutton") }}</router-link>
      </span>
      <div style="float: right">
        <button
          class="btn btn-link"
          style="width: 30px; height: 25px; padding: 1px"
          @click="switchLanguage(0)"
        >
          DE
        </button>
        <button
          class="btn btn-link"
          style="width: 30px; height: 25px; padding: 1px"
          @click="switchLanguage(1)"
        >
          EN
        </button>
      </div>
    </div>

    <router-view :selectedLanguageFromHeader="selectedLanguage" />

    <footer v-if="footershow" class="page-footer">
      <div class="container text-center text-md-left">
        <div class="row">
          <div class="col-md-8 mt-md-0 mt-8">
            <img
              class="footer-logo"
              alt="Logo Theresienstadt Explained"
              src="./assets/logo-black.png"
            />
          </div>
          <div class="col-md-4 mb-md-0 mb-4">
            <ul class="list-unstyled">
              <li>
                <a href="/about">{{ $t("app.about") }}</a>
              </li>
              <li>
                <a href="/imprint">{{ $t("app.impress") }}</a>
              </li>
              <li>
                <a href="/privacy">{{ $t("app.privacy") }} </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-copyright text-center">
        <div>
          <img class="logo-img mr-3" src="./assets/icons/logo-google.jpg" />
          <img class="logo-img mr-3" src="./assets/icons/logo-catalpa.jpg" />
          <img class="logo-img" src="./assets/icons/logo-fuh.jpg" />
        </div>
        © 2026 Copyright:
        <a href="https://jugendbegegnung.de/dresden/">{{
          $t("app.copyright")
        }}</a>
      </div>
    </footer>
  </div>
</template>

<script>
import { i18n, loadLanguageAsync } from "./i18nsetup";

/////////////////////////
export default {
  data() {
    return {
      footershow: true,
      availableLanguages: ["ger", "en"],
      selectedLanguage: "ger", //default
    };
  },
  mounted: function () {},
  watch: {
    $route: function () {
      // Check if given route is true, if it is then hide Nav.
      if (this.$route.path.substring(0, 5) === "/film") {
        this.footershow = false;
      } else {
        this.footershow = true;
      }
    },
  },
  methods: {
    switchLanguage(buttonInput) {
      if (buttonInput < this.availableLanguages.length) {
        this.selectedLanguage = this.availableLanguages[buttonInput];
        loadLanguageAsync(this.selectedLanguage);
      }
    },
  },
};
</script>

<style>
/* @import url("https://fonts.googleapis.com/css?family=Germania+One");
@import url("https://fonts.googleapis.com/css?family=Nunito");
@import url("./assets/styles/jost.css");
*/
body {
  font-family: Jost;
}

h4 {
  font-family: "Germania One", sans-serif;
  color: seagreen;
  font-weight: 300;
}

#app {
  font-family: "Jost", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #000;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

body {
  margin: 0;
  padding: 0;
  border: 0;
  background-color: #000;
}

.nav-head {
  height: 28px;
  background-color: #fff;
  text-align: left;
}
.nav-head a {
  color: black;
  text-decoration: none;
  margin-top: 6px;
}
.nav-head a:hover {
  color: black;
  text-decoration: none;
}

.page-apps {
  background-color: #2a2a2a;
  padding-top: 100px;
  padding-bottom: 100px;
}

.page-apps .app-cell {
  background-color: #fff;
  height: 300px;
  max-width: 100%;
  overflow: hidden;
  padding-left: 0;
  padding-right: 0;
}

.page-apps .app-cell img {
  z-index: 1;
  width: 100%;
  max-height: 420px;
}

.page-apps .cell-box {
  z-index: 2;
  background-color: #fff;
  padding: 8px 20px 8px 20px;
  text-align: left;
}

.page-apps .cell-box.bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.page-apps .cell-box.bottom-half {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50%;
}

.page-apps .cell-box.right {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
}

.page-apps .cell-box .cell-headline {
  font-weight: bold;
}

footer {
  background-color: #fff;
  padding-top: 100px;
}

footer ul li a {
  font-size: 1.2em;
  color: #000;
  text-decoration: none;
}
footer ul li a:hover {
  color: #000;
  text-decoration: none;
}
footer ul {
  margin-top: 47px;
}
footer ul li {
  margin-bottom: 25px;
}

footer .footer-logo {
  width: 50%;
  height: auto;
}

.footer-copyright {
  color: #4b4a4a;
  margin-top: 50px;
  font-size: 10px;
}

.footer-copyright a {
  color: #4b4a4a;
  text-decoration: none;
}
.footer-copyright a:hover {
  color: #4b4a4a;
  text-decoration: none;
}

footer .logo-img {
  max-height: 80px;
  max-width: 200px;
}

.page a {
  text-decoration: underline;
  color: #000;
}
.page a:hover {
  color: #c10000;
}
h1 {
  display: inline-block;
  position: relative;
  margin-top: 23px;
  margin-bottom: 23px;
  margin-left: 0px;
  align-content: left;
  text-align: left;
  padding: 20px 47px 27px 47px;
  background-color: #c10000;
  color: white;
  font-family: Jost;
  font-size: 2em;
  font-weight: bold;
  text-transform: uppercase;
}
.page h2 {
  margin-top: 0.5em;
}
.page strong {
  margin-right: 6px;
  text-decoration: none;
  font-weight: normal;
}
.page {
  color: #000;
  background-color: #fff;
  align-content: left;
  text-align: left;
  padding: 20px;
  margin-bottom: 300px;
}
.page-list {
  list-style: none;
  padding-left: 1em;
}

.page-list li {
  margin-bottom: 1em;
}

.page li:before {
  content: "-";
  text-indent: -1em;
  display: inline-block;
}
</style>
