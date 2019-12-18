<template>
    <div class="container">
        <h1>Aufgabenpflege</h1>
        <label for="basic-url">Bitte erstellen Sie nun unten die Aufgaben. Wenn Sie alle Aufgaben eingetragen haben, dann klicken Sie auf "Abschließen"</label>
        <!-- Button Neue Aufgabe erstellen fügt neuen Input hinzu; Aufgabennr. wird automatisch eingetragen -->
        <br>
        <button class="btn btn-success" @click="createNewTask">Neue Aufgabe erstellen</button>
        <hr>
        <div v-for="(task, index) in tasks" v-bind:key="index">
            <!-- Input Group wird über v-for so oft eingefügt, wie es Aufgaben in tasks Array gibt -> über neue Aufgabe erstellen wird Array Element hinzugefügt -->
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">Aufgabe  {{task.taskNumber}}</span>
                </div>
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" style="width: 150px;">Videopfad</span>
                </div>
                <input type="text" class="form-control" placeholder="z.B. /theresienstadt.mp4" aria-label="z.B. /theresienstadt.mp4" aria-describedby="basic-addon1" v-model="task.videoPath">
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" style="width: 150px;">Szenenstartzeit</span>
                </div>
                <input type="number" class="form-control" placeholder="z.B. 20" aria-label="z.B. 20" aria-describedby="basic-addon1" v-model="task.videoStartTime">
                <div class="input-group-append">
                    <span class="input-group-text">Sekunden</span>
                </div>
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" style="width: 150px;">Szenenendzeit</span>
                </div>
                <input type="number" class="form-control" placeholder="z.B. 40" aria-label="z.B. 40" aria-describedby="basic-addon1" v-model="task.videoEndTime">
                <div class="input-group-append">
                    <span class="input-group-text">Sekunden</span>
                </div>
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" style="width: 150px;">Aufgabentext</span>
                </div>
                <input type="text" class="form-control" placeholder="z.B. Markieren Sie die Stelle, bei der Sie am auffäligsten Propaganda identifizieren" aria-label="z.B. Markieren Sie die Stelle, bei der Sie am auffäligsten Propaganda identifizieren" aria-describedby="basic-addon1" v-model="task.text">
            </div>
            <hr>
        </div>
        <button class="btn btn-primary" @click="jumpToTracking">Abschließen</button>
    </div>
</template>

<script>
//Import des TaskService für Backendanbindung für Aufgaben
import TaskService from '../../TaskService';

//Vuex Import
import { mapState } from 'vuex';
import { mapMutations } from 'vuex';

export default {
    name: 'CreateTasks',
    data() {
        return {
            error: '',
            taskNumber: 1,
            tasks: new Array
        }
    },
    //Vuex Store
    computed: {
        ...mapState({
        sessionId: "sessionId"
        })
    },
    methods: {
        //überprüfen, ob alle Input Felder ordnungsgemaß gefüllt sind; wenn ja, true; wenn nein, false
        validateInput: function () {
            let feedback = true;
            //für jede Aufgabe
            this.tasks.forEach(element => {
                //wenn alle Inputs gefüllt, dann true
                if (element.session && element.text && element.videoPath && element.videoStartTime && element.videoEndTime && element.taskNumber) {
                    feedback = true;
                    this.error = '';
                    //sonst false
                } else {
                    this.error = "Bitte tragen Sie in alle Felder etwas ein."
                    return false;
                }
            });
            return feedback;
        },
        //Neue Aufgabe in this.tasks Array erstellen und vorbefüllen
        createNewTask() {
            //wenn alle Felder der bisher erstellten Aufgaben ordnungsgemäß ausgefüllt sind
            if (this.validateInput()) {
                let newTask = {
                    session: this.sessionId,
                    text: '',
                    videoPath: '',
                    //VideoStartTime und VideoEndTime sind Zeitangaben in einem Video -> so kann ein einzelnes Video in mehrere Sequenzen aufgeteilt werden, aber es muss nur eine Videodatei abgelegt werden
                    videoStartTime: null,
                    videoEndTime: null,
                    taskNumber: this.taskNumber
                }
                this.tasks.push(newTask);
                this.taskNumber++;
            }
        },
        //Schreiben der Aufgaben in die Datenbank und dann Routing zur Tracking Seite
        jumpToTracking() {
            this.writeTasksToDatabase();
            this.$router.push('tracking');
        },
        //Schreiben aller aktuell in der Variable this.tasks vorhandenen Aufgaben in die Datenbank
        writeTasksToDatabase() {
            //nur Schreiben, wenn alles vollständig
            if (this.validateInput()) {
                //für jede Aufgabe
                this.tasks.forEach(task => {
                    //Schreibe in die Datenbank
                    TaskService.postTasks(task.session, task.text, task.videoPath, task.videoStartTime, task.videoEndTime, task.taskNumber);
                });
            }
        }
    },
}
</script>