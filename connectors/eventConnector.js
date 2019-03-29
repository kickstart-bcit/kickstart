const mysql = require("mysql");

const insertEvent = (inputArray) => {
    return new Promise((resolve, reject) => {
    const connector = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Password",
        database: "realkickstart",
        port: 3306
    });


    connector.connect();
  
    connector.query("INSERT INTO `realkickstart`.`kickstart_events` (`events_id`, `events_title`, `events_date`, `events_start_time`, `events_end_time`, `events_locations`, `events_points`, `events_desc`, `events_campus`, `events_isFinished`, `events_isFeatured`) VALUES ( NULL, ? , ?, ?, ?, ?, ?, ?, ?, '0', ?);", inputArray ,(error, rows, fields) => {
        if (error) reject(error); else resolve(rows);
    });

    connector.end();
    });
}

const updateEvent = (id, inputArray) => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();
    
        connector.query("UPDATE kickstart_events SET events_title = ?, events_date = ?, events_start_time = ?, events_end_time = ?, events_locations = ?, events_points =?, events_desc =?, events_campus =?, events_isFeatured =? where events_id = ?", 
        inputArray.concat([id]), (error, rows, fields) => {
            if (error) reject(error); else resolve(rows);
        });

        connector.end();
    });
}

const deleteEventById = (id) => {
    return new Promise((resolve, reject) => {
    const connector = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Password",
        database: "realkickstart",
        port: 3306
    });

    connector.connect();

    connector.query("DELETE FROM kickstart_events where events_id = ?", id,(error, rows, fields) => {
        if (error) {
            console.log("ERROR from deleteEventByID() ")
            reject(error);
        } 
        else resolve("DELETE SUCCESS from events table");
    });

    connector.end();
});
}

const deleteParticipationById = (id) => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Password",
            database: "realkickstart",
            port: 3306
        });
    
    
        connector.connect();
      
        connector.query("DELETE FROM participations where frn_events_id = ?", id,(error, rows, fields) => {
            if (error) {
                console.log("ERROR from deleteParticipationById() ")
                reject(error);
            } else resolve(rows);
        });

        connector.end();
    });
}


const fetchEventById = (id) => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();
      
        connector.query("select * from kickstart_events where events_id = ?", id,(error, rows, fields) => {
            if (error) reject("couldn't connect to db"); else resolve(rows);
        });

        connector.end();
    });
}


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
      
        connector.query("select * from kickstart_events where events_isFinished = 0", (error, rows, fields) => {
            if (error) reject("couldn't connect to db"); else resolve(rows);
        });

        connector.end();
  });
}

const fetchEventIdFromParticipation = () => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();
      
        connector.query("select frn_events_id from participations", (error, rows, fields) => {
            if (error) reject("couldn't connect to db"); else resolve(rows);
        });

        connector.end();

    })
}

const renderAdminEvents = (rows) => {
    return rows.map( row => 
        `<tr><td><div class="leftRowPart">Title: ${row.events_title} <br> Date:   ${new Date(row.events_date).toString().split(" ").slice(1,4).join(" ")} <br>Time:   ${row.events_start_time} ~ ${row.events_end_time} </div>
        <div class=rightRowPart><button onclick="editEvent(${row.events_id})" class="adminEventEditButton">Edit</button>
        <button onclick="deleteEvent(${row.events_id})" class="adminEventDeleteButton">Delete</button><div>
        <button onclick="confirmEvent(${row.events_id})" class="adminEventDeleteButton">Finish</button><div></td></tr>`
    ).join("").replace(/\s\s+/g, " ");
}
/* 
 * fetch events that have isFeatured = 1
 */
const fetchFeaturedEvents = () => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();
      
        connector.query("select * from kickstart_events where events_isFeatured = 1 and events_isFinished = 0", (error, rows, fields) => {
            if (error) reject("couldn't connect to db"); else resolve(rows);
        });

        connector.end();
    })
}

/* 
 * fetch past (finished) events for admin page
 */
const fetchFinishedEvents = () => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();
      
        connector.query("select * from kickstart_events where events_isFinished = 1", (error, rows, fields) => {
            if (error){
                console.log("in fetchFnishedEvents(): ");
                reject(error);
            }  else resolve(rows);
        });

        connector.end();
    })
}


/* 
 * receive user id and event id and delete from participants 
 * in case user did not participated
 */
const removeParticipant = (userId, eventId) => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();
        let query = "delete from participations where frn_users_id = ? and frn_events_id =?";
        connector.query(query, [userId, eventId],(error, rows, fields) => {
            if (error){
                console.log("in removeParticipant(): ");
                reject(error);
            }  else resolve(rows);
        });

        connector.end();
    })
}

/* 
 *  insert participants to finished_events table
 */
const confirmParticipationByEventId = (eventId) => {
    let query =  "insert into finished_events (finished_events_id, frn_events_id, frn_users_id, finished_date ) select Null, frn_events_id, frn_users_id, date(now()) from participations where frn_events_id = ?;"
    
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();
        connector.query(query, eventId,(error, rows, fields) => {
            if (error){
                console.log("in confirmParticipationByEventId(): ");
                reject(error);
            }  else resolve(rows);
        });

        connector.end();
    })
}

/* 
 * fetchParticipations by Event Id
 * input is an event id
 * output is list of participants ( studentId, studentName )
 */
const fetchParticipationsByEventId = (eventId) => {
    let query = "select pt.frn_users_id as studentId, concat(u.users_firstName, ' ', u.users_lastName) as studentName from participations as pt inner join users as u on u.users_id = pt.frn_users_id where pt.frn_events_id = ?;"
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();
        connector.query(query, eventId,(error, rows, fields) => {
            if (error){
                console.log("in fetchParticipationsByEventId(): ");
                reject(error);
            }  else resolve(rows);
        });

        connector.end();
    })
}
/*  
 * mark an event as finished
 */
const finishEventById = (eventId) => {
    let query = "update kickstart_events set events_isFinished = 1 where events_id = ?;"
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();
        connector.query(query, eventId,(error, rows, fields) => {
            if (error){
                console.log("in finishEventById(): ");
                reject(error);
            }  else resolve(rows);
        });

        connector.end();
    })
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
                <img alt=${alt} src=${pic} style="position: relative; width: 100%; height: auto; border-radius: .5rem;"/>
                
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
                    <button class="eventsButton" onclick="sendJoin(${row.events_id}); event.target.innerHTML='Registered'; event.target.style.backgroundColor='#7e7e7e'">Participate</button>
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

const quittingEvent = (user_id, event_id) => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();

        connector.query("delete from participations where frn_users_id = ? and frn_events_id = ?;", [user_id, event_id], (error, rows, fields) => {
            if(error) reject (error); else resolve(rows);
        })

        connector.end();
    })
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
      
        connector.query("select * from kickstart_events where events_isFinished = 0;", (error, rows, fields) => {
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
      
        connector.query("select * from kickstart_events where events_title like ? and events_isFinished = 0;", [word], (error, rows, fields) => {
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
      
        connector.query("select * from kickstart_events where events_campus like ? and events_isFinished = 0;", [campus], (error, rows, fields) => {
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
    
            connector.query("SELECT * FROM kickstart_events where events_isFinished = 0 order by events_date and events_start_time asc;", (error, rows, fields) => {
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
    
            connector.query("SELECT * FROM kickstart_events where events_isFinished = 0order by events_points asc;", (error, rows, fields) => {
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
    
            connector.query("SELECT * FROM kickstart_events where events_isFinished = 0 order by events_campus asc;", (error, rows, fields) => {
                if(error) reject("couldn't connect to db"); else resolve(rows);
            });

            connector.end()
        })
    }
    else{
        console.log('Sorting error from eventConnector');
    }
    
}

const deleteParticipant = (studentId, eventId) => {
    let query = "delete from participations where frn_users_id = ? and frn_events_id=?;"
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();
        connector.query(query, [studentId, eventId],(error, rows, fields) => {
            if (error){
                console.log("in deleteParticipant(): ");
                reject(error);
            }  else resolve(rows);
        });

        connector.end();
    })
}

const updateUsersPoint = (point, eventId) => {
    let query = "UPDATE  users SET users_point = users_point + ? WHERE users_id IN(SELECT frn_users_id FROM participations WHERE frn_events_id = ?);"
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();
        connector.query(query, [point, eventId],(error, rows, fields) => {
            if (error){
                console.log("in updateUsersPoints(): ");
                reject(error);
            }  else resolve(rows);
        });

        connector.end();
    })
}


module.exports = {
  fetchEventById,
  fetchEvents,
  fetchFeaturedEvents,
  fetchFinishedEvents,
  fetchSearchedEvent,
  fetchSearchedEventByCampus,
  fetchSortedEvent,
  renderEvents,
  renderAdminEvents,
  joiningEvent,
  defaultFetchEvent,
  determineJoined,
  insertEvent,
  updateEvent,
  deleteEventById,
  quittingEvent,
  removeParticipant,
  deleteParticipationById,
  finishEventById,
  confirmParticipationByEventId,
  fetchParticipationsByEventId,
  fetchEventIdFromParticipation,
  deleteParticipant,
  updateUsersPoint
};
