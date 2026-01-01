# Theresienstadt explained

**English**
Theresienstadt Explained is an initiative for the pedagogical preparation of the Nazi propaganda film »Theresienstadt. Ein Dokumentarfilm aus dem jüdischen Siedlungsgebiet« (Theresienstadt. A Documentary Film from the Jewish Settlement Area). The film was produced in 1944/45 in the Theresienstadt ghetto and is one of the few filmed testimonies from a Nazi concentration camp. However, it does not show the cruel reality of the camp, but rather a staged, embellished fictional world that never existed.
The project's goal is to expose the propaganda techniques in the film while making the real people and locations visible. To achieve this, the film is prepared as a digital learning resource for:

- Self-directed, exploratory learning
- Commented film screenings
- Collaborative analysis tools

The web application enables interactive exploration of the film, recognition of propaganda mechanisms, and understanding of historical contexts.

See the web application: https://nise.github.io/theresienstadt-explained/#/

**German**
Theresienstadt Explained ist eine Initiative zur mediendidaktischen Aufbereitung des NS-Propagandafilms »Theresienstadt. Ein Dokumentarfilm aus dem jüdischen Siedlungsgebiet«. Der Film entstand 1944/45 im Ghetto Theresienstadt und ist eines der wenigen filmischen Zeugnisse aus einem nationalsozialistischen Konzentrationslager. Er zeigt jedoch nicht die grausame Realität des Lagers, sondern eine inszenierte, geschönte Scheinwelt, die es so niemals gab.
Ziel des Projekts ist es, die Propagandatechniken im Film offenzulegen und gleichzeitig die realen Menschen und Schauplätze sichtbar zu machen. Dazu wird der Film als digitale Lernressource aufbereitet für:

- Selbstgesteuertes, exploratives Lernen
- Kommentierte Filmvorführungen durch Multiplikatoren
- Kollaborative Analysetools

Die Web-Anwendung ermöglicht es, den Film interaktiv zu erkunden, Propaganda-Mechanismen zu erkennen und historische Kontexte zu erschließen.

Siehe Web-Anwendung: https://nise.github.io/theresienstadt-explained/#/

## Features

- Interactive video player
  - table of contents
  - annotated timeline
- Collaborative video annotation

**Education Use Cases**

- tba.

## Setup and development

**Run the application**

- Install dependencies: `npm install` and `npm audit -fix`
- `cd dist`
- Run application: `npx http-server -p 8080` and open http://localhost:8080 in your browser

**Get into devlopment**

- Hot reloading during development: `npm run serve`
- Build code to run as stand-alone app: `npm run build`

**Roadmap**

- complete content
- upgrade to vue3
- use strapi as LMS https://strapi.io/

i18n Text conversion for german and english (no dates yet)

- [ ] Finish language selector buttons
- [x] PersonCard
- [x] VideoAnnotations
- [x] VideoInfoMarker
- [x] VideoMapMarker
- [x] VideoToC
- [x] VideoTranskript
- [] Video

- [x] About
- [x] Home
- [x] Imprint
- [x] Persons
- [x] Scenes

- [ ] References
- [ ] FakeVideo
- [ ] GuidedVideo
- [ ] History
- [ ] Intro
- [ ] Map
- [ ] News
- [ ] Privacy
- [ ] Propaganda
- [ ] VideoAnalyses
- [x] App
- [ ] Comments

## License and Citation

Software: MIT license

Content except the Theresienstadt film: Creative Commons CC-BY

Theresienstadt film: all rights reserved

```bibtex
tba.
```

## Contributors

**Devalopment**

- Niels Seidel (CATALPA, FernUniversität in Hagen)
- Konstantin Friedrich (CATALPA, FernUniversität in Hagen)

**Design**

- Marcel Hüsni (dioptrin)

**Video Restauration**

- Niels Seidel (CATALPA, FernUniversität in Hagen)

**Content Production**

- Benedikt Schaumlöffel (University Bonn)
- Dennis Schäfer (Princton)
- Armin Pietsch (Freundeskreis Theresienstadt e.V.)
- Janick Baumann (Freundeskreis Theresienstadt e.V.)
