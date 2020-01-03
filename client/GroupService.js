//Import von Axios zum Weiterleiten der Frontend Aufrufe an API
import axios from 'axios';

//URL der API festlegen
const url = 'api/groups';

//Klasse zur Behandlung der Gruppenaufrufe erstellen
class GroupService {
    //GET Aufrufe
    static getGroups(groupId) {
        //Promise wegen async Functions
        return new Promise(async (resolve, reject) => {
            //Fehlerbehandlung
            try {
                //API mit Axios aufrufen und zu holende GruppenId übergeben
                const result = await axios.get(url + '/' + groupId);
                //Daten aus Rückgabe extrahieren
                const data = result.data;
                //Rückgabe = Objekt mit allen Gruppenfeldern als Attribute
                resolve(
                    data.map(group => ({
                        student1: group.student1,
                        student2: group.student2,
                        status: group.status,
                        id: group._id
                    }))
                );
            } catch (err) {
                reject (err);
            }
        });
    }
    //POST Aufrufe
    static postGroups(student1ToPost, student2ToPost, statusToPost) {
        //Promise wegen async Functions
        return new Promise(async (resolve, reject) => {
            //Fehlerbehandlung
            try {
                //API mit Axios aufrufen mit Parametern; Rückgabe abspeichern
                const result = await axios.post(url, {
                    student1: student1ToPost,
                    student2: student2ToPost,
                    status: statusToPost
                });
                //ID der neu erstellten Gruppe zurückgeben
                resolve(result.data);
            } catch (err) {
                reject (err);
            }
        });
    }
    //Änderung des Gruppen Status
    static setGroupStatus(groupId, statusName) {
        //Promise wegen async Functions
        return new Promise(async (resolve, reject) => {
            //Fehlerbehandlung
            try {
                //API mit Axios aufrufen; für Änderung mit erweiterter URL /change; Parameter id, status
                const result = await axios.post(url+'/change', {
                    id: groupId,
                    status: statusName
                });
                //ID der geänderten Gruppe zurückgeben
                resolve(result.data);
            } catch (err) {
                reject (err);
            }
        });
    }
    //DELETE Aufrufe: Group-ID ist ID, die aus POST Aufruf zurückgegeben wird
    static deleteGroups(groupId) {
        return axios.delete(url, {
            id: groupId
        });
    }
}

//Export als Service
export default GroupService;