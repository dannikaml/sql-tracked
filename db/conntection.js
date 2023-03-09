const mysql = require("mysql2");

const db = mysql.createConnection(
{
    host: "localhost",
    user: "root",
    password: "panthers123",
    database: "employees_db",
    port: 3306,
},
console.log(`Connected to the employees_db database...`)
);

db.connect(function (err) {
if (err) throw err;
}
);

module.exports = db;