<template>
  <div class="home">
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <div class="container-fluid intro">
      <img class="logo" src="../assets/logo-white-big.png">
      <div class="blend"></div>
      <video class="intro-video" autoplay muted loop >
        <source src="../assets/intro.mp4" type="video/mp4">
      </video>
      <div
        class="intro-box"
      >Lorem et üürem et üürem et üürem et üürem et üürem et üürem et üürem et üürem et üürem et üürem et üürem et üürem et üüüpsüm</div>
      <div class="intro-box2">Lorem et üüüpsüm</div>
    </div>

    <!--<div>
      <b-button size="sm" @click="toggle">{{ show ? 'Hide' : 'Show' }} Alert</b-button>
      <b-alert v-model="show" class="mt-3" dismissible @dismissed="dismissed">Hello {{ name }}!</b-alert>
    </div>
    -->
    <div class="container-fluid page-apps">
      <div class="container">

        <div class="row mb-4">
          <div class="col-md-5 mr-4 app-cell">
            <img src="../assets/dummy.png">
                <div class="cell-box bottom">
                  <div class="cell-headline">
                    <router-link to="/pages/news">Aktuelles</router-link>
                  </div>
                  <div class="cell-text">Some text</div>
                </div>
          </div>
          <div class="col-md-6 app-cell">
            <img src="../assets/dummy.png">
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/pages/history">Entstehungsgeschichte des Films</router-link>
              </div>
              <div class="cell-text">Some text</div>
            </div>
          </div>
        </div>

        <div class="row mb-4 mr-5 pr-2">
          <div class="col-md-12 p-0 mr-5 app-cell">
            <img src="../assets/dummy.png">
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/pages/persons">Personen der Zeitgeschichte im Film</router-link>
              </div>
              <div class="cell-text">Some text</div>
            </div>
          </div>
        </div>

        <div class="row mb-4">
          <div class="col-md-7 p-0 mr-4 app-cell">
            <img src="../assets/dummy.png">
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/pages/map">Drehorte und Schauplätze</router-link>
              </div>
              <div class="cell-text">Some text</div>
            </div>
          </div>
          <div class="col-md-4 p-0 app-cell">
            <img src="../assets/dummy.png">
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/pages/scenes">Die 38 Szenen des Films</router-link>
              </div>
              <div class="cell-text">Some text</div>
            </div>
          </div>
        </div>


        <div class="row mb-4">
          <div class="col-md-4 mr-4 app-cell">
            <div class="row">
              <div class="col-md-12 mb-4 app-cell">
                <img src="../assets/dummy.png">
                <div class="cell-box bottom">
                  <div class="cell-headline">
                    <router-link to="/pages/fake-video">FakeVideo</router-link>
                  </div>
                  <div class="cell-text">Some text</div>
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
            <img src="../assets/dummy.png">
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/pages/propaganda">Lügt wir gefilmt.</router-link>
              </div>
              <div class="cell-text">Some text</div>
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
              <div class="cell-text">Some text</div>
            </div>
          </div>
          <div class="col-md-5 mr-4 app-cell">
            <img src="../assets/dummy.png">
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/pages/video-analyses">Filmanalyse in Gruppenarbeit</router-link>
              </div>
              <div class="cell-text">Some text</div>
            </div>
          </div>
          <div class="col-md-3 app-cell">
            <img src="../assets/dummy.png">
            <div class="cell-box bottom">
              <div class="cell-headline">
                <router-link to="/pages/references">Literatur und Filme über den Propagandafilm</router-link>
              </div>
              <div class="cell-text">Some text</div>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
const API_URL = 'http://localhost:4000/message'
// {{ message }}
export default {
  name: 'home',
  data: () => ({
    error: '',
    message: '',
  }),

  mounted() {
    fetch(API_URL)
      .then(response => response.json())
      .then((result) => {
        this.message = result
      })
  },
  methods: {},
}

/**
 * export default {
  data() {
    return {
      name: "BootstrapVue",
      show: true
    };
  },
  watch: {
    show(newVal) {
      console.log("Alert is now " + (newVal ? "visible" : "hidden"));
    }
  },
  methods: {
    toggle() {
      console.log("Toggle button clicked");
      this.show = !this.show;
    },
    dismissed() {
      console.log("Alert dismissed");
    }
  }
};
 */
</script>
