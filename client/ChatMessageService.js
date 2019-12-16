//Import von Axios zum Weiterleiten der Frontend Aufrufe an API
import axios from 'axios';

//URL der API festlegen
const url = 'http://localhost:5000/api/chatmessages';

//Klasse zur Behandlung der Gruppenaufrufe erstellen
class ChatMessageService {
    //GET Aufrufe
    static getChatMessages(authorId) {
        //Promise wegen async Functions
        return new Promise(async (resolve, reject) => {
            //Fehlerbehandlung
            try {
                //API mit Axios aufrufen und zu holende authorId übergeben
                const result = await axios.get(url + '/' + authorId);
                //Daten aus Rückgabe extrahieren
                const data = result.data;
                //Rückgabe = Objekt mit allen Chat-Message-Feldern als Attribute
                resolve(
                    data.map(chatMessage => ({
                        type: chatMessage.type,
                        author: chatMessage.author,
                        data: chatMessage.data,
                        id: chatMessage._id
                    }))
                );
            } catch (err) {
                reject (err);
            }
        });
    }
    //POST Aufrufe
    static postChatMessage(typeToPost, authorToPost, dataToPost) {
        //Promise wegen async Functions
        return new Promise(async (resolve, reject) => {
            //Fehlerbehandlung
            try {
                //API mit Axios aufrufen mit Parametern; Rückgabe abspeichern
                const result = await axios.post(url, {
                    type: typeToPost,
                    author: authorToPost,
                    data: dataToPost
                });
                //ID der neu erstellten ChatNachricht zurückgeben
                resolve(result.data);
            } catch (err) {
                reject (err);
            }
        });
    }
}

//Export als Service
export default ChatMessageService;