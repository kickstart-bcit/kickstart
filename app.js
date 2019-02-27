const express = require('express');
const request = require('request');
const hbs = require('hbs');
const app = express();
const session = require('client-sessions');
const sessionHelper = require('./middlewares/sessionMiddleware')

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Password",
    database: "kickstart",
    port: 3306
});

connection.connect(function(error){
    if(!!error){
        console.log(error);
    }else{
        console.log('app.js connected with DB');
    }
});


// session configuration
app.use(session({
    cookieName: 'session',
    secret: 'banana kick',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  }));

// DB connectors
// const eventConnector = require('./connectors/eventConnector.js');
// const rewardsConnector = require('./connectors/rewardsConnector.js');


hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartial('style', '/views/partials/styles')
hbs.registerPartial('navigation', '/views/partials/navigation')


app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/css'))
app.use(express.json());
app.use(express.urlencoded());

// Routers
const loginRouter = require('./routers/loginRouter');
const mainRouter = require('./routers/mainRouter');
const eventsRouter = require('./routers/eventsRouter');
const rewardsRouter = require('./routers/rewardsRouter');
const adminRouter = require('./routers/adminRouter');

app.use('/login', sessionHelper.refreshCookie,  sessionHelper.requireLogin, loginRouter);
app.use('/main', sessionHelper.refreshCookie,  sessionHelper.requireLogin, mainRouter);
app.use('/events', sessionHelper.refreshCookie,  sessionHelper.requireLogin, eventsRouter);
app.use('/rewards', sessionHelper.refreshCookie,  sessionHelper.requireLogin, rewardsRouter);
app.use('/admin', sessionHelper.refreshCookie,  sessionHelper.requireLogin, adminRouter);

app.get('/', (request, response) => {
    response.redirect('/login');
});


app.get('/calendar', (request, response) => {
    response.render('events_cal.hbs', {
        
    });
})

app.get('/popup', (request, response) => {
    response.render('popup.hbs', {
        eventPicUrl:"https://i.ytimg.com/vi/EDzLx3hkli0/maxresdefault.jpg",

    });
});

module.exports = app;