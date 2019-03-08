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
            database: "realkickstart",
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
        return rows.map( row => {
            let pic ="";
            let alt = "";
            if (row.events_campus == "Richmond") {
                pic = "http://dev.keithpanel.com/images/sized/images/uploads/projects/BCIT-1-715x470.jpg";
                alt = "BCIT Richmond Campus"
            } else if (row.events_campus == "Downtown") {
                pic ="https://www.vanarts.com/drive/uploads/2017/01/BCIT-from-570-Dunsmuir_street-level-1024x681.jpg";
                alt = "BCIT Downtown Campus"
            } else if (row.events_campus == "Burnaby") {
                pic = "https://s3-media2.fl.yelpcdn.com/bphoto/n5A2PtT9E0TnWNQUxH3DCw/o.jpg";
                alt = "BCIT Burnaby Campus"
            }


            return `<div class="blocks">
                <img alt=${alt} src=${pic} style="position: relative; width: 100%; height: auto"/>
                
                <div class="eventboxdate">
                    <span class="eventDate">${row.events_date}</span><br/>
                </div>

                <div class="eventboxinfo">
                    <h3>${row.events_title}</h3>
                    <span class="startTime" style="width: auto; justify-content: center;">${row.events_start_time} - </span>
                    <span class="endTime">${row.events_end_time}</span><br/>
                    <span class="eventsLocation">${row.events_locations}, </span>
                    <span class="eventsCampus">${row.events_campus}</span><br/>
                    <span class="eventsPoints">${row.events_points}</span><br/>
                    <p class="eventsDesc">${row.events_desc}</p>
                    <button class="eventsButton" onclick="sendJoin(${row.events_id})">Participate</button>
                </div>

            </div>`
        }
    ).join("").replace(/\s\s+/g, " ");
}

const determineJoined = (user_id, event_id) => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();
        connector.query("select * from participations where frn_users_id = ? and frn_events_id = ?;", [user_id, event_id], (error, rows, fields) => {
            if (error) reject(error); else resolve(rows);
        })
        
        connector.end();
    });

}


const joiningEvent = (user_id, event_id) => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();

        connector.query("insert into participations (frn_users_id, frn_events_id) values (?, ?);", [user_id, event_id], (error, rows, fields) => {
            if(error) reject(error); else resolve(rows);
        })

        connector.end();
    });
}



const defaultFetchEvent = () => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();
      
        connector.query("select * from kickstart_events;", (error, rows, fields) => {
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
            database: "realkickstart",
            port: 3306
        });

        connector.connect();
      
        connector.query("select * from kickstart_events where events_title like ?;", [word], (error, rows, fields) => {
            if (error) reject("couldn't connect to db"); else resolve(rows);
        });

        connector.end();
  });
}

const fetchSearchedEventByCampus = (campus) => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();
      
        connector.query("select * from kickstart_events where events_campus like ?;", [campus], (error, rows, fields) => {
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
                database: "realkickstart",
                port: 3306
            });
    
            connector.connect();
    
            connector.query("SELECT * FROM kickstart_events order by events_date and events_start_time asc;", (error, rows, fields) => {
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
                database: "realkickstart",
                port: 3306
            });
    
            connector.connect();
    
            connector.query("SELECT * FROM kickstart_events order by events_points asc;", (error, rows, fields) => {
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
                database: "realkickstart",
                port: 3306
            });
    
            connector.connect();
    
            connector.query("SELECT * FROM kickstart_events order by events_campus asc;", (error, rows, fields) => {
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
  defaultFetchEvent,
  fetchSearchedEventByCampus,
  determineJoined,
  joiningEvent
};
