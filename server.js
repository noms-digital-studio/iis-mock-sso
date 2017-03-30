'use strict';

let logger = require('./log.js');

let express = require('express');
let path = require('path');
let request = require("request");
let util = require("util");
let bodyParser = require('body-parser');

let app = express();




// CHANGE these if needed

app.set('port', 3001); // where to run this app
let user = require('./users/user_1.json'); // user profile to return

// Interactive mode
let interactive = process.env.INTERACTIVE;




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var route = express.Router();

app.use('/', route);

route.get('/oauth/authorize', function(req, res) {
    logger.info('GET authorize');
    logger.info(util.inspect(req.query));
    if(interactive === 'true') {
        res.render('sso', {redirect_uri: encodeURIComponent(req.query.redirect_uri)});
    } else {
        res.redirect(req.query.redirect_uri + "?code=123");
    }
});

route.get('/authorized', function(req, res) {
    logger.info('AUTHORIZED user');
    res.redirect(req.query.redirect_uri + "?code=123");
});

route.get('/unauthorized', function(req, res) {
    logger.info('UNAUTHORIZED user');
    res.status(401).send('You are not authorized');
});

route.post('/oauth/token', function(req, res) {
    logger.info('POST token');
    logger.info(util.inspect(req.body));
    let token = {};
    res.send(token);
});

route.get('/api/user_details', function(req, res) {
    logger.info('GET user_details');
    res.send(user);
});

route.get('/profile', function(req, res) {
    logger.info('GET profile');
    res.send('Mock user profile page');
});

route.get('/users/sign_out', function(req, res) {
    logger.info('GET sign_out');
    res.send('Mock sign out page');
});

app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

app.use(function(req, res, next) {
    logger.error('Unhandled request: ' + req.method + ':' + req.path);
    res.sendStatus(404);
});

app.listen(app.get('port'), function() {
    logger.info('Express server listening on port ' + app.get('port'));
});
