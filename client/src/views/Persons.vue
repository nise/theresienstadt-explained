<template>
  <div class="home">
    <h1 class="my-5">Protagonisten</h1>
    <b-container fluid class="mx-auto col-10">
      <b-row class="mb-4">
        <b-col sm="6">
          <input
            type="text"
            style="
              width: 400px;
              border: solid 2px #fff;
              border-radius: 18px;
              color: #fff;
              background-color:#000;
              "
            v-model="searchquery"
            @keyup="getsearchquery"
            class="mx-1 form-control"
            placeholder="Suche ..."
            id="searchfield"
          />
        </b-col>
        <b-col sm="6">
          <input
            hidden
            type="text"
            style="float: left; width: 400px;"
            class="mx-1 form-control"
            placeholder="Filter"
            id="filerfield"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="6">
          <personcard
            class="mb-4 mt-0 mr-4"
            v-for="(person, index) in persons1"
            :key="index"
            :person="person"
            :ref="'ref' + person.id"
          >
          </personcard>
        </b-col>
        <b-col sm="6">
          <personcard
            class="mb-4 mt-0 ml-0"
            v-for="(person, index) in persons2"
            :key="index"
            :person="person"
            :ref="'ref' + person.id"
          >
          </personcard>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// TODO: implement filter (until that happens the filter is hidden)

import Vue from "vue";
import BootstrapVue from "bootstrap-vue";

Vue.use(BootstrapVue);

import axios from "axios";

import personcard from "@/components/PersonCard.vue";

export default {
  name: "home",
  components: {
    personcard,
  },

  mounted: function () {
    this.splitArrInTwo(this.persons, this.persons1, this.persons2);
    //this.getdata();
    this.giveArrID(this.persons);
    this.splitArrInTwo(this.persons, this.persons1, this.persons2);
  },

  methods: {
    getdata: function () {
      let _this = this;
      axios.get("/persondata").then(function (response) {
        _this.persons = response.data;
        _this.giveArrID(_this.persons);
        _this.splitArrInTwo(_this.persons, _this.persons1, _this.persons2);
      });
    },

    getsearchquery: function () {
      if (this.searchquery.length > 1) {
        this.search(this.persons, this.searchquery);
      } else if (this.states.displayingSearch) {
        this.states.displaySearchResult = false;
        this.showAllCards();
      }
    },

    search: function (haystack, needle) {
      
      
      let result = haystack.filter(
        (el) => el.shortname.toLowerCase().indexOf(needle.toLowerCase()) != -1
      );
      

     // If shortname is reintroduced again, dont forget PersonCard.vue
     /*
      let result = haystack.filter(
        (el) => (el.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          + " " + el.surename.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
          .toLowerCase().indexOf(needle.toLowerCase()) != -1
      );
      */
      this.displaySearchResult(result);
    },

    displaySearchResult: function (result) {
      this.states.displayingSearch = true;
      this.hideAllCards();
      for (let i = 0; i < result.length; i++) {
        this.showCard(result[i].id);
      }
    },

    hideAllCards: function () {
      for (let i = 0; i < this.persons1.length; i++) {
        this.$refs["ref" + this.persons1[i].id][0].hideself = true;
      }
      for (let i = 0; i < this.persons2.length; i++) {
        this.$refs["ref" + this.persons2[i].id][0].hideself = true;
      }
    },

    showAllCards: function () {
      for (let i = 0; i < this.persons1.length; i++) {
        this.$refs["ref" + this.persons1[i].id][0].hideself = false;
      }
      for (let i = 0; i < this.persons2.length; i++) {
        this.$refs["ref" + this.persons2[i].id][0].hideself = false;
      }
    },

    showCard: function (cardID) {
      this.$refs["ref" + cardID][0].hideself = false;
    },

    splitArrInTwo: function (personarr, out1, out2) {
      let size = personarr.length;

      for (let i = 0; i < size; i++) {
        if (i % 2 == 0) {
          out1.push(personarr[i]);
        } else {
          out2.push(personarr[i]);
        }
      }
    },
    giveArrID: function (personarr) {
      let size = personarr.length;
      for (let i = 0; i < size; i++) {
        personarr[i].id = i;
      }
    },
  },

  data: () => ({
    error: "",
    //persons: persons_data,
    persons: [],
    persons1: [],
    persons2: [],
    searchquery: "",
    states: {
      displayingSearch: false,
    },
    initialCardState: {
      close: false,
      hideself: false,
    },
    /**
 * shortname: String,
    name: String,
    surename: String,
    birth: String,
    death: String,
    birth_place: String,
    death_place: String,
    profession: String,
    bio: String,
    images: Array,
    updated_at: Date
 */

    persons: [
      {
        selected: "",
        surename: "Ančerl",
        name: "Karel",
        shortname: 'Karel Ancerl',
        title: "",
        nickname: "urspr. Antscherl",
        "Theresienstädter Konvolut u. Liste R. Oppenhejm": "",
        birth_date: "04/11/1908",
        birth_place: "Tučapy",
        birth_country: "Österreich-Ungarn",
        death: "07/03/1973",
        death_place: "Toronto",
        death_country: "Kanada",
        nationality: "tschechoslowakischer",
        profession:
          "Dirigent. Ab 1950 war er Chefdirigent der Tschechischen Philharmoniker. Emigrierte im August 1968 nach Kanada und leitete dort bis 1972 das Toronto Symphony Orchestra",
        branch: "Musiker",
        spouse: "Valerie",
        children: "Jan (geb im Ghetto 28. Febr. 1943)",
        in_ghetto: "Musikveranstaltungen",
        deportation: "1942 (unbekannt)",
        transport: "",
        meaning: "",
        in_film:
          "In einer Szene dirigiert er unter Zwang das KZ-Orchester zu dirigieren hatte",
        sequence: "34-19.54min",
        end: "Befreiung (Auschwitz)",
        sources: "",
        Wikipedia: "https://de.wikipedia.org/wiki/Karel_An%C4%8Derl",
        Ghetto_Theresienstadt_Lexikon:
          "http://www.ghetto-theresienstadt.de/pages/a/ancerlk.htm",
        other_sources: "",
        literature:
          "Jaroslav Bužga: Ančerl, Karel. In: Ludwig Finscher (Hrsg.): Die Musik in Geschichte und Gegenwart. Zweite Ausgabe, Personenteil, Band 1 (Aagard – Baez). Bärenreiter/Metzler, Kassel u. a. 1999, ISBN 3-7618-1111-X, Sp. 627–628 (Online-Ausgabe, für Vollzugriff Abonnement erforderlich)",
        literature2: "",
        primary_sources: "",
        image: "JA",
        image_source:
          "https://de.wikipedia.org/wiki/Karel_An%C4%8Derl#/media/Datei:BASA-1772K-1-2376-1-Karel_An%C4%8Derl.jpg",
      },
      {
        selected: "",
        surename: "Baeck",
        name: "Leo Arje Lipmann",
        shortname: 'Leo Baeck',
        title: "Dr.",
        nickname: "",
        "Theresienstädter Konvolut u. Liste R. Oppenhejm": "A",
        birth_date: "05/23/1873",
        birth_place: "Lissa",
        birth_country: "Provinz Posen",
        death: "11/02/1956",
        death_place: "London",
        death_country: "Vereinigtes Königreich",
        nationality: "deutscher",
        profession:
          "Rabbiner und Präsident der Reichsvertretung der Deutschen Juden, sowie nach dem Krieg Professor am Hebrew Union College in Cincinnati (USA)",
        branch: "Religion",
        spouse: "Nathalie Hamburger",
        children: "",
        in_ghetto:
          "Mitglied im Ältestenrat.Außerdem initiierte er zusammen mit Professor Maximilian Adler aus Prag und Professor Emil Utitz aus Halle eine Vortragsreihe, die er selbst mit einem Vortrag über Platon begann. Es existiert eine Liste seiner Vortragsthemen (geschrieben in Sütterlinschrift), auf der genannt sind: Platon, Maimonides, Spinoza, Kant, Mendelssohn, Hermann Cohen, Die jüdische Religionsphilosophie des Mittelalters, Die jüdische Mystik des Mittelalters, Das Problem von Leib und Seele, Die Lebenseinheit in Leib und Seele, Der Sinn der Geschichte, Die Geschichtsschreibung, Die Jahrhunderte von der Zerstörung des ersten bis zu der des zweiten Tempels, Die Zeit der Makkabäer. Soweit bekannt, hielt er seinen letzten Vortrag mit dem Titel Galileo Galilei und das Ende des Mittelalters am 23. Dezember 1944.",
        deportation: "1/26/43",
        transport: "10764/1 - 86",
        meaning: "",
        in_film: "Vortrag, rechts neben dem Sprecher Eppstein",
        sequence: 33,
        end: "Befreiung",
        sources: "",
        Wikipedia: "https://de.wikipedia.org/wiki/Leo_Baeck",
        Ghetto_Theresienstadt_Lexikon:
          "http://www.ghetto-theresienstadt.de/pages/b/baeckl.htm",
        other_sources: "https://www.leo-baeck-foundation.org/",
        literature:
          "Friedrich Wilhelm Bautz: Leo Baeck. In: Biographisch-Bibliographisches Kirchenlexikon (BBKL). Band 1, Bautz, Hamm 1975. 2., unveränderte Auflage Hamm 1990, ISBN 3-88309-013-1, Sp. 334–335.     Bastian Fleermann: „…das beste Rabbinat in Deutschland.“ Biografische Skizzen zu den Düsseldorfer Rabbinern von 1706 bis 1941. In: Düsseldorfer Jahrbuch, 81, 2011, S. 107–170.     Albert H. Friedlander: Leo Baeck: Teacher of Theresienstadt. Overlook Press 1991, ISBN 978-0-87951-393-1 (Reprint der Ausgabe 1973, 1. Aufl. 1968)     Albert H. Friedlander: Leo Baeck, Leben und Lehre. Stuttgart 1973     Elias H. Füllenbach: Rabbiner Leo Baeck – „Für die anderen zu leben und doch im Eigenen zu stehen“. In: Düsseldorfer Persönlichkeiten. Hg. Edmund Spohr, Hatto Küffner, Kleve 2004 (= Düsseldorf. Eine Stadt zwischen Tradition und Vision), S. 168–181.     Eckhard Hansen, Florian Tennstedt (Hrsg.) u. a.: Biographisches Lexikon zur Geschichte der deutschen Sozialpolitik 1871 bis 1945. Band 2: Sozialpolitiker in der Weimarer Republik und im Nationalsozialismus 1919 bis 1945. Kassel University Press, Kassel 2018, ISBN 978-3-7376-0474-1, S. 7 f. (Online, PDF; 3,9 MB).     Maurice-Ruben Hayoun: Leo Baeck. Repräsentant des liberalen Judentums. WBG, Darmstadt 2015, ISBN 978-3-534-25758-4.     Georg Heuberger, Fritz Backhaus, Leo Baeck 1873–1956. Aus dem Stamme von Rabbinern, Jüdischer Verlag im Suhrkamp, Frankfurt am Main 2001, ISBN 3-633-54169-1.     Walter Homolka: Jüdische Identität in der Modernen Welt. Leo Baeck und der deutsche Protestantismus. Kaiser, Gütersloh 1994, ISBN 3-579-00259-7.     Walter Homolka: Jüdisches Denken – Leo Baeck, Perspektiven für heute. Herder spektrum, Freiburg 2006, ISBN 978-3-451-05728-1.     Walter Homolka, Elias H. Füllenbach: Leo Baeck – Eine Skizze seines Lebens. Gütersloher Verlagshaus, Gütersloh 2006, ISBN 978-3-579-06429-1.     Walter Homolka, Elias H. Füllenbach: Rabbiner Leo Baeck. Ein Lebensbild. Zum Gedenken an Rabbiner Stanley Dreyfus. Herausgegeben vom Centrum Judaicum. Verlag Hentrich & Hentrich, Teetz 2009, ISBN 978-3-938485-84-2 (= Jüdische Miniaturen Band 75).     Ralf Koerrenz: Das Judentum als Lerngemeinschaft. Zur Konzeption einer pädagogischen Religion bei Leo Baeck. Deutscher Studien-Verlag, Weinheim 1992 ISBN 3-89271-342-1.     Reichshandbuch der deutschen Gesellschaft – Das Handbuch der Persönlichkeiten in Wort und Bild. Erster Band, Deutscher Wirtschaftsverlag, Berlin 1930, ISBN 3-598-30664-4.     Gerd Stecklina: »Was wir am Mitmenschen tun, ist Gottesdienst«. Leo Baeck 1873 – 1956, in Sabine Hering Hg., mit Sandra Schönauer: Jüdische Wohlfahrt im Spiegel von Biographien. Schriftenreihe Geschichte der jüdischen Wohlfahrt in Deutschland, 2. Hgg. Hering, Gudrun Maierhof, Ulrich Stascheit. Fachhochschulverlag, Frankfurt 2007 ISBN 3936065802 S. 66–73 (mit 1 Foto)",
        literature2: "",
        primary_sources:
          "Werke. Hrsg. von Albert H. Friedlander, Bertold Klappert und Werner Licharz. Im Auftr. des Leo Baeck Instituts, Gütersloher Verlagshaus, New York, Gütersloh 1998–2003 [Sonderausgabe: Gütersloher Verlagshaus, Gütersloh 2006].         Bd. 1: Das Wesen des Judentums. 1998, ISBN 3-579-02334-9.         Bd. 2: Dieses Volk. Jüdische Existenz. 1996, ISBN 3-579-02335-7.         Bd. 3: Wege im Judentum. Aufsätze und Reden. 1997, ISBN 3-579-02336-5.         Bd. 4: Aus drei Jahrtausenden. Das Evangelium als Urkunde der jüdischen Glaubensgeschichte. 2000, ISBN 3-579-02337-3.         Bd. 5: Nach der Schoa – warum sind Juden in der Welt? Schriften aus der Nachkriegszeit. 2002.         Bd. 6: Briefe, Reden, Aufsätze. 2003.  Einzelschriften      Das Wesen des Judentums. Nathansen & Lamm, Berlin 1905. (Schriften der Gesellschaft zur Förderung der Wissenschaft des Judentums).         Das Wesen des Judentums. 6. Auflage 1960.     Die jüdische religiöse Erziehung. In: Handbuch der Pädagogik. Hrsg. von Hermann Nohl. Band 3. Langensalza [u. a.], 1930.     Romantische Religion. 1922.     Die Pharisäer. Schocken, Berlin 1934. (Bücherei des Schocken Verlags. 6.)     Religion und Weltfriede: Überwindung der Kriege. Sammelschrift mit Beiträgen von Leo Baeck, Günther Dehn, Alfred Klee. Hrsg. von der Arbeitsgemeinschaft der Konfessionen für den Frieden. 1930.     Chaim Nachman Bialik. Eine Einführung in sein Leben und sein Werk. 1935.     Das Evangelium als Urkunde der jüdischen Glaubensgeschichte. 1938.     Der Sinn der Geschichte. 1946.     Maimonides, der Mann, sein Werk und seine Wirkung. 1954.     Dieses Volk – jüdische Existenz. 1955.     Aus drei Jahrtausenden. Wissenschaftliche Untersuchungen und Abhandlungen zur Geschichte des jüdischen Glaubens. 1958.     Von Moses Mendelssohn zu Franz Rosenzweig: Typen jüdischen Selbstverständnisses in den letzten beiden Jahrhunderten. 1958.     Paulus, die Pharisäer und das Neue Testament. Drei Aufsätze. Ner-Tamid Verlag, Frankfurt 1961.     Vorträge und Ansprachen. Mit einem Geleitwort von Leo Baeck. Herausgegeben von der Grossloge Deutschland VIII U. O. B. B. 2., verb. Auflage, Maximilian Stein, Leo Baeck.     Zum 50jährigen Bestehen des Ordens Bne Briss in Deutschland. U.O.B.B. (Enthält außerdem: Alfred Goldschmidt : Der deutsche Distrikt des Ordens Bne Briss. Arthur Löwenstamm: Soziologie der Loge. Bruderworte. Zusammengestellt von Paul Rosenfeld.) Leo Baeck, Einleitung.     Geschichte der Juden. 3 Bände, 1954–1959, 1965.",
        image: "JA",
        image_source: "https://www.leo-baeck-foundation.org/",
      },
      {
        selected: "",
        surename: "Bleichröder, von",
        name: "Ellie Marie Friederike Julie",
        shortname: 'Elli Bleichröder',
        title: "",
        nickname: "",
        "Theresienstädter Konvolut u. Liste R. Oppenhejm": "A",
        birth_date: "09/17/1894",
        birth_place: "Drehsa",
        birth_country: "Deutsches Reich",
        death: "1989 (unbekannt)",
        death_place: "unbekannt",
        death_country: "unbekannt",
        nationality: "deutsche",
        profession:
          "Tochter von James und Harriet von Bleichröder. Am 9. Dezember 1916 heiratete sie den Kaufmann Rudolph Alfred Herrschel. Er war Inhaber der Rohtabakgroßhandlung Rudolph A. Herrschel. In den 1950er Jahren Kommanditistin des Münchner Bankhauses Neuvians, Reuschel & Co.",
        branch: "k.A.",
        spouse: "Rudolf Herschel (geschieden)",
        children: 1,
        in_ghetto: "unbekannt",
        deportation: "7/27/42",
        transport: "1/31 – 2364",
        meaning: "",
        in_film:
          "Als prominente Insassin des Konzentrationslagers ist sie in den Szenen 22, 23 und 33 des Propagandafilms Theresienstadt zu sehen. In Szene 33, dem Vortrag von Prof. Utitz, sitzt sie in der zweiten Reihe und ist als einzige junge Frau deutlich zu erkennen.",
        sequence: "22, 23 ; 33 – 18.51min",
        end: "Befreiung",
        sources: "",
        Wikipedia:
          "https://de.wikipedia.org/wiki/Ellie_von_Bleichr%C3%B6der#cite_note-2",
        Ghetto_Theresienstadt_Lexikon:
          "http://www.ghetto-theresienstadt.de/pages/b/bleichroedere.htm",
        other_sources: "",
        literature: "",
        literature2: "",
        primary_sources:
          "https://archives.cjh.org//repositories/5/resources/6774",
        image: "JA",
        image_source:
          "http://www.ghetto-theresienstadt.de/images/prominente/Bild118.gif",
      },
      {
        selected: "",
        surename: "Cohen",
        name: "Cornelia",
        shortname: 'Cornelia Cohen',
        title: "",
        nickname: "geb. Spitzer",
        "Theresienstädter Konvolut u. Liste R. Oppenhejm": "",
        birth_date: "unbekannt",
        birth_place: "unbekannt",
        birth_country: "unbekannt",
        death: "unbekannt",
        death_place: "unbekannt",
        death_country: "unbekannt",
        nationality: "unbekannt",
        profession: "Ehefrau von Cohen, David",
        branch: "k.A.",
        spouse: "David Cohen",
        children: "",
        in_ghetto: "unbekannt",
        deportation: "9/23/43",
        transport: "",
        meaning: "",
        in_film: "In der Bücherei Szene 32 und Abendessen Szene 37",
        sequence: "32 ; 37",
        end: "Befreiung (?)",
        sources: "",
        Wikipedia: "",
        Ghetto_Theresienstadt_Lexikon: "",
        other_sources: "",
        literature: "",
        literature2: "",
        primary_sources: "",
        image: "NEIN",
        image_source: "",
      },
      {
        selected: "",
        surename: "Cohen",
        name: "David",
        shortname: 'David Cohen',
        title: "Prof. Dr.",
        nickname: "",
        "Theresienstädter Konvolut u. Liste R. Oppenhejm": "",
        birth_date: "12/31/1882",
        birth_place: "Deventer",
        birth_country: "Niederlande",
        death: "09/03/1967",
        death_place: "Amsterdam",
        death_country: "Niederlande",
        nationality: "niederländischer",
        profession:
          "Althistoriker, Papyrologe, Vorsitzender des Judenrats der Niederlande zur Zeit des Nationalsozialismus",
        branch: "Wissenschaft, Religion",
        spouse: "Cornelia Spitzer",
        children: "",
        in_ghetto: "Mitglied im Ältestenrat",
        deportation: "9/23/43",
        transport: "",
        meaning: "",
        in_film: "In der Bücherei Szene 32 und Abendessen Szene 37",
        sequence: "32 ; 37",
        end: "Befreiung",
        sources: "",
        Wikipedia: "https://de.wikipedia.org/wiki/David_Cohen_(Historiker)",
        Ghetto_Theresienstadt_Lexikon:
          "http://www.ghetto-theresienstadt.de/pages/c/cohend.htm",
        other_sources:
          "Huygens ING - Amsterdam. Quelle: JW Schulte Nordholt, 'Cohen, David (1882-1967)', im Biografischen Wörterbuch der Niederlande . URL: http://resources.huygens.knaw.nl/bwn1880-2000/lemmata/bwn3/cohend  [11-12-2013]",
        literature:
          "Hans G. Adler: Theresienstadt. Das Antlitz einer Zwangsgemeinschaft 1941–1945. Nachwort Jeremy Adler. Wallstein, Göttingen 2005 ISBN 3-89244-694-6 (Reprint der 2. verb. Auflage Mohr-Siebeck, Tübingen 1960. 1. Aufl. ebd. 1955)     Israel Gutman (Hrsg.): Enzyklopädie des Holocaust – Die Verfolgung und Ermordung der europäischen Juden. Piper Verlag, München/Zürich 1998, 3 Bände, ISBN 3-492-22700-7     Anna Hájková: Die Juden aus den Niederlanden in Theresienstadt. In: Theresienstädter Studien und Dokumente 2002, S. 135–201.     Pieter Herman Schrijvers: Rome, Athene, Jeruzalem. Leven en werk van prof. dr. David Cohen. Historische uitgeverij, Groningen 2000. – Rez. von: J. C. H. Blom, in: BMGN – Low Countries Historical Review 116, 2001, afl. 2, S. 198–203, (online) (PDF).",
        literature2: "",
        primary_sources: "",
        image: "JA",
        image_source:
          "http://resources.huygens.knaw.nl/bwn1880-2000/lemmata/bwn3/cohend",
      },
      {
        selected: "",
        surename: "Cohn",
        name: "Alexander",
        shortname: 'Alexander Cohen',
        title: "Dr.",
        nickname: "",
        "Theresienstädter Konvolut u. Liste R. Oppenhejm": "A",
        birth_date: "09/04/1876",
        birth_place: "Königsberg",
        birth_country: "Preußen",
        death: "04/07/1951",
        death_place: "Berlin",
        death_country: "Bundesrepublik Deutschland",
        nationality: "deutscher",
        profession:
          "Kammergerichtsrat und dekorierter Frontkämpfer. Autor juristischer Werke, Mitarbeiter einer Kommentierung des Handelsgesetzbuches gemeinsam mit Albert Mosse.",
        branch: "Jura",
        spouse: "Else Cohn (geb. Hiller)",
        children: "unbekannt",
        in_ghetto: "unbekannt",
        deportation: "1/28/43",
        transport: "10723 – I/87",
        meaning: "",
        in_film: "Vortrag S33",
        sequence: 33,
        end: "Befreiung",
        sources: "",
        Wikipedia: "https://de.wikipedia.org/wiki/Alexander_Cohn",
        Ghetto_Theresienstadt_Lexikon:
          "http://www.ghetto-theresienstadt.de/pages/c/cohna.htm",
        other_sources: "",
        literature:
          "Hans Bergemann/Simone Ladwig-Winters, Kammergericht (Hrsg.): Jüdische Richter am Kammergericht nach 1933 – Eine Dokumentation, Verlag Carl Heymanns, 2004, ISBN 978-3-452-25833-5     Axel Feuß: Das Theresienstadt-Konvolut, Altonaer Museum in Hamburg, Dölling und Galitz Verlag, Hamburg/München 2002, ISBN 3-935549-22-9",
        literature2: "",
        primary_sources:
          "Herausgabe der Neuauflage Handelsgesetzbuch von Litthauer, 1905 (gemeinsam mit Albert Mosse)     Auslieferungsverträge des Deutschen Reiches und der deutschen Einzelstaaten, 1908",
        image: "JA",
        image_source:
          "http://www.ghetto-theresienstadt.de/images/prominente/Bild112.gif",
      },
      {
        selected: "",
        surename: "Czech",
        name: "Elisabeth",
        shortname: 'Elisabeth Czech',
        title: "",
        nickname: "",
        "Theresienstädter Konvolut u. Liste R. Oppenhejm": "",
        birth_date: "unbekannt",
        birth_place: "unbekannt",
        birth_country: "Tschecheslowakei (vermutlich)",
        death: "nach 1948",
        death_place: "London (vermutlich)",
        death_country: "Vereinigtes Königreich",
        nationality: "tschechische",
        profession:
          "Ehefrau von Dr. Ludwig Czech (ehm. Minister für Wohlfahrt und Gesundheit in Prag)",
        branch: "k.A.",
        spouse: "",
        children: "",
        in_ghetto: "unbekannt",
        deportation: "3/22/42",
        transport: "",
        meaning: "",
        in_film: "Konzert S34",
        sequence: 34,
        end: "Befreiung",
        sources: "",
        Wikipedia: "",
        Ghetto_Theresienstadt_Lexikon: "",
        other_sources:
          "https://wiener.soutron.net/Portal/Default/en-GB/recordview/index/106300",
        literature: "",
        literature2: "",
        primary_sources: "",
        image: "NEIN",
        image_source: "",
      },
      {
        selected: "",
        surename: "Dessauer",
        name: "Heinrich",
        shortname: 'Heinrich Dessauer',
        title: "Dr.",
        nickname: "",
        "Theresienstädter Konvolut u. Liste R. Oppenhejm": "B",
        birth_date: "09/08/1883",
        birth_place: "Wien",
        birth_country: "Österreich-Ungarn",
        death: "nach 12.10.1944 (Deportation n. Auschwitz)",
        death_place: "KZ Auschwitz",
        death_country: "Generalgouvernement (Polen)",
        nationality: "österreichischer",
        profession:
          "Rechtsanwalt, Gerichtsdolmetscher, Mitglied Ältestenrat in wien",
        branch: "Religion",
        spouse: "Marietta Dessauer (geb. Friedmann)",
        children: 2,
        in_ghetto: "unbekannt",
        deportation: "1/29/43",
        transport: "",
        meaning: "",
        in_film: "Konzert S34",
        sequence: 34,
        end: "ermordet",
        sources: "",
        Wikipedia: "",
        Ghetto_Theresienstadt_Lexikon:
          "http://www.ghetto-theresienstadt.de/pages/d/dessauerh.htm",
        other_sources: "",
        literature: "",
        literature2: "",
        primary_sources: "",
        image: "JA",
        image_source:
          "http://www.ghetto-theresienstadt.de/images/prominente/Bild109.gif",
      },
      {
        selected: "",
        surename: "Eppstein",
        name: "Paul Maximilian",
        shortname: 'Paul Eppstein',
        title: "Dr.",
        nickname: "",
        "Theresienstädter Konvolut u. Liste R. Oppenhejm": "Aa",
        birth_date: "03/04/1902",
        birth_place: "Ludwigshafen",
        birth_country: "Deutsches Reich",
        death: "27./28.11.1944",
        death_place: "Ghetto Theresienstadt",
        death_country: "Tschechoslowakei",
        nationality: "deutscher",
        profession:
          "Soziologe,  lehrte in den 1930er Jahren an der Hochschule für die Wissenschaft des Judentums in Berlin Soziologie, ab 1933 Vertreter der Reichsvereinigung der Juden in Deutschland",
        branch: "Wissenschaft",
        spouse: "Hedwig Eppstein (geb. Strauß)",
        children: "unbekannt",
        in_ghetto: "Vorsitzender des Ältestenrates (Judenältester)",
        deportation: "1/26/43",
        transport: "I/86",
        meaning: "",
        in_film:
          "FEHLER? Angeblich starb er am 28.09.1944, dennoch ist er in Szene 10 zu sehen. Handelt es sich um die falsche Szene? Oder hat man da Material vom 1942er Film verwendet? Kein Fehler, denn die Fußballszene wurde laut dem Film Liga Terezin auch schon früher, nämlich am 1.09.44 gedreht. Es existiert übrigens noch ein Szenen Bild, wo diese Sitzung in einem anderen Raum stattfindet.",
        sequence: 10,
        end: "ermordet",
        sources: "",
        Wikipedia: "https://de.wikipedia.org/wiki/Paul_Eppstein",
        Ghetto_Theresienstadt_Lexikon:
          "http://www.ghetto-theresienstadt.de/pages/e/eppsteinp.htm",
        other_sources:
          "https://www.holocaust.cz/de/opferdatenbank/opfer/9797-hedwig-eppstein/",
        literature:
          "John F. Oppenheimer (Red.) u. a.: Lexikon des Judentums. 2. Auflage. Bertelsmann Lexikon Verlag, Gütersloh u. a. 1971, ISBN 3-570-05964-2, Sp. 187.     Karl Otto Watzinger: Geschichte der Juden in Mannheim 1650–1945. Kohlhammer, Stuttgart 1984, ISBN 3-17-008696-0, S. 89–92.     Israel Gutman (Hrsg.): Enzyklopädie des Holocaust – Die Verfolgung und Ermordung der europäischen Juden. 3 Bände, Piper Verlag, München/Zürich 1998, ISBN 3-492-22700-7.     Beate Meyer: Tödliche Gratwanderung – Die Reichsvereinigung der Juden in Deutschland zwischen Hoffnung, Zwang, Selbstbehauptung und Verstrickung (1939–1945). Göttingen 2011, ISBN 978-3-8353-0933-3.     Wolfgang Benz: Deutsche Juden im 20. Jahrhundert : eine Geschichte in Porträts. München : Beck, 2011, ISBN 978-3-406-62292-2, darin: „Judenältester“ in Theresienstadt: Paul Eppstein, S. 65–77     Claus-Dieter Krohn: Eppstein, Paul. In: Harald Hagemann, Claus-Dieter Krohn (Hrsg.): Biographisches Handbuch der deutschsprachigen wirtschaftswissenschaftlichen Emigration nach 1933. Band 1: Adler–Lehmann. Saur, München 1999, ISBN 3-598-11284-X, S. 142–143.     Eppstein, Paul, in: Joseph Walk (Hrsg.): Kurzbiographien zur Geschichte der Juden 1918–1945. München : Saur, 1988, ISBN 3-598-10477-4, S. 81f.     Eppstein, Hedwig, in: Joseph Walk (Hrsg.): Kurzbiographien zur Geschichte der Juden 1918–1945. München : Saur, 1988, ISBN 3-598-10477-4, S. 81",
        literature2: "",
        primary_sources: "",
        image: "JA",
        image_source:
          "https://www.geni.com/photo/view/6000000050897081907?album_type=photos_of_me&photo_id=6000000050955430138",
      },
      {
        selected: "",
        surename: "Fischer",
        name: "Karel",
        shortname: 'Karel Fischer',
        title: "",
        nickname: "",
        "Theresienstädter Konvolut u. Liste R. Oppenhejm": "",
        birth_date: "06/01/1913",
        birth_place: "Zdíkov",
        birth_country: "Tschecheslowakei",
        death: "09/28/1944",
        death_place: "KZ Auschwitz",
        death_country: "Generalgouvernement (Polen)",
        nationality: "tschechoslowakischer",
        profession: "Dirigent",
        branch: "Kunst",
        spouse: "",
        children: "",
        in_ghetto:
          'Wirkte mit am Propagandafilm ( Felix Mendelssohn-Bartholdy ("Elias"; "Sommernachtstraum"; "Violinsonate"), Musical direction : Karel Fischer)',
        deportation: "7/13/42",
        transport: "Aaq",
        meaning: "",
        in_film: "Dirigent",
        sequence: 1,
        end: "ermordet",
        sources: "",
        Wikipedia: "",
        Ghetto_Theresienstadt_Lexikon: "",
        other_sources:
          "http://www.musiques-regenerees.fr/Terezin/AutresCompositeurs/GerronFilm.html ; https://yvng.yadvashem.org/nameDetails.html?language=en&itemId=4760579&ind=1 ; https://www.holocaust.cz/de/datenbank-der-digitalisierten-dokumenten/dokument/120792-fischer-karel-pripusteni-k-ridicske-zkousce/",
        literature: "",
        literature2: "",
        primary_sources: "",
        image: "JA",
        image_source:
          "https://www.holocaust.cz/de/datenbank-der-digitalisierten-dokumenten/dokument/120792-fischer-karel-pripusteni-k-ridicske-zkousce/",
      },
      {
        selected: "",
        surename: "Friediger",
        name: "Max Moses",
        shortname: 'Max Friedinger',
        title: "Dr.",
        nickname: "",
        "Theresienstädter Konvolut u. Liste R. Oppenhejm": "B",
        birth_date: "04/09/1884",
        birth_place: "Budapest",
        birth_country: "Ungarn",
        death: "04/09/1947",
        death_place: "Kopenhagen",
        death_country: "Dänemark",
        nationality: "dänischer",
        profession: "Rabbiner (kgl. dänischer Oberrabiner)",
        branch: "Religion",
        spouse: "Fanny Friediger (geb. Seegall)",
        children: 2,
        in_ghetto: "Mitglied im Ältestenrat, Mitarbeiter der Fürsorge",
        deportation: "10/6/43",
        transport: "",
        meaning: "",
        in_film: "Terrasse Szene 4",
        sequence: 4,
        end: "Weiße Busse",
        sources: "",
        Wikipedia: "https://de.wikipedia.org/wiki/Max_Friediger",
        Ghetto_Theresienstadt_Lexikon:
          "http://www.ghetto-theresienstadt.de/pages/f/friedigerm.htm",
        other_sources: "",
        literature:
          "Hans Günther Adler: Theresienstadt. Das Antlitz einer Zwangsgemeinschaft 1941-1945 Nachwort Jeremy Adler. Wallstein, Göttingen 2005 ISBN 3-89244-694-6 (Reprint der 2. verb. Auflage Mohr-Siebeck, Tübingen 1960. 1. Aufl. ebd. 1955)     Axel Feuß: Das Theresienstadt-Konvolut, Altonaer Museum in Hamburg, Dölling und Galitz Verlag, Hamburg/München 2002, ISBN 3-935549-22-9. ; Esriel Hildesheimer, Mordechai Eliav: Das Berliner Rabbinerseminar 1873-1938, Berlin 2008, ISBN 9783938485460, S. 115",
        literature2: "",
        primary_sources:
          "Max Friediger: Theresienstadt, Kopenhagen 1946 (dänisch)",
        image: "JA",
        image_source:
          "http://www.ghetto-theresienstadt.de/images/prominente/Bild101.gif",
      },
    ],


  }),
};
</script>
