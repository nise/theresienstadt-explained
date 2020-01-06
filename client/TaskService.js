//Import von Axios zum Weiterleiten der Frontend Aufrufe an API
import axios from 'axios';

//URL der API festlegen
const url = 'api/tasks';

//Klasse zur Behandlung der Task-Aufrufe erstellen
class TaskService {
    //GET Aufrufe
    static getTasks(sessionToGet, taskNumberToGet) {
        //Promise wegen async Functions
        return new Promise(async (resolve, reject) => {
            //Fehlerbehandlung
            try {
                //API mit Axios aufrufen mit Parameter sessionToGet und taskNumberToGet
                const result = await axios.get(url + '/' + sessionToGet + '/' + taskNumberToGet);
                //gebe nur etwas zurück, wenn Abfrage Objekt enthält
                if (result.data[0]) {
                //Daten aus Rückgabe extrahieren
                var resolveObject = {
                    id: result.data[0]._id,
                    session: result.data[0].session,
                    text: result.data[0].text,
                    videoPath: result.data[0].videoPath,
                    videoStartTime: result.data[0].videoStartTime,
                    videoEndTime: result.data[0].videoEndTime,
                    taskNumber: result.data[0].taskNumber
                };
                //Rückgabe = Objekt mit allen Taskfeldern als Attribute
                resolve(resolveObject);
            } else { //sonst gib leeres Ergebnis zurück
                resolve();
            }
            } catch (err) {
                reject (err);
            }
        });
    }
    //GET Aufrufe nur mit Session ID
    static getTasksWithId(sessionToGet) {
        //Promise wegen async Functions
        return new Promise(async (resolve, reject) => {
            //Fehlerbehandlung
            try {
                //API mit Axios aufrufen mit Parameter sessionToGet und taskNumberToGet
                const result = await axios.get(url + '/' + sessionToGet);
                const data = result.data;
                resolve(
                    data.map(task => ({
                        id: task._id,
                        session: task.session,
                        text: task.text,
                        videoPath: task.videoPath,
                        videoStartTime: task.videoStartTime,
                        videoEndTime: task.videoEndTime,
                        taskNumber: task.taskNumber
                    }))
                );
            } catch (err) {
                reject (err);
            }
        });
    }
    //POST Aufrufe
    static postTasks(sessionToPost, textToPost, videoPathToPost, videoStartTimeToPost, videoEndTimeToPost, taskNumberToPost) {
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
                    videoEndTime: videoEndTimeToPost,
                    taskNumber: taskNumberToPost
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
    //DELETE Aufrufe für alle Tasks einer Session
    static deleteAllTasksForSession(sessionId) {
        return new Promise(async (resolve, reject) => {
            //Fehlerbehandlung
            try {
                //API mit Axios aufrufen mit Delete
                await axios.delete(url + '/' + sessionId);
                resolve();
            } catch (err) {
                reject (err);
            }
        });
    }
}

//Export als Service
export default TaskService;