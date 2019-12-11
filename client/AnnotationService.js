//Import von Axios zum Weiterleiten der Frontend Aufrufe an API
import axios from 'axios';

//URL der API festlegen
const url = 'http://localhost:5000/api/annotations';

//Klasse zur Behandlung der Annotation-Aufrufe erstellen
class AnnotationService {
    //GET Aufrufe
    static getAnnotations(sessionToGet, studentToGet) {
        //Promise wegen async Functions
        return new Promise(async (resolve, reject) => {
            //Fehlerbehandlung
            try {
                //API mit Axios aufrufen mit Parameter sessionToGet und studentToGet
                const result = await axios.get(url + '/' + sessionToGet) + '/' + studentToGet;
                //Daten aus Rückgabe extrahieren
                const data = result.data;
                //Rückgabe = Objekt mit allen Annotation-Feldern als Attribute
                resolve(
                    data.map(annotation => ({
                        id: annotation._id,
                        session: annotation.session,
                        student: annotation.student,
                        annotationText: annotation.annotationText,
                        annotationStartTime: annotation.annotationStartTime,
                        annotationEndTime: annotation.annotationEndTime
                    }))
                );
            } catch (err) {
                reject (err);
            }
        });
    }
    //POST Aufrufe
    static postAnnotations(sessionToPost, studentToPost, annotationTextToPost, annotationStartTimeToPost, annotationEndTimeToPost, taskIdToPost) {
        //Promise wegen async Functions
        return new Promise(async (resolve, reject) => {
            //Fehlerbehandlung
            try {
                //API mit Axios aufrufen mit Parametern; Rückgabe abspeichern
                const result = await axios.post(url, {
                    session: sessionToPost,
                    student: studentToPost,
                    annotationText: annotationTextToPost,
                    annotationStartTime: annotationStartTimeToPost,
                    annotationEndTime: annotationEndTimeToPost,
                    taskId: taskIdToPost
                });
                //ID der neu erstellten Annotation zurückgeben
                resolve(result.data);
            } catch (err) {
                reject (err);
            }
        });
    }
    //Änderung von Annotation Attributen
    static changeAnnotationAttributes(annotationToChange, attributesToChange) {
        //Promise wegen async Functions
        return new Promise(async (resolve, reject) => {
            //Fehlerbehandlung
            try {
                //API mit Axios aufrufen; für Änderung mit erweiterter URL /change; Parameter annotationToChange, attributesToChange
                const result = await axios.post(url+'/change', annotationToChange, attributesToChange);
                //ID der geänderten Annotation zurückgeben
                resolve(result.data);
            } catch (err) {
                reject (err);
            }
        });
    }
    //DELETE Aufrufe: Task-ID ist ID, die aus POST Aufruf zurückgegeben wird
    static deleteAnnotations(annotationId) {
        return axios.delete(url, {
            id: annotationId
        });
    }
}

//Export als Service
export default AnnotationService;