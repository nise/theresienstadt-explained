//Operation zum Bilden der Dyaden für die Analyse; erstes Kriterium -> Übereinstimmungen beim Markieren; zweites Kriterium -> Unterschiede bei der Länge der Begründungen
//Schreiben des Partners in die Datenbank als Attribut partner
//Schreiben der Gruppe in die Datenbank mit den Studenten als Attribute

//Require für Express Framework
const express = require('express');

//Import von Axios, weil auf andere Backend Teile zugegriffen wird
const axios = require('axios');

//Import des Moduls IntervalTree zur Feststellung von Übereinstimmungen bei Markierungen
const IntervalTree =  require('@flatten-js/interval-tree').default;

students = new Array;

//Router für GET/POST/DELETE Anfragen initialisieren
const router = express.Router();

//GET Requests behandeln; Parameter = aktuelle Session in URL
router.get('/:session', async (req, res) => {

    let pairs = new Array;

    //Session in Konstante speichern
    const session = req.params.session;
    //Aufgaben für die Session aus dem Backend holen
    let tasks = await getTasksForSession(session);
    try {
    //alle Schüler, die in dieser Session auf die Gruppenanalyse warten, aus Datenbank lesen; Speichern in Array students; 
    const students = await getWaitingStudents(session);

    //erstelle Array mit allen möglichen Paarungen von Schülern
    for (let i = students.length - 1; i >= 0; i--) {
        for (let j = i - 1; j >= 0; j--) {
            let newPair = {
                student1Id: students[i].id,
                student2Id: students[j].id,
                score: 0
            };
            pairs.push(newPair);
        }
    }

    for (let i=0; i<tasks.length;i++) {
        //alle Markierungen der Session und des Tasks in Annotations Array speichern
            const annotations = await getAnnotationsForSessionAndTask(session, tasks[i].id);
            //neuen IntervalTree anlegen zur Auswertung Markierungen
            let annotationTree = new IntervalTree();
            //Intervalle mit Referenz auf jeweiligen Studenten in IntervalTree schreiben;
            for (let i=0; i < annotations.length; i++) {
                let newAnnotation = {
                    interval: [annotations[i].annotationStartTime, annotations[i].annotationEndTime],
                    studentId: annotations[i].student
                }
                annotationTree.insert(newAnnotation.interval, newAnnotation.studentId);
            }
            //durchlaufe jede mögliche Paarung und prüfe, ob Überschneidungen vorhanden sind; wenn Überschneidungen vorhanden sind, dann reduziere Score pro Überschneidung um 100
            pairs.forEach(pair => {
                //ermittle die Markierungen von Student 1
                let annotationsStudent1 = annotations.filter(annotation => annotation.student === pair.student1Id);
                //ermittle für jede Markierung von Student 1 die Übereinstimmungen im IntervalTree
                annotationsStudent1.forEach(annotation => {
                    let positives = annotationTree.search([annotation.annotationStartTime, annotation.annotationEndTime], (idOfStudent, index) => {
                        //gebe Array zurück mit ID des Studenten und markierter Stelle
                        return [idOfStudent, index.low, index.high];
                    });
                    //wenn Übereinstimmungen gefunden
                    if (positives.length > 0) {
                        //dann prüfe, ob es sich bei der Übereinstimmung um eine Übereinstimmung mit Student 2 handelt
                        positives.forEach(positive => {
                            //wenn Übereinstimmung mit Student 2, dann prüfe, ob die Markierungen gleich sind mit Toleranz 2 Sekunden für Ungenauigkeiten bei der Markierung
                            //wenn gleich, dann reduziere Score um 100
                            //wenn nicht gleich, dann reduziere Score um 100 und ziehe von den 100 pro Sekunde, die sich nicht überschneidet wieder 2 ab bis maximal 0 erreicht ist (soll nicht schlechter als Ausgangslage werden)
                            if (positive[0] === pair.student2Id) {
                                pair.score = pair.score - 100;
                                //wenn die Markierungen mit Toleranz 2 ungleich sind
                                if (positive[1] !== annotation.annotationStartTime && positive[1] !== annotation.annotationStartTime + 1 && positive[1] !== annotation.annotationStartTime - 1 && positive[1] !== annotation.annotationStartTime + 2 && positive[1] !== annotation.annotationStartTime - 2 ) {
                                    //dann addiere pro Sekunde, die sich nicht überschneidet, wieder zwei
                                    let differenceStartTime = Math.abs(positive[1] - annotation.annotationStartTime);
                                    let differenceEndTime = Math.abs(positive[2] - annotation.annotationEndTime);
                                    pair.score = pair.score + (differenceStartTime * 2) + (differenceEndTime * 2);
                                    if (pair.score > 0) {
                                        pair.score = 0;
                                    }
                                } else {
                                    if (positive[2] !== annotation.annotationEndTime && positive[2] !== annotation.annotationEndTime + 1 && positive[2] !== annotation.annotationEndTime - 1 && positive[2] !== annotation.annotationEndTime + 2 && positive[2] !== annotation.annotationEndTime - 2) {
                                        //dann addiere pro Sekunde, die sich nicht überschneidet, wieder zwei
                                        let differenceStartTime = Math.abs(positive[1] - annotation.annotationStartTime);
                                        let differenceEndTime = Math.abs(positive[2] - annotation.annotationEndTime);
                                        pair.score = pair.score + (differenceStartTime * 2) + (differenceEndTime * 2);
                                        if (pair.score > 0) {
                                            pair.score = 0;
                                        }
                                    }
                                }
                            }
                        })
                    }
                });
            })
    } 
    const annotationsForSession = await getAnnotationsForSession(session);
    //ermittle die Länge des Begründungstextes über alle Aufgaben hinweg; je größer der Unterschied der Länge des Textes, desto höhere Punktzahl plus
    pairs.forEach(pair => {
        //kombiniere Begründungstext aller Aufgaben von Schüler 1 in Variable
        let annotationsStudent1 = annotationsForSession.filter(annotation => annotation.student === pair.student1Id);
        //kombiniere Begründungstext aller Aufgaben von Schüler 2 in Variable
        let annotationsStudent2 = annotationsForSession.filter(annotation => annotation.student === pair.student2Id);
        //Länge der Markierungen ermitteln
        let lengthAnnotationsStudent1 = 0;
        let lengthAnnotationsStudent2 = 0;
        //addiere für jede Markierung die Länge des Texts
        annotationsStudent1.forEach(annotation => {
            lengthAnnotationsStudent1 = lengthAnnotationsStudent1 + annotation.annotationText.length;
        });
        annotationsStudent2.forEach(annotation => {
            lengthAnnotationsStudent2 = lengthAnnotationsStudent2 + annotation.annotationText.length;
        });
        //speichere Betrag der Differenz in Variable
        let differenceLength = Math.abs(lengthAnnotationsStudent1 - lengthAnnotationsStudent2);
        //prüfe die Differenz -> pro 10 Zeichen Unterschied gibt es 5 Punkte plus
        let fivePointsPlus = differenceLength/10;
        pair.score = pair.score + (fivePointsPlus * 5);
    });
    //sortiere Pairs absteigend nach Score; Nutzung einer benutzerdefinierten compare Funktion für Vergleich auf Basis Attribut Score
    pairs.sort(compare);
    let numberOfIterations = (students.length/2);
    //Durchlaufe pairs Array und schreibe die Gruppen und Partner; nach jedem Schreiben: entferne alle Paare mit den Schülern, die in der gerade zugewiesenen Gruppe waren, da Schüler nicht gleichzeitig in zwei Gruppen sein können
    for (let i = 0; i < numberOfIterations; i++) {
    //halb so viele Durchläufe wie es Paare gibt
        const student1IdToDo = pairs[0].student1Id;
        const student2IdToDo = pairs[0].student2Id;
        //schreibe Partner in Student Datensätze
        writePartnerToDatabase(students, pairs[0].student1Id, pairs[0].student2Id);
        writePartnerToDatabase(students, pairs[0].student2Id, pairs[0].student1Id);
        //erstelle Gruppe mit den zwei Studenten als Attributen und speichere Gruppen-ID in die jeweiligen Studenten als Attribut
        await createNewGroup(pairs[0].student1Id, pairs[0].student2Id, session);
        //entferne alle Paare, die einen der beiden Studenten als Mitglied hatten, aus dem Array
        let pairsToDelete = new Array;
        pairs.forEach(function (pair, index) {
            if (pair.student1Id === student1IdToDo || pair.student1Id === student2IdToDo || pair.student2Id === student1IdToDo || pair.student2Id === student2IdToDo) {
                pairsToDelete.push(index);
            }
        });
        for (j = pairsToDelete.length-1; j >= 0; j--) {
            pairs.splice(pairsToDelete[j], 1);
        }
    }

    //setze Session Status auf groupAnalysis, damit Schüler beginnen können
    setSessionStatus(session, 'Gruppenanalyse')

    //Erfolgsmeldung senden
    res.status(200).send('Die Dyaden wurden erfolgreich gebildet');
    } catch (err) {
        return console.error(err);
    }
});

//Schüler mit Status "waitingForGroupAnalysis" aus Datenbank lesen; Zugriff auf students API über axios
async function getWaitingStudents(sessionToGet) {
    try {
    const result = await axios.get(backendPath + '/api/students' + '/' + sessionToGet + '/' + 'wartend_auf_Gruppenanalyse');
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


//Änderung des Session Status
async function setSessionStatus(sessionId, statusName) {
    //Promise wegen async Functions
    return new Promise(async (resolve, reject) => {
        //Fehlerbehandlung
        try {
            //API mit Axios aufrufen; für Änderung mit erweiterter URL /change; Parameter id, status
            const result = await axios.post(backendPath + '/api/sessions' + '/change', {
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
async function writePartnerToDatabase(students, studentId, partnerId) {
    //Partner-Namen ermitteln
    var partnerObject = students.find(student => student.id === partnerId);
    var partnerName = partnerObject.firstName + ' ' + partnerObject.lastName;
    try {
    await axios.post(backendPath + '/api/students' + '/changepartner', {
        id: studentId,
        partner: partnerId,
        partnerName: partnerName
    })
    } catch (err) {
        return console.error(err);
    }
}

//erstellt neue Gruppe mit student1Id und student2Id als Attribute und schreibt die GruppenId als Attribut in die zwei Students
    async function createNewGroup(student1Id, student2Id, session) {
        try {
    //neue Gruppe anlegen und zwei Studenten als Attribute setzen
    const groupId = await axios.post(backendPath + '/api/groups', {
        student1: student1Id,
        student2: student2Id,
        status: 'Gruppenanalyse',
        session: session
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
    await axios.post(backendPath + '/api/students' + '/changegroup', {
        id: student1Id,
        group: groupId.data
    });

    //Gruppen-ID bei Student 2 als Attribut setzen (in DB)
    await axios.post(backendPath + '/api/students' + '/changegroup', {
        id: student2Id,
        group: groupId.data
    });
    } catch (err) {
        return console.error(err);
    }
}
async function getAnnotationsForSessionAndTask(sessionToGet, taskToGet) {
    try {
        const result = await axios.get(backendPath + '/api/annotations' + '/' + sessionToGet + '/' + taskToGet);
        const data = result.data;
        const annotationsToSend = data.map(annotation => ({
            session: annotation.session,
            student: annotation.student,
            annotationText: annotation.annotationText,
            annotationStartTime: annotation.annotationStartTime,
            annotationEndTime: annotation.annotationEndTime,
            taskId: annotation.taskId
        }))
        return annotationsToSend;
        } catch (err) {
        return console.error(err);
        }
}

async function getAnnotationsForSession(sessionToGet) {
    try {
        const result = await axios.get(backendPath + '/api/annotations' + '/' + sessionToGet);
        const data = result.data;
        const annotationsToSend = data.map(annotation => ({
            session: annotation.session,
            student: annotation.student,
            annotationText: annotation.annotationText,
            annotationStartTime: annotation.annotationStartTime,
            annotationEndTime: annotation.annotationEndTime,
            taskId: annotation.taskId
        }))
        return annotationsToSend;
    } catch (err) {
        return console.error(err);
    }
}

async function getTasksForSession(sessionToGet) {
    try {
        const result = await axios.get(backendPath + '/api/tasks' + '/' + sessionToGet);
        const data = result.data;
        const tasksToSend = data.map(task => ({
            id: task._id,
            session: task.session,
            text: task.text,
            videoPath: task.videoPath,
            videoStartTime: task.videoStartTime,
            videoEndTime: task.videoEndTime,
            taskNumber: task.taskNumber
        }))
        return tasksToSend;
        } catch (err) {
        return console.error(err);
        }
}
//vergleicht Paar-Objekte anhand ihres Scores; wenn ScoreA>ScoreB, dann 1; sonst -1
function compare(a, b) {
    //Auslesen der Scores
    const scoreA = a.score;
    const scoreB = b.score;
    
    let comparison = 0;
    if (scoreA > scoreB) {
      comparison = 1;
    } else if (scoreA < scoreB) {
      comparison = -1;
    }
    //absteigende Sortierung -> *-1
    return comparison * -1;
  }

module.exports = router;