var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const key = require('../config/keys');

function getConnection() {
  const connectionPool = mysql.createPool({
    connectionLimit: 30,
    host: key.MySqlHost,
    user: key.MySqlUser,
    password: key.MySqlPass,
    port: key.MySqlPort,
    database: key.MySqlDatabase
  });
  return connectionPool;
}

// function fetchData(callback, sqlQuery) {
//   console.log('\nSQL Query::' + sqlQuery);
//
//   var pool = getConnection();
//
//   pool.getConnection(function(err, connection) {
//     if (err) {
//       console.log('ERROR: ' + err.message);
//       return;
//     }
//     connection.query(sqlQuery, function(error, results, fields) {
//       if (error) {
//         console.log('ERROR: ' + error.message);
//       } else {
//         console.log('DB results : ', JSON.stringify(results));
//       }
//       callback(err, results);
//       connection.end();
//       console.log('\nConnection closed..');
//     });
//   });
// }

exports.fetchData = (callback, sqlQuery) => {
  console.log('\nSQL Query:: ' + sqlQuery);
  var connection = getConnection();

  connection.query(sqlQuery, function(err, rows, fields) {
    if (err) {
      console.log('ERROR: ' + err.message);
    } else {
      // return err or result
      console.log('DB Results:' + JSON.stringify(rows));
    }
    callback(err, rows);
    connection.end();
  });
  console.log('\nConnection closed..');
};

//exports.fetchData = fetchData;
