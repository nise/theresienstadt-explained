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
    //Autor ID in Konstante speichern
    const authorId = req.params.authorId;
    //Chat-Nachrichten aus Datenbank über Funktion abfragen
    const chatMessagesFromDatabase = await loadChatMessagesFromDatabase(authorId);
    //Ergebnis zurücksenden
    res.send(chatMessagesFromDatabase);
});

//POST Requests behandeln
router.post('/', async (req, res) => {
    //neues chatMessage Objekt initialisieren
    var newChatMessage = new chatMessage({
        type: req.body.type,
        author: req.body.author,
        data: req.body.data
    });
    //neue Chat-Nachricht über Post Funktion in Datenbank einfügen und _id zurückgeben
    const chatMessageId = await postChatMessageToDatabase(newChatMessage);
        res.send(chatMessageId);
});

//Funktion zum Verbinden der Datenbank und der Collection "chatmessages"
async function connectDatabase() {
    await mongoose.connect('mongodb://localhost:27017/chatmessages', {useNewUrlParser: true});
}

async function loadChatMessagesFromDatabase(authorToGet) {
    //Datenbank und Collection verbinden
    await connectDatabase();
    //alle Chat-Nachrichten aus der Datenbank lesen mit Autoren Filter
    var result = chatMessage.find({author: authorToGet});
    return result;
}

async function postChatMessageToDatabase(chatMessageToPost) {
    return new Promise(async (resolve, reject) => {
        //Datenbank und Collection verbinden
        await connectDatabase();
        //ChatMessage über Save Funktion speichern und Fehler zurückgeben falls vorhanden
        chatMessageToPost.save(function (err, chatMessageDatabase) {
            if (err) reject (err);
            resolve (chatMessageDatabase.id);
        });
    });
}

module.exports = router;