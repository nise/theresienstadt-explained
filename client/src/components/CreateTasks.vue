<template>
    <div class="container">
        <!-- Anzeige eines Fehlers, falls vorhanden -->
        <div class="alert alert-danger" role="alert" v-if="error">
            Fehler: {{this.error}}
        </div>
        <h1>Schritt 2: Aufgabenpflege</h1>
        <p>Bitte erstellen Sie nun unten die Aufgaben, die die Lernenden bearbeiten sollen. Mit dem Knopf "Neue Aufgabe erstellen" legen Sie eine neue Aufgabe an. Über das ? vor jedem Textfeld erhalten Sie mehr Informationen, wenn Sie Hilfe benötigen. Wenn Sie alle Aufgaben eingetragen haben, dann klicken Sie auf "Abschließen"</p>
        <!-- Button Neue Aufgabe erstellen fügt neuen Input hinzu; Aufgabennr. wird automatisch eingetragen -->
        <hr>
        <div v-for="(task, index) in tasks" v-bind:key="index">
            <!-- Input Group wird über v-for so oft eingefügt, wie es Aufgaben in tasks Array gibt -> über neue Aufgabe erstellen wird Array Element hinzugefügt -->
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <b-button v-b-popover.hover.top="'Hier brauchen Sie keine Eingabe vornehmen. Die Aufgabennummer wird beim Anlegen vorbefüllt. Die Nummer ist ausschlaggebend dafür, in welcher Reihenfolge die Aufgaben den Lernenden angezeigt werden. Zuerst wird Aufgabe 1 angezeigt, dann Aufgabe 2, usw.'" title="Hilfe" class="btn btn-info inputbutton">
                        ?
                    </b-button>
                </div>
                <div class="input-group-prepend">
                    <span class="input-group-text">Aufgabe  {{task.taskNumber}}</span>
                </div>
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <b-button v-b-popover.hover.top="'Hier geben Sie einen Wert in Sekunden an. Der Wert wird verwendet, um für eine Aufgabe nur einen Ausschnitt aus dem Theresienstadt Film zu verwenden. Wenn der Ausschnitt bei Sekunde zwanzig startet, dann tragen Sie 20 ein. Wenn Sie keine Einschränkung vornehmen wollen, dann tragen Sie bitte 0 ein.'" title="Hilfe" class="btn btn-info inputbutton">
                        ?
                    </b-button>
                </div>
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
                    <b-button v-b-popover.hover.top="'Hier geben Sie einen Wert in Sekunden an. Der Wert wird verwendet, um für eine Aufgabe nur einen Ausschnitt aus dem Theresienstadt Film zu verwenden. Wenn der Ausschnitt bei Sekunde vierzig endet, dann tragen Sie 40 ein. Wenn Sie keine Einschränkung vornehmen wollen, dann tragen Sie bitte 0 ein.'" title="Hilfe" class="btn btn-info inputbutton">
                        ?
                    </b-button>
                </div>
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
                    <b-button v-b-popover.hover.top="'Hier handelt es sich um ein Freitextfeld. Ihre Eingabe in diesem Feld wird den Lernenden als Aufgabenstellung angezeigt.'" title="Hilfe" class="btn btn-info inputbutton">
                        ?
                    </b-button>
                </div>
                <div class="input-group-prepend">
                    <span class="input-group-text" style="width: 150px;">Aufgabentext</span>
                </div>
                <input type="text" class="form-control" placeholder="z.B. Markieren Sie die Stelle, bei der Sie am auffäligsten Propaganda identifizieren" aria-label="z.B. Markieren Sie die Stelle, bei der Sie am auffäligsten Propaganda identifizieren" aria-describedby="basic-addon1" v-model="task.text">
            </div>
            <button class="btn btn-secondary" @click="deleteTask(index)">Aufgabe löschen</button>
            <hr>
        </div>
        <button class="btn btn-success" @click="createNewTask">Neue Aufgabe erstellen</button>
        <button class="btn btn-primary" @click="jumpToTracking">Abschließen</button>
    </div>
</template>

<script>
//Import des TaskService für Backendanbindung für Aufgaben
import TaskService from '../../TaskService';
//Import des SessionService zur Statusänderung Session
import SessionService from '../../SessionService';

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
    async created() {
        //eventuell bereits bestehende Tasks aus der Datenbank holen
        try {
            this.tasks = await TaskService.getTasksWithId(this.sessionId);
        } catch (err) {
            this.error = err.message;
        }
        //wenn Tasks geholt wurden, dann Counter entsprechend hochsetzen
        this.taskNumber = this.tasks.length + 1;
    },
    //Vuex Store
    computed: {
        ...mapState({
        sessionId: "sessionId"
        })
    },
    methods: {
        //überprüfen, ob alle Input Felder ordnungsgemaß gefüllt sind; wenn ja, true; wenn nein, false
        validateInput() {
            //für jede Aufgabe
            //wenn bereits Tasks angelegt, dann durchlaufen
            if (this.tasks.length !== 0) {
                for (var i = 0; i < this.tasks.length; i++) {
                    //wenn alle Inputs gefüllt, dann true
                    if (this.tasks[i].session && this.tasks[i].text && this.tasks[i].videoPath && this.tasks[i].videoStartTime && this.tasks[i].videoEndTime && this.tasks[i].taskNumber) {
                        this.error = '';
                        //sonst false
                    } else {
                        this.error = "Bitte tragen Sie in alle Felder etwas ein."
                        return false;
                    }
                }
            } else { //sonst 
                return true;
            }
            //wenn hier angekommen, dann true
            return true;
        },
        //Neue Aufgabe in this.tasks Array erstellen und vorbefüllen
        createNewTask() {
            //wenn alle Felder der bisher erstellten Aufgaben ordnungsgemäß ausgefüllt sind
            if (this.validateInput() === true) {
                let newTask = {
                    session: this.sessionId,
                    text: '',
                    videoPath: '/theresienstadt.mp4',
                    //VideoStartTime und VideoEndTime sind Zeitangaben in einem Video -> so kann ein einzelnes Video in mehrere Sequenzen aufgeteilt werden, aber es muss nur eine Videodatei abgelegt werden
                    videoStartTime: null,
                    videoEndTime: null,
                    taskNumber: this.taskNumber
                }
                this.tasks.push(newTask);
                this.taskNumber++;
            }
        },
        //Schreiben der Aufgaben in die Datenbank und dann Routing zur Tracking Seite; Änderung Session Status
        async jumpToTracking() {
            //wenn mindestens eine Aufgabe angelegt
            if (this.tasks.length > 0) {
                //wenn alle Felder ausgefüllt
                if (this.validateInput() === true) {
                    //Aufgaben in Datenbank schreiben
                    await this.writeTasksToDatabase();
                    //Session Status umsetzen
                    SessionService.setSessionStatus(this.sessionId, 'Aufgaben_gepflegt');
                    //Routing zu Tracking
                    this.$router.push('tracking');
                }
            } else {
                this.error = "Bitte legen Sie mindestens eine Aufgabe an";
            }
        },
        //Schreiben aller aktuell in der Variable this.tasks vorhandenen Aufgaben in die Datenbank; für Fall der Änderung: löschen aller bisher vorhandenen Aufgaben und erneutes Schreiben
        async writeTasksToDatabase() {
            //lösche alle bisher für diese Session vorhandenen Aufgaben aus der Datenbank
            await TaskService.deleteAllTasksForSession(this.sessionId);
            //für jede Aufgabe
            for (var i = 0; i<this.tasks.length; i++) {
                try {
                } catch (err) {
                    this.error = err.message;
                }
                //Schreibe in die Datenbank
                TaskService.postTasks(this.tasks[i].session, this.tasks[i].text, this.tasks[i].videoPath, this.tasks[i].videoStartTime, this.tasks[i].videoEndTime, this.tasks[i].taskNumber);
            }
        },
        //löscht eine angelegte Aufgabe aus dem tasks Array; passt die TaskIds der nachfolgenden Tasks an, damit keine Lücke entsteht; setzt die TaskNumber auf den richtigen Wert nach Löschung
        deleteTask(taskIndex) {
            if (confirm('Wollen Sie die Aufgabe wirklich endgültig löschen?')) {
                this.tasks.splice(taskIndex, 1);
                //wenn der gelöschte Task nicht der letzte in der Liste war
                if (this.tasks.length !== 0) {
                    //dann durchlaufe die Tasks im Array und subtrahiere von allen nachfolgenden Tasks die Zahl 1
                    for (var i = 0; i < this.tasks.length; i++) {
                        //ist Task nachfolgend dem gelöschten Task?
                        if (this.tasks[i].taskNumber > taskIndex) {
                            this.tasks[i].taskNumber--;
                        }
                    }
                }
                //setze die TaskNumber auf die neue Länge des Arrays, außer wenn die letzte Aufgabe gelöscht wird, dann auf 1
                if (this.tasks.length !== 0) {
                this.taskNumber = this.tasks.length+1;
                } else {
                    this.taskNumber = 1;
                }
            }
        }
    },
}
</script>