var express = require('express');
var router = express.Router();
var mysql = require('./mysql');

router.get('/latest10Bills', function(req, res, next) {
  let sqlQuery = `Select b.BillingId, b.date, b.amount, b.tax, b.movieId,
                  b.screenId, u.userId, u.firstName, u.lastName
                  from fandango.billing as b inner join fandango.users as u
                  on b.userId = u.userId order by date desc limit 10;`;
  mysql.fetchData(function(err, results) {
    if(err) {
      res.status(400).json({error: "Unable to fetch the list of bills"});
    } else {
      res.status(200).json({result: results});
    }
  }, sqlQuery);
});

router.get('/billSearch', function(req, res, next) {
  console.log(req.query);
  let sqlQuery = undefined;
  if ("date" in req.query) {
    sqlQuery = `Select b.BillingId, b.date, b.amount, b.tax, b.movieId, b.screenId, u.userId,
                u.firstName, u.lastName from fandango.billing as b inner join fandango.users as u
                on b.userId = u.userId where b.date like "${req.query.date.concat("%")}"`;
    // sqlQuery = `SELECT * FROM fandango.billing WHERE date like "${req.query.date.concat("%")}"`;
  } else if("month" in req.query) {
    sqlQuery = `Select b.BillingId, b.date, b.amount, b.tax, b.movieId, b.screenId, u.userId,
                u.firstName, u.lastName from fandango.billing as b inner join fandango.users as u
                on b.userId = u.userId WHERE MONTH(date) = ${req.query.month}`;
    // sqlQuery = `SELECT * FROM fandango.billing WHERE MONTH(date) = ${req.query.month}`;
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
  // let sqlQuery = `SELECT * FROM fandango.billing WHERE billingId = ${req.query.billingId}`;
  let sqlQuery = `Select b.BillingId, u.firstName, u.lastName, m.title, mh.hallName,
                  mh.city, mh.zipcode, b.amount as totalAmount, b.date from
                  billing as b inner join users as u on b.userId = u.userId
                  inner join moviescreen ms on b.screenId = ms.screenId
                  inner join movie_hall mh on mh.hallId = ms.hallId
                  inner join movie m on m.movieId = b.movieId where b.BillingId=${req.query.billingId}`;
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
  let sqlQuery = `Select m.title, sum(b.amount) as totalRevenue
                  from billing as b inner join movie as m on m.movieId = b.movieId
                  where b.movieId=${req.query.movieId} group by m.title;`;
  mysql.fetchData(function(err, results) {
    if(err) {
      res.status(400).json({error: "Unable to get revenue by movie"});
    } else {
      res.status(200).json({result: results[0]});
    }
  }, sqlQuery);
});


router.get('/getRevenueByHall', function(req, res, next) {
  console.log(req.query);
  let sqlQuery = `Select mh.hallName, sum(b.amount) as totalRevenue
                  from billing as b inner join moviescreen as ms on b.screenId = ms.screenId
                  inner join movie_hall as mh on mh.hallId = ms.hallId
                  where mh.hallId=${req.query.hallId} group by mh.hallName`;
  mysql.fetchData(function(err, results) {
    if(err) {
      res.status(400).json({error: "Unable to get revenue by movie"});
    } else {
      res.status(200).json({result: results[0]});
    }
  }, sqlQuery);
});

module.exports = router;
