// controller for rewards page goes here
// TODO: right now the config option is open (i.e. password)
//  needs to use dotenv to store private information safe
// TODO2: validation
// TODO3: stylyze the rendered events
// TODO4: validation

const mysql = require("mysql");


const insertReward = (inputArray) => {
    return new Promise((resolve, reject) => {
    const connector = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Password",
        database: "realkickstart",
        port: 3306
    });


    connector.connect();
  
    connector.query("INSERT INTO `realkickstart`.`rewards` (`rewards_id`, `rewards_title`, `rewards_points`, `rewards_desc`) VALUES ( NULL, ?, ?, ?);", inputArray ,(error, rows, fields) => {
        if (error) reject(error); else resolve(rows);
    });

    connector.end();
    });
}

const updateReward = (id, inputArray) => {
    return new Promise((resolve, reject) => {
    const connector = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Password",
        database: "realkickstart",
        port: 3306
    });

    connector.connect();
  
    connector.query("UPDATE rewards SET rewards_title = ?, rewards_points = ?, rewards_desc = ? where rewards_id = ?", 
    inputArray.concat([id]), (error, rows, fields) => {
        if (error) reject(error); else resolve(rows);
    });

    connector.end();
});
}


const deleteRewardById = (id) => {
    return new Promise((resolve, reject) => {
    const connector = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Password",
        database: "realkickstart",
        port: 3306
    });


    connector.connect();
  
    connector.query("DELETE FROM rewards where rewards_id = ?", id, (error, rows, fields) => {
        if (error) reject(error); else resolve(rows);
    });

    connector.end();
});
}


const fetchRewardById = (id) => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();
      
        connector.query("select * from rewards where rewards_id = ?", id, (error, rows, fields) => {
            if (error) reject("couldn't connect to db"); else resolve(rows);
        });

        connector.end();
  });
}
const fetchRewards = () => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();
      
        connector.query("select * from rewards", (error, rows, fields) => {
            if (error) reject("couldn't connect to db"); else resolve(rows);
        });

        connector.end();
  });
}

const renderAdminRewards = (rows) => {
    return rows.map( row =>
        `<tr><td><div class="leftRowPart">${row.rewards_title} <br>Points: ${row.rewards_points}</div>
        <div class=rightRowPart><button onclick="editReward(${row.rewards_id})" class="adminEventEditButton">Edit</button>
        <button onclick="deleteReward(${row.rewards_id})" class="adminEventDeleteButton">Delete</button></div></td></tr>`
    ).join("").replace(/\s\s+/g, " ");
}


const renderRewards = (rows) => {
    return rows.map( row =>
        `<tr>
            <td>${row.rewards_title}</td>
            <td>${row.rewards_points}</td>
        </tr>`
    ).join("").replace(/\s\s+/g, " ");
}

module.exports = {
  fetchRewards,
  renderRewards,
  renderAdminRewards,
  fetchRewardById,
  insertReward,
  deleteRewardById,
  updateReward
};
