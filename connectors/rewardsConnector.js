// controller for rewards page goes here
// TODO: right now the config option is open (i.e. password)
//  needs to use dotenv to store private information safe
// TODO2: validation
// TODO3: stylyze the rendered events
// TODO4: validation

const mysql = require("mysql");


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
        `<tr><td>${row.rewards_title}<button class="adminEventEditButton">Edit</button></td></tr>`
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
  renderAdminRewards
};
