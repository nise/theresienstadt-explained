//API zum Hinzufügen von Logging Meldungen

//Require für Express
const express = require('express');
//Require für FileSystem zum Schreiben der Logging-Dateien
const fs = require('fs'); 

//Router für GET Anfragen initialisieren
const router = express.Router();

//POST Requests behandeln
router.post('/:phase/:session', async (req, res) => {
    const newLoggingMessage = req.body;
    let phase;
    if (req.params.phase == 1) {
        phase = 'Individualanalyse';
    } else {
        phase = 'Gruppenanalyse'
    }
    const session = req.params.session;
    let newLoggingString = newLoggingMessage.Zeitpunkt+';'+phase+';'+session+';'+newLoggingMessage.Meldung+';'+newLoggingMessage.Student+';'+newLoggingMessage.Gruppe+';'+newLoggingMessage.Aufgabe+';'+newLoggingMessage.Anzahl_der_Markierungen+';'+newLoggingMessage.Anzahl_der_Chatnachrichten+';'+newLoggingMessage.Aktueller_Video_Zeitpunkt+';'+newLoggingMessage.Gespult_zu;
        fs.appendFile('./logging/Videologging.csv', newLoggingString + '\n', function (err) {
            if (err) throw err;
            });

      res.sendStatus(200); 
});

module.exports = router;