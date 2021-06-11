<template>
  <div class="home">
    <div class="container-fluid intro">
      <img class="logo" src="../assets/logo-white-big.png">
      <div class="blend"></div>
      <video class="intro-video" autoplay muted loop >
        <source src="../assets/intro.mp4" type="video/mp4">
      </video>
      <div class="intro-box">
        Fake News aus dem Jahre 1945. Der NS-Propagandafilm »Theresienstadt« täuscht durch seine Bilder und Musik über die wahren Zustände im Konzentrationslager hinweg. Wir entlarven die Propaganda und Manipulation, berichten über die unfreiwilligen Protagonisten und zeigen die Drehorte.
</div>
      <div class="intro-box2"></div>
    </div>

    <!--<div>
      <b-button size="sm" @click="toggle">{{ show ? 'Hide' : 'Show' }} Alert</b-button>
      <b-alert v-model="show" class="mt-3" dismissible @dismissed="dismissed">Hello {{ name }}!</b-alert>
    </div>
    -->
    <div class="rubrik-background">
      <div>
        <div class="rubrik-header">
          {{$t("home.moviehead")}}
        </div>
      <div class="rubrik-container">
        
        <div class="rubrik-element">
          <img class="rubrik-img" src="../assets/dummy.png" @click="test"/>
          <hr style="background-color:blue">
          <p style="color:blue"> <b>{{$t("home.everydaylifehead")}}</b> </p>
          <p style="color:white">
            {{$t("home.everydaylifebody")}}
          </p>
        </div>

        <div class="rubrik-element">
          <img class="rubrik-img" src="../assets/dummy.png" @click="test"/>
          <hr style="background-color:green">
          <p style="color:green"> <b>{{$t("home.workhead")}}</b> </p>
          <p style="color:white;">
            {{$t("home.workbody")}}
          </p>
        </div>

        <div class="rubrik-element">
          <img class="rubrik-img" src="../assets/dummy.png" @click="test"/>
          <hr style="background-color:yellow">
          <p style="color:yellow"> <b>{{$t("home.culturehead")}}</b> </p> 
          <p style="color:white">
            {{$t("home.culturebody")}}
          </p>
        </div>
      </div>
      </div>
    </div>


    <router-link to="/film/player">{{$t("home.linktomovie")}}</router-link>


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
            <img src="../assets/home-dreharbeiten.png">
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/pages/history">Entstehungsgeschichte des Films</router-link>
              </div>
              <div class="cell-text">Dreharbeiten im Ghetto Theresienstadt 1942–1945,<br> von Eva Strusková, Jana Šplíchalová, Tomáš Fedorovič, Václav Kofroň</div>
            </div>
          </div>
        </div>

        <div class="row mb-4 mr-5 pr-2">
          <div class="col-md-12 p-0 mr-5 app-cell">
            <img src="../assets/home-personen.png">
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/pages/persons">Personen der Zeitgeschichte im Film</router-link>
              </div>
              <div class="cell-text"></div>
            </div>
          </div>
        </div>

        <div class="row mb-4">
          <div class="col-md-7 p-0 mr-4 app-cell">
            <img src="../assets/home-szenen.png">
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/pages/scenes">Die 38 Szenen des Films</router-link>
              </div>
              <div class="cell-text"></div>
            </div>
          </div>
          <div class="col-md-4 p-0 app-cell">
            <img src="../assets/home-orte.png">
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/pages/map">Drehorte und Schauplätze</router-link>
              </div>
              <div class="cell-text"></div>
            </div>
          </div>
        </div>


        <div class="row mb-4">
          <div class="col-md-4 mr-4 app-cell">
            <div class="row">
              <div class="col-md-12 mb-4 app-cell">
                <img src="../assets/home-fake.jpg">
                <div class="cell-box bottom">
                  <div class="cell-headline">
                    <router-link to="/pages/fake-video">FakeVideo</router-link>
                  </div>
                  <div class="cell-text"></div>
                </div>
              </div>
            </div>
            <div class="row mr-4">
              <div class="col-md-12 app-cell">
                sss
              </div>
            </div>
          </div>
          <div class="col-md-7 app-cell">
            <img src="../assets/home-unwahrheit.png">
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/pages/propaganda">Manipulation und Propaganda im Film</router-link>
              </div>
              <div class="cell-text">Der Film Theresienstadt dokumentierte nicht die Wirklichkeit im KZ, sondern </div>
            </div>
          </div>
        </div>

        
        <div class="row mb-4 pr-4">
          <div class="col-md-3 mr-4 app-cell">
            <img src="../assets/dummy.png">
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/pages/guided-video">Geführte Filmvorführung</router-link>
              </div>
              <div class="cell-text"></div>
            </div>
          </div>
          <div class="col-md-5 mr-4 app-cell">
            <img src="../assets/home-analyse.png">
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/film/analysis">Filmanalyse in Gruppenarbeit</router-link>
              </div>
              <div class="cell-text"></div>
            </div>
          </div>
          <div class="col-md-3 app-cell">
            <img src="../assets/home-literatur.png">
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/pages/references">Literatur und Filme über den Propagandafilm</router-link>
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
  name: 'home',
  props: {
    selectedLanguageFromHeader: String
  },
  data: () => ({
    error: '',
    message: '',
  }),

  mounted() {
    /* fetch(API_URL)
      .then(response => response.json())
      .then((result) => {
        this.message = result
      }) */
  },
  methods: {
    test(){
      console.log("test");
    }
  },
  watch: {
    selectedLanguageFromHeader: function(){
      console.log(this.selectedLanguageFromHeader);
    }
  }
}
</script>


<style>
.rubrik-background{
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
.rubrik-container{
  display: flex;
  justify-content: center;
  /*align-items: center;*/
  width: 95vw;
  height: 44.5vw;             /**odd width and height dimensions calculated as ratios specified in reference design */
  min-height: 600px;
  background-color: #000;
  opacity: 0.7;
  backdrop-filter: blur(5px);           /*backdrop filters still not working*/
  -webkit-backdrop-filter: blur(5px);
}
.rubrik-element{
  width: 21.87vw;
  height: 33.33vw;
  padding-top: 7.7%;
  padding-left: 1.37%;
  padding-right: 1.37%;
  text-align: left;
  box-sizing: content-box;
  font-size: large;
}
.rubrik-img{
  width: 21.87vw;
  height: 20.31vw;
  cursor: pointer;
  /*width: 100%;
  height: 61%;*/
}
.rubrik-img:hover{
  filter: brightness(120%);
}
.rubrik-header{     
  width: 21.87vw;
  height: 100px;
  top: 0%;
  left: -25.7%;
  z-index: 100;
  transform: translate(0%, 50%);
  display: inline-block;  /**taken from h1 in app.vue */
  position: relative;
  text-align: left;
  padding: 27px 47px 27px 47px;
  background-color:#C10000;
  color:white;
  letter-spacing: 2.8px;
  font-family: Jost;
  font-size:2em;
  font-weight:bold;
  text-transform: uppercase;
}
.cell-headline a{
  color:#2a2a2a;
}
.cell-headline a:hover{
  color:#2a2a2a;
}
</style>
