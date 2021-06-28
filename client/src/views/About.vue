<template>
  <div class="container" style="text-align: left">
    <h1 class="mt-4 mb-1" style="text-align: left">
      {{$t("about.h1")}}
    </h1>
    <div style="background-color: white" class="mt-3 mb-5 pt-4 pb-3 px-3">
     <h2>{{$t("about.h2-0")}}</h2>
        <ul class="page-list">
          <li>Niels Seidel</li>
          <li>Armin Pietsch, <a href="https://jugendbegegnung.de/dresden/">{{$t("about.linktext1")}}</a></li>
        </ul>
      <h2>{{$t("about.h2-1")}}</h2>
      <ul class="page-list">
        <li><strong>{{$t("about.li-recherche")}}:</strong> Niels Seidel, Armin Pietsch, Benedikt Schaumlöffel, Janick Baumann</li>
        <li><strong>{{$t("about.li-movieedit")}}:</strong> Niels Seidel</li>
        <li><strong>{{$t("about.li-movieprotocol")}}:</strong><a href="https://scholar.princeton.edu/dennisschaefer/home"> Dennis Schäfer (Princton University)</a></li>
        <li hidden><strong>{{$t("about.li-photos")}}:</strong> xxx</li>
        <li><strong>{{$t("about.li-softdev")}}:</strong>
          <ul>
            <li>{{$t("about.li-architecture")}}: <a href="https://www.fernuni-hagen.de/ks/team/niels.seidel.shtml">Niels Seidel und Konstantin Friedrich (FernUniversität in Hagen)</a></li>
            <li>{{$t("about.li-guidedvid")}}</li>
            <li>{{$t("about.li-vidanaly")}}</li>
          </ul>
        </li>
        <li><strong>{{$t("about.li-design")}}:</strong><a href="http://dioptrin.de/"> Marcel Hüsni, dioptrin</a></li>
        <li hidden><strong>{{$t("about.li-contentsuper")}}:</strong> Dr. Karel Margry</li>
        <li><strong>{{$t("about.li-pr")}}:</strong> Frauke Wenzel</li>
        
      </ul>

      <h2>{{$t("about.h2-2")}}</h2>
        <ul class="page-list">
          <li>
            <strong>{{$t("about.li-startnextsupp")}}:</strong> BeDiTo e.V. Potsdam, Stefan Richter, Richard Weigelt, Heinz Meixner, Renate Stein, Patrick Weißig, Heike Bacher, Thomas Zenker, Uwe Hobler, Jan Kout, Sonja Bloß, Oliver Graf, Christoph Bittmann, Robert Kruschel, Matthias Siebel</li>
          </li>
          <li>
            <strong>{{$t("about.li-archber")}}:</strong> {{$t("about.li-reprmovie")}}
          </li>
          <li>
            <strong>Google.org:</strong> {{$t("about.li-winnerimpactchallenge")}}
          </li>
          <li>
            <strong>{{$t("about.li-fernuni")}}:</strong> 
          </li>
        </ul>

      <h2>{{$t("about.h2-3")}}</h2>
        <ul class="page-list">
          <li><a href="https://github.com/nise/theresienstadt-explained">{{$t("about.li-sourcecode")}}</a></li>
        </ul>
      </div>
  </div>
</template>


<style>
</style>
