const cluster = require('cluster');
//check if the file is being executed in master mode
if (cluster.isMaster) {
  //index.js to be executed here in child mode
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  //child mode, act like a server
  const express = require('express');
  const mysql = require('mysql');
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const isLoggedin = require('./middlewares/isLoggedin');
  const cookieSession = require('cookie-session');
  const passport = require('passport');
  const key = require('./config/keys');

  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [key.cookieKey]
    })
  );
  //MySql connection
  const pool = mysql.createPool({
    connectionLimit: 10,
    host: key.MySqlHost,
    user: key.MySqlUser,
    password: key.MySqlPass,
    port: key.MySqlPort,
    database: key.MySqlDatabase
  });
  require('./routes/admin')(app);
  //Return all Movies
  app.get('/api/getMovies', (req, res) => {
    const sql = 'SELECT * FROM Movies';
    pool.getConnection(function(error, conn) {
      console.log(error);
      console.log('My Query is', sql);
      conn.query(sql, (err, results) => {
        if (err) return res.send(400);
        console.log(results);
        if (err) {
          res.status(401).send({ message: 'Error getting All Movies' });
          return;
        } else {
          res.status(200).send(results);
        }
      });
      conn.release();
    });
  });

  const PORT = process.env.PORT || 5003;
  app.listen(PORT, () => {
    console.log(`Listening on port`, PORT);
  });
  module.exports.app = app;
}
