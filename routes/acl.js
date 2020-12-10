/**
 * 
 */
module.exports = function (db, app) {
    var module = {};

    const mongoose = require('mongoose');
    const express = require('express');
    const fs = require('fs');

    app.use(express.static('client/dist'));
    
    // GET is not working
    app.get('/message', (req, res) => {
        res.json({
            message: 'Hello dude!'
        });
    });

    app.get('/persondata', (req, res) => {
      let persond;
      fs.readFile('./ressources/Persons.json', function(err, data){
        res.send(data);
        /* res.json({
          dat: data,
          error: err
        }); */
      });
    });

    app.get('/markerdata', (req, res) => {
      fs.readFile('./ressources/markers.json', function(err, data){
        res.send(data);
      })
    })

    var bodyParser = require('body-parser')
    app.use(bodyParser.json());       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    })); 
    app.post('/log', (req, res) => {
        let str = req.body.data.start + ',' + req.body.data.end + ',' + req.body.data.type + ',' + req.body.data.content.title + ',' + req.body.data.content.reason + ',' + req.body.data.x + ',' + req.body.data.y + ',' + req.body.data.session+'\n';
        fs.appendFile('terezin.log', str, function (err) {
            if (err) throw err;
            console.log('Saved!', req.body.data);
        });
        res.end();
    });

    app.post('/logplayback', (req, res) => {
        let str = JSON.stringify(req.body.data) + '\n';
        fs.appendFile('terezin-video.log', str, function (err) {
            if (err) throw err;
            //console.log('Saved!', req.body.data);
        });
        res.end();
    });

    app.post('/persons/all', (req, res) => {
        res.json({
            data: persons
        });
    });

    app.post('/scenes/all', (req, res) => {
        res.json({
            data: scenes
        });
    });

    /*app.use(function (req, res, next) {
        res.status(404).send('Sorry cant find that!');
    });*/

    const scenes = [
        {
            _id: {
                $oid: "5ba539c3e99589718c928bef"
            },
            expanded: false,
            protagonists: ["Karel Fischer", "Jo Spier"],
            images: [],
            title: "Titelsequenz",
            category: "Kultur",
            number: 1,
            source: "1",
            duration: "32:06",
            start: 0,
            status: "unvollständig",
            description:
                "Der von Karel Fischer geleitete Chor singt Mendelssohn-Bartholdys „Elias“.",
            music: "Felix Mendelsohn-Bartholdy: „Elias“",
            locations: "",
            updated_at: {
                $date: "2018-09-21T18:34:43.074Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928bf1"
            },
            expanded: false,
            protagonists: [],
            images: [],
            title: "Gericht",
            number: 11,
            source: "2",
            duration: "8:05",
            start: 340,
            status: "Unvollständig",
            description:
                "Das Gericht der jüdischen Selbstverwaltung. Ausschnitte einer Gerichtsverhandlung.",
            music: "",
            locations: "",
            updated_at: {
                $date: "2018-09-21T18:34:43.086Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928bf2"
            },
            expanded: false,
            protagonists: [],
            images: [],
            title: "Spielplatz",
            number: 16,
            source: "3",
            duration: "1:06:08",
            start: 445,
            status: "vollständig",
            description:
                "Schild mit der Aufschrift „Zum Spielplatz“. Kinder laufen in Zweierreihe durch den Stadtpark zum nahegelegenen Kinderpavillon. Dort befindet sich ein Sandkasten, wo sie gemeinsam spielen, trinken, tanzen und singen. Die Kinder halten außerhalb des Pavillions Mittagsschlaf. In einem Planschbecken spielen sie. Einige Kinder schaukeln draußen. Innenaufnahme eines Spielzimmers mit Schaukelpferden und Holzspielzeug.",
            music: "",
            locations: "",
            updated_at: {
                $date: "2018-09-21T18:34:43.087Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928bf0"
            },
            expanded: false,
            protagonists: [
                "Paul Eppstein",
                "Alfred Meissner",
                "Georg Gradnauer",
                "Léon Meyer",
                "Johann Friedländer",
                "Emil Sommer",
                "Max Friedinger",
                "Clara von Schultz"
            ],
            images: [],
            title: "Terrasse",
            number: 4,
            source: "",
            duration: "12:23",
            start: 87,
            status: "verschollen",
            description:
                "Terrasse mit Sonnenschirmen, Kellnerinnen servieren Limonade, Leute spazieren in dem sich anschließenden Garten auf und ab.",
            music: "",
            locations: "",
            updated_at: {
                $date: "2018-09-21T18:34:43.086Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928bf4"
            },
            expanded: false,
            protagonists: [],
            images: [],
            title: "Schmiede",
            number: 26,
            source: "4",
            duration: "22:15",
            start: 596,
            status: "vollständig",
            description:
                "In der Werkstatt eines Huf- Wagenschmieds beschlägt ein Hufschmied einen Ochsen. Der Ochse wird aus der Schmiede herausgeführt.",
            music: "",
            locations: "Schmiede",
            updated_at: {
                $date: "2018-09-21T18:34:43.088Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928bf5"
            },
            expanded: false,
            protagonists: [],
            images: [],
            title: "Zentralbad",
            number: 31,
            source: "4,5",
            duration: "27:16",
            start: 1086,
            status: "vollständig",
            description:
                "Männer laufen in die Gemeinschaftsdusche und waschen sich. Männer verlassen das Zentralbad und laufen auf die Straße.",
            music: "",
            locations: "Zentralbad",
            updated_at: {
                $date: "2018-09-21T18:34:43.088Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928bf6"
            },
            expanded: false,
            protagonists: [],
            images: [],
            title: "Abendfreizeit",
            number: 36,
            source: "5",
            duration: "1:54:24",
            start: 1374,
            status: "vollständig",
            description:
                "Leute erholen sich außerhalb von Holzbaracken, Szenen aus den Gemeinschaftsunterkünften. Outdoor facilities of the barracks with inhabitants, mostly women and children, on benches, chatting, reading. Inside a barrack of the women's accommodation, pan on the central corridor to separate living spaces with wooden tables and benches, double bunk beds separating the living spaces, partly covered with cloths. Several women and young girls reading, needle working, chatting in small groups, playing cards.",
            music: "",
            locations: "",
            updated_at: {
                $date: "2018-09-21T18:34:43.089Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928bf7"
            },
            expanded: false,
            protagonists: [],
            images: [],
            title: "Entstehungsgeschichte",
            number: 2,
            source: "1",
            duration: "50:10",
            start: 32,
            status: "vollständig",
            description:
                "Die Entstehungsgeschichte der Festung Theresienstadt, illustriert durch Zeichnungen von Jo Spier.",
            music: "",
            locations: "",
            updated_at: {
                $date: "2018-09-21T18:34:43.092Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928bf8"
            },
            expanded: false,
            protagonists: [],
            images: [],
            title: "Sport",
            number: 7,
            source: "",
            duration: "30:07",
            start: 185,
            status: "vollständig",
            description:
                "Sport auf einer der Basteien. Männer laufen und zwei Frauenmannschaften spielen Handball.",
            music: "",
            locations: "Bastei",
            updated_at: {
                $date: "2018-09-21T18:34:43.093Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928bfa"
            },
            expanded: false,
            protagonists: [],
            images: [],
            title: "Kinderoper",
            number: 17,
            source: "3",
            duration: "1:15:02",
            start: 511,
            status: "vollständig",
            description:
                "Schlussszene von Hand Krasas Kinderoper „Brundibár“. Der Kinderchor singt. Szenenwechsel zwischen den kostümierten Darstellern und den jungen Zuschauern.",
            music: "",
            locations: "",
            updated_at: {
                $date: "2018-09-21T18:34:43.094Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928bf3"
            },
            expanded: false,
            protagonists: [],
            images: [],
            title: "Verpflegung",
            number: 21,
            source: "",
            duration: "",
            start: -1,
            status: "verschollen",
            description:
                "in einer Zentralküche wird das Essen zubereitet.  Essen wird gegen Lebensmittelmarken ausgegeben. Leute essen gemeinsamen im Speisesaal.",
            music: "",
            locations: "Zentralküche",
            updated_at: {
                $date: "2018-09-21T18:34:43.087Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928bfb"
            },
            expanded: false,
            protagonists: [
                "Rolf Grabower",
                "Philipp Kozower",
                "Franzi Schneidhuber",
                "Elly von Bleichröder",
                "Frau von Hennicke",
                "D. Leon Neuberger "
            ],
            images: [],
            title: "Freilichtvariete",
            number: 22,
            source: "",
            duration: "",
            start: -1,
            status: "Aufnahme von den Dreharbeiten",
            description:
                "Im Freilichtvarieté auf einer Wiese außerhalb der Ghettomauern treten verschiedene Künstler auf, darunter eine Tänzerin, ein Musikduo (Akkordeon und Violine), ein deutsches Kabarett-Trio, eine Sängerin sowie Kurt Gerron selbst.",
            music: "",
            locations: "Wiese außerhalb d. Ghettos",
            updated_at: {
                $date: "2018-09-21T18:34:43.094Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928bfc"
            },
            expanded: false,
            protagonists: [],
            images: [],
            title: "Metallwerkstätten",
            number: 27,
            source: "4",
            duration: "1:01:16",
            start: 619,
            status: "vollständig",
            description:
                "Zwei Männer schmieden ein heißes Eisen. Werkstatt mit mehreren Feuern, Ambossen, Stanzen und Fräsen. Ein Mann schweißt.",
            music: "",
            locations: "",
            updated_at: {
                $date: "2018-09-21T18:34:43.094Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928bfd"
            },
            expanded: false,
            protagonists: [
                "Heinrich Klang",
                "Desider Friedmann",
                "David Cohen",
                "Ernst Kantorowicz;"
            ],
            images: [],
            title: "Zentralbücherei",
            number: 32,
            source: "5",
            duration: "28:09",
            start: 1113,
            status: "vollständig",
            description:
                "Street with a few passers-by, man reading a book while walking, elderly man opening glass door and entering the library. Elderly men entering the library, pan through the rooms of the library, users standing between bookshelves talking to each other. Shown: David Cohen, Heinrich Klang (judge/professor), Ernst Kantorowicz (professor, Frankfurt), Desider Friedmann",
            music: "",
            locations: "Zentralbücherei?",
            updated_at: {
                $date: "2018-09-21T18:34:43.095Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928bff"
            },
            expanded: false,
            protagonists: [],
            images: [],
            title: "Jazzband",
            number: 3,
            source: "",
            duration: "2:20",
            start: 82,
            status: "verschollen",
            description:
                "Stadtplatz mit Jazzband in einem Musikpavillon, die Zuhörer stehen oder sitzen auf Parkbänken.",
            music: "",
            locations: "",
            updated_at: {
                $date: "2018-09-21T18:34:43.098Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928c00"
            },
            expanded: false,
            protagonists: ["Julia Salinger"],
            images: [],
            title: "Theater",
            number: 8,
            source: "",
            duration: "4:24",
            start: 215,
            status: "Aufnahme von den Dreharbeiten",
            description:
                "Bühnenszenen aus Offenbachs Hoffmanns Erzählungen und aus dem jiddischen Stück „In mitt'n Weg“.",
            music: "",
            locations: "",
            updated_at: {
                $date: "2018-09-21T18:34:43.099Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928c01"
            },
            expanded: false,
            protagonists: [],
            images: [],
            title: "Läden",
            number: 13,
            source: "",
            duration: "",
            start: -1,
            status: "verschollen",
            description:
                "Leute warten auf die Öffnung der Geschäfte, Kunden in einem Herrenbekleidungsgeschäft.",
            music: "",
            locations: "",
            updated_at: {
                $date: "2018-09-21T18:34:43.099Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928c02"
            },
            expanded: false,
            protagonists: [],
            images: [],
            title: "Feuerwehr",
            number: 18,
            source: "",
            duration: "",
            start: -1,
            status: "verschollen",
            description:
                "Die Feuerwehr der jüdischen Selbstverwaltung rückt aus. Der Löschwagen verläßt die Feuerwehrstation. Die Feuerwehrmänner löschen ein Feuer.",
            music: "",
            locations: "",
            updated_at: {
                $date: "2018-09-21T18:34:43.100Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928c04"
            },
            expanded: false,
            protagonists: ["Rudolf Saudek"],
            images: [],
            title: "Töpferei",
            number: 28,
            source: "4",
            duration: "48:10",
            start: 681,
            status: "vollständig",
            description:
                "In einer Töpferwerkstatt fertigt eine Frau ein Gefäß auf einer Drehscheibe. Ein andere Frau modelliert kleine Pferde. Der Bildhauer Rudolf Saudek bei der Arbeit an einer Brunnenfigur.",
            music: "Jacques Offenbach: „Pariser Leben“",
            locations: "",
            updated_at: {
                $date: "2018-09-21T18:34:43.101Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928bf9"
            },
            expanded: false,
            protagonists: [],
            images: [],
            title: "Bank",
            number: 12,
            source: "",
            duration: "",
            start: -1,
            status: "verschollen",
            description:
                "Die Bank der jüdischen Selbstverwaltung: Geschäfte an den Bankschaltern, der Banktresor.",
            music: "",
            locations: "",
            updated_at: {
                $date: "2018-09-21T18:34:43.093Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928c05"
            },
            expanded: false,
            protagonists: [
                "Emil Utitz",
                "Leo Baeck",
                "Hermann Strauss",
                "Otto Stargardt",
                "Alexander Cohn",
                "Alfred Philippson",
                "Alfred Klein",
                "Prof. Klang",
                "Benjamin Murmelstein",
                "Artur Stein",
                "Leo Taussig",
                "Maximilian Adler",
                "Franzi Schneidhuber",
                "Elly von Bleichröder",
                ""
            ],
            images: [],
            title: "Vortrag",
            number: 33,
            source: "5",
            duration: "40:08",
            start: 1142,
            status: "vollständig",
            description:
                "Vortrag des Universitätsprofessors Emil Utitz. Im Publikum sind zahlreiche Wissenschaftler vertreten.",
            music: "Felix Mendelssohn-Bartholdy: „Sonate für Violintrio“",
            locations: "",
            updated_at: {
                $date: "2018-09-21T18:34:43.101Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928c06"
            },
            expanded: false,
            protagonists: [],
            images: [],
            title: "Schlussmontage",
            number: 38,
            source: "",
            duration: "",
            start: -1,
            status: "verschollen",
            description: "Schlußmontage",
            music: "",
            locations: "",
            updated_at: {
                $date: "2018-09-21T18:34:43.101Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928c07"
            },
            expanded: false,
            protagonists: [],
            images: [],
            title: "Kaffeehaus",
            number: 5,
            source: "",
            duration: "4:20",
            start: 101,
            status: "Aufnahme von den Dreharbeiten",
            description: "Abendliche Stimmung mit Musik und Tanz.",
            music: "",
            locations: "",
            updated_at: {
                $date: "2018-09-21T18:34:43.105Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928c09"
            },
            expanded: false,
            protagonists: [],
            images: [],
            title: "Postamt",
            number: 14,
            source: "",
            duration: "",
            start: -1,
            status: "verschollen",
            description:
                "Leute, die Pakete aus vielen verschiedenen Ländern abholen; ein Paket wird in der Unterkunft eines Ehepaares ausgepackt.",
            music: "",
            locations: "",
            updated_at: {
                $date: "2018-09-21T18:34:43.106Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928c0a"
            },
            expanded: false,
            protagonists: [],
            images: [],
            title: "Eisenbahner",
            number: 19,
            source: "",
            duration: "7:08",
            start: -1,
            status: "verschollen",
            description: "Gleisarbeiter reparieren einen Schienenabschnitt.",
            music: "",
            locations: "Gleise",
            updated_at: {
                $date: "2018-09-21T18:34:43.107Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928c0b"
            },
            expanded: false,
            protagonists: [],
            images: [],
            title: "Wächerei",
            number: 24,
            source: "",
            duration: "",
            start: -1,
            status: "verschollen",
            description: "Zentrale Wäscherei.",
            music: "",
            locations: "Wächerei",
            updated_at: {
                $date: "2018-09-21T18:34:43.107Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928c0c"
            },
            expanded: false,
            protagonists: [],
            images: [],
            title: "Werkstätten",
            number: 29,
            source: "",
            duration: "3:05:13",
            start: 729,
            status: "vollständig",
            description:
                "Die Szene zeigt die Herstellungs- und Reparaturwerkstätten in hölzernen Baracken außerhalb der Stadt. Schneider, Näherinnen und Schuhmacher sind bei der Arbeit zu sehen. Es werden Handtaschen und Geldbörsen hergestellt. Schneider bügeln Kleider. Ein anderer Schneider näht Hosen.Schneider arbeiten in einer großen Halle mit Nähmaschinen oder mit Hand. achines or by hand. Shoemakers sewing shoes, partly with sewing machines, working with material needed for production, hammer, and hollow punch. Shoemakers standing up together and leaving the facility. Women and men leaving the barracks in small groups or individually, walking along a street with a pylon, the barracks in the background.",
            music: "Felix Mendelssohn-Bartholdy: „Midsummer nights dream“",
            locations: "",
            updated_at: {
                $date: "2018-09-21T18:34:43.107Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928c0e"
            },
            expanded: false,
            protagonists: [],
            images: [],
            title: "Freizeit",
            number: 6,
            source: "1",
            duration: "1:27:07",
            start: 107,
            status: "vollständig",
            description:
                "Freizeit auf den Stadtwällen: Alte Männer spielen Schach und alte Frauen lesen. Leute genießen die Zeit auf den Stadtwällen. Leute sitzen auf Bänken, liegen allein oder in Gruppen auf Decken. Vier Mädchen machen Gymnastik. Ein Mann zeichnet, andere lesen, stricken oder baden in der Sonne. Blick auf die ländliche Umgebung.",
            music: "",
            locations: "Stadtwälle",
            updated_at: {
                $date: "2018-09-21T18:34:43.112Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928bfe"
            },
            expanded: false,
            protagonists: [
                "Philipp Kozower",
                "Gisela Kozower",
                "David Cohen",
                "Cornelia Cohen",
                ""
            ],
            images: [],
            title: "Abendessen",
            number: 37,
            source: "5",
            duration: "3:09",
            start: 1489,
            status: "Unvollständig",
            description:
                'Abendessen einer Familie (um den Tisch sitzen: Professor Cohen und Frau Cohen aus Amsterdam; Herr und Frau Kozower und Kinder aus Berlin).               ++++ Margry: „Die  Szene gibt vor, eine Familie aus Vater, Mutter, zwei Kindern und         Großeltern zu zeigen. Keinem der Filmemacher oder jedenfalls keinem der SS-Kontrolleure fiel auf, wie abwegig es war, öffentlich bekannte Personen, die wie die Ehepaare Cohen und Kozower auch noch aus verschiedenen Ländern kamen, einzusetzen, um mit ihnen eine "richtige Familie" darzustellen.“',
            music: "",
            locations: "",
            updated_at: {
                $date: "2018-09-21T18:34:43.095Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928c0f"
            },
            expanded: false,
            protagonists: ["Paul Eppstein", "Benjamin Murmelstein"],
            images: [],
            title: "Selbstverwaltung",
            number: 10,
            source: "2",
            duration: "1:58:16",
            start: 221,
            status: "vollständig",
            description:
                "Die jüdische Selbstverwaltung: eine Sitzung des Ältestenrates, die Ältesten hören einer Rede des Judenältesten Paul Eppstein zu.",
            music: "",
            locations: "",
            updated_at: {
                $date: "2018-09-21T18:34:43.113Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928c10"
            },
            expanded: false,
            protagonists: [],
            images: [],
            title: "Gesundheitswesen",
            number: 15,
            source: "3",
            duration: "1:36:01",
            start: 349,
            status: "vollständig",
            description:
                "Szenen aus den Ambulanzen, aus dem zentralen Krankenhaus; eine Operation; ein Krankenzimmer; Patienten sonnen sich im Garten der Klinik; das Kindererholungsheim; Kinder, die belegte Brote und Obst essen.",
            music: "",
            locations: "Krankenzimmer",
            updated_at: {
                $date: "2018-09-21T18:34:43.113Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928c11"
            },
            expanded: false,
            protagonists: [],
            images: [],
            title: "Landwirtschaft",
            number: 20,
            source: "",
            duration: "",
            start: 587,
            status: "verschollen",
            description:
                "(a) Gärtnerei außerhalb der Stadt: Gemüse und Kartoffeln, Seidenraupenzucht; (b) Enten- und Geflügelhaltung; (c) Ernte, eine Dreschmaschine bei der Arbeit; (d) das Wirtschaften auf dem Ackerland mit Ochsen.",
            music: "",
            locations: "",
            updated_at: {
                $date: "2018-09-21T18:34:43.113Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928c13"
            },
            expanded: false,
            protagonists: [],
            images: [],
            title: "Fußballspiel",
            number: 30,
            source: "4",
            duration: "2:54:04",
            start: 915,
            status: "vollständig",
            description:
                'Fußballspiel „Ligasieger gegen Pokalsieger“ im Hof der "Dresdner Kaserne". People heading towards gate, entering the gate, audience leaning out of the arcades on the first floor. Players passing the audience and running to the field in the courtyard of a former military barracks ("Dresdner Kaserne", lining up back to back, the referee welcoming the captains by handshake. The audience clustered around the field and in the arcades on the upper floors of the building. Kick-off, match scenes, end of the game, people leaving the field through the gate',
            music: "",
            locations: "Dresdner Kaserne",
            updated_at: {
                $date: "2018-09-21T18:34:43.114Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928c03"
            },
            expanded: false,
            protagonists: [
                "Kurt Gerron",
                "Rolf Grabower",
                "Philip Kozower",
                "Franzi Schneidhuber",
                "Elly von Bleichröder"
            ],
            images: [],
            title: "Schwimmen",
            number: 23,
            source: "",
            duration: "",
            start: -1,
            status: "verschollen",
            description: "Schwimmen im Flußbad der Eger.",
            music: "",
            locations: "Fluß Eger",
            updated_at: {
                $date: "2018-09-21T18:34:43.100Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928c14"
            },
            expanded: false,
            protagonists: [],
            images: [],
            title: "Schrebergärten",
            number: 35,
            source: "5",
            duration: "1:10:05",
            start: 1304,
            status: "vollständig",
            description:
                "Schrebergärten am Festungsgraben unterhalb der Stadtmauer. Leute arbeiten im Garten und gießen Blumen.",
            music: "",
            locations: "Festungsgraben",
            updated_at: {
                $date: "2018-09-21T18:34:43.115Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928c08"
            },
            expanded: false,
            protagonists: [],
            images: [],
            title: "Beginnender Werktag",
            number: 9,
            source: "",
            duration: "",
            start: -1,
            status: "verschollen",
            description:
                "Der Stadtplatz am Beginn eines Werktages: Gruppen singender Männer und Frauen mit geschulterten Spaten und Rechen marschieren singend zur Arbeit.",
            music: "",
            locations: "Stadtplatz",
            updated_at: {
                $date: "2018-09-21T18:34:43.106Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928c0d"
            },
            expanded: false,
            protagonists: [
                "Karel Ancerl",
                "Ernst Rosenthal",
                "Fritz Gutmann",
                "Julius Moritz",
                "Karl Meinhard",
                "Karl Löwenstein",
                "Leo Löwenstein",
                "Rudolf Saudek",
                "Heinrich Gans",
                "Heinrich Dessauer",
                "Ove Meyer",
                "Morits Oppenhejm",
                "Melanie Oppenhejm",
                "Franz Kahn",
                "Robert Mandler",
                "Erich Springer",
                "Elisabeth Czech",
                "Hans Krasa",
                "Pavel Haas "
            ],
            images: [],
            title: "Konzert",
            number: 34,
            source: "5",
            duration: "2:02:03",
            start: 1182,
            status: "vollständig",
            description:
                "Das Orchester unter der Leitung von Karel Ancerl spielt das Stück „Studie für Streichorchester“ von Pavel Haas.",
            music: "Pavel Haas: „Studie für Streichorchester“",
            locations: "",
            updated_at: {
                $date: "2018-09-21T18:34:43.108Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "5ba539c3e99589718c928c12"
            },
            expanded: false,
            protagonists: [],
            images: [],
            title: "Maschinentischlerei",
            number: 25,
            source: "USHMM 59538",
            duration: "",
            start: -1,
            status: "verschollen",
            description:
                "In der Maschinentischlerei in einer früheren Reitschule wird Holz gesägt sowie Bretter und Bauteile für Holzbaracken hergestellt.",
            music: "",
            locations: "Tischlerei",
            updated_at: {
                $date: "2018-09-21T18:34:43.114Z"
            },
            __v: 0
        }
    ];

    const persons = [
        {
            shortname: 'Maximilian Adler',
            name: 'Maximilian',
            surename: 'Adler',
            birth: '21.09.1884',
            birth_place: 'Budweis',
            death: '16.10.1944',
            death_place: 'KZ Auschwitz',
            profession: 'Philologe und Hochschullehrer',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.989Z',
            },
        },
        {
            shortname: 'Karel Ancerl',
            name: 'Karel',
            surename: 'Ančerl',
            birth: '22.03.1905',
            birth_place: 'Tučapy',
            death: '',
            death_place: 'Toronto',
            profession: 'Dirigent',
            bio:
                'Ančerl war ein bekannter tschechischer Dirigent. Am 16. November 1942 wurde er nach Theresienstadt deportiert, wo er 1943 ein Kammerorchester gründete, das bei der Interpretation großer musikalischer Werke im Ghetto hohes Niveau erreichte.\nAm 16. Oktober 1944 wurde er nach Auschwitz deportiert und kam später in andere Konzentrationslager. Nach der Befreiung arbeitete er \nbeim tschechischen Rundfunk. Ab 1950 war er Chefdirigent der Tschechischen Philharmoniker.\n\nQuelle:http://www.ghetto-theresienstadt.info/pages/a/ancerlk.htm',
            updated_at: {
                $date: '2018-09-21T18:34:42.990Z',
            },
        },
        {
            shortname: 'Leo Baeck',
            name: 'Leo',
            surename: 'Baeck',
            birth: '23.05.1873',
            birth_place: 'Lissa',
            death: '02.11.1956',
            death_place: 'London',
            profession: 'Rabbiner',
            bio:
                'Leo Baeck wird am 23. Mai in Lissa (heute Lezno/Polen \nEr wird früh in der jüdischen Kultur und Religion unterrichtet. Er besucht das konservative „Jüdisch-Theologische Seminar“ von Breslau (Wroclaw)und bis 1894 das Philosophische Seminar der Universität Breslau. Zum weiteren Studium der Philosophie, Geschichte und Religionsphilosophie zieht er nach Berlin. Er beginnt das Rabbinatsstudium an der liberalen „Lehranstalt für die Wissenschaft des Judentums“.\nBaeck promoviert 1895 und veröffentlicht seine vielbeachtete Dissertation über „Spinozas erste Einwirkungen auf Deutschland“. Im Herbst des Jahres geht er als junger Rabbiner nach Oppeln (Opole).\nEr wird zum führenden Vertreter des jüdischen Liberalismus. 1907 – 1912, Baeck ist Rabbiner in Düsseldorf. 1912 wird Baeck als Rabbiner nach Berlin berufen und arbeitet in der neu errichteten Synagoge in der Fasanenstraße. Zudem wird er Dozent an der „Hochschule für die Wissenschaft des Judentums“.\nWährend des 1. Weltkrieges wird Baeck Feldrabbiner an der West- und Ostfront.\n1933 – 1943, trotz mehrfacher Gelegenheit zur Emigration bleibt Baeck bei seiner Gemeinde, um den deutschen Juden in den Jahren der Diskriminierung und der Verfolgung beizustehen. Er organisiert die Emigration von Juden.\nAls am 1. Nov. 1938 der jüdische Religionsphilosoph Martin Buber aus Deutschland emigriert, ist Baeck der letzte hohe Repräsentant des Judentums in Deutschland. \n1943 wird Baeck zusammen mit seiner Familie in das Ghetto Theresienstadt deportiert. Dort unterstützt er die Gefangenen durch Vorträge und Predigten. Schwer misshandelt überlebt Baeck. Seine vier Schwestern sind im Ghetto umgekommen.\nIm Juli 1945 läßt sich Leo Baeck in London nieder. Ab 1948 bemüht er sich in ganz Deutschland um Versöhnung und Dialoge zwischen Juden und Christen. Die Wiederaufnahme der von ihm 1919 initiierten Gespräche zwischen den Glaubensgruppen ist ihm zunächst wichtiger als die Bestrafung der Schuldigen am Völkermord an den europäischen Juden. Neben seinen repräsentativen Funktionen beginnt Baeck eine umfangreiche Lehrtätigkeit an verschiedenen Universitäten in Europa und den USA. Leo Baeck stirbt am 2. November 1956 in London\nQuelle:http://www.ghetto-theresienstadt.info/pages/b/baeckl.htm',
            updated_at: {
                $date: '2018-09-21T18:34:42.990Z',
            },
        },
        {
            shortname: 'Cornelia Cohen',
            name: 'Cornelia',
            surename: 'Cohen',
            birth: '',
            birth_place: '',
            death: '',
            death_place: '',
            profession: '',
            bio: 'Eine geborene Spitzer. Ehefrau von David Cohen.',
            updated_at: {
                $date: '2018-09-21T18:34:42.990Z',
            },
        },
        {
            shortname: 'David Cohen',
            name: 'David',
            surename: 'Cohen',
            birth: '31.12.1882',
            birth_place: 'Deventer',
            death: '03.09.1967',
            death_place: 'Amsterdam',
            profession: '',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.991Z',
            },
        },
        {
            shortname: 'Elisabeth Czech',
            name: 'Elisabeth',
            surename: 'Czech',
            birth: '',
            birth_place: '',
            death: '',
            death_place: '',
            profession: '',
            bio: 'Witwe eines früheren tschechischen Ministers.',
            updated_at: {
                $date: '2018-09-21T18:34:42.991Z',
            },
            __v: 0,
        },
        {
            shortname: 'Heinrich Dessauer',
            name: 'Heinrich',
            surename: 'Dessauer',
            birth: '',
            birth_place: '',
            death: '',
            death_place: '',
            profession: '',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.991Z',
            },
        },
        {
            shortname: 'Paul Eppstein; ',
            name: 'Paul',
            surename: 'Eppstein',
            birth: '04.03.1902',
            birth_place: 'Ludwigshafen',
            death: '28.09.1944',
            death_place: 'Ghetto Theresienstadt',
            profession: 'Soziologe',
            bio: 'Eppstein war Judenälteste r im Ghetto Theresienstadt',
            updated_at: {
                $date: '2018-09-21T18:34:42.992Z',
            },
        },
        {
            shortname: 'Karel Fischer',
            name: 'Karel',
            surename: 'Fischer',
            birth: '',
            birth_place: '',
            death: '',
            death_place: '',
            profession: 'Dirigent',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.992Z',
            },
        },
        {
            shortname: 'Max Friediger',
            name: 'Max',
            surename: 'Friediger',
            birth: '09.04.1884',
            birth_place: 'Budapest',
            death: '09.04.1947',
            death_place: 'Kopenhagen',
            profession: 'Oberrabbiner',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.992Z',
            },
        },
        {
            shortname: 'Desider Friedmann',
            name: 'Desider',
            surename: 'Friedmann',
            birth: '24.11.1880',
            birth_place: 'Boskovice',
            death: '00.10.1944',
            death_place: '',
            profession: '',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.992Z',
            },
        },
        {
            shortname: 'Heinrich Gans',
            name: 'Heinrich',
            surename: 'Gans',
            birth: '',
            birth_place: '',
            death: '',
            death_place: '',
            profession: '',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.993Z',
            },
        },
        {
            shortname: 'Kurt Gerron',
            name: 'Kurt',
            surename: 'Gerron',
            birth: '11.05.1897',
            birth_place: 'Berlin',
            death: '28.10.1944',
            death_place: 'KZ Auschwitz',
            profession: 'Schauspieler, Sänger, Regisseur',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.993Z',
            },
        },
        {
            shortname: 'Rolf Grabower',
            name: 'Rolf',
            surename: 'Grabower',
            birth: '21.05.1883',
            birth_place: 'Berlin',
            death: '07.03.1963',
            death_place: 'München',
            profession: 'Steuerrechtler, Ministerialrat, Richter',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.993Z',
            },
        },
        {
            shortname: 'Georg Gradnauer',
            name: 'Georg',
            surename: 'Gradnauer',
            birth: '16.11.1866',
            birth_place: 'Magdeburg',
            death: '18.11.1946',
            death_place: 'Berlin-Schlachtensee',
            profession: 'Politiker',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.993Z',
            },
        },
        {
            shortname: 'Fritz Gutmann',
            name: 'Fritz',
            surename: 'Gutmann',
            birth: '',
            birth_place: '',
            death: '',
            death_place: '',
            profession: '',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.994Z',
            },
        },
        {
            shortname: 'Pavel Haas ',
            name: 'Pavel',
            surename: 'Haas',
            birth: '21.06.1899',
            birth_place: 'Brünn',
            death: '18.10.1944',
            death_place: 'KZ Auschwitz',
            profession: 'Komponist',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.994Z',
            },
        },
        {
            shortname: 'Franz Kahn',
            name: 'Franz',
            surename: 'Kahn',
            birth: '',
            birth_place: '',
            death: '',
            death_place: '',
            profession: '',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.994Z',
            },
        },
        {
            shortname: 'Ernst Kantorowicz',
            name: 'Ernst',
            surename: 'Kantorowicz',
            birth: '',
            birth_place: '',
            death: '',
            death_place: '',
            profession: '',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.995Z',
            },
        },
        {
            shortname: 'Heinrich Klang',
            name: 'Heinrich',
            surename: 'Klang',
            birth: '15.04.1875',
            birth_place: 'Wien',
            death: '22.01.1954',
            death_place: 'Wien',
            profession: 'Rechtswissenschaftler',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.995Z',
            },
        },
        {
            shortname: 'Alfred Klein',
            name: 'Alfred',
            surename: 'Klein',
            birth: '',
            birth_place: '',
            death: '',
            death_place: '',
            profession: '',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.995Z',
            },
        },
        {
            shortname: 'Gisela Kozower',
            name: 'Giesela',
            surename: 'Kozower',
            birth: '',
            birth_place: '',
            death: '',
            death_place: '',
            profession: '',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.995Z',
            },
        },
        {
            shortname: 'Philipp Kozower',
            name: 'Philipp',
            surename: 'Kozower',
            birth: '28.01.1894',
            birth_place: 'Berlin',
            death: '00.10.1944',
            death_place: 'KZ Auschwitz',
            profession: 'Jurist',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.996Z',
            },
        },
        {
            shortname: 'Hans Krasa',
            name: 'Hans',
            surename: 'Krása',
            birth: '30.11.1899',
            birth_place: 'Prag',
            death: '17.10.1944',
            death_place: 'KZ Auschwitz',
            profession: 'Komponist',
            bio:
                'Die Eltern waren assimilierte Juden in Prag. Als 10 jähriger bekommt Krasa Violinen- und Klaverunterricht, als 11 jähriger komponierte er erste Stücke. Krasa studiert an der "Deutschen Akademie für Musik und darstellende Kunst" in Prag. 1924 Uraufführung einer "Orchestergroteske" nach den galgenliedern von Christian Morgenstern. 1938 schreibt Krasa sein bekanntestes Werk, die Kinderoper "Brundibar" im Stil Brechtscher Lehrstücke.\n1942 wird Krasa nach Thersienstadt deportiert, wo Brundibar über 50 mal aufgeführt wird, das erste mal am 23.8.1943 auf dem Dachboden der Magdeburger Kaserne.\nKrasa ging am 16.10.1944 auf "Transport" nach Auschwitz, mit ihm wurden auch so wichtige Künstler wie Haas, Klein und Ullmann deportiert. Keiner kehrte zurück.\nQuellen:\n(1) http://www.ghetto-theresienstadt.de/pages/k/krasah.htm',
            updated_at: {
                $date: '2018-09-21T18:34:42.996Z',
            },
        },
        {
            shortname: 'Karl Löwenstein',
            name: 'Karl',
            surename: 'Löwenstein',
            birth: '02.05.1887',
            birth_place: 'Siegen',
            death: '1976',
            death_place: 'Bad Neuenahr-Ahrweiler',
            profession: 'Privatbankdirektor',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.996Z',
            },
        },
        {
            shortname: 'Leo Löwenstein',
            name: 'Leo',
            surename: 'Löwenstein',
            birth: '08.02.1879',
            birth_place: 'Aachen',
            death: '13.02.1956',
            death_place: '',
            profession: 'Physiker, Chemiker',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.996Z',
            },
        },
        {
            shortname: 'Robert Mandler',
            name: 'Robert',
            surename: 'Mandler',
            birth: '',
            birth_place: '',
            death: '',
            death_place: '',
            profession: '',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.996Z',
            },
        },
        {
            shortname: 'Carl Meinhard',
            name: 'Carl',
            surename: 'Meinhard',
            birth: '28.11.1875',
            birth_place: 'Iglau',
            death: '12.02.1949',
            death_place: 'Buenos Aires',
            profession: 'Schauspieler, Theaterdirektor',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.997Z',
            },
        },
        {
            shortname: 'Alfred Meissner',
            name: 'Alfred',
            surename: 'Meissner',
            birth: '10.04.1871',
            birth_place: 'Jungbunzlau',
            death: '29.09.1950',
            death_place: 'Prag',
            profession: 'Justizminister',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.997Z',
            },
        },
        {
            shortname: 'Leon Meyer',
            name: 'Léon',
            surename: 'Meyer',
            birth: '11.09.1868',
            birth_place: 'Le Havre',
            death: '22.01.1948',
            death_place: 'Paris',
            profession: 'Minister',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.997Z',
            },
        },
        {
            shortname: 'Ove Meyer',
            name: 'Ove',
            surename: 'Meyer',
            birth: '',
            birth_place: '',
            death: '',
            death_place: '',
            profession: '',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.997Z',
            },
        },
        {
            shortname: 'Julius Moritz',
            name: 'Julius',
            surename: 'Moritz',
            birth: '',
            birth_place: '',
            death: '',
            death_place: '',
            profession: '',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.998Z',
            },
        },
        {
            shortname: 'Benjamin Murmelstein',
            name: 'Benjamin',
            surename: 'Murmelstein',
            birth: '09.06.1805',
            birth_place: 'Lemberg',
            death: '27.10.1989',
            death_place: 'Rom',
            profession: 'Rabbiner',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.998Z',
            },
        },
        {
            shortname: 'D. Leon Neuberger',
            name: 'D. Leon',
            surename: 'Neuberger',
            birth: '',
            birth_place: '',
            death: '',
            death_place: '',
            profession: '',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.998Z',
            },
        },
        {
            shortname: 'Melanie Oppenhejm',
            name: 'Mélanie',
            surename: 'Oppenhejm',
            birth: '10.15.1897',
            birth_place: 'Hamburg',
            death: '',
            death_place: '',
            profession: '',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.998Z',
            },
        },
        {
            shortname: 'Morits Oppenhejm',
            name: 'Morits',
            surename: 'Oppenhejm',
            birth: '13.10.1943',
            birth_place: 'Kopenhagen',
            death: '',
            death_place: '',
            profession: '',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.999Z',
            },
        },
        {
            shortname: 'Alfred Philippson',
            name: 'Alfred',
            surename: 'Philippson',
            birth: '01.01.1864',
            birth_place: 'Bonn',
            death: '28.03.1953',
            death_place: 'Bonn',
            profession: 'Geograph',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.999Z',
            },
        },
        {
            shortname: 'Ernst Rosenthal',
            name: 'Ernst',
            surename: 'Rosenthal',
            birth: '',
            birth_place: '',
            death: '',
            death_place: '',
            profession: '',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:42.999Z',
            },
        },
        {
            shortname: 'Rudolf Saudek',
            name: 'Rudolf',
            surename: 'Saudek',
            birth: '20.10.1880',
            birth_place: 'Kolin',
            death: '19.07.1965',
            death_place: 'Prag',
            profession: 'Bildhauer, Grafiker',
            bio:
                'Rudolf Saudek ist ein tschechisch-deutscher Bildhauer und Grafiker. Nach der Handelsakademie und anschließender kaufmännischer Tätigkeit in Prag begann er 1903 seine künstlerische Ausbildung. Saudeck studierte drei Jahre bei Adolf Lehnert in Leipzig und danach bei Landislav Jan Saloun in Prag. An der Accademia dell arte in Florenz absolvierte er ebenfalls ein Studium bis er sich 1909 als freischaffender Bildhauer und Graphiker in Leipzig niederließ. Im Mittelpunkt seiner Arbeit standen Portraitbüsten, die teilweise heute noch sehr bekannt sind (z.B.: Friedrich Nietzsche (1912), Ludwig van Beethoven (1912) und Gerhard Hauptmann). 1910 folgten noch einmal Studienaufenthalte in Rom, Paris und London. 1933 wurde saudek wegen seiner jüdischen Herkunft von der Reichskammer der Künste mit einem Arbeitsverbot belegt. 1942 erfolgte die Deportation und Internierung in der „Kleinen Festung" im KZ Theresienstadt. Nach dem Zweiten Weltkrieg lebte und arbeite Saudek bis zu seinem Tode in Prag. Noch heute zieren einige seiner büsten Gebäude in der Leipziger Innenstadt.',
            updated_at: {
                $date: '2018-09-21T18:34:42.999Z',
            },
        },
        {
            shortname: 'Franzi Schneidhuber',
            name: 'Franzi',
            surename: 'Schneidhuber',
            birth: '',
            birth_place: '',
            death: '',
            death_place: '',
            profession: '',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:43.000Z',
            },
        },
        {
            shortname: 'Emil Sommer',
            name: 'Emil',
            surename: 'Sommer',
            birth: '19.11.1869',
            birth_place: 'Dorna-Watra',
            death: '10.04.1947',
            death_place: 'Danvers',
            profession: 'Offizier',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:43.000Z',
            },
        },
        {
            shortname: 'Jo Spier',
            name: 'Joseph Eduard Adolf',
            surename: 'Spier',
            birth: '26.06.1900',
            birth_place: 'Zutphen',
            death: '1978',
            death_place: '',
            profession: 'Illustrator, Karrikaturist',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:43.000Z',
            },
        },
        {
            shortname: 'Erich Springer',
            name: 'Erich',
            surename: 'Springer',
            birth: '',
            birth_place: '',
            death: '',
            death_place: '',
            profession: '',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:43.000Z',
            },
        },
        {
            shortname: 'Otto Stargardt',
            name: 'Otto',
            surename: 'Stargardt',
            birth: '',
            birth_place: '',
            death: '',
            death_place: '',
            profession: '',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:43.001Z',
            },
        },
        {
            shortname: 'Artur Stein',
            name: 'Artur',
            surename: 'Stein',
            birth: '',
            birth_place: '',
            death: '',
            death_place: '',
            profession: '',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:43.001Z',
            },
        },
        {
            shortname: 'Hermann Strauss',
            name: 'Hermann',
            surename: 'Strauss',
            birth: '',
            birth_place: '',
            death: '',
            death_place: '',
            profession: '',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:43.001Z',
            },
            __v: 0,
        },
        {
            shortname: 'Leo Taussig',
            name: 'Leo',
            surename: 'Taussig',
            birth: '',
            birth_place: '',
            death: '',
            death_place: '',
            profession: '',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:43.001Z',
            },
        },
        {
            shortname: 'Emil Utitz',
            name: 'Emil',
            surename: 'Utitz',
            birth: '27.05.1883',
            birth_place: 'Rostocky (bei Prag)',
            death: '02.11.56',
            death_place: 'Jena',
            profession: 'Psychologe, Philosoph',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:43.002Z',
            },
        },
        {
            shortname: 'Elly von Bleichröder',
            name: 'Elly',
            surename: 'von Bleichröder',
            birth: '17.09.1894',
            birth_place: 'Drehsa',
            death: '00.00.1989',
            death_place: '',
            profession: '',
            bio:
                'Elli  von Bleichröder war die Tochter von James und # Harriet von Bleichröder. Obwohl bereits ihr  Großvater, der Bankier Baron Gerson von Bleichröder, vom Judentum zum  Christentum konvertiert war und sie über hochrangige Beziehungen  verfügte, wurde sie am 27. Juli 1942 in das KZ Theresienstadt   deportiert. Zu diesem Zeitpunkt war sie von Rudolph A. Herrschel   geschieden. Aus der Ehe hatte sie ein Kind. Bleichröder wurde am Ende   des Zweiten Weltkrieges aus dem KZ befreit.',
            updated_at: {
                $date: '2018-09-21T18:34:43.002Z',
            },
        },
        {
            shortname: 'Clara von Schultz',
            name: 'Clara',
            surename: 'von Schultz',
            birth: '',
            birth_place: '',
            death: '',
            death_place: '',
            profession: '',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:43.002Z',
            },
        },
        {
            shortname: 'Julia Salinger',
            name: 'Julie Frieda',
            surename: 'Zeman',
            birth: '06.06.1873',
            birth_place: 'Savar',
            death: '',
            death_place: '',
            profession: '',
            bio: '',
            updated_at: {
                $date: '2018-09-21T18:34:43.002Z',
            },
        },
    ];
};