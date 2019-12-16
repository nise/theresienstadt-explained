//Requires für dependencies
const express = require('express');
const cors = require('cors');

//API initialisieren
const app = express();

//cors und Parser in API einbinden
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Pfad zu Students API in Konstante speichern
const students = require('./routes/api/students');

//Pfad zu Sessions API in Konstante speichern
const sessions = require('./routes/api/sessions');

//Pfad zu tasks API in Konstante speichern
const tasks = require('./routes/api/tasks');

//Pfad zu annotations API in Konstante speichern
const annotations = require('./routes/api/annotations');

//Pfad zu groups API in Konstante speichern
const groups = require('./routes/api/groups');

//Pfad zu chatMessages API in Konstante speichern
const chatMessages = require('./routes/api/chatMessages');

//Pfad zu buildGroups Operation in Konstante speichern
const buildGroups = require('./routes/operations/buildGroups');

//URL /api/students zu internem Pfad umleiten
app.use('/api/students', students);

//URL /api/sessions zu internem Pfad umleiten
app.use('/api/sessions', sessions);

//URL /api/tasks zu internem Pfad umleiten
app.use('/api/tasks', tasks);

//URL /api/annotations zu internem Pfad umleiten
app.use('/api/annotations', annotations);

//URL /api/groups zu internem Pfad umleiten
app.use('/api/groups', groups);

//URL /api/chatmessages zu internem Pfad umleiten
app.use('/api/chatmessages', chatMessages);

//URL /operations/buildGroups zu internem Pfad umleiten
app.use('/operations/buildGroups', buildGroups);

//Port Definition für Backend
const port = process.env.PORT || 5000;

//API auf oben definierten Port lauschen lassen
app.listen(port, () => console.log(`Server started on port ${port}`));
