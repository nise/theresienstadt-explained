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
(Ich weiß nicht, ob das noch aktuell ist)
**Run in production mode**
* `cd client`
* `npm run build`
* `cd ..`
* `npm run start`

**Deploy locally**
* `cd client`
* `serve -s dist`
* Open http://localhost:5000  in your browser

**Deploy on github.io**
* `cd client`
* `npm run build`

