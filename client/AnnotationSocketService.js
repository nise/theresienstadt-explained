//Import von Axios zum Weiterleiten der Frontend Aufrufe an API
import axios from 'axios';

//URL der API festlegen
const url = 'api/annotationsocket';

//Klasse zur Behandlung der Aufrufe erstellen
class AnnotationSocketService {
    //ausschließlich POST Aufrufe
    static postAnnotationSocket(annotationToPost) {
        //Promise wegen async Functions
        return new Promise(async (resolve, reject) => {
            //Fehlerbehandlung
            try {
                //API mit Axios aufrufen mit Parametern; Rückgabe abspeichern
                const result = await axios.post(url, annotationToPost);
                //Resolve
                resolve();
            } catch (err) {
                reject (err);
            }
        });
    }

    static deleteAnnotationSocket(annotationIdToDelete) {
        //Promise wegen async Functions
        return new Promise(async (resolve, reject) => {
            //Fehlerbehandlung
            try {
                //API mit Axios aufrufen mit Parametern; Rückgabe abspeichern
                const result = await axios.delete(url+'/'+annotationIdToDelete);
                //Resolve
                resolve();
            } catch (err) {
                reject (err);
            }
        });
    }
}

//Export als Service
export default AnnotationSocketService;