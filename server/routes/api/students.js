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
    status: String,
    partner: String,
    group: String,
    partnerName: String
});

//Student Klasse initialisieren
const student = mongoose.model('student', studentSchema);

//GET Requests behandeln
router.get('/:session', async (req, res) => {
    try {
    //Studenten aus Datenbank über Funktion abfragen; session ist pro Instanz der Videoanalyse eindeutig und wird automatisch generiert nach Start durch Lehrenden
    const studentsFromDatabase = await loadStudentsFromDatabase(req.params.session);
    //Ergebnis zurücksenden
    res.send(studentsFromDatabase);
    } catch (err) {
        return console.error(err);
    }
});
//GET Requests mit Status behandeln
router.get('/:session/:status', async (req, res) => {
    try {
    //Studenten aus Datenbank über Funktion abfragen
    const studentsFromDatabase = await loadStudentsFromDatabaseWithStatus(req.params.session, req.params.status);
    //Ergebnis zurücksenden
    res.send(studentsFromDatabase);
    } catch (err) {
        return console.error(err);
    }
});

//POST Requests behandeln
router.post('/', async (req, res) => {
    //neues Student Objekt initialisieren
    var newStudent = new student({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        session: req.body.session,
        status: req.body.status
    });
    try {
    //neuen Studenten über Post Funktion in Datenbank einfügen und _id zurückgeben
    const studentId = await postStudentToDatabase(newStudent);
        res.send(studentId);
    } catch (err) {
        return console.error(err);
    }
});

//Requests für Statusänderungen behandeln; Anfragen mit /changestatus
router.post('/changestatus', async (req, res) => {
    //Attribute der Anfrage auslesen
    const id = req.body.id;
    const status = req.body.status;
    try {
    //vorhandenen Student über Change Funktion in Datenbank ändern und _id zurückgeben
    const studentId = await changeStudentStatusInDatabase(id, status);
    res.send(studentId);
    } catch (err) {
        return console.error(err);
    }
});

//Requests für Partneränderungen behandeln; Anfragen mit /changepartner
router.post('/changepartner', async (req, res) => {
    //Attribute der Anfrage auslesen
    const id = req.body.id;
    const partner = req.body.partner;
    const partnerName = req.body.partnerName;
    try {
    //vorhandenen Student über Change Funktion in Datenbank ändern und _id zurückgeben
    const studentId = await changeStudentPartnerInDatabase(id, partner, partnerName);
    res.send(studentId);
    } catch (err) {
        return console.error(err);
    }
});

//Requests für Gruppenänderungen behandeln; Anfragen mit /changegroup
router.post('/changegroup', async (req, res) => {
    //Attribute der Anfrage auslesen
    const id = req.body.id;
    const group = req.body.group;
    try {
    //vorhandenen Student über Change Funktion in Datenbank ändern und _id zurückgeben
    const studentId = await changeStudentGroupInDatabase(id, group);
    res.send(studentId);
    } catch (err) {
        return console.error(err);
    }
});

//DELETE Requests behandeln
router.delete('/:id', async (req, res) => {
    try {
    //Studenten über _id aus der Datenbank löschen -> Funktionsaufruf, siehe unten
    await deleteStudentFromDatabase(req.params.id);
    res.status(201).send();
    } catch (err) {
        return console.error(err);
    }
});

//Funktion zum Verbinden der Datenbank und der Collection "students"
async function connectDatabase() {
    try {
    await mongoose.connect('mongodb://localhost:27017/students', {useNewUrlParser: true});
    } catch (err) {
        return console.error(err);
    }
}

async function loadStudentsFromDatabase(sessionFilter) {
    try {
    //Datenbank und Collection verbinden
    await connectDatabase();
    } catch (err) {
        return console.error(err);
    }
    //alle Studenten aus der Datenbank lesen mit der richtigen Session
    var result = student.find({session: sessionFilter});
    return result;
}

async function loadStudentsFromDatabaseWithStatus(sessionFilter, statusFilter) {
    try {
    //Datenbank und Collection verbinden
    await connectDatabase();
    } catch (err) {
        return console.error(err);
    }
    //alle Studenten aus der Datenbank lesen mit der richtigen Session
    var result = student.find({session: sessionFilter, status: statusFilter});
    return result;
}

async function postStudentToDatabase(studentToPost) {
    return new Promise(async (resolve, reject) => {
        try {
        //Datenbank und Collection verbinden
        await connectDatabase();
        } catch (err) {
            return console.error(err);
        }
        //Student über Save Funktion speichern und Fehler zurückgeben falls vorhanden
        studentToPost.save(function (err, studentDatabase) {
            if (err) reject (err);
            resolve (studentDatabase.id);
        });
    });
}

//setze neuen Status bei Student mit id idToUpdate
async function changeStudentStatusInDatabase(idToUpdate, statusToUpdate) {
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
        //Session Attribut über findbyidandupdate Funktion ändern und Fehler zurückgeben falls vorhanden
        student.findByIdAndUpdate(idToUpdate, updateObject, function (err, res) {
            if (err) return console.error(err);
            resolve (idToUpdate);
        });
    });
}

//setze neuen Partner bei Student mit id idToUpdate
async function changeStudentPartnerInDatabase(idToUpdate, partnerToUpdate, partnerNameToUpdate) {
    return new Promise(async (resolve, reject) => {
        try {
        //Datenbank und Collection verbinden
        await connectDatabase();
        } catch (err) {
            return console.error(err);
        }
        //Objekt aus Übergabeparametern erstellen
        updateObject = {
            partner: partnerToUpdate,
            partnerName: partnerNameToUpdate
        }
        //Student über findbyidandupdate Funktion ändern und Fehler zurückgeben falls vorhanden
        student.findByIdAndUpdate(idToUpdate, updateObject, function (err, res) {
            if (err) return console.error(err);
        });
        resolve(idToUpdate);
    });
}

//setze neue Gruppe bei Student mit id idToUpdate
async function changeStudentGroupInDatabase(idToUpdate, groupToUpdate) {
    return new Promise(async (resolve, reject) => {
        try {
        //Datenbank und Collection verbinden
        await connectDatabase();
        } catch (err) {
            return console.error(err);
        }
        //Objekt aus Übergabeparametern erstellen
        updateObject = {
            group: groupToUpdate
        }
        //Student über findbyidandupdate Funktion ändern und Fehler zurückgeben falls vorhanden
        student.findByIdAndUpdate(idToUpdate, updateObject, function (err, res) {
            if (err) return console.error(err);
            resolve (idToUpdate);
        });
    });
}

async function deleteStudentFromDatabase(studentToDelete) {
    try {
    //Datenbank und Collection verbinden
    await connectDatabase();
    } catch (err) {
        return console.error(err);
    }
    //Student finden und löschen
    student.findByIdAndDelete(studentToDelete, function (err, res) {
        if (err) return console.error(err);
    });
}

module.exports = router;