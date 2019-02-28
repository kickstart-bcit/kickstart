// controller for event page goes here
// TODO: right now the config option is open (i.e. password)
//  needs to use dotenv to store private information safe
// TODO2: validation
// TODO3: stylyze the rendered events
// TODO4: validation

const mysql = require("mysql");


const fetchEvents = () => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Password",
            database: "kickstart",
            port: 3306
        });

        connector.connect();
      
        connector.query("select * from kickstart_events", (error, rows, fields) => {
            if (error) reject("couldn't connect to db"); else resolve(rows);
        });

        connector.end();
  });
}

const renderEvents = (rows) => {
    console.log(rows);
    return rows.map( row =>
        `<div class="blocks">
                <img src=${row.events_pic} style="position: relative; width: 100%; height: auto"/>
                <h3>${row.events_title}</h3>
                <span class="startTime" style="width: auto; justify-content: center;">${row.events_start_time} - </span>
                <span class="endTime">${row.events_end_time}</span><br/>
                <span class="eventDate">${row.events_date}</span><br/>
                <span class="eventsLocation">${row.events_locations}, </span>
                <span class="eventsCampus">${row.events_campus}</span><br/>
                <p class="eventsDesc">${row.events_desc}</p>
                <button class="eventsButton">Participate</button>
            </div>`
    ).join("").replace(/\s\s+/g, " ");
}


const fetchSearchedEvent = (word) => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Password",
            database: "kickstart",
            port: 3306
        });

        connector.connect();
      
        connector.query("select * from kickstart_events where events_title like ?",[word], (error, rows, fields) => {
            if (error) reject("couldn't connect to db"); else resolve(rows);
        });

        connector.end();
  });
}




module.exports = {
  fetchEvents,
  renderEvents,
  fetchSearchedEvent
};
