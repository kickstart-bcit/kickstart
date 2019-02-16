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
    return rows.map( row =>
        `<div class="blocks">
                <h3>${row.events_title}</h3>
                <span class="startTime">${row.events_start_time}</span>
                <span class="endTime">${row.events_end_time}</span>
                <span class="eventDate">${row.events_date}</span>
                <span class="eventsLocation">${row.events_locations}</span>
                <p class="eventsDesc">${row.events_desc}</p>
            </div>`
    ).join("").replace(/\s\s+/g, " ");
}

module.exports = {
  fetchEvents,
  renderEvents
};
