//Requires für dependencies
const express = require('express');
const cors = require('cors');

//API initialisieren
const app = express();

//cors und Parser in API einbinden
app.use(cors());
app.use(express.json());

//Pfad zu Students API in Konstante speichern
const students = require('./routes/api/students');

//URL /api/students zu internem Pfad umleiten
app.use('/api/students', students);

//Port Definition für Backend
const port = process.env.PORT || 5000;

//API auf oben definierten Port lauschen lassen
app.listen(port, () => console.log(`Server started on port ${port}`));
