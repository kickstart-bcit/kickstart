// router methods definitions go here!

const mysql = require("mysql");
const express = require('express');
const router = express.Router();
const eventConnector = require('../connectors/eventConnector.js');

// "/main"

router.get('/', async (request, response) => {
    try {
        let currentEvents = await fetchCurrentEvent(request.session.user.users_id);
        let featuredEvents = await eventConnector.fetchFeaturedEvents();
        response.render('main.hbs', {
            profileUrl:"https://www.walkaboutfoundation.org/wp-content/uploads/2018/06/cropped-default-user.png",
            username:`${request.session.user.users_firstName} ${request.session.user.users_lastName}`,
            userPoints: `${request.session.user.users_point}`,
            userEmail: `${request.session.user.users_email}`,
            userID: `${request.session.user.users_id}`,
            currentEvents,
            featuredEvents
        });
    }
    catch (err) {
        console.log(err);
        response.render('main.hbs', { err });
    }
    // console.log('working');
})

const fetchCurrentEvent = (user_id) => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();

        connector.query(`select kickstart_events.events_id, kickstart_events.events_title, kickstart_events.events_points, kickstart_events.events_locations, kickstart_events.events_start_time, kickstart_events.events_end_time, kickstart_events.events_date, kickstart_events.events_campus
        from kickstart_events
        inner join participations on kickstart_events.events_id = participations.frn_events_id
        inner join users on users.users_id = participations.frn_users_id
        where users.users_id = ?;`, [user_id], (error, rows, fields) => {
            if (error) reject(error); else resolve(rows);
        })


        connector.end();
  });
}


const renderCurrentEvents = (rows) => {
    return rows.map( row => {

        return `<div class="blocks">
            <div class="eventboxinfo">
                <h3>${row.events_title}</h3>
                <span class="startTime" style="width: auto; justify-content: center;">${row.events_start_time} - </span>
                <span class="endTime">${row.events_end_time}</span><br/>
                <span class="eventsLocation">${row.events_locations}, </span>
                <span class="eventsCampus">${row.events_campus}</span><br/>
                <span class="eventsPoints">${row.events_points}</span><br/>

            </div>

        </div>`
    }
).join("").replace(/\s\s+/g, " ");
}

router.post('/quit', async(request, response) => {
    try {
        console.log('the event id is', request.body.value);
        console.log('the user is', request.session.user.users_id);
        event_id = request.body.value;
        user_id = request.session.user.users_id;

        quittingEvent = await eventConnector.quittingEvent(user_id, event_id);
        response.render('main.hbs');
    }
    catch(err){
        response.render('event.hbs', 'error')
    }
});



module.exports = router;