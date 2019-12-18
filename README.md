# Modul zur kollaborativen Videoanalyse mit ArgueGraph
Ein Modul der Lernumgebung "Theresienstadt Explained" ermöglicht Lernenden kollaboratives Lernen mit Videosequenzen. Konkret lehnt sich die Vorgehensweise der Bearbeitung an das CSCL-Script "ArgueGraph" an:
Patrick Jermann, Pierre Dillenbourg. An analysis of learner arguments in a collective learning environment.. Third CSCL Conference, 1999, Stanford, United Kingdom. pp.265-273. hal-00190257.
Auf die Videoanalyse übertragen verfolgt das Modul folgende Vorgehensweise:
1. Alle Schüler registrieren sich
2. Die Schüler bekommen vom Lehrenden erstellte Aufgaben präsentiert, die sie während der Videoanalyse bearbeiten
3. Aufgrund der Antworten aus Schritt 2 werden die Lernenden Zweiergruppen zugeordnet, die in ihrer Meinung weitmöglichst auseinanderliegen
4. Die gebildeten Gruppen bekommen dieselben Aufgaben wie in Schritt 2 erneut gestellt -> sie müssen sich aber auf einen einheitlichen Standpunkt einigen

# Vorgehen zur Installation
1. Repository herunterladen und entpacken
2. in Root Verzeichnis des Repositories wechseln und Kommando "npm install" ausführen
3. über das Kommando "cd client" in client Ordner wechseln
4. hier erneut das Kommando "npm install" ausführen
5. in Root Verzeichnis des Repositories "npm run dev" ausführen -> Backend wird geladen
6. in client Ordner Kommando "npm run serve" ausführen -> Frontend wird geladen

# Nutzung des Moduls zur kollaborativen Videoanalyse
- Einstiegspunkt für den Lehrenden: http://localhost:8080/#/createsession
- unter genannter Seite der Session einen Namen geben und starten
- anschließend können Aufgaben für diese Session erstellt werden
- sobald die Aufgaben erstellt sind, wird ein Link generiert, der den Lernenden zur Registrierung für diese Session weitergegeben werden kann
- wenn alle Lernenden registriert sind, dann kann der Lehrende über den Knopf "Starten" die Lernsession starten
- nachdem der Lehrende die Session gestartet hat, erscheint bei den Lernenden ein Knopf zum Starten der Individualanalyse
- nachdem alle Lernenden die Individualanalyse abgeschlossen haben, muss der Lehrende folgenden Link aufrufen, um die Gruppenbildung zu starten: http://localhost:5000/operations/buildgroups/<hierSessionIdeinfügen>
- die Gruppenbildung erfolgt in der aktuellen Version noch zufällig
- wenn die Gruppenbildung abgeschlossen ist, dann erscheint bei den Lernenden automatisch ein Knopf zum Starten der Gruppenanalyse
- nach Abschluss der Gruppenanalyse erhalten die Schüler eine Meldung, dass die Videoanalyse nun abgeschlossen ist