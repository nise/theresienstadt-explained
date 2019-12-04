//API zum Anlegen, Auslesen und Löschen von Sessions

const express = require('express');
const mongoose = require('mongoose');

//Router für GET/POST/DELETE Anfragen initialisieren
const router = express.Router();

//Session Schema für Mongoose anlegen
const sessionSchema = new mongoose.Schema({
    name: String,
    date: Date,
    status: String
});

//Session Klasse initialisieren
const session = mongoose.model('session', sessionSchema);

//GET Requests behandeln
router.get('/', async (req, res) => {
    //Sessions aus Datenbank über Funktion abfragen
    const sessionsFromDatabase = await loadSessionsFromDatabase();
    //Ergebnis zurücksenden
    res.send(sessionsFromDatabase);
});

//POST Requests behandeln
router.post('/', async (req, res) => {
    //neues Session Objekt initialisieren
    var newSession = new session({
        name: req.body.name,
        date: new Date(req.body.date)
    });
    //neue Session über Post Funktion in Datenbank einfügen und _id zurückgeben
    const sessionId = await postSessionToDatabase(newSession);
        res.send(sessionId);
});

//Requests für Statusänderungen behandeln; Anfragen mit /change
router.post('/change', async (req, res) => {
    //Attribute der Anfrage auslesen
    const id = req.body.id;
    const status = req.body.status;
    //vorhandene Session über Change Funktion in Datenbank ändern und _id zurückgeben
    const sessionId = await changeSessionInDatabase(id, status);
    res.send(sessionId);
});

//DELETE Requests behandeln
router.delete('/', async (req, res) => {
    //Sessions über _id aus der Datenbank löschen -> Funktionsaufruf, siehe unten
    await deleteSessionFromDatabase(req.body.id);
    res.status(201).send();
});

//Funktion zum Verbinden der Datenbank und der Collection "sessions"
async function connectDatabase() {
    await mongoose.connect('mongodb://localhost:27017/sessions', {useNewUrlParser: true});
}

async function loadSessionsFromDatabase() {
    //Datenbank und Collection verbinden
    await connectDatabase();
    //alle Studenten aus der Datenbank lesen mit der richtigen Session
    var result = session.find({});
    return result;
}

async function postSessionToDatabase(sessionToPost) {
    return new Promise(async (resolve, reject) => {
        //Datenbank und Collection verbinden
        await connectDatabase();
        //Session über Save Funktion speichern und Fehler zurückgeben falls vorhanden
        sessionToPost.save(function (err, sessionDatabase) {
            if (err) reject (err);
            resolve (sessionDatabase.id);
        });
    });
}

async function changeSessionInDatabase(idToUpdate, statusToUpdate) {
    return new Promise(async (resolve, reject) => {
        //Datenbank und Collection verbinden
        await connectDatabase();
        //Objekt aus Übergabeparametern erstellen
        updateObject = {
            status: statusToUpdate
        }
        //Session Attribut über findbyidandupdate Funktion änderun und Fehler zurückgeben falls vorhanden
        session.findByIdAndUpdate(idToUpdate, updateObject, function (err, res) {
            if (err) return console.error(err);
            resolve (idToUpdate);
        });
    });
}

async function deleteSessionFromDatabase(sessionToDelete) {
    //Datenbank und Collection verbinden
    await connectDatabase();
    //Session finden und löschen
    session.findByIdAndDelete(sessionToDelete, function (err, res) {
        if (err) return console.error(err);
    });
}

module.exports = router;