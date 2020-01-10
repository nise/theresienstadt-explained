<template>
  <div id="app">
    <div class="nav-head">
      <img src="/navbar_icon.ico" id="navbar-image">
      <!-- Navbar anzeigen, wenn in keiner Schüler Ansicht -->
      <div class="routing" v-if="this.$route.path !== '/home' && this.$route.path !== '/' && this.$route.path !== '/groupanalysis' && this.$route.path !== '/individualanalysis' && this.$route.path !== '/showpartners'">
        <router-link to="/createsession">Neue Session starten</router-link>
        <router-link to="/modifysession">Sessions bearbeiten</router-link>
      </div>
    </div>
      <router-view></router-view>
          <footer class="page-footer">
      <div class="container text-center text-md-left">
        <div hidden id="nav">
          <router-link to="/pages/map">Karte</router-link>|
          <router-link to="/pages/scenes">Szenen</router-link>|
          <router-link to="/pages/persons">Personen</router-link>|
          <router-link to="/pages/history">Entstehungsgeschichte</router-link>|
        </div>
        <div class="row">
          <div class="col-md-8 mt-md-0 mt-8">
            <img
              class="footer-logo"
              alt="Logo Theresienstadt Explained"
              src="./assets/logo-black.png"
            >
          </div>
          <div class="col-md-4 mb-md-0 mb-4">
            <ul class="list-unstyled">
              <li>
                <a href="/about">Über Theresienstadt explained</a>
              </li>
              <li>
                <a href="/imprint">Impressum</a>
              </li>
              <li hidden>
                <a href="/privacy">Datenschutzerklärung</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-copyright text-center">
        © 2019 Copyright:
        <a
          href="https://jugendbegegnung.de/dresden/"
        >Förderverein Jugendbegegnung in Theresienstadt/Terezin</a>
      </div>
    </footer>
  </div>
</template>

<script>
//Popper für Bootstrap Popups, etc.
import 'popper.js/dist/popper.min.js';
//Bootstrap
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//Bootstrap Vue
import 'bootstrap-vue/dist/bootstrap-vue.css'
//Jquery für Bootstrap
import 'jquery/dist/jquery.min.js';
//Typicons Symbole
import 'typicons.font/src/font/typicons.css';
//Video.js
import 'video.js/dist/video-js.css';
import 'video.js/dist/video.min.js';
//Video.js Markers
import 'videojs-markers/dist/videojs-markers.js';
import 'videojs-markers/dist/videojs.markers.css';
//GetStudents = Default bei Aufruf root URL
import GetStudents from './components/GetStudents.vue';

export default {
  name: 'app',
  components: {
    GetStudents
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/* Breite des Kapitelfensters um 100% erhöhen -> Standard 10em ist zu klein */
.vjs-menu-button-popup .vjs-menu {
  width: 20em;
}

/*Style für Footer*/
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

/*Styles für dunkles Design analog Theresienstadt Explained*/
#app  {
    background-color: #000;
}
p {
  color: #fff;
}

p.sc-message--text-content {
  color:black;
}

h1{
  display: inline-block;
  position: relative;
  margin-top: 23px;
  margin-bottom: 23px;
  margin-left:0px;
  align-content: left;
  text-align: left;
  padding: 20px 47px 27px 47px;
  background-color:#C10000;
  color:white;
  font-family: Jost;
  font-size:2em;
  font-weight:bold;
  text-transform: uppercase;
}
h4{
  display: inline-block;
  position: relative;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left:0px;
  align-content: left;
  text-align: left;
  padding: 10px 10px 10px 10px;
  color:white;
  font-family: Jost;
  font-size:1em;
  font-weight:bold;
  text-transform: uppercase;
}
.table {
  color: white;
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
.nav-head {
  height: 40px;
  background-color: #fff;
  text-align: left;
}
.nav-head a {
  color: black;
  font-size: 15px;
  text-decoration: none;
  font-weight: bold;
  padding: 10px;
  margin-left: 10px;
  vertical-align: -6px;
  text-transform: uppercase;
  letter-spacing: 2px;
}
.nav-head a:hover {
  color: black;
  text-decoration: none;
}

.nav-head img {
  padding: 5px;
  margin-left: 10px;
  float: left;
}

button {
  margin-bottom: 20px;
}

.inputbutton {
  margin-bottom: 0px;
}

hr {
  color: white;
  border-color: white;
  background-color: white;
}

.chart {
  margin-top: 15px;
  margin-bottom: 15px;
}

.typcn {
  color: white;
}

</style>
