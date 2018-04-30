var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const key = require('../config/keys');

var pool = mysql.createPool({
    connectionLimit : 50,
    host     : 'mysql.ca9j02g2avzs.us-west-1.rds.amazonaws.com',
    user     : 'root',
    password : 'password123',
    database : 'fandango',
    port	 : 3306
});

exports.fetchData = (callback, query) => {
    console.log("MySQL SELECT QUERY: " + query);
    pool.getConnection((err, connection) => {
        if(err){
            console.log(err);
        }
        connection.query(query, function(err, rows, fields) {
            if(err) {
                console.log("ERROR : " + err.message);
            } else {
                console.dir("Results: " + JSON.stringify(rows));
            }
            callback(err, rows);
        });
        connection.release();
        console.log("Connection released");
    });
}

// exports.insertData = (callback, sqlQuery) => {
//     console.log("\nSQL Query:: " + sqlQuery);
//     connection.query(sqlQuery, function (err, result) {
//         if (err) {
//             console.log("ERROR: " + err.message);
//             throw err;
//         } else {
//             console.log("Results: \n" + JSON.stringify(result));
//             console.log("The inserted id is: " + result.insertId);
//             callback(err, result);
//         }
//         connection.release();
//     });
//     console.log("\nConnection closed..");
// }
//
// exports.putdata = (callback,params,sqlQuery)=>{
//     console.log("\nSQL Query::"+sqlQuery);
//     var connection=getConnection();
//     connection.query(sqlQuery, params, function(err, rows, fields) {
//         if(err){
//             console.log("ERROR: " + err.message);
//         }
//         else
//         {	// return err or result
//             console.log("DB Results:"+rows);
//             callback(err, rows);
//         }
//     });
//     console.log("\nConnection closed..");
//     connection.release();
// }
