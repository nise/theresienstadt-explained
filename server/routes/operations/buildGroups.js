//Operation zum Bilden der Dyaden für die Analyse
//zufällige Zuweisung eines Partners
//Schreiben des Partners in die Datenbank als Attribut partner

//Require für Express Framework
const express = require('express');

//Import von Axios, weil auf andere Backend Teile zugegriffen wird
const axios = require('axios');

//URL der API festlegen, auf die zugegriffen wird = students
const urlstudents = 'http://localhost:5000/api/students';
const urlsessions = 'http://localhost:5000/api/sessions';
const urlgroups = 'http://localhost:5000/api/groups'

//Router für GET/POST/DELETE Anfragen initialisieren
const router = express.Router();

//Array StudentIDs und Students initialisieren
studentIds = new Array;
students = new Array;

//GET Requests behandeln; Parameter = aktuelle Session in URL
router.get('/:session', async (req, res) => {
    //Session in Konstante speichern
    const session = req.params.session;
    try {
    //alle Schüler, die in dieser Session auf die Gruppenanalyse warten, aus Datenbank lesen; Speichern in Array students; 
    students = await getWaitingStudents(session);
    } catch (err) {
        return console.error(err);
    }
    //schreibe alle Student IDs in ein Array, um nach Zufall zu mischen
    students.forEach(student => {
        studentIds.push(student.id);
    });
    //Bestimme für jeden Studenten einen zufälligen Partner mit Funktion getRandomPartner
    students.forEach(student => {
        //Wenn Student noch keinen Partner hat, dann
        if (student.partnerId === undefined) {
        //überschreibe Student mit Objekt inkl. hinzugefügtem Attribut partnerId 
        student = getRandomPartner(student);
        }
    });

    //schreibe zugewiesene Partner in Datenbank
    students.forEach(student => {
        writePartnerToDatabase(student.id, student.partnerId);
    });
    //erstelle Gruppe mit den zwei Studenten als Attribute und speichere GruppenId in die jeweiligen Studenten als Attribut
    for (var i = 0; i<students.length; i++) {
        //nur ausführen, wenn Gruppe nicht bereits in Student geschrieben wurde -> wird nur einmal pro Gruppe durchgeführt
        if (students[i].group === undefined) {
            try {
            //erstelle Gruppe und setze die zwei Studenten als Attribute
            await createNewGroup(students[i].id, students[i].partnerId);
            } catch (err) {
                return console.error(err);
            }
        }
    }
    //setze Session Status auf groupAnalysis, damit Schüler beginnen können
    setSessionStatus(session, 'Gruppenanalyse')

    //Erfolgsmeldung senden
    res.status(200).send('Die Dyaden wurden erfolgreich gebildet');
});

//Schüler mit Status "waitingForGroupAnalysis" aus Datenbank lesen; Zugriff auf students API über axios
async function getWaitingStudents(sessionToGet) {
    try {
    const result = await axios.get(urlstudents + '/' + sessionToGet + '/' + 'wartend_auf_Gruppenanalyse');
    const data = result.data;
    const waitingStudents = data.map(student => ({
        firstName: student.firstName,
        lastName: student.lastName,
        session: student.session,
        id: student._id,
        status: student.status 
    }))
    return waitingStudents;
    } catch (err) {
    return console.error(err);
    }
}

function getRandomPartner(selectedStudent) {
    //Der Schüler darf nicht sich selbst zugeteilt werden; Bestimmung der ID, die nicht zugeteilt werden darf
    const noGoId = selectedStudent.id;
    const noGoIndex = studentIds.indexOf(noGoId);
    //Bestimme Anzahl der Studenten im Array über array length
    const numberStudents = studentIds.length-1;
    //Wähle zufälligen Studenten im Array durch Würfeln einer Zufallszahl im Bereich des gültigen Array Index
    //var random = Math.floor(Math.random() * (max - min + 1)) + min;
    var randomNumber = Math.floor(Math.random() * (numberStudents - 0 + 1)) + 0;
    //falls Zufallszahl eine Selbstzuteilung bedeuten würde, verringere Index um 1, wenn nicht bereits 0, dann +1
    if (randomNumber===noGoIndex) {
        if (randomNumber===0) {
            randomNumber++;
        } else {
            randomNumber--;
        }
    }
    //ID des Partners in partnerId Attribut schreiben
    selectedStudent.partnerId = studentIds[randomNumber];
    //Gerade zugewiesenen Schüler aus Array entfernen, um Neuzuweisung zu verhindern
    studentIds.splice(randomNumber, 1);
    //aktuellen Schüler aus Array entfernen, um Neuzuweisung zu verhindern
    studentIds.splice(noGoIndex, 1)
    //Partner für entgegengesetzten Schüler über Funktion setzen
    setPartner(selectedStudent.partnerId, noGoId);
    return selectedStudent;
}

//Partner partnerId für Schüler mit StudentId setzen
function setPartner(studentId, partnerId) {
    students.forEach(student => {
        if (student.id === studentId) {
            student.partnerId = partnerId;
        }
    });
}

//Änderung des Session Status
async function setSessionStatus(sessionId, statusName) {
    //Promise wegen async Functions
    return new Promise(async (resolve, reject) => {
        //Fehlerbehandlung
        try {
            //API mit Axios aufrufen; für Änderung mit erweiterter URL /change; Parameter id, status
            const result = await axios.post(urlsessions +'/change', {
                id: sessionId,
                status: statusName
            });
            //ID der geänderten Session zurückgeben
            resolve(result.data);
        } catch (err) {
            reject (err);
        }
    });
}

//für Student mit studentId Partner mit partnerId über API in die Datenbank schreiben
async function writePartnerToDatabase(studentId, partnerId) {
    //Partner-Namen ermitteln
    var partnerObject = students.find(student => student.id === partnerId);
    var partnerName = partnerObject.firstName + ' ' + partnerObject.lastName;
    try {
    await axios.post(urlstudents+'/changepartner', {
        id: studentId,
        partner: partnerId,
        partnerName: partnerName
    })
    } catch (err) {
        return console.error(err);
    }
}

//erstellt neue Gruppe mit student1Id und student2Id als Attribute und schreibt die GruppenId als Attribut in die zwei Students
    async function createNewGroup(student1Id, student2Id) {
        try {
    //neue Gruppe anlegen und zwei Studenten als Attribute setzen
    const groupId = await axios.post(urlgroups, {
        student1: student1Id,
        student2: student2Id,
        status: 'Gruppenanalyse'
    });
    //Gruppen-ID bei Student 1 als Attribut setzen (lokal)
    this.students.find(function(student, index) {
        if (student.id === student1Id) {
            this.students[index].group = groupId.data;
        }
    });

    //Gruppen-ID bei Student 2 als Attribut setzen (lokal)
    this.students.find(function(student, index) {
        if (student.id === student2Id) {
            this.students[index].group = groupId.data;
        }
    });

    //Gruppen-ID bei Student 1 als Attribut setzen (in DB)
    await axios.post(urlstudents+'/changegroup', {
        id: student1Id,
        group: groupId.data
    });

    //Gruppen-ID bei Student 2 als Attribut setzen (in DB)
    await axios.post(urlstudents+'/changegroup', {
        id: student2Id,
        group: groupId.data
    });
    } catch (err) {
        return console.error(err);
    }
}

module.exports = router;