//API zum Anlegen, Löschen, Ändern und Abfragen von Gruppen

const express = require('express');
const mongoose = require('mongoose');

//Router für GET/POST/DELETE Anfragen initialisieren
const router = express.Router();

//Gruppen Schema für Mongoose anlegen
const groupSchema = new mongoose.Schema({
    student1: String,
    student2: String,
    status: String
});

//Gruppen Klasse initialisieren
const group = mongoose.model('group', groupSchema);

//GET Requests behandeln
router.get('/:groupId', async (req, res) => {
    const groupId = req.params.groupId;
    try {
    //Gruppe aus Datenbank über Funktion abfragen
    const groupFromDatabase = await loadGroupsFromDatabase(groupId);
    //Ergebnis zurücksenden
    res.send(groupFromDatabase);
    } catch (err) {
        return console.error(err);
    }
});

//POST Requests behandeln
router.post('/', async (req, res) => {
    //neues group Objekt initialisieren
    var newGroup = new group({
        student1: req.body.student1,
        student2: req.body.student2,
        status: req.body.status
    });
    try {
    //neue Gruppe über Post Funktion in Datenbank einfügen und _id zurückgeben
    const groupId = await postGroupsToDatabase(newGroup);
    res.send(groupId);
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
    //vorhandene Gruppe über Change Funktion in Datenbank ändern und _id zurückgeben
    const groupId = await changeGroupInDatabase(id, status);
    res.send(groupId);
    } catch (err) {
        return console.error(err);
    }
});

//DELETE Requests behandeln
router.delete('/', async (req, res) => {
    try {
    //Groups über _id aus der Datenbank löschen -> Funktionsaufruf, siehe unten
    await deleteGroupFromDatabase(req.body.id);
    res.status(201).send();
    } catch (err) {
        return console.error(err);
    }
});

//Funktion zum Verbinden der Datenbank und der Collection "groups"
async function connectDatabase() {
    try {
    await mongoose.connect(dbPath + '/groups', {useNewUrlParser: true});
    } catch (err) {
        return console.error(err);
    }
}

async function loadGroupsFromDatabase(groupIdToGet) {
    try {
    //Datenbank und Collection verbinden
    await connectDatabase();
    } catch (err) {
        return console.error(err);
    }
    //alle Gruppen aus der Datenbank lesen mit groupId Filter
    var result = group.find({_id: groupIdToGet});
    return result;
}

async function postGroupsToDatabase(groupToPost) {
    return new Promise(async (resolve, reject) => {
        try {
        //Datenbank und Collection verbinden
        await connectDatabase();
        } catch (err) {
            return console.error(err);
        }
        //Gruppe über Save Funktion speichern und Fehler zurückgeben falls vorhanden
        groupToPost.save(function (err, groupDatabase) {
            if (err) reject (err);
            resolve (groupDatabase.id);
        });
    });
}

async function changeGroupInDatabase(idToUpdate, statusToUpdate) {
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
        //Gruppe über findbyidandupdate Funktion ändern und Fehler zurückgeben falls vorhanden
        group.findByIdAndUpdate(idToUpdate, updateObject, function (err, res) {
            if (err) return console.error(err);
            resolve (idToUpdate);
        });
    });
}

async function deleteGroupFromDatabase(groupToDelete) {
    try {
    //Datenbank und Collection verbinden
    await connectDatabase();
    } catch (err) {
        return console.error(err);
    }
    //Group finden und löschen
    group.findByIdAndDelete(groupToDelete, function (err, res) {
        if (err) return console.error(err);
    });
}

module.exports = router;