//API zum Anlegen, Auslesen, Ändern und Löschen von Sessions

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
    try {
    //Sessions aus Datenbank über Funktion abfragen
    const sessionsFromDatabase = await loadSessionsFromDatabase();
    //Ergebnis zurücksenden
    res.send(sessionsFromDatabase);
    } catch (err) {
        return console.error(err);
    }
});

//GET Requests mit ID Filter behandeln
router.get('/:sessionFilter', async (req, res) => {
    const sessionFilter = req.params.sessionFilter;
    try {
    //Sessions aus Datenbank über Funktion abfragen
    const sessionsFromDatabase = await loadSessionsFromDatabaseWithFilter(sessionFilter);
    //Ergebnis zurücksenden
    res.send(sessionsFromDatabase);
    } catch (err) {
        return console.error(err);
    }
});

//POST Requests behandeln
router.post('/', async (req, res) => {
    //neues Session Objekt initialisieren
    var newSession = new session({
        name: req.body.name,
        date: new Date(req.body.date),
        status: req.body.status
    });
    try {
    //neue Session über Post Funktion in Datenbank einfügen und _id zurückgeben
    const sessionId = await postSessionToDatabase(newSession);
        res.send(sessionId);
    } catch (err) {
        return console.error(err);
    }
});

//Requests für Statusänderungen behandeln; Anfragen mit /change
router.post('/change', async (req, res) => {
    //Attribute der Anfrage auslesen
    const id = req.body.id;
    const status = req.body.status;
    try {
    //vorhandene Session über Change Funktion in Datenbank ändern und _id zurückgeben
    const sessionId = await changeSessionInDatabase(id, status);
    res.send(sessionId);
    } catch (err) {
        return console.error(err);
    }
});

//DELETE Requests behandeln
router.delete('/:id', async (req, res) => {
    try {
    //Sessions über _id aus der Datenbank löschen -> Funktionsaufruf, siehe unten
    await deleteSessionFromDatabase(req.params.id);
    res.status(201).send();
    } catch (err) {
        return console.error(err);
    }
});

//Funktion zum Verbinden der Datenbank und der Collection "sessions"
async function connectDatabase() {
    try {
        await mongoose.connect(dbPath + '/sessions', {useNewUrlParser: true});
    } catch (err) {
        return console.error(err);
    }
}

async function loadSessionsFromDatabase() {
    try {
    //Datenbank und Collection verbinden
    await connectDatabase();
    } catch (err) {
        return console.error(err);
    }
    //alle Sessions aus der Datenbank lesen
    var result = session.find({});
    return result;
}

async function loadSessionsFromDatabaseWithFilter(sessionToGet) {
    try {
        //Datenbank und Collection verbinden
        await connectDatabase();
    } catch (err) {
        return console.error(err);
    }
        //alle Sessions aus der Datenbank lesen mit session Filter
        var result = session.find({_id: sessionToGet});
        return result;
}

async function postSessionToDatabase(sessionToPost) {
    return new Promise(async (resolve, reject) => {
        try {
        //Datenbank und Collection verbinden
        await connectDatabase();
        } catch (err) {
            return console.error(err);
        }
        //Session über Save Funktion speichern und Fehler zurückgeben falls vorhanden
        sessionToPost.save(function (err, sessionDatabase) {
            if (err) reject (err);
            resolve (sessionDatabase.id);
        });
    });
}

async function changeSessionInDatabase(idToUpdate, statusToUpdate) {
    return new Promise(async (resolve, reject) => {
        try {
        //Datenbank und Collection verbinden
        await connectDatabase();
        } catch (err) {
            return console.error(err);
        }
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
    try {
    //Datenbank und Collection verbinden
    await connectDatabase();
    } catch (err) {
        return console.error(err);
    }
    //Session finden und löschen
    session.findByIdAndDelete(sessionToDelete, function (err, res) {
        if (err) return console.error(err);
    });
}

module.exports = router;