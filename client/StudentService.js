//Import von Axios zum Weiterleiten der Frontend Aufrufe an API
import axios from 'axios';

//URL der API festlegen
const url = 'http://localhost:5000/api/students';

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
                        id: student._id
                    }))
                );
            } catch (err) {
                reject (err);
            }
        });
    }
    //POST Aufrufe: Parameter session ist aktuelle Session-ID aus Datenbank, die aus POST Aufruf für Session Erstellung als Return zurückkommt, restliche Daten aus Eingabe
    static postStudent(firstNameToPost, lastNameToPost, sessionToPost) {
        //Promise wegen async Functions
        return new Promise(async (resolve, reject) => {
            //Fehlerbehandlung
            try {
                //API mit Axios aufrufen mit Parametern firstName, lastName, session; Rückgabe abspeichern
                const result = await axios.post(url, {
                    firstName: firstNameToPost,
                    lastName: lastNameToPost,
                    session: sessionToPost
                });
                //ID des neu erstellten Schülers zurückgeben
                resolve(result.data);
            } catch (err) {
                reject (err);
            }
        });
    }
    //DELETE Aufrufe: Student-ID ist ID, die aus POST Aufruf zurückgegeben wird
    static deleteStudent(studentID) {
        return axios.delete(url, {
            id: studentID
        });
    }
}

//Export als Service
export default StudentService;