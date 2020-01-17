//Import von Axios zum Weiterleiten der Frontend Aufrufe an API
import axios from 'axios';

//URL der API festlegen
const url = 'api/logging';

class LoggingService {
    //POST Aufrufe
    //phase im Format 1 = Individualanalyse, 2 = Gruppenanalyse, Session ist Session-ID
    static postLogs(logMessageToPost, phase, session) {
        //Promise wegen async Functions
        return new Promise(async (resolve, reject) => {
            //Fehlerbehandlung
            try {
                //API mit Axios aufrufen mit Parametern
                await axios.post(url+'/'+phase+'/'+session, logMessageToPost);
                resolve();
            } catch (err) {
                reject (err);
            }
        });
    }
}

//Export als Service
export default LoggingService;