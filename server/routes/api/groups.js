//API zum Anlegen, Löschen, Ändern und Abfragen von Gruppen

const express = require('express');
const mongoose = require('mongoose');

//Router für GET/POST/DELETE Anfragen initialisieren
const router = express.Router();

//Gruppen Schema für Mongoose anlegen
const groupSchema = new mongoose.Schema({
    student1: String,
    student2: String
});

//Gruppen Klasse initialisieren
const group = mongoose.model('group', groupSchema);

//GET Requests behandeln
router.get('/:groupId', async (req, res) => {
    const groupId = req.params.groupId;
    //Gruppe aus Datenbank über Funktion abfragen
    const groupFromDatabase = await loadGroupsFromDatabase(groupId);
    //Ergebnis zurücksenden
    res.send(groupFromDatabase);
});

//POST Requests behandeln
router.post('/', async (req, res) => {
    //neues group Objekt initialisieren
    var newGroup = new group({
        student1: req.body.student1,
        student2: req.body.student2
    });
    //neue Gruppe über Post Funktion in Datenbank einfügen und _id zurückgeben
    const groupId = await postGroupsToDatabase(newGroup);
    res.send(groupId);
});

//DELETE Requests behandeln
router.delete('/', async (req, res) => {
    //Groups über _id aus der Datenbank löschen -> Funktionsaufruf, siehe unten
    await deleteGroupFromDatabase(req.body.id);
    res.status(201).send();
});

//Funktion zum Verbinden der Datenbank und der Collection "groups"
async function connectDatabase() {
    await mongoose.connect('mongodb://localhost:27017/groups', {useNewUrlParser: true});
}

async function loadGroupsFromDatabase(groupIdToGet) {
    //Datenbank und Collection verbinden
    await connectDatabase();
    //alle Gruppen aus der Datenbank lesen mit groupId Filter
    var result = group.find({_id: groupIdToGet});
    return result;
}

async function postGroupsToDatabase(groupToPost) {
    return new Promise(async (resolve, reject) => {
        //Datenbank und Collection verbinden
        await connectDatabase();
        //Gruppe über Save Funktion speichern und Fehler zurückgeben falls vorhanden
        groupToPost.save(function (err, groupDatabase) {
            if (err) reject (err);
            resolve (groupDatabase.id);
        });
    });
}

async function deleteGroupFromDatabase(groupToDelete) {
    //Datenbank und Collection verbinden
    await connectDatabase();
    //Group finden und löschen
    group.findByIdAndDelete(groupToDelete, function (err, res) {
        if (err) return console.error(err);
    });
}

module.exports = router;