# Modul zur kollaborativen Videoanalyse mit ArgueGraph
Ein Modul der Lernumgebung "Theresienstadt Explained" ermöglicht Lernenden kollaboratives Lernen mit Videosequenzen. Konkret lehnt sich die Vorgehensweise der Bearbeitung an das CSCL-Script "ArgueGraph" an:
Patrick Jermann, Pierre Dillenbourg. An analysis of learner arguments in a collective learning environment.. Third CSCL Conference, 1999, Stanford, United Kingdom. pp.265-273. hal-00190257.
Auf die Videoanalyse übertragen verfolgt das Modul folgende Vorgehensweise:
1. Alle Schüler registrieren sich
2. Die Schüler bekommen vom Lehrenden erstellte Aufgaben präsentiert, die sie während der Videoanalyse bearbeiten
3. Die Schüler nehmen während der Videoanalyse Markierungen im Video vor, um die Fragestellung zu beantworten
4. Aufgrund der Antworten aus Schritt 3 werden die Lernenden Zweiergruppen zugeordnet, die in ihrer Meinung weitmöglichst auseinanderliegen
5. Die gebildeten Gruppen bekommen dieselben Aufgaben wie in Schritt 3 erneut gestellt -> sie müssen sich aber auf einen einheitlichen Standpunkt einigen
6. In einer Nachbesprechung bereitet der Lehrende die Ergebnisse mit den Schülern auf

# Vorgehen zur Installation
1. Repository herunterladen und entpacken
2. in Root Verzeichnis des Repositories wechseln und Kommando "npm install" ausführen
3. über das Kommando "cd client" in client Ordner wechseln
4. hier erneut das Kommando "npm install" ausführen
5. unter dem Pfad /client/public/theresienstadt.mp4 das Propagandavideo hinterlegen
6. in Root Verzeichnis des Repositories "npm run dev" ausführen

# Nutzung des Moduls zur kollaborativen Videoanalyse
- Einstiegspunkt für den Lehrenden: http://localhost:8080/#/createsession
- unter genannter Seite der Session einen Namen geben und starten
- anschließend können Aufgaben für diese Session erstellt werden
- sobald die Aufgaben erstellt sind, kann auf die Seite zur Überwachung der Session gesprungen werden
- auf der Überwachungsseite steht der Link zum Kopieren bereit, der den Lernenden weitergegeben werden muss, um sich mit Namen für diese Session zu registrieren
- wenn alle Lernenden registriert sind (es kann nur mit einer geraden Teilnehmerzahl gestartet werden), dann kann der Lehrende über den Knopf "Start der Individualphase" die Lernsession starten
- nachdem der Lehrende die Session gestartet hat, erscheint bei den Lernenden automatisch ein Knopf zum Starten der Individualanalyse
- zum Bearbeiten der Aufgabenstellung fertigen die Lernenden Markierungen im Video an. Die Lernenden spielen das Video ab und drücken "Starte Markierung", um eine Markierung zu starten. Wenn die Passage markiert ist, dann drückt der Lernende "Stoppe Markierung" zum Beenden der Markierung.
- jede Markierung muss begründet werden
- die markierten Stellen sind auf der Zeitleiste des Videoplayers sichtbar
- nachdem alle Lernenden die Individualanalyse abgeschlossen haben, tritt der Lehrende über den Knopf "Gruppenbildung starten" die Gruppenbildung los
- es wird nun automtatisch die Bildung von Zweiergruppen vorgenommen. Kriterien für die Bildung der Gruppen sind die Zeitpunkte der Markierungen und die Länge des Begründungstexts. Haben Lernende zu unterschiedlichen Zeitpunkten Markierungen vorgenommen und unterscheidet sich die Länge der Begründungstexte stark, dann wird der Algorithmus sie einer Gruppe zuweisen
- wenn die Gruppenbildung abgeschlossen ist, dann erscheint bei den Lernenden automatisch ein Knopf zum Starten der Gruppenanalyse
- die Funktionsweise der Gruppenanalyse ist ähnlich der Individualanalyse. Die Lernenden haben über den runden Knopf rechts unten zusätzlich die Möglichkeit, miteinander zu chatten
- hat sich die Gruppe auf eine Antwort geeinigt, führt ein Gruppenmitglied die Markierung durch und sendet die Eingaben ab
- nach Abschluss der Gruppenanalyse erhalten die Lernenden eine Meldung, dass die Videoanalyse nun abgeschlossen ist
- der Lehrende hat nach Abschluss der Gruppenanalyse durch alle Lernenden die Möglichkeit, eine Nachbesprechung durchzuführen. Der Knopf erscheint auf der Überwachungsseite, wenn alle Lernenden die Gruppenanalyse abgeschlossen haben
- auf der Überwachungsseite ist im Vergleich dargestellt, welche Zeitpunkte im Video in Gruppen- und Individualanalyse markiert wurden
- mit einem Klick auf einen Zeitpunkt im Diagramm springt man zur entsprechenden Stelle im Video
- der Lehrende hat die Möglichkeit, bestehende Sessions zu bearbeiten über den Link "Sessions bearbeiten" in der Navigationsleiste. Die Funktionalität hängt davon ab, in welcher Phase sich die Session befindet. Es können je nach Status die Aufgaben bearbeitet werden, die Session gelöscht werden und zur Session abgesprungen werden