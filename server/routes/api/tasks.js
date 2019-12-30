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

//GET Requests mit Session behandeln
router.get('/:session', async (req, res) => {
    try {
    //Aufgaben aus Datenbank über Funktion abfragen; session ist pro Instanz der Videoanalyse eindeutig und wird automatisch generiert nach Start durch Lehrenden
    const tasksFromDatabase = await loadTasksFromDatabaseWithSession(req.params.session);
    //Ergebnis zurücksenden
    res.send(tasksFromDatabase);
    } catch (err) {
        return console.error(err);
    }
});

//GET Requests mit Session und TaskNumber behandeln
router.get('/:session/:taskNumber', async (req, res) => {
    try {
    //Aufgaben aus Datenbank über Funktion abfragen; session ist pro Instanz der Videoanalyse eindeutig und wird automatisch generiert nach Start durch Lehrenden
    const tasksFromDatabase = await loadTasksFromDatabase(req.params.session, req.params.taskNumber);
    //Ergebnis zurücksenden
    res.send(tasksFromDatabase);
    } catch (err) {
        return console.error(err);
    }
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
    try {
    //neue Aufgabe über Post Funktion in Datenbank einfügen und _id zurückgeben
    const taskId = await postTaskToDatabase(newTask);
        res.send(taskId);
    } catch (err) {
        return console.error(err);
    }
});

//Requests für Änderungen behandeln; Anfragen mit /change
router.post('/change', async (req, res) => {
    //Attribute der Anfrage auslesen
    const id = req.body.id;
    const attributes = req.body;
    try {
    //vorhandene Aufgabe über Change Funktion in Datenbank ändern und _id zurückgeben
    const taskId = await changeTaskInDatabase(id, attributes);
    res.send(taskId);
    } catch (err) {
        return console.error(err);
    }
});

//DELETE Requests behandeln
router.delete('/', async (req, res) => {
    try {
    //Aufgaben über _id aus der Datenbank löschen -> Funktionsaufruf, siehe unten
    await deleteTaskFromDatabase(req.body.id);
    res.status(201).send();
    } catch (err) {
        return console.error(err);
    }
});

//Funktion zum Verbinden der Datenbank und der Collection "tasks"
async function connectDatabase() {
    try {
    await mongoose.connect('mongodb://localhost:27017/tasks', {useNewUrlParser: true});
    } catch (err) {
        return console.error(err);
    }
}

//laden der Aufgaben aus der Datenbank; Filter sessionFilter und taskNumberFilter als Übergabeparameter
async function loadTasksFromDatabase(sessionFilter, taskNumberFilter) {
    try {
    //Datenbank und Collection verbinden
    await connectDatabase();
    } catch (err) {
        return console.error(err);
    }
    //alle Aufgaben aus der Datenbank lesen mit der richtigen Session
    var result = task.find({session: sessionFilter, taskNumber: taskNumberFilter});
    return result;
}

async function loadTasksFromDatabaseWithSession(sessionFilter) {
    try {
        //Datenbank und Collection verbinden
        await connectDatabase();
        } catch (err) {
            return console.error(err);
        }
        //alle Aufgaben aus der Datenbank lesen mit der richtigen Session
        var result = task.find({session: sessionFilter});
        return result;
}

//speichern einer neuen Aufgabe in die Datenbank; Übergabeparameter ist task Objekt
async function postTaskToDatabase(taskToPost) {
    return new Promise(async (resolve, reject) => {
        try {
        //Datenbank und Collection verbinden
        await connectDatabase();
        } catch (err) {
            return console.error(err);
        }
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
        try {
        //Datenbank und Collection verbinden
        await connectDatabase();
        } catch (err) {
            return console.error(err);
        }
        //Task über findbyidandupdate Funktion ändern und Fehler zurückgeben falls vorhanden
        task.findByIdAndUpdate(idToUpdate, attributesToChange, function (err, res) {
            if (err) return console.error(err);
            resolve (idToUpdate);
        });
    });
}

//Löschen einer Aufgabe aus der Datenbank; Übergabeparameter taskToDelete ist _id der zu löschenden Aufgabe
async function deleteTaskFromDatabase(taskToDelete) {
    try {
    //Datenbank und Collection verbinden
    await connectDatabase();
    } catch (err) {
        return console.error(err);
    }
    //Aufgabe finden und löschen
    task.findByIdAndDelete(taskToDelete, function (err, res) {
        if (err) return console.error(err);
    });
}

module.exports = router;