//Import von Axios zum Weiterleiten der Frontend Aufrufe an API
import axios from 'axios';

//URL der API festlegen
const url = 'operations/buildgroups';

//Klasse zur Behandlung der Aufrufe erstellen
class GroupBuildingService {
    //ausschließlich GET Aufrufe
    static getGroupBuilding(sessionId) {
        //Promise wegen async Functions
        return new Promise(async (resolve, reject) => {
            //Fehlerbehandlung
            try {
                //API mit Axios aufrufen und SessionId übergeben
                const result = await axios.get(url + '/' + sessionId);
                //Rückgabe = Status der Anfrage
                resolve(result.status);
            } catch (err) {
                reject (err);
            }
        });
    }
}

//Export als Service
export default GroupBuildingService;