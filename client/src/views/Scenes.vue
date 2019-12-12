<template>
  <div class="home">
    <h1>Protagonisten</h1>

    <div v-for="scene in scenes">{{ scene.title }}</div>
  </div>
</template>

<script>
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue';

//const API_URL = "http://localhost:4000/message";


export default {
  name: "home",
  data: () => ({
    error: "",
    scenes: [
        {
	"_id": {
		"$oid": "5ba539c3e99589718c928bef"
	},
	"protagonists": [
		"Karel Fischer",
		"Jo Spier"
	],
	"images": [],
	"title": "Titelsequenz",
	"number": 1,
	"source": "1",
	"length": "32:06",
	"start": 0,
	"status": "unvollständig",
	"description": "Der von Karel Fischer geleitete Chor singt Mendelssohn-Bartholdys „Elias“.",
	"music": "Felix Mendelsohn-Bartholdy: „Elias“",
	"locations": "",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.074Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928bf1"
	},
	"protagonists": [
		""
	],
	"images": [],
	"title": "Gericht",
	"number": 11,
	"source": "2",
	"length": "8:05",
	"start": 340,
	"status": "Unvollständig",
	"description": "Das Gericht der jüdischen Selbstverwaltung. Ausschnitte einer Gerichtsverhandlung.",
	"music": "",
	"locations": "",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.086Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928bf2"
	},
	"protagonists": [
		""
	],
	"images": [],
	"title": "Spielplatz",
	"number": 16,
	"source": "3",
	"length": "1:06:08",
	"start": 445,
	"status": "vollständig",
	"description": "Schild mit der Aufschrift „Zum Spielplatz“. Kinder laufen in Zweierreihe durch den Stadtpark zum nahegelegenen Kinderpavillon. Dort befindet sich ein Sandkasten, wo sie gemeinsam spielen, trinken, tanzen und singen. Die Kinder halten außerhalb des Pavillions Mittagsschlaf. In einem Planschbecken spielen sie. Einige Kinder schaukeln draußen. Innenaufnahme eines Spielzimmers mit Schaukelpferden und Holzspielzeug.",
	"music": "",
	"locations": "",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.087Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928bf0"
	},
	"protagonists": [
		"Paul Eppstein",
		"Alfred Meissner",
		"Georg Gradnauer",
		"Léon Meyer",
		"Johann Friedländer",
		"Emil Sommer",
		"Max Friedinger",
		"Clara von Schultz"
	],
	"images": [],
	"title": "Terrasse",
	"number": 4,
	"source": "",
	"length": "12:23",
	"start": 87,
	"status": "verschollen",
	"description": "Terrasse mit Sonnenschirmen, Kellnerinnen servieren Limonade, Leute spazieren in dem sich anschließenden Garten auf und ab.",
	"music": "",
	"locations": "",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.086Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928bf4"
	},
	"protagonists": [
		""
	],
	"images": [],
	"title": "Schmiede",
	"number": 26,
	"source": "4",
	"length": "22:15",
	"start": 596,
	"status": "vollständig",
	"description": "In der Werkstatt eines Huf- Wagenschmieds beschlägt ein Hufschmied einen Ochsen. Der Ochse wird aus der Schmiede herausgeführt.",
	"music": "",
	"locations": "Schmiede",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.088Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928bf5"
	},
	"protagonists": [
		""
	],
	"images": [],
	"title": "Zentralbad",
	"number": 31,
	"source": "4,5",
	"length": "27:16",
	"start": 1086,
	"status": "vollständig",
	"description": "Männer laufen in die Gemeinschaftsdusche und waschen sich. Männer verlassen das Zentralbad und laufen auf die Straße.",
	"music": "",
	"locations": "Zentralbad",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.088Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928bf6"
	},
	"protagonists": [
		""
	],
	"images": [],
	"title": "Abendfreizeit",
	"number": 36,
	"source": "5",
	"length": "1:54:24",
	"start": 1374,
	"status": "vollständig",
	"description": "Leute erholen sich außerhalb von Holzbaracken, Szenen aus den Gemeinschaftsunterkünften. Outdoor facilities of the barracks with inhabitants, mostly women and children, on benches, chatting, reading. Inside a barrack of the women's accommodation, pan on the central corridor to separate living spaces with wooden tables and benches, double bunk beds separating the living spaces, partly covered with cloths. Several women and young girls reading, needle working, chatting in small groups, playing cards.",
	"music": "",
	"locations": "",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.089Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928bf7"
	},
	"protagonists": [
		""
	],
	"images": [],
	"title": "Entstehungsgeschichte",
	"number": 2,
	"source": "1",
	"length": "50:10",
	"start": 32,
	"status": "vollständig",
	"description": "Die Entstehungsgeschichte der Festung Theresienstadt, illustriert durch Zeichnungen von Jo Spier.",
	"music": "",
	"locations": "",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.092Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928bf8"
	},
	"protagonists": [
		""
	],
	"images": [],
	"title": "Sport",
	"number": 7,
	"source": "",
	"length": "30:07",
	"start": 185,
	"status": "vollständig",
	"description": "Sport auf einer der Basteien. Männer laufen und zwei Frauenmannschaften spielen Handball.",
	"music": "",
	"locations": "Bastei",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.093Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928bfa"
	},
	"protagonists": [
		""
	],
	"images": [],
	"title": "Kinderoper",
	"number": 17,
	"source": "3",
	"length": "1:15:02",
	"start": 511,
	"status": "vollständig",
	"description": "Schlussszene von Hand Krasas Kinderoper „Brundibár“. Der Kinderchor singt. Szenenwechsel zwischen den kostümierten Darstellern und den jungen Zuschauern.",
	"music": "",
	"locations": "",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.094Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928bf3"
	},
	"protagonists": [
		""
	],
	"images": [],
	"title": "Verpflegung",
	"number": 21,
	"source": "",
	"length": "",
	"start": -1,
	"status": "verschollen",
	"description": "in einer Zentralküche wird das Essen zubereitet.  Essen wird gegen Lebensmittelmarken ausgegeben. Leute essen gemeinsamen im Speisesaal.",
	"music": "",
	"locations": "Zentralküche",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.087Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928bfb"
	},
	"protagonists": [
		"Rolf Grabower",
		"Philipp Kozower",
		"Franzi Schneidhuber",
		"Elly von Bleichröder",
		"Frau von Hennicke",
		"D. Leon Neuberger "
	],
	"images": [],
	"title": "Freilichtvariete",
	"number": 22,
	"source": "",
	"length": "",
	"start": -1,
	"status": "Aufnahme von den Dreharbeiten",
	"description": "Im Freilichtvarieté auf einer Wiese außerhalb der Ghettomauern treten verschiedene Künstler auf, darunter eine Tänzerin, ein Musikduo (Akkordeon und Violine), ein deutsches Kabarett-Trio, eine Sängerin sowie Kurt Gerron selbst.",
	"music": "",
	"locations": "Wiese außerhalb d. Ghettos",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.094Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928bfc"
	},
	"protagonists": [
		""
	],
	"images": [],
	"title": "Metallwerkstätten",
	"number": 27,
	"source": "4",
	"length": "1:01:16",
	"start": 619,
	"status": "vollständig",
	"description": "Zwei Männer schmieden ein heißes Eisen. Werkstatt mit mehreren Feuern, Ambossen, Stanzen und Fräsen. Ein Mann schweißt.",
	"music": "",
	"locations": "",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.094Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928bfd"
	},
	"protagonists": [
		"Heinrich Klang",
		"Desider Friedmann",
		"David Cohen",
		"Ernst Kantorowicz;"
	],
	"images": [],
	"title": "Zentralbücherei",
	"number": 32,
	"source": "5",
	"length": "28:09",
	"start": 1113,
	"status": "vollständig",
	"description": "Street with a few passers-by, man reading a book while walking, elderly man opening glass door and entering the library. Elderly men entering the library, pan through the rooms of the library, users standing between bookshelves talking to each other. Shown: David Cohen, Heinrich Klang (judge/professor), Ernst Kantorowicz (professor, Frankfurt), Desider Friedmann",
	"music": "",
	"locations": "Zentralbücherei?",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.095Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928bff"
	},
	"protagonists": [
		""
	],
	"images": [],
	"title": "Jazzband",
	"number": 3,
	"source": "",
	"length": "2:20",
	"start": 82,
	"status": "verschollen",
	"description": "Stadtplatz mit Jazzband in einem Musikpavillon, die Zuhörer stehen oder sitzen auf Parkbänken.",
	"music": "",
	"locations": "",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.098Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928c00"
	},
	"protagonists": [
		"Julia Salinger"
	],
	"images": [],
	"title": "Theater",
	"number": 8,
	"source": "",
	"length": "4:24",
	"start": 215,
	"status": "Aufnahme von den Dreharbeiten",
	"description": "Bühnenszenen aus Offenbachs Hoffmanns Erzählungen und aus dem jiddischen Stück „In mitt'n Weg“.",
	"music": "",
	"locations": "",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.099Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928c01"
	},
	"protagonists": [
		""
	],
	"images": [],
	"title": "Läden",
	"number": 13,
	"source": "",
	"length": "",
	"start": -1,
	"status": "verschollen",
	"description": "Leute warten auf die Öffnung der Geschäfte, Kunden in einem Herrenbekleidungsgeschäft.",
	"music": "",
	"locations": "",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.099Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928c02"
	},
	"protagonists": [
		""
	],
	"images": [],
	"title": "Feuerwehr",
	"number": 18,
	"source": "",
	"length": "",
	"start": -1,
	"status": "verschollen",
	"description": "Die Feuerwehr der jüdischen Selbstverwaltung rückt aus. Der Löschwagen verläßt die Feuerwehrstation. Die Feuerwehrmänner löschen ein Feuer.",
	"music": "",
	"locations": "",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.100Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928c04"
	},
	"protagonists": [
		"Rudolf Saudek"
	],
	"images": [],
	"title": "Töpferei",
	"number": 28,
	"source": "4",
	"length": "48:10",
	"start": 681,
	"status": "vollständig",
	"description": "In einer Töpferwerkstatt fertigt eine Frau ein Gefäß auf einer Drehscheibe. Ein andere Frau modelliert kleine Pferde. Der Bildhauer Rudolf Saudek bei der Arbeit an einer Brunnenfigur.",
	"music": "Jacques Offenbach: „Pariser Leben“",
	"locations": "",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.101Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928bf9"
	},
	"protagonists": [
		""
	],
	"images": [],
	"title": "Bank",
	"number": 12,
	"source": "",
	"length": "",
	"start": -1,
	"status": "verschollen",
	"description": "Die Bank der jüdischen Selbstverwaltung: Geschäfte an den Bankschaltern, der Banktresor.",
	"music": "",
	"locations": "",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.093Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928c05"
	},
	"protagonists": [
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
	"images": [],
	"title": "Vortrag",
	"number": 33,
	"source": "5",
	"length": "40:08",
	"start": 1142,
	"status": "vollständig",
	"description": "Vortrag des Universitätsprofessors Emil Utitz. Im Publikum sind zahlreiche Wissenschaftler vertreten.",
	"music": "Felix Mendelssohn-Bartholdy: „Sonate für Violintrio“",
	"locations": "",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.101Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928c06"
	},
	"protagonists": [
		""
	],
	"images": [],
	"title": "Schlussmontage",
	"number": 38,
	"source": "",
	"length": "",
	"start": -1,
	"status": "verschollen",
	"description": "Schlußmontage",
	"music": "",
	"locations": "",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.101Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928c07"
	},
	"protagonists": [
		""
	],
	"images": [],
	"title": "Kaffeehaus",
	"number": 5,
	"source": "",
	"length": "4:20",
	"start": 101,
	"status": "Aufnahme von den Dreharbeiten",
	"description": "Abendliche Stimmung mit Musik und Tanz.",
	"music": "",
	"locations": "",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.105Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928c09"
	},
	"protagonists": [
		""
	],
	"images": [],
	"title": "Postamt",
	"number": 14,
	"source": "",
	"length": "",
	"start": -1,
	"status": "verschollen",
	"description": "Leute, die Pakete aus vielen verschiedenen Ländern abholen; ein Paket wird in der Unterkunft eines Ehepaares ausgepackt.",
	"music": "",
	"locations": "",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.106Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928c0a"
	},
	"protagonists": [
		""
	],
	"images": [],
	"title": "Eisenbahner",
	"number": 19,
	"source": "",
	"length": "7:08",
	"start": -1,
	"status": "verschollen",
	"description": "Gleisarbeiter reparieren einen Schienenabschnitt.",
	"music": "",
	"locations": "Gleise",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.107Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928c0b"
	},
	"protagonists": [
		""
	],
	"images": [],
	"title": "Wächerei",
	"number": 24,
	"source": "",
	"length": "",
	"start": -1,
	"status": "verschollen",
	"description": "Zentrale Wäscherei.",
	"music": "",
	"locations": "Wächerei",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.107Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928c0c"
	},
	"protagonists": [
		""
	],
	"images": [],
	"title": "Werkstätten",
	"number": 29,
	"source": "",
	"length": "3:05:13",
	"start": 729,
	"status": "vollständig",
	"description": "Die Szene zeigt die Herstellungs- und Reparaturwerkstätten in hölzernen Baracken außerhalb der Stadt. Schneider, Näherinnen und Schuhmacher sind bei der Arbeit zu sehen. Es werden Handtaschen und Geldbörsen hergestellt. Schneider bügeln Kleider. Ein anderer Schneider näht Hosen.Schneider arbeiten in einer großen Halle mit Nähmaschinen oder mit Hand. achines or by hand. Shoemakers sewing shoes, partly with sewing machines, working with material needed for production, hammer, and hollow punch. Shoemakers standing up together and leaving the facility. Women and men leaving the barracks in small groups or individually, walking along a street with a pylon, the barracks in the background.",
	"music": "Felix Mendelssohn-Bartholdy: „Midsummer nights dream“",
	"locations": "",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.107Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928c0e"
	},
	"protagonists": [
		""
	],
	"images": [],
	"title": "Freizeit",
	"number": 6,
	"source": "1",
	"length": "1:27:07",
	"start": 107,
	"status": "vollständig",
	"description": "Freizeit auf den Stadtwällen: Alte Männer spielen Schach und alte Frauen lesen. Leute genießen die Zeit auf den Stadtwällen. Leute sitzen auf Bänken, liegen allein oder in Gruppen auf Decken. Vier Mädchen machen Gymnastik. Ein Mann zeichnet, andere lesen, stricken oder baden in der Sonne. Blick auf die ländliche Umgebung.",
	"music": "",
	"locations": "Stadtwälle",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.112Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928bfe"
	},
	"protagonists": [
		"Philipp Kozower",
		"Gisela Kozower",
		"David Cohen",
		"Cornelia Cohen",
		""
	],
	"images": [],
	"title": "Abendessen",
	"number": 37,
	"source": "5",
	"length": "3:09",
	"start": 1489,
	"status": "Unvollständig",
	"description": "Abendessen einer Familie (um den Tisch sitzen: Professor Cohen und Frau Cohen aus Amsterdam; Herr und Frau Kozower und Kinder aus Berlin).               ++++ Margry: „Die  Szene gibt vor, eine Familie aus Vater, Mutter, zwei Kindern und         Großeltern zu zeigen. Keinem der Filmemacher oder jedenfalls keinem der SS-Kontrolleure fiel auf, wie abwegig es war, öffentlich bekannte Personen, die wie die Ehepaare Cohen und Kozower auch noch aus verschiedenen Ländern kamen, einzusetzen, um mit ihnen eine \"richtige Familie\" darzustellen.“",
	"music": "",
	"locations": "",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.095Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928c0f"
	},
	"protagonists": [
		"Paul Eppstein",
		"Benjamin Murmelstein"
	],
	"images": [],
	"title": "Selbstverwaltung",
	"number": 10,
	"source": "2",
	"length": "1:58:16",
	"start": 221,
	"status": "vollständig",
	"description": "Die jüdische Selbstverwaltung: eine Sitzung des Ältestenrates, die Ältesten hören einer Rede des Judenältesten Paul Eppstein zu.",
	"music": "",
	"locations": "",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.113Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928c10"
	},
	"protagonists": [
		""
	],
	"images": [],
	"title": "Gesundheitswesen",
	"number": 15,
	"source": "3",
	"length": "1:36:01",
	"start": 349,
	"status": "vollständig",
	"description": "Szenen aus den Ambulanzen, aus dem zentralen Krankenhaus; eine Operation; ein Krankenzimmer; Patienten sonnen sich im Garten der Klinik; das Kindererholungsheim; Kinder, die belegte Brote und Obst essen.",
	"music": "",
	"locations": "Krankenzimmer",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.113Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928c11"
	},
	"protagonists": [
		""
	],
	"images": [],
	"title": "Landwirtschaft",
	"number": 20,
	"source": "",
	"length": "",
	"start": 587,
	"status": "verschollen",
	"description": "(a) Gärtnerei außerhalb der Stadt: Gemüse und Kartoffeln, Seidenraupenzucht; (b) Enten- und Geflügelhaltung; (c) Ernte, eine Dreschmaschine bei der Arbeit; (d) das Wirtschaften auf dem Ackerland mit Ochsen.",
	"music": "",
	"locations": "",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.113Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928c13"
	},
	"protagonists": [
		""
	],
	"images": [],
	"title": "Fußballspiel",
	"number": 30,
	"source": "4",
	"length": "2:54:04",
	"start": 915,
	"status": "vollständig",
	"description": "Fußballspiel „Ligasieger gegen Pokalsieger“ im Hof der \"Dresdner Kaserne\". People heading towards gate, entering the gate, audience leaning out of the arcades on the first floor. Players passing the audience and running to the field in the courtyard of a former military barracks (\"Dresdner Kaserne\", lining up back to back, the referee welcoming the captains by handshake. The audience clustered around the field and in the arcades on the upper floors of the building. Kick-off, match scenes, end of the game, people leaving the field through the gate",
	"music": "",
	"locations": "Dresdner Kaserne",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.114Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928c03"
	},
	"protagonists": [
		"Kurt Gerron",
		"Rolf Grabower",
		"Philip Kozower",
		"Franzi Schneidhuber",
		"Elly von Bleichröder"
	],
	"images": [],
	"title": "Schwimmen",
	"number": 23,
	"source": "",
	"length": "",
	"start": -1,
	"status": "verschollen",
	"description": "Schwimmen im Flußbad der Eger.",
	"music": "",
	"locations": "Fluß Eger",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.100Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928c14"
	},
	"protagonists": [
		""
	],
	"images": [],
	"title": "Schrebergärten",
	"number": 35,
	"source": "5",
	"length": "1:10:05",
	"start": 1304,
	"status": "vollständig",
	"description": "Schrebergärten am Festungsgraben unterhalb der Stadtmauer. Leute arbeiten im Garten und gießen Blumen.",
	"music": "",
	"locations": "Festungsgraben",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.115Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928c08"
	},
	"protagonists": [
		""
	],
	"images": [],
	"title": "Beginnender Werktag",
	"number": 9,
	"source": "",
	"length": "",
	"start": -1,
	"status": "verschollen",
	"description": "Der Stadtplatz am Beginn eines Werktages: Gruppen singender Männer und Frauen mit geschulterten Spaten und Rechen marschieren singend zur Arbeit.",
	"music": "",
	"locations": "Stadtplatz",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.106Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928c0d"
	},
	"protagonists": [
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
	"images": [],
	"title": "Konzert",
	"number": 34,
	"source": "5",
	"length": "2:02:03",
	"start": 1182,
	"status": "vollständig",
	"description": "Das Orchester unter der Leitung von Karel Ancerl spielt das Stück „Studie für Streichorchester“ von Pavel Haas.",
	"music": "Pavel Haas: „Studie für Streichorchester“",
	"locations": "",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.108Z"
	},
	"__v": 0
},
{
	"_id": {
		"$oid": "5ba539c3e99589718c928c12"
	},
	"protagonists": [
		""
	],
	"images": [],
	"title": "Maschinentischlerei",
	"number": 25,
	"source": "USHMM 59538",
	"length": "",
	"start": -1,
	"status": "verschollen",
	"description": "In der Maschinentischlerei in einer früheren Reitschule wird Holz gesägt sowie Bretter und Bauteile für Holzbaracken hergestellt.",
	"music": "",
	"locations": "Tischlerei",
	"updated_at": {
		"$date": "2018-09-21T18:34:43.114Z"
	},
	"__v": 0
}
    ]
    }),
  /*mounted() {
    fetch(API_URL)
      .then(response => response.json())
      .then(result => {
        this.message = result;
      });
  },*/
  methods: {}
};
</script>