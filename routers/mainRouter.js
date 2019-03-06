// router methods definitions go here!

const mysql = require("mysql");
const express = require('express');
const router = express.Router();

// "/main"

router.get('/', async (request, response) => {

    let dispayCurrentEvents = renderCurrentEvents(await fetchCurrentEvent(request.session.user.users_id));

    response.render('main.hbs', {
        profileUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeBO2O1ALH1poBQKrOjkDwHJh6HmZyd5aDGdazJmWxjAhxib5L",
        username:`${request.session.user.users_firstName} ${request.session.user.users_lastName}`,
        userPoints: `${request.session.user.users_point}`,
        current: dispayCurrentEvents
    });
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


module.exports = router;