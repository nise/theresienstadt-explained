//API zum Anlegen und Auslesen von Chat-Nachrichten

const express = require('express');
const mongoose = require('mongoose');

//Router für GET/POST/DELETE Anfragen initialisieren
const router = express.Router();

//chatMessages Schema für Mongoose anlegen
const chatMessagesSchema = new mongoose.Schema({
    type: String,
    author: String,
    data: Object
});

//Session Klasse initialisieren
const chatMessage = mongoose.model('chatMessage', chatMessagesSchema);

//GET Requests behandeln
router.get('/:authorId', async (req, res) => {
    try {
    //Autor ID in Konstante speichern
    const authorId = req.params.authorId;
    //Chat-Nachrichten aus Datenbank über Funktion abfragen
    const chatMessagesFromDatabase = await loadChatMessagesFromDatabase(authorId);
    //Ergebnis zurücksenden
    res.send(chatMessagesFromDatabase);
    } catch (err) {
        return console.error(err);
    }
});

//POST Requests behandeln
router.post('/', async (req, res) => {
    //neues chatMessage Objekt initialisieren
    var newChatMessage = new chatMessage({
        type: req.body.type,
        author: req.body.author,
        data: req.body.data
    });
    try {
    //neue Chat-Nachricht über Post Funktion in Datenbank einfügen und _id zurückgeben
    const chatMessageId = await postChatMessageToDatabase(newChatMessage);
        res.send(chatMessageId);
    } catch (err) {
        return console.error(err);
    }
});

//Funktion zum Verbinden der Datenbank und der Collection "chatmessages"
async function connectDatabase() {
    try {
    await mongoose.connect(dbPath + '/chatmessages', {useNewUrlParser: true});
    } catch (err) {
        return console.error(err);
    }
}

async function loadChatMessagesFromDatabase(authorToGet) {
    try {
    //Datenbank und Collection verbinden
    await connectDatabase();
    } catch (err) {
        console.error(err);
    }
    //alle Chat-Nachrichten aus der Datenbank lesen mit Autoren Filter
    var result = chatMessage.find({author: authorToGet});
    return result;
}

async function postChatMessageToDatabase(chatMessageToPost) {
    return new Promise(async (resolve, reject) => {
        try {
        //Datenbank und Collection verbinden
        await connectDatabase();
        } catch (err) {
            return console.error(err);
        }
        //ChatMessage über Save Funktion speichern und Fehler zurückgeben falls vorhanden
        chatMessageToPost.save(function (err, chatMessageDatabase) {
            if (err) reject (err);
            resolve (chatMessageDatabase.id);
        });
    });
}

module.exports = router;