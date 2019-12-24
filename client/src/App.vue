<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
import 'popper.js/dist/popper.min.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'jquery/dist/jquery.min.js';
import 'typicons.font/src/font/typicons.css';
import 'video.js/dist/video-js.css';
import 'video.js/dist/video.min.js';
import 'videojs-markers/dist/videojs-markers.js';
import 'videojs-markers/dist/videojs.markers.css';
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
  margin-top: 60px;
}
</style>
