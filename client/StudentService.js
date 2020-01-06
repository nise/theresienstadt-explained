//Import von Axios zum Weiterleiten der Frontend Aufrufe an API
import axios from 'axios';

//URL der API festlegen
const url = 'api/students';

//Klasse zur Behandlung der Studentaufrufe erstellen
class StudentService {
    //GET Aufrufe: Parameter session ist aktuelle Session-ID aus Datenbank, die aus POST Aufruf für Session Erstellung als Return zurückkommt
    static getStudents(sessionToGet) {
        //Promise wegen async Functions
        return new Promise(async (resolve, reject) => {
            //Fehlerbehandlung
            try {
                //API mit Axios aufrufen mit Parameter session
                const result = await axios.get(url + '/' + sessionToGet);
                //Daten aus Rückgabe extrahieren
                const data = result.data;
                //Rückgabe = Objekt mit allen Studentfeldern als Attribute
                resolve(
                    data.map(student => ({
                        firstName: student.firstName,
                        lastName: student.lastName,
                        session: student.session,
                        id: student._id,
                        status: student.status,
                        partner: student.partner,
                        group: student.group,
                        partnerName: student.partnerName
                    }))
                );
            } catch (err) {
                reject (err);
            }
        });
    }
    static getStudentsWithStatus(sessionToGet, statusToGet) {
        //Promise wegen async Functions
        return new Promise(async (resolve, reject) => {
            //Fehlerbehandlung
            try {
                //API mit Axios aufrufen mit Parameter session und status
                const result = await axios.get(url + '/' + sessionToGet + '/' + statusToGet);
                //Daten aus Rückgabe extrahieren
                const data = result.data;
                //Rückgabe = Objekt mit allen Studentfeldern als Attribute
                resolve(
                    data.map(student => ({
                        firstName: student.firstName,
                        lastName: student.lastName,
                        session: student.session,
                        id: student._id,
                        status: student.status,
                        partner: student.partner,
                        group: student.group,
                        partnerName: student.partnerName
                    }))
                );
            } catch (err) {
                reject (err);
            }
        });
    }
    //POST Aufrufe: Parameter session ist aktuelle Session-ID aus Datenbank, die aus POST Aufruf für Session Erstellung als Return zurückkommt, restliche Daten aus Eingabe
    static postStudent(firstNameToPost, lastNameToPost, sessionToPost, statusToPost) {
        //Promise wegen async Functions
        return new Promise(async (resolve, reject) => {
            //Fehlerbehandlung
            try {
                //API mit Axios aufrufen mit Parametern firstName, lastName, session, status; Rückgabe abspeichern
                const result = await axios.post(url, {
                    firstName: firstNameToPost,
                    lastName: lastNameToPost,
                    session: sessionToPost,
                    status: statusToPost
                });
                //ID des neu erstellten Schülers zurückgeben
                resolve(result.data);
            } catch (err) {
                reject (err);
            }
        });
    }
     //Änderung des Student Status
     static setStudentStatus(studentId, statusName) {
        //Promise wegen async Functions
        return new Promise(async (resolve, reject) => {
            //Fehlerbehandlung
            try {
                //API mit Axios aufrufen; für Änderung mit erweiterter URL /changestatus; Parameter id, status
                const result = await axios.post(url+'/changestatus', {
                    id: studentId,
                    status: statusName
                });
                //ID des geänderten Schülers zurückgeben
                resolve(result.data);
            } catch (err) {
                reject (err);
            }
        });
    }
    //DELETE Aufrufe: Student-ID ist ID, die aus POST Aufruf zurückgegeben wird
    static deleteStudent(studentId) {
        return new Promise(async (resolve, reject) => {
            //Fehlerbehandlung
            try {
                //API mit Axios aufrufen mit Delete
                await axios.delete(url + '/' + studentId);
                resolve();
            } catch (err) {
                reject (err);
            }
        });
    }
}

//Export als Service
export default StudentService;