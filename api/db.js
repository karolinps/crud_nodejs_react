
const mysql = require('mysql');

// connection configurations
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root_node',
    password: '123456',
    database: 'my_db_node'
});
 
// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
module.exports = db;