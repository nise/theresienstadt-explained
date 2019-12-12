<template>
  <div id="app">
    <div class="nav-head">
      <div class="routing" v-if="this.$route.path !== '/home' && this.$route.path !== '/'">
        <router-link to="/">ZURÜCK</router-link>
      </div>
    </div>

    <router-view/>

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


<style>
@import url("https://fonts.googleapis.com/css?family=Germania+One");
@import url("https://fonts.googleapis.com/css?family=Nunito");
@import url("./assets/styles/jost.css");

body{
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
  padding: 4px 6px;
}
.nav-head a:hover {
  color: black;
  text-decoration: none;
}

.intro {
  height: 150vh;
}

.intro.container-fluid {
  padding: 0;
  background-color: #000;
  /*background-image: url(assets/bg-intro.png);*/
  background-repeat: no-repeat;
  background-size: 100% auto;
}

.intro-video {
  position: absolute;
  right: 0;
  top: 28;
  min-width: 100%;
  min-height: 100%;
}

.intro .blend {
  z-index: 2;
  position: absolute;
  top: 28px;
  width: 100%;
  height: 120vh;
  background-color: rgb(0, 0, 0);
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 25%,
    rgba(0, 212, 255, 0) 100%
  );
}

.intro .logo {
  z-index: 3;
  position: absolute;
  top: 0;
  left: 25%;
  width: 45%;
  margin-top: 20%;
}

.intro .intro-box {
  z-index: 3;
  width: 60%;
  font-family: 'Jost';
  position: absolute;
  top: 80vh;
  left: 17%;
  margin: 0px auto 0px auto;
  padding: 30px 28px 30px 28px;
  color: #fff;
  border: solid 2px #fff;
}

.intro .intro-box2 {
  z-index: 4;
  width: 250px;
  font-family: "Germania One", sans-serif;
  position: absolute;
  top: 95vh;
  left: 50%;
  margin: 0px auto 0px auto;
  padding: 6px 7px;
  background-color: #c10000;
  color: #000;
  border: none;
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
}

.page-apps .app-cell img {
  z-index: 1;
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

.page-apps .cell-box .cell-text {
  font-weight: 1;
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

.page a {
  text-decoration: underline;
  color:#000;
}
.page a:hover{
  color: #C10000;
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
.page h2{
  margin-top:0.5em;
}
.page strong {
  margin-right:6px;
  text-decoration: none;
  font-weight: normal;
}
.page {
  color:#000;
  background-color: #fff;
  align-content: left;
  text-align:left;
  padding:20px;
  margin-bottom: 300px;
}
.page-list {
  list-style: none;
  padding-left: 1em;
}

.page-list li{
  margin-bottom: 1em;
}

.page li:before{
      content: "-";
      text-indent: -1em;
      display: inline-block;
    }


</style>
