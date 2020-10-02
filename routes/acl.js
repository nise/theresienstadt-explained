/**
 * 
 */
module.exports = function (db, app) {
    var module = {};

    const mongoose = require('mongoose');
    const express = require('express');
    const fs = require('fs');

    app.use(express.static('client/dist'));
    
    app.get('/message', (req, res) => {
        res.json({
            message: 'Hello dude!'
        });
    });

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

    /*app.use(function (req, res, next) {
        res.status(404).send('Sorry cant find that!');
    });*/
};