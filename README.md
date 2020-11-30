# Anwendung starten
Vorbereitung:
* `npm install` 
* `npm audit -fix`

So bekommst du die Anwendung zum Laufen
* `cd client`
* `npm run serve`  (siehe package.json in Zeile 5)
* Open http://localhost:8080  in your browser

Unter http://localhost:8080/film ist der Player derzeit sichtbar. 
Irgendwo schwirrt auch noch Code aus einem ganz anderen Projekt hier rum - da geht es um eine Zeitkonzept...


---
# Instructions

cd client && npm run build && cd .. && npm run start

**Run in production mode using node.js backend**
I made this much easier, just run the one line for building the client and starting the node server:
* `npm run start`   (requires an installation of mongodb)
* open `http://localhost:3000/home` in your browser


**Deploy locally**
* `cd client`
* `serve -s dist`
* Open http://localhost:5000  in your browser

**Deploy on github.io**
* `cd client`
* `npm run build`

