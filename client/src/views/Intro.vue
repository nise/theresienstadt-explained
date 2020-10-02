<template>
  <div class="home">
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <div class="container-fluid intro">
      <img class="logo" src="../assets/logo-white-big.png" />
      <div class="blend"></div>
      <video class="intro-video" autoplay muted loop>
        <source src="../assets/intro.mp4" type="video/mp4" />
      </video>
      <div class="intro-box">
        Auf dieser Seite wird in Kürze der NS-Propagandafilm »Theresienstadt« wird in einer WebApp durch geografische, biografische und die Propaganda entlarvende Annotationen kommentiert und mit Ansichten heutiger Plätze und aktuellen Beispielen von Fake Videos kontrastiert.
      </div>
      <div class="intro-box2">Lorem et üüüpsüm</div>
    </div>
  </div>
</template>

<script>
const API_URL = 'http://localhost:4000/message'
// {{ message }}
export default {
  name: 'intro',
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
</script>
