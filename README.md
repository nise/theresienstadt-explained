# Roadmap

- upgrade to vue3
- identify open issues
- use strapi as LMS https://strapi.io/

# Anwendung starten

Setup

- `npm install`
- `npm audit -fix`

Run the application

- `cd client/dist`
- npx http-server -p 8080
- `npm run serve` (siehe package.json in Zeile 5)
- eventually run `export NODE_OPTIONS=--openssl-legacy-provider`
- Open http://localhost:8081 in your browser

Unter http://localhost:8080/film ist der Player derzeit sichtbar.
Irgendwo schwirrt auch noch Code aus einem ganz anderen Projekt hier rum - da geht es um ein Zeitkonzept...

---

# Instructions

cd client && npm run build && cd .. && npm run start

**Run in production mode using node.js backend**
I made this much easier, just run the one line for building the client and starting the node server:

- `npm run start` (requires an installation of mongodb)
- open `http://localhost:3000/home` in your browser

**Deploy locally**

- `cd client`
- `serve -s dist`
- Open http://localhost:5000 in your browser

**Deploy on github.io**

- `cd client`
- `npm run build`
