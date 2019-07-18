const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const application = 'theresienstadt-explained';
const mongoose = require('mongoose');


const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());



//app.use('/home', express.static(__dirname + '/client/index.html'));


const port = process.env.PORT || 4000;




/* 
 * Init database, load data, and init ACL 
 **/
mongoose.Promise = require('bluebird');
var conn = mongoose.connect(
    'mongodb://localhost:27017/' + application, {
        // useMongoClient: true,
        useNewUrlParser: true,
        promiseLibrary: require('bluebird')
    }) 
    .then(() => {
        // Initialize Access Control List 
        var ACL = require('./routes/acl')(conn, app);
        // start server
        app.listen(port, () => {
            console.log('\n\n***************************************************************');
            console.log('Started server for application »' + application + '« on port ' + port);
            console.log('***************************************************************\n\n');
            console.log(process.env.NODE_ENV);
        });
        app.setMaxListeners(0);
        return;
    })
    .catch(err => { // mongoose connection error will be handled here
        console.error('App starting error:', err.stack);
        process.exit(1);
    });