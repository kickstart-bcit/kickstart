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


const renderAdminEvents = (rows) => {
    return rows.map( row =>
        `<tr><td>${row.events_title}<button class="adminEventEditButton">Edit</button></td></tr>`
    ).join("").replace(/\s\s+/g, " ");
}


const renderEvents = (rows) => {
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


const defaultFetchEvent = () => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Password",
            database: "kickstart",
            port: 3306
        });

        connector.connect();
      
        connector.query("select * from kickstart.kickstart_events;", (error, rows, fields) => {
            if (error) reject("couldn't connect to db"); 
            else resolve(rows);
        });

        connector.end();
  });
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
      
        connector.query("select * from kickstart_events where events_title like ?;", [word], (error, rows, fields) => {
            if (error) reject("couldn't connect to db"); else resolve(rows);
        });

        connector.end();
  });
}

const fetchSortedEvent = (condition) => {
    if(condition === 'datetime'){
        return new Promise((resolve, reject) => {
            const connector = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "Password",
                database: "kickstart",
                port: 3306
            });
    
            connector.connect();
    
            connector.query("SELECT * FROM kickstart.kickstart_events order by events_date and events_start_time asc;", (error, rows, fields) => {
                if(error) reject("couldn't connect to db"); else resolve(rows);
            });

            connector.end()
        })
    }
    else if (condition === 'point'){
        return new Promise((resolve, reject) => {
            const connector = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "Password",
                database: "kickstart",
                port: 3306
            });
    
            connector.connect();
    
            connector.query("SELECT * FROM kickstart.kickstart_events order by events_point asc;", (error, rows, fields) => {
                if(error) reject("couldn't connect to db"); else resolve(rows);
            });

            connector.end()
        })
    }
    else if (condition === 'campus'){
        return new Promise((resolve, reject) => {
            const connector = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "Password",
                database: "kickstart",
                port: 3306
            });
    
            connector.connect();
    
            connector.query("SELECT * FROM kickstart.kickstart_events order by events_campus asc;", (error, rows, fields) => {
                if(error) reject("couldn't connect to db"); else resolve(rows);
            });

            connector.end()
        })
    }
    else{
        console.log('Sorting error from eventConnector');
    }
    
}



module.exports = {
  fetchEvents,
  renderEvents,
  fetchSearchedEvent,
  renderAdminEvents,
  fetchSortedEvent,
  defaultFetchEvent
};
