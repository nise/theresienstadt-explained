//Import von Axios zum Weiterleiten der Frontend Aufrufe an API
import axios from 'axios';

//URL der API festlegen
const url = 'http://localhost:5000/api/sessions';

//Klasse zur Behandlung der Sessionaufrufe erstellen
class SessionService {
    //GET Aufrufe
    static getSessions() {
        //Promise wegen async Functions
        return new Promise(async (resolve, reject) => {
            //Fehlerbehandlung
            try {
                //API mit Axios aufrufen mit Parameter session
                const result = await axios.get(url);
                //Daten aus Rückgabe extrahieren
                const data = result.data;
                //Rückgabe = Objekt mit allen Sessionfeldern als Attribute
                resolve(
                    data.map(session => ({
                        name: session.name,
                        date: session.date,
                        id: session._id
                    }))
                );
            } catch (err) {
                reject (err);
            }
        });
    }
    //POST Aufrufe
    static postSessions(nameToPost, dateToPost) {
        //Promise wegen async Functions
        return new Promise(async (resolve, reject) => {
            //Fehlerbehandlung
            try {
                //API mit Axios aufrufen mit Parametern name, date; Rückgabe abspeichern
                const result = await axios.post(url, {
                    name: nameToPost,
                    date: dateToPost
                });
                //ID der neu erstellten Session zurückgeben
                resolve(result.data);
            } catch (err) {
                reject (err);
            }
        });
    }
    //Änderung des Session Status
    static setSessionStatus(sessionId, statusName) {
        //Promise wegen async Functions
        return new Promise(async (resolve, reject) => {
            //Fehlerbehandlung
            try {
                //API mit Axios aufrufen; für Änderung mit erweiterter URL /change; Parameter id, status
                const result = await axios.post(url+'/change', {
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
    //DELETE Aufrufe: Session-ID ist ID, die aus POST Aufruf zurückgegeben wird
    static deleteSessions(sessionId) {
        return axios.delete(url, {
            id: sessionId
        });
    }
}

//Export als Service
export default SessionService;