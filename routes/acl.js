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
      fs.readFile('./ressources/Persons2020.json', function(err, data){
        res.send(data);
        /* res.json({
          dat: data,
          error: err
        }); */
      });
    });

    app.get('/references/bibliography', (req, res) => {
      fs.readFile('./ressources/Theresienstadt.bib', function (err, data){
        res.send(data);
      });
    });

    app.get('/references/filmography', (req, res) => {
        fs.readFile('./ressources/filmography.json', function (err, data) {
            res.send(data);
        });
    });

    app.get('/markerdata', (req, res) => {
        fs.readFile('./ressources/markers.json', function (err, data) {
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
        fs.readFile('./ressources/scenes2020.json', function (err, data) {
            res.send(data);
        });
    });

    /*app.use(function (req, res, next) {
        res.status(404).send('Sorry cant find that!');
    });*/

    
};