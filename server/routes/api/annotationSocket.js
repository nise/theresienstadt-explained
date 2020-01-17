//Hilfs-Backend, da Socket.io emit im Frontend nicht funktioniert
//nimmt annotation auf und sendet sie als Event zurück
//bietet Möglichkeit zum Löschen einer bereits synchronisierten Markierung beim Partner

const express = require('express');

//Router für GET/POST/DELETE Anfragen initialisieren
const router = express.Router();

//GET Requests behandeln 
router.post('/', async (req, res) => {
    io.emit('annotation', req.body);
    res.status(200).send();
});

//DELETE Requests behandeln
router.delete('/:annotationId', async (req, res) => {
    //socket.io Event schicken zur Löschung bei Partner
    io.emit('annotationDelete', req.params.annotationId);
    res.status(201).send();
});

module.exports = router;