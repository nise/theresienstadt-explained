/**
 * 
 */


const mongoose = require('mongoose');

app.get('/message', (req, res) => {
    res.json({
        message: 'Hello dude!'
    });
});