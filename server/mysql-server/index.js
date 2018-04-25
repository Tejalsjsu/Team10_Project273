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
  var userRoutes = require('./routes/userRoutes');
  app.use('/userRoutes', userRoutes);

  var userRoutes = require('./routes/userRoutes');
  app.use('/userRoutes', userRoutes);

  var adminRoutes = require('./routes/adminRoutes');
  app.use('/adminRoutes', userRoutes);

  require('./routes/movieRoutes')(app);
  const PORT = process.env.PORT || 5003;
  app.listen(PORT, () => {
    console.log(`Listening on port`, PORT);
  });
  module.exports.app = app;
}
