var express = require('express');
var router = express.Router();
var mysql = require('mysql');
function getConnection() {
  const connectionPool = mysql.createPool({
    connectionLimit: 10,
    host: key.MySqlHost,
    user: key.MySqlUser,
    password: key.MySqlPass,
    port: key.MySqlPort,
    database: key.MySqlDatabase
  });
  return connectionPool;
}

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

exports.insertData = (callback, sqlQuery) => {
  console.log('\nSQL Query:: ' + sqlQuery);
  connection.query(sqlQuery, function(err, result) {
    if (err) {
      console.log('ERROR: ' + err.message);
      throw err;
    } else {
      console.log('Results: \n' + JSON.stringify(result));
      console.log('The inserted id is: ' + result.insertId);
      callback(err, result);
    }
    connection.end();
  });
  console.log('\nConnection closed..');
};
