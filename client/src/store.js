import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const data = {}

export default new Vuex.Store({
  // strict: this.NODE_ENV !== 'production',
  state: {
    myValue: 0,
    videos: data,
    newvideo: {
      title: 'hello world',
      description: '12345678',
      tags: 'tag',
      filename: 'video.mp4',
      mimetype: '',
      format: '',
      size: '',
      length: '',
      courseid: 2,
    },
    mouse: {},
    showForm: false,
    formDataModel: {},
    currentVideo: 0,
    progresstranscode: 0,
    progressanimation: 0,
    progressthumbnail: 0,
    progresspreview: 0,
  },
  getters: {
    videos(state) {
      return function () {
        return state.videos
      }
    },
    progresstranscode(state) {
      return function () { return state.progresstranscode }
    },
    progressanimation(state) {
      return function () { return state.progressanimation }
    },
    progressthumbnail(state) {
      return function () { return state.progressthumbnail }
    },
    progresspreview(state) {
      return function () { return state.progresspreview }
    },
    newvideo(state) {
      return function () { return state.newvideo }
    },
    videoById(state) {
      return function (id) {
        if (state.videos[id] !== undefined && id !== undefined) {
          return state.videos[id]
        }
      }
    },
    isVideo(state) {
      return function (id) {
        if (state.videos[id] !== undefined && id !== undefined) {
          return true
        }
        return false
      }
    },
    currentVideoData(state) {
      return function () {
        return state.videos[state.currentVideo]
      }
    },
  },
  mutations: {
    addVideo(state, video) {
      state.videos[video.id] = video
    },
    updateVideos(state, videos) {
      // add new videos
      Object.keys(videos).forEach((v) => {
        if (state.videos[v] === undefined) { //
          console.log(222) // console.log(videos[v])
          // state.videos.push(videos[v]);
          const o = {}; o[v] = videos[v]
          // Object.assign(o, state.videos);
          state.videos[v] = videos[v]
        }
      })
      console.log(state.videos)
      const ids = Object.values(state.videos)
      // remove deleted videos from store
      // for (var vv in state.videos) {
      Object.keys(state.videos).forEach((vv) => {
        console.log(`${vv}__${typeof (state.videos[vv])}`)
        /* if(ids.indexOf(vv) === -1){
            state.videos[vv] = null;
            delete state.videos[vv];
        } */
      })
    },
    removeVideo(state, video_id) {
      // var index = state.videos.indexOf(video_id);
      // delete state.videos[video_id];
      state.videos[video_id] = null
      delete state.videos[video_id]
      // console.log(state.videos);
      // state.videos.splice(video_id, 1); //alert(0);
    },
    getFormDataModel() {

    },
    progresstranscode(state, p) {
      p = typeof (p) === 'number' ? p : 0
      state.progresstranscode = p
    },
    progressanimation(state, p) {
      p = typeof (p) === 'number' ? p : 0
      state.progressanimation = p
    },
    progressthumbnail(state, p) {
      p = typeof (p) === 'number' ? p : 0
      state.progressthumbnail = p
    },
    progresspreview(state, p) {
      p = typeof (p) === 'number' ? p : 0
      state.progresspreview = p
    },
    setCurrentVideo(state, id) {
      state.currentVideo = id
    },
    setCurrentVideoRating(state, rating) {
      state.videos[state.currentVideo].rating = rating
    },
    setVideoFileData(state, data2) {
      console.log(data2)
      if (data.isNewVideo) {
        state.newvideo.mimetype = data2.files.type
        const bam = String(data2.files.name).split('.')[1]
        state.newvideo.format = bam
        state.newvideo.size = data2.files.size
        state.newvideo.length = data2.files.duration
        state.newvideo.filename = data2.files.name // BASE_URL + 'test2/' +
      } else {
        state.videos[state.currentVideo].mimetype = data2.files.type
        state.videos[state.currentVideo].size = data2.files.size
        state.videos[state.currentVideo].filename = data2.files.name // BASE_URL + 'test2/' +
      }
    },
  },
})
