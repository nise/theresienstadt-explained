//API zum Anlegen, Auslesen und Löschen von Studenten

const express = require('express');
const mongoose = require('mongoose');

//Router für GET/POST/DELETE Anfragen initialisieren
const router = express.Router();

//Student Schema für Mongoose anlegen
const studentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    session: String,
    status: String
});

//Student Klasse initialisieren
const student = mongoose.model('student', studentSchema);

//GET Requests behandeln
router.get('/:session', async (req, res) => {
    //Studenten aus Datenbank über Funktion abfragen; session ist pro Instanz der Videoanalyse eindeutig und wird automatisch generiert nach Start durch Lehrenden
    const studentsFromDatabase = await loadStudentsFromDatabase(req.params.session);
    //Ergebnis zurücksenden
    res.send(studentsFromDatabase);
});
//GET Requests mit Status behandeln
router.get('/:session/:status', async (req, res) => {
    //Studenten aus Datenbank über Funktion abfragen
    const studentsFromDatabase = await loadStudentsFromDatabaseWithStatus(req.params.session, req.params.status);
    //Ergebnis zurücksenden
    res.send(studentsFromDatabase);
});

//POST Requests behandeln
router.post('/', async (req, res) => {
    //neues Student Objekt initialisieren
    var newStudent = new student({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        session: req.body.session
    });
    //neuen Studenten über Post Funktion in Datenbank einfügen und _id zurückgeben
    const studentId = await postStudentToDatabase(newStudent);
        res.send(studentId);
});


//Requests für Statusänderungen behandeln; Anfragen mit /change
router.post('/change', async (req, res) => {
    //Attribute der Anfrage auslesen
    const id = req.body.id;
    const status = req.body.status;
    //vorhandenen Student über Change Funktion in Datenbank ändern und _id zurückgeben
    const studentId = await changeStudentInDatabase(id, status);
    res.send(studentId);
});

//DELETE Requests behandeln
router.delete('/', async (req, res) => {
    //Studenten über _id aus der Datenbank löschen -> Funktionsaufruf, siehe unten
    await deleteStudentFromDatabase(req.body.id);
    res.status(201).send();
});

//Funktion zum Verbinden der Datenbank und der Collection "students"
async function connectDatabase() {
    await mongoose.connect('mongodb://localhost:27017/students', {useNewUrlParser: true});
}

async function loadStudentsFromDatabase(sessionFilter) {
    //Datenbank und Collection verbinden
    await connectDatabase();
    //alle Studenten aus der Datenbank lesen mit der richtigen Session
    var result = student.find({session: sessionFilter});
    return result;
}

async function loadStudentsFromDatabaseWithStatus(sessionFilter, statusFilter) {
    //Datenbank und Collection verbinden
    await connectDatabase();
    //alle Studenten aus der Datenbank lesen mit der richtigen Session
    var result = student.find({session: sessionFilter, status: statusFilter});
    return result;
}

async function postStudentToDatabase(studentToPost) {
    return new Promise(async (resolve, reject) => {
        //Datenbank und Collection verbinden
        await connectDatabase();
        //Student über Save Funktion speichern und Fehler zurückgeben falls vorhanden
        studentToPost.save(function (err, studentDatabase) {
            if (err) reject (err);
            resolve (studentDatabase.id);
        });
    });
}

async function changeStudentInDatabase(idToUpdate, statusToUpdate) {
    return new Promise(async (resolve, reject) => {
        //Datenbank und Collection verbinden
        await connectDatabase();
        //Objekt aus Übergabeparametern erstellen
        updateObject = {
            status: statusToUpdate
        }
        //Session Attribut über findbyidandupdate Funktion ändern und Fehler zurückgeben falls vorhanden
        student.findByIdAndUpdate(idToUpdate, updateObject, function (err, res) {
            if (err) return console.error(err);
            resolve (idToUpdate);
        });
    });
}

async function deleteStudentFromDatabase(studentToDelete) {
    //Datenbank und Collection verbinden
    await connectDatabase();
    //Student finden und löschen
    student.findByIdAndDelete(studentToDelete, function (err, res) {
        if (err) return console.error(err);
    });
}

module.exports = router;