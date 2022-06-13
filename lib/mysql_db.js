const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'cesarin2001',
        database: 'employee_db'
    }
);

console.log("Connected to the employee database.");

module.exports = db;
