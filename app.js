const express = require('express');
const request = require('request');
const hbs = require('hbs');
const app = express();

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "kickstart",
    port: 3308
});

connection.connect(function(error){
    if(!!error){
        console.log(error);
    }else{
        console.log('app.js connected with DB');
    }
});





hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartial('style', '/views/partials/styles')
hbs.registerPartial('navigation', '/views/partials/navigation')

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/css'))
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
        username:'John Smith',
        userPoints: 888
    });
});


app.get('/events', (request, response) => {

    connection.query("select * from kickstart_events where events_date = '2019-02-07';", function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            console.log('Retriving data successfully');
            console.log(rows);
            response.render('events.hbs', {
                title1: rows[0].events_title,
                start_time1: rows[0].events_start_time,
                end_time1: rows[0].events_end_time,
                date1: rows[0].events_date,
                location1: rows[0].events_locations,
                date1: rows[0].events_date,
                description1: rows[0].events_desc,

                title2: rows[1].events_title,
                start_time2: rows[1].events_start_time,
                end_time2: rows[1].events_end_time,
                date2: rows[1].events_date,
                location2: rows[1].events_locations,
                date2: rows[1].events_date,
                description2: rows[1].events_desc,

                title3: rows[2].events_title,
                start_time3: rows[2].events_start_time,
                end_time3: rows[2].events_end_time,
                date3: rows[2].events_date,
                location3: rows[2].events_locations,
                date3: rows[2].events_date,
                description3: rows[2].events_desc,
            });
        }
    })

    
});


app.get('/rewards', (request, response) => {
    response.render('rewards.hbs', {
        
    });
});


app.get('/admin', (request, response) => {
    response.render('adminEvents.hbs', {
        
    });
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