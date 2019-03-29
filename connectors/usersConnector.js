// controller for event page goes here
// TODO: right now the config option is open (i.e. password)
//  needs to use dotenv to store private information safe
// TODO2: validation
// TODO3: stylyze the rendered events
// TODO4: validation

const mysql = require("mysql");

const fetchUser = (userId) => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "us-cdbr-iron-east-03.cleardb.net",
            user: "b1fd3377f33cda",
            password: "ebc2d924",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();
        connector.query("select * from users where users_id = ?", userId ,(error, rows, fields) => {
            if (error) {console.log(error); reject("couldn't connect to db");} 
            else if (rows.length == 0) reject("no user with such id");
            else resolve(rows[0]);
        });

        connector.end();
  });
}

const fetchStaff = (staffId) => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "us-cdbr-iron-east-03.cleardb.net",
            user: "b1fd3377f33cda",
            password: "ebc2d924",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();
        connector.query("select * from users where users_id = ? and users_type = 'staff'", userId ,(error, rows, fields) => {
            if (error) {reject("couldn't connect to db");} 
            else if (rows.length == 0) reject("no staff with such id");
            else resolve(rows[0]);
        });

        connector.end();
  });
}





module.exports = {
    fetchUser,
};
