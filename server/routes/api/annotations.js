//API zum Anlegen, Löschen, Ändern und Abfragen von Markierungen

const express = require('express');
const mongoose = require('mongoose');

//Router für GET/POST/DELETE Anfragen initialisieren
const router = express.Router();

//Markierung Schema für Mongoose anlegen
const annotationSchema = new mongoose.Schema({
    session: String,
    student: String,
    annotationText: String,
    annotationStartTime: Number,
    annotationEndTime: Number,
    taskId: String
});

//Annotation Klasse initialisieren
const annotation = mongoose.model('annotation', annotationSchema);

//GET Requests behandeln
router.get('/:session/:student:/:taskId', async (req, res) => {
    //Markierungen aus Datenbank über Funktion abfragen; session ID, Student ID und Task ID als Filter
    const annotationsFromDatabase = await loadAnnotationsFromDatabase(req.params.session, req.params.student, req.params.taskId);
    //Ergebnis zurücksenden
    res.send(annotationsFromDatabase);
});

//POST Requests behandeln
router.post('/', async (req, res) => {
    //neues Annotation Objekt initialisieren
    var newAnnotation = new annotation({
        session: req.body.session,
        student: req.body.student,
        annotationText: req.body.annotationText,
        annotationStartTime: req.body.annotationStartTime,
        annotationEndTime: req.body.annotationEndTime,
        taskId: req.body.taskId
    });
    //neue Annotation über Post Funktion in Datenbank einfügen und _id zurückgeben
    const annotationId = await postAnnotationToDatabase(newAnnotation);
        res.send(annotationId);
});

//Requests für Änderungen behandeln; Anfragen mit /change
router.post('/change', async (req, res) => {
    //Attribute der Anfrage auslesen
    const id = req.body.id;
    const attributes = req.body;
    //vorhandene Annotation über Change Funktion in Datenbank ändern und _id zurückgeben
    const annotationId = await changeAnnotationInDatabase(id, attributes);
    res.send(annotationId);
});

//DELETE Requests behandeln
router.delete('/', async (req, res) => {
    //Markierungen über _id aus der Datenbank löschen -> Funktionsaufruf, siehe unten
    await deleteAnnotationFromDatabase(req.body.id);
    res.status(201).send();
});

//Funktion zum Verbinden der Datenbank und der Collection "annotations"
async function connectDatabase() {
    await mongoose.connect('mongodb://localhost:27017/annotations', {useNewUrlParser: true});
}

//laden der Markierungen aus der Datenbank; Filter sessionFilter (sessionId), studentFilter(studentId) und taskId als Übergabeparameter
async function loadAnnotationsFromDatabase(sessionFilter, studentFilter, taskIdFilter) {
    //Datenbank und Collection verbinden
    await connectDatabase();
    //alle Markierungen aus der Datenbank lesen mit der richtigen Session und vom richtigen Studenten
    var result = annotation.find({session: sessionFilter, student: studentFilter, taskId: taskIdFilter});
    return result;
}

//speichern einer neuen Markierung in die Datenbank; Übergabeparameter ist annotation Objekt
async function postAnnotationToDatabase(annotationToPost) {
    return new Promise(async (resolve, reject) => {
        //Datenbank und Collection verbinden
        await connectDatabase();
        //Annotation über Save Funktion speichern und Fehler zurückgeben falls vorhanden
        annotationToPost.save(function (err, annotationDatabase) {
            if (err) reject (err);
            //ID der neu erstellten annotation zurückgeben
            resolve (annotationDatabase.id);
        });
    });
}

//Ändern einer oder mehrerer Attribute einer Markierung in der Datenbank; Übergabeparameter ist Objekt mit zu ändernden Attributen und korrespondierenden Werten
async function changeAnnotationInDatabase(idToUpdate, attributesToChange) {
    return new Promise(async (resolve, reject) => {
        //Datenbank und Collection verbinden
        await connectDatabase();
        //Annotation über findbyidandupdate Funktion ändern und Fehler zurückgeben falls vorhanden
        annotation.findByIdAndUpdate(idToUpdate, attributesToChange, function (err, res) {
            if (err) return console.error(err);
            resolve (idToUpdate);
        });
    });
}

//Löschen einer Annotation aus der Datenbank; Übergabeparameter annotationToDelete ist _id der zu löschenden Markierung
async function deleteAnnotationFromDatabase(annotationToDelete) {
    //Datenbank und Collection verbinden
    await connectDatabase();
    //Markierung finden und löschen
    annotation.findByIdAndDelete(annotationToDelete, function (err, res) {
        if (err) return console.error(err);
    });
}

module.exports = router;