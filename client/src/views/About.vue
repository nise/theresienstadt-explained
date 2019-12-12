<template>
  <div class="container">
    <h1>Über Theresienstadt Explained</h1>
    <div class="page">
      <h2>Idee und Konzept</h2>
        <ul class="page-list">
          <li>Niels Seidel</li>
          <li>Armin Pietsch, <a href="https://jugendbegegnung.de/dresden/">Förderverein Jugendbegegnung in Theresienstadt/Terezin</a></li>
        </ul>
      <h2>Realisierung</h2>
      <ul class="page-list">
        <li><strong>Recherchen:</strong> Niels Seidel, Armin Pietsch, Janick Baumann</li>
        <li><strong>Filmbearbeitung:</strong> Niels Seidel</li>
        <li><strong>Filmprotokoll und filmästhetische Analyse:</strong><a href="https://scholar.princeton.edu/dennisschaefer/home"> Dennis Schäfer, Princton University</a></li>
        <li hidden><strong>Fotos:</strong> xxx</li>
        <li><strong>Software und Architektur:</strong><a href="https://www.fernuni-hagen.de/ks/team/niels.seidel.shtml">Niels Seidel, FernUniversität in Hagen</a>  sowie die Studierenden Michael Dittwald und Michael Desch</li>
        <li><strong>Design:</strong><a href="http://dioptrin.de/">Marcel Hüsni, dioptrin</a></li>
        <li hidden><strong>Inhaltliche Begutachtung:</strong> Dr. Karel Margry</li>
        <li><strong>PR:</strong> Frauke Wenzel</li>
      </ul>

      <h2>Unterstützer, Förderer und Kooperationspartner</h2>
        <ul class="page-list">
          <li>
            <strong>StartNext-Unterstützer:</strong> BeDiTo e.V. Potsdam, Stefan Richter, Richard Weigelt, Heinz Meixner, Renate Stein, Patrick Weißig, Heike Bacher, Thomas Zenker, Uwe Hobler, Jan Kout, Sonja Bloß, Oliver Graf, Christoph Bittmann, Robert Kruschel, Matthias Siebel</li>
          </li>
          <li>
            <strong>Bundesarchiv Berlin:</strong> Reproduktion des Films
          </li>
          <li>
            <strong>Google.org:</strong> Gewinner der Google Impact Challenge 2018
          </li>
          <li>
            <strong>FernUniversität in Hagen:</strong> Lehrgebiet für Kooperative Systeme
          </li>
        </ul>

      <h2>Ressourcen</h2>
        <ul class="page-list">
          <li><a href="https://github.com/nise/theresienstadt-explained">Quellcode des Software Projekts</a></li>
        </ul>
      </div>
  </div>
</template>


<style>
.page a {
  text-decoration: underline;
  color:#000;
}
.page a:hover{
  color: #C10000;
}
h1{
  margin: 43px 0;
  height: 100px;
  max-width: 60%;
  text-align:left;
  padding: 20px 47px 27px 47px;
  margin: 1em 0 1em 0;
  font-weight:bold;
  font-size:2em;
  line-height: 2em;
  background-color:#C10000;
  color:white;
  font-family: Jost;
  font-weight:bold;
  text-transform: uppercase;
}
.page h2{
  margin-top:0.5em;
}
.page strong {
  margin-right:6px;
  text-decoration: none;
  font-weight: normal;
}
.page {
  color:#000;
  background-color: #fff;
  align-content: left;
  text-align:left;
  padding:20px;
  margin-bottom: 300px;
}
.page-list {
  list-style: none;
  padding-left: 1em;
}

.page-list li{
  margin-bottom: 1em;
}

.page li:before{
      content: "-";
      text-indent: -1em;
      display: inline-block;
    }

</style>