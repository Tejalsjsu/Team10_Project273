var express = require('express');
var router = express.Router();
var mysql = require('./mysql');


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/billSearch', function(req, res, next) {
  console.log(req.query);
  let sqlQuery = undefined;
  if ("date" in req.query) {
    sqlQuery = `SELECT * FROM fandango.billing WHERE date like "${req.query.date.concat("%")}"`;
  } else if("month" in req.query) {
    sqlQuery = `SELECT * FROM fandango.billing WHERE MONTH(date) = ${req.query.month}`;
  } else {
    res.status(401).json({error: "invalid query"});
  }
  mysql.fetchData(function(err, results) {
    if(err) {
      res.status(400).json({error: "Unable to fetch the list of bills"});
    } else {
      res.status(200).json({result: results});
    }
  }, sqlQuery);
});


router.get('/getBill', function(req, res, next) {
  console.log(req.query);
  let sqlQuery = `SELECT * FROM fandango.billing WHERE billingId = ${req.query.billingId}`;
  mysql.fetchData(function(err, results) {
    if(err) {
      res.status(400).json({error: "Unable to fetch the bill details"});
    } else {
      res.status(200).json({result: results[0]});
    }
  }, sqlQuery);
});


router.get('/getRevenueByMovie', function(req, res, next) {
  console.log(req.query);

  let sqlQuery = `Select sum(b.amount) as revenue,b.movieId,m.title from fandango.billing as b, fandango.movie as m
                 where m.movieId = ${req.query.movieId} AND m.movieId = b.movieId`;
  mysql.fetchData(function(err, results) {
    if(err) {
      res.status(400).json({error: "Unable to get revenue by movie"});
    } else {
      res.status(200).json({result: results[0]});
    }
  }, sqlQuery);
});
//
//
// router.get('/getRevenueByHall ', function(req, res, next) {
//   console.log(req.query);
//   let sqlQuery = undefined;
//   if ("date" in req.query) {
//     sqlQuery = `SELECT * FROM fandango.billing WHERE date like "${req.query.date.concat("%")}"`;
//   } else if("month" in req.query) {
//     sqlQuery = `SELECT * FROM fandango.billing WHERE MONTH(date) = ${req.query.month};`;
//   } else {
//     res.status(401).json({error: "invalid query"});
//   }
//   mysql.fetchData(function(err, results) {
//     if(err) {
//       res.status(400).json({error: "Unable to fetch the list of bills"});
//     } else {
//       res.status(200).json({result: results});
//     }
//   }, sqlQuery);
// });

module.exports = router;
