<template>
  <div id="video">
    <div class="page-item VIDEO">
      <!-- Storage -->
      <div style="display:none; visibility:hidden;" id="vi2"></div>
      <!-- End Storage -->
      <!-- Player -->
      <div id="wrapper">
        <div id="pagex" style="overflow:hidden;">
          <a href="#/videos" @click="destroy" class="right large">
            <span class="fa fa-close video-close"></span>
          </a>
          <!-- Main -->
          <div :id="vi2_player_id" class="container-fluid">
            <h2>{{ video.title }}</h2>
            <div class="row">
              <div id="videowrapper" class="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                <div :id="video_selector"></div>
                <div :id="video_overlay_selector"></div>
                <div id="split" class="col-md-9"></div>
                <div id="screen" class="col-md-9"></div>
              </div>
              <div id="accordion-resizer" class="col-lg-3 col-md-3 col-sm-3 hidden-xs">
                <div id="accordion" class="video-metadata">
                  <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item">
                      <a
                        class="nav-link active"
                        data-toggle="tab"
                        v-bind:href="'#comments'"
                        role="tab"
                      >Kommentare</a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        data-toggle="tab"
                        :href="'#info'"
                        role="tab"
                      >Informationen</a>
                    </li>
                  </ul>

                  <div id="annotation-form">
                    <div id="annotationForm" v-show="showAnnotationForm">
                      <textarea
                        class="form-control"
                        :id="'annotationContentText'"
                        v-model="annotationContent"
                        name="comments-entry"
                        data-datatype="string"
                        placeholder
                        aria-describedby="comments-form1"
                      ></textarea>
                      <br>
                      <div class="input-group">
                        <span class="input-group-addon" id="comments-form1">Zeitpunkt (s)</span>
                        <input
                          v-model="annotationTime"
                          type="text"
                          class="form-control"
                          value
                          name="comments-entry-time"
                          data-datatype="decimal-time"
                          placeholder
                          aria-describedby="comments-form1"
                        >
                      </div>
                      <div class="btn btn-primary" v-on:click="saveAnnotation">speichern</div>
                      <a class="right btn red" v-on:click="cancelAnnotation">verwerfen</a>
                    </div>
                    <div v-show="!showAnnotationForm" v-on:click="toggle">
                      <div class="btn btn-primary">
                        <span style="font-weight:bold; font-size:200% !important;">+</span> Kommentar
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="video-controls" class="video-controls col-lg-9 col-md-9 col-sm-12 col-xs-12">
              <div class="timelines">
                <!--<div class="vi2-video-seeklink vi2-btn"></div>-->
                <div class="vi2-timeline-top"></div>
                <div class="vi2-timeline-main vi2-btn"></div>
                <div class="vi2-timeline-bottom"></div>
                <div class="vi2-video-progress vi2-btn"></div>
              </div>
              <div :class="'control-bar'">
                <div class="vi2-video-play-pause vi2-btn" title="Play/Pause">
                  <span class="fa fa-play"></span>
                  <span class="fa fa-pause"></span>
                </div>
                <div class="vi2-volume-controls right"></div>
                <div class="vi2-video-timer right"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// import Video from '../js/Video.js';
// import store from '../store';
// const videovue = new Video(store);
// const video = videovue.video;


</script>
