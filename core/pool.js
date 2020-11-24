const util = require('util');
const mysql = require('mysql');
/**
 * Connection to the database.
 *  */
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER, // use your mysql username.
    password: process.env.MYSQLPASS, // user your mysql password.
    database: process.env.MYSQLDB
});

pool.getConnection((err, connection) => {
    if(err) 
        console.error("Something went wrong connecting to the database ...");
    
    if(connection)
        connection.release();
    return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;
