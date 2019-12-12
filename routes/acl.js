/**
 * 
 */
module.exports = function (db, app) {
    var module = {};

    const mongoose = require('mongoose');
    const express = require('express');

    app.use(express.static('client/dist'));
    
    app.get('/message', (req, res) => {
        res.json({
            message: 'Hello dude!'
        });
    });

    /*app.use(function (req, res, next) {
        res.status(404).send('Sorry cant find that!');
    });*/
};