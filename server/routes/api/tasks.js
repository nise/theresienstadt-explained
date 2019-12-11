//API zum Anlegen, Löschen, Ändern und Abfragen von Aufgaben

const express = require('express');
const mongoose = require('mongoose');

//Router für GET/POST/DELETE Anfragen initialisieren
const router = express.Router();

//Task Schema für Mongoose anlegen
const taskSchema = new mongoose.Schema({
    session: String,
    text: String,
    videoPath: String,
    videoStartTime: Number,
    videoEndTime: Number,
    taskNumber: Number
});

//Task Klasse initialisieren
const task = mongoose.model('task', taskSchema);

//GET Requests behandeln
router.get('/:session/:taskNumber', async (req, res) => {
    //Aufgaben aus Datenbank über Funktion abfragen; session ist pro Instanz der Videoanalyse eindeutig und wird automatisch generiert nach Start durch Lehrenden
    const tasksFromDatabase = await loadTasksFromDatabase(req.params.session, req.params.taskNumber);
    //Ergebnis zurücksenden
    res.send(tasksFromDatabase);
});

//POST Requests behandeln
router.post('/', async (req, res) => {
    //neues Task Objekt initialisieren
    var newTask = new task({
        session: req.body.session,
        text: req.body.text,
        videoPath: req.body.videoPath,
        //VideoStartTime und VideoEndTime sind Zeitangaben in einem Video -> so kann ein einzelnes Video in mehrere Sequenzen aufgeteilt werden, aber es muss nur eine Videodatei abgelegt werden
        videoStartTime: req.body.videoStartTime,
        videoEndTime: req.body.videoEndTime,
        taskNumber: req.body.taskNumber
    });
    //neue Aufgabe über Post Funktion in Datenbank einfügen und _id zurückgeben
    const taskId = await postTaskToDatabase(newTask);
        res.send(taskId);
});

//Requests für Änderungen behandeln; Anfragen mit /change
router.post('/change', async (req, res) => {
    //Attribute der Anfrage auslesen
    const id = req.body.id;
    const attributes = req.body;
    //vorhandene Aufgabe über Change Funktion in Datenbank ändern und _id zurückgeben
    const taskId = await changeTaskInDatabase(id, attributes);
    res.send(taskId);
});

//DELETE Requests behandeln
router.delete('/', async (req, res) => {
    //Aufgaben über _id aus der Datenbank löschen -> Funktionsaufruf, siehe unten
    await deleteTaskFromDatabase(req.body.id);
    res.status(201).send();
});

//Funktion zum Verbinden der Datenbank und der Collection "tasks"
async function connectDatabase() {
    await mongoose.connect('mongodb://localhost:27017/tasks', {useNewUrlParser: true});
}

//laden der Aufgaben aus der Datenbank; Filter sessionFilter und taskNumberFilter als Übergabeparameter
async function loadTasksFromDatabase(sessionFilter, taskNumberFilter) {
    //Datenbank und Collection verbinden
    await connectDatabase();
    //alle Aufgaben aus der Datenbank lesen mit der richtigen Session
    var result = task.find({session: sessionFilter, taskNumber: taskNumberFilter});
    return result;
}

//speichern einer neuen Aufgabe in die Datenbank; Übergabeparameter ist task Objekt
async function postTaskToDatabase(taskToPost) {
    return new Promise(async (resolve, reject) => {
        //Datenbank und Collection verbinden
        await connectDatabase();
        //Task über Save Funktion speichern und Fehler zurückgeben falls vorhanden
        taskToPost.save(function (err, taskDatabase) {
            if (err) reject (err);
            //ID des neu erstellten Tasks zurückgeben
            resolve (taskDatabase.id);
        });
    });
}

//Ändern einer oder mehrerer Attribute einer Aufgabe in der Datenbank; Übergabeparameter ist Objekt mit zu ändernden Attributen und korrespondierenden Werten
async function changeTaskInDatabase(idToUpdate, attributesToChange) {
    return new Promise(async (resolve, reject) => {
        //Datenbank und Collection verbinden
        await connectDatabase();
        //Task über findbyidandupdate Funktion ändern und Fehler zurückgeben falls vorhanden
        task.findByIdAndUpdate(idToUpdate, attributesToChange, function (err, res) {
            if (err) return console.error(err);
            resolve (idToUpdate);
        });
    });
}

//Löschen einer Aufgabe aus der Datenbank; Übergabeparameter taskToDelete ist _id der zu löschenden Aufgabe
async function deleteTaskFromDatabase(taskToDelete) {
    //Datenbank und Collection verbinden
    await connectDatabase();
    //Aufgabe finden und löschen
    task.findByIdAndDelete(taskToDelete, function (err, res) {
        if (err) return console.error(err);
    });
}

module.exports = router;