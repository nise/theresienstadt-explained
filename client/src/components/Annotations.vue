<script>
import Vue from "vue";
import VueMoment from 'vue-moment';
Vue.use(VueMoment);

export default {
    name: 'Annotations',
    props: {
        selectedPropagandaTechnique: String,
        currentTime: Number

    },
    data() {
        return {
            showAnnotationForm: false,
            newannotationtitle:'',
            newannotationreason:'',
            newannotationtime:'',
            annotations: [],
            val: 2
        }
    },
    methods: {
        toggleForm(){
        this.showAnnotationForm = true;
        },
        deleteAnnotaion(id){
        for(var i = 0; i < this.annotations.length; i++){
            if(this.annotations[i].id === id){
            delete this.annotations[i];
            }
        }
        },
        saveannotation() {
        let newAnnotation =  {
            id: Math.ceil(Math.random()*10000000),
            start: this.currentTime, 
            end: this.currentTime+1, 
            type: this.selectedPropagandaTechnique, 
            content: {
            title: this.newannotationtitle,
            reason: this.newannotationreason
            }, 
            x: 50, 
            y: 50 
        };
        //this.log(newAnnotation)
        this.annotations.push(newAnnotation);
        this.showAnnotationForm = false;
        },
        clearannotation() {
        this.showAnnotationForm = false;
        this.newannotationtime = 0;
        this.newannotationtitle = '';
        this.newannotationreason = '';
        },
        gotoTime(time){
        this.$emit("gotoTimerequest", time);
        },
    }
}
</script>

<template>
<div>
    <div class="row video-bar annotations ml-1 mt-2">
    <h4>Markierungen</h4>
    <button v-if="!showAnnotationForm" @click="toggleForm" class="btn btn-primary btn-sm left ml-2">Neue Markierung anlegen</button>
    <div v-if="showAnnotationForm" class="annotation-form col-12">
    <div class="time left">Zeitpunkt: {{ currentTime | moment('mm:ss') }}</div>
    <input v-model="newannotationtitle" placeholder="Geben Sie der Markierung einen Titel"></input><br>
    <textarea v-model="newannotationreason" placeholder="Begründen Sie, warum die markierte Stelle eine Manipulation darstellt"></textarea><br>
    <button @click="saveannotation" class="btn btn-primary left">speichern</button>
    <button @click="clearannotation" class="btn btn-link right">verwerfen</button>
    </div>
    <br/>
    <br/>
    <br/>
    <div class="annotation-list col-12">
    <ul class="scene-list">
        <li v-for="annotation in annotations" @click="gotoTime(annotation.start)">
        <a class="link">
            {{ annotation.start | moment('mm:ss') }} {{ annotation.content.title}} <i @click="deleteAnnotation(annotation.id)" class="fa fa-info right mr-2"></i>
        </a>
        <div class="description">{{ annotation.content.reason }}</div>
        
        </li>
    </ul>
    </div>
    </div>
    </div>
</template>

<style>
.scene-list {
  padding-left: 10px;
  text-align: left;
}
.scene-list li {
  list-style: none;
  display: block;
  width: auto;
}
.scene-list li a.scene {
  display: inline-block;
  padding: 1px 8px;
  white-space: nowrap;
}

.annotations {
  padding: 0 0px;
  color:#fff;
}

.annotations input{
  width:100%;
}
.annotations textarea{
  width:100%;
}

.annotations .annotation-list, .annotations .annotation-form {
  display:block;
  padding-left:10px !important;
}

.annotation-list ul{
  padding-left:0;
}

.annotation-list ul li {
  cursor: pointer;
  border-bottom: 1px solid #555;
  padding-left:6px;
}

.annotation-list ul li:hover{
  background-color: #555;
}

.annotation-list ul li .link{
  color: #fff;
  font-weight:bold;
}

.annotation-list .description {
  display:block;
  margin-left:50px;
  font-size: 0.9em;
  color:#999;

}

.left {
float:left;
}
.right {
float:right;
}
</style>