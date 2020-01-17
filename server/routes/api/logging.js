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
    const phase = req.params.phase;
    const session = req.params.session;
    let newLoggingString = '';
    if (phase == 1) {
        //wenn 1, dann Individualanalyse
        //für jedes Attribut Zeile einfügen
        for (var attribute in newLoggingMessage) {
            newLoggingString = newLoggingString + attribute + ': ' + newLoggingMessage[attribute] + '\n';
        }
        fs.appendFile('./logging/Individualanalyse_' + session + '.txt', newLoggingString + '\n', function (err) {
            if (err) throw err;
            });
    } else {
        //wenn 2, dann Gruppenanalyse
        //für jedes Attribut Zeile einfügen
        for (var attribute in newLoggingMessage) {
            newLoggingString = newLoggingString + attribute + ': ' + newLoggingMessage[attribute] + '\n';
        }
        fs.appendFile('./logging/Gruppenanalyse_' + session + '.txt', newLoggingString + '\n', function (err) {
            if (err) throw err;
            });
      }
      res.sendStatus(200); 
});

module.exports = router;