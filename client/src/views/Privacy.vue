<template>
  <div class="container">
    <h1>Impressum</h1>

    <div class="page">
      <span id="clock">{{ time }}</span>
<br>
<span id="clock">{{ newTime }}</span>
<br>
      <span id="clock">{{ timeDifference }} Minuten</span>
    </div>    
  </div>
</template>

<script>
// Import the editor: https://github.com/scrumpy/tiptap
import { Editor, EditorContent } from 'tiptap'

export default {
  components: {
    
  },
  data() {
    return {
      time: null,
      newTime:null,
      timeDifference:null,
      tmp:0,
    }
  },
  mounted() {
    /**
     * TODO
     * setTimeout(1000)
     * getLocation
     * getSunRise/SunDown
     * Nice Presentation & Explanation
     * 
     */
    let now = new Date();
    let rise = new Date(2019,11,13,8,25);
    let down = new Date(2019,11,13,16,26);
    let start = new Date(2019,11,13,0,0,0);
    let end = new Date(2019,11,12,23,59,999);
    let dayTime = down.getTime() - rise.getTime();
    let nightTime = ( rise.getTime() - start.getTime() ) + (end.getTime() - down.getTime());

    this.tmp = dayTime +'_'+ nightTime;

    let isNight = false;
    if(now.getTime() < rise.getTime() || now.getTime() > down.getTime()){
      isNight = true;
    }else{
      isNight = false;
    }

    if(isNight){
      let progress = now.getTime() - down.getTime();
      let tmp = progress / nightTime;
      let newHour = Math.ceil(Math.ceil(720*tmp)/60) + down.getHours();
      let newMinute = Math.ceil(720*tmp)%60 + down.getMinutes();
      this.newTime = newHour + ':' + newMinute;
      this.timeDifference = ((newHour - now.getHours()) * 60) + Math.abs(now.getMinutes() - newMinute)
    }else{
      let progress = now.getTime() - rise.getTime();
      let tmp = progress / dayTime;
      let newHour = Math.ceil(Math.ceil(720*tmp)/60) + rise.getHours();
      let newMinute = Math.ceil(720*tmp)%60 + rise.getMinutes();
      this.newTime = newHour + ':' + newMinute;
    }

    //tmp = down.getDate();
    this.time = new Date();
  },
  watch: {
    time: function(){
      return new Date();
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>
