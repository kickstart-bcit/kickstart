const express = require('express');
const request = require('request');
const hbs = require('hbs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartial('style', '/views/partials/styles')
hbs.registerPartial('navigation', '/views/partials/navigation')

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded());


app.get('/', (request, response) => {
    response.render('log.hbs', {
        
    });
});

app.post('/login', (request, response) => {
    // validation/authentication goes here 
    response.redirect('/main');
});


app.get('/main', (request, response) => {
    response.render('main.hbs', {
        profileUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeBO2O1ALH1poBQKrOjkDwHJh6HmZyd5aDGdazJmWxjAhxib5L",
        username:'Jeremy Park',
        userPoints: 888
    });
});


app.get('/events', (request, response) => {
    response.render('events.hbs', {
        
    });
});


app.get('/rewards', (request, response) => {
    response.render('rewards.hbs', {
        
    });
});


app.get('/admin', (request, response) => {
    response.render('adminEvents.hbs', {
        
    });
});


module.exports = app;