//Import von Axios zum Weiterleiten der Frontend Aufrufe an API
import axios from 'axios';

//URL der API festlegen
const url = 'http://localhost:5000/api/tasks';

//Klasse zur Behandlung der Task-Aufrufe erstellen
class SessionService {
    //GET Aufrufe
    static getTasks(sessionToGet) {
        //Promise wegen async Functions
        return new Promise(async (resolve, reject) => {
            //Fehlerbehandlung
            try {
                //API mit Axios aufrufen mit Parameter sessionToGet
                const result = await axios.get(url + '/' + sessionToGet);
                //Daten aus Rückgabe extrahieren
                const data = result.data;
                //Rückgabe = Objekt mit allen Taskfeldern als Attribute
                resolve(
                    data.map(task => ({
                        id: task._id,
                        session: task.session,
                        text: task.text,
                        videoPath: task.videoPath,
                        videoStartTime: task.videoStartTime,
                        videoEndTime: task.videoEndTime
                    }))
                );
            } catch (err) {
                reject (err);
            }
        });
    }
    //POST Aufrufe
    static postTasks(sessionToPost, textToPost, videoPathToPost, videoStartTimeToPost, videoEndTimeToPost) {
        //Promise wegen async Functions
        return new Promise(async (resolve, reject) => {
            //Fehlerbehandlung
            try {
                //API mit Axios aufrufen mit Parametern; Rückgabe abspeichern
                const result = await axios.post(url, {
                    session: sessionToPost,
                    text: textToPost,
                    videoPath: videoPathToPost,
                    videoStartTime: videoStartTimeToPost,
                    videoEndTime: videoEndTimeToPost
                });
                //ID des neu erstellten Tasks zurückgeben
                resolve(result.data);
            } catch (err) {
                reject (err);
            }
        });
    }
    //Änderung von Task Attributen
    static changeTaskAttributes(taskToChange, attributesToChange) {
        //Promise wegen async Functions
        return new Promise(async (resolve, reject) => {
            //Fehlerbehandlung
            try {
                //API mit Axios aufrufen; für Änderung mit erweiterter URL /change; Parameter taskToChange, attributesToChange
                const result = await axios.post(url+'/change', taskToChange, attributesToChange);
                //ID des geänderten Tasks zurückgeben
                resolve(result.data);
            } catch (err) {
                reject (err);
            }
        });
    }
    //DELETE Aufrufe: Task-ID ist ID, die aus POST Aufruf zurückgegeben wird
    static deleteTasks(taskId) {
        return axios.delete(url, {
            id: taskId
        });
    }
}

//Export als Service
export default TaskService;