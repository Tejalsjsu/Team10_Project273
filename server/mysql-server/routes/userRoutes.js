var express = require('express');
var router = express.Router();
var mysql = require('./mysql');

router.post('/verifyLogin', function(req, res, next) {
  console.log('In verify');
  let reqUserEmail = req.body.username;
  let reqPassword = req.body.password;

  let getUser =
    "select userId, userType, email, password from Users where email='" +
    reqUserEmail +
    "'";
  let errors = '';

  mysql.fetchData(function(err, results) {
    if (err) {
      errors = 'Unable to find user';
      res.status(401).json(errors);
    } else {
      try {
        if (results.length > 0) {
          //if (bcrypt.compareSync(reqPassword, results[0].userPassword)) {
          if (reqPassword == results[0].password) {
            req.session.userId = results[0].userId;
            console.log('session Initialized ');
            console.log('Login successful');
            res.json({
              message: 'Login successful',
              status: '201',
              name: results[0].userName,
              token: req.session.id
            });
          } else {
            console.log('Invalid Password');
            res.json({
              message: 'Invalid Password or UserName',
              status: '401'
            });
          }
        } else {
          console.log('Invalid UserName or Password! Please try again');
          res.json({ message: 'Login failed', status: '401' });
        }
      } catch (error) {
        console.log('Exception occured' + error.toString());
      }
    }
  }, getUser);
});
module.exports = router;
