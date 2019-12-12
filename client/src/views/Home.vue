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
    <!--
      List of Apps:
      - Map
      - Scenes
      - Persons
      - Entstehungsgeschichte
      - Fake Videos

      For Teachers
      - Literatur
      - ArgueGraph
      - Guided Presentations
      - Andere Filme

      -->
    <div class="container-fluid page-apps">
      <div class="container">
        <div class="row mb-4">
          <div class="col-md-7 p-0 mr-4 app-cell">
            <img src="../assets/dummy.png">
            <div class="cell-box bottom">
              <div class="cell-headline">Hallo Terezin</div>
              <div class="cell-text">Some text</div>
            </div>
          </div>
          <div class="col-md-4 p-0 app-cell"></div>
        </div>
        <div class="row mb-4">
          <div class="col-md-4 mr-4 app-cell">
            <div class="row">
              <div class="col-md-12 mb-4 app-cell"></div>
            </div>
            <div class="row mr-4">
              <div class="col-md-12 app-cell"></div>
            </div>
          </div>
          <div class="col-md-7 app-cell">
            <img src="../assets/dummy.png">
            <div class="cell-box right">
              <div class="cell-headline">Hallo Terezin</div>
              <div class="cell-text">Some text</div>
            </div>
          </div>
        </div>
        <div class="row mb-4">
          <div class="col-md-5 mr-4 app-cell"></div>
          <div class="col-md-6 app-cell">
            <img src="../assets/dummy.png">
            <div class="cell-box bottom-half">
              <div class="cell-headline">Hallo Terezin</div>
              <div class="cell-text">Some text</div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 px-mr-4 app-cell"></div>
          <div class="col-md-3 px-mr-4 app-cell"></div>
          <div class="col-md-4 app-cell"></div>
        </div>
        <div class="row mx-md-n5">
          <div class="col px-md-6">
            <div class>Custom column padding</div>
          </div>
          <div class="col px-md-6">
            <div class>Custom column padding</div>
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
