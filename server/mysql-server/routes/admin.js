var express = require('express');
var router = express.Router();
var mysql = require('./mysql');

module.exports = app => {
  router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

  router.post('/addMovieHall', function(req, res) {
    console.log('Inside add Movie Hall!!!!!');
    console.log('hallName', req.param('hallName'));
    console.log('t1', req.param('t1'));
    console.log('t2', req.param('t2'));
    console.log('t3', req.param('t3'));
    console.log('nTickets', req.param('nTickets'));
    console.log('nScreens', req.param('nScreens'));
    console.log('tPrice', req.param('tPrice'));
    var t1,
      t2,
      t3 = '';
    var movie_times = '';
    if (req.param('t1') + '' != 'undefined') {
      t1 = req.param('t1');
      movie_times = t1;
    }
    if (req.param('t2') + '' != 'undefined') {
      t2 = req.param('t2');
      if (movie_times != '') movie_times = movie_times + '|' + t2;
      else movie_times = t2;
    }
    if (req.param('t3') + '' != 'undefined') {
      t3 = req.param('t3');
      if (movie_times != '') movie_times = movie_times + '|' + t3;
      else movie_times = t3;
    }

    console.log('movie times', movie_times);
    var getMaxId =
      'select max(hall_id) as maxCnt from fandango_schema.movie_hall';
    var errors;
    console.log('max Query is:' + getMaxId);
    mysql.fetchData(function(error, results) {
      console.log('Inside fetch data');
      if (error) {
        errors = 'Unable to process request';
        res.status(400).json(errors);
      } else {
        if (results.length > 0) {
          hall_id = results[0].maxCnt + 1;
          var addMvHall =
            'INSERT INTO fandango_schema.movie_hall(hall_id,hall_name,movie_times,number_of_tickets,screen_number,ticket_price) VALUES ( ' +
            hall_id +
            ',' +
            "'" +
            req.param('hallName') +
            "'" +
            ',' +
            "'" +
            movie_times +
            "'" +
            ',' +
            req.param('nTickets') +
            ',' +
            req.param('nScreens') +
            ',' +
            req.param('tPrice') +
            ')';
          console.log('insert Query is:  ' + addMvHall);
          mysql.fetchData(function(error, results) {
            if (error) {
              errors = 'Unable to add project at this time.';
              res.status(400).json({ error });
            } else {
              if (results.affectedRows > 0) {
                console.log('inserted' + JSON.stringify(results));
                //res.status(200).json({status:"OK"});
                res.send('Movie Hall added Successfully');
              }
            }
          }, addMvHall);
        }
      }
    }, getMaxId);
    //res.send("Movie Hall added Successfully");
  });

  router.post('/searchMovieHall', function(req, res) {
    console.log('Inside search Movie Hall');
    console.log('request :: ', req.param('searchStr'));
    var searchMvHall =
      'select * from fandango_schema.movie_hall where hall_name = ' +
      "'" +
      req.param('searchStr') +
      "'";
    console.log('search Query is:  ' + searchMvHall);
    mysql.fetchData(function(error, results) {
      if (error) {
        errors = 'Unable to search movie hall at this time.';
        res.status(400).json({ error });
      } else {
        if (results.length > 0) {
          var hallData = {
            hall_id: results[0].hall_id,
            hallName: results[0].hall_name,
            movie_times: results[0].movie_times,
            nTickets: results[0].number_of_tickets,
            nScreens: results[0].screen_number,
            tPrice: results[0].ticket_price
          };
          console.log('movie id after if', results[0].hall_id);
          console.log('movie hallName after if', results[0].hall_name);
          console.log('movie movie_times after if', results[0].movie_times);
          //res.status(200).json({status:"OK"});
          res.send(hallData);
        }
      }
    }, searchMvHall);
  });

  router.post('/updateMovieHall', function(req, res) {
    console.log('Inside update Movie Hall');
    console.log('hallName', req.param('hallName'));
    console.log('t1', req.param('t1'));
    console.log('t2', req.param('t2'));
    console.log('t3', req.param('t3'));
    console.log('nTickets', req.param('nTickets'));
    console.log('nScreens', req.param('nScreens'));
    console.log('tPrice', req.param('tPrice'));
    var t1,
      t2,
      t3 = '';
    var movie_times = '';
    if (req.param('t1') + '' != 'undefined') {
      t1 = req.param('t1');
      movie_times = t1;
    }
    if (req.param('t2') + '' != 'undefined') {
      t2 = req.param('t2');
      if (movie_times != '') movie_times = movie_times + '|' + t2;
      else movie_times = t2;
    }
    if (req.param('t3') + '' != 'undefined') {
      t3 = req.param('t3');
      if (movie_times != '') movie_times = movie_times + '|' + t3;
      else movie_times = t3;
    }
    console.log('movie times', movie_times);
    console.log('movie times before update', req.param('movieTimesBfr'));
    var data = {};
    var updateMvHall =
      'UPDATE fandango_schema.movie_hall SET hall_name = ' +
      "'" +
      req.param('hallName') +
      "'" +
      ', movie_times = ' +
      "'" +
      movie_times +
      "'" +
      ',number_of_tickets = ' +
      req.param('nTickets') +
      ',screen_number = ' +
      req.param('nScreens') +
      ',ticket_price = ' +
      req.param('tPrice') +
      ' WHERE hall_id = ' +
      req.param('hall_id');
    console.log('update Query is:  ' + updateMvHall);
    mysql.fetchData(function(error, results) {
      if (error) {
        errors = 'Unable to add project at this time.';
        res.status(400).json({ error });
      } else {
        if (results.affectedRows > 0) {
          console.log('updated' + JSON.stringify(results));

          var getUpdatedHall =
            'select * from fandango_schema.movie_hall where hall_name = ' +
            "'" +
            req.param('hallName') +
            "'";
          console.log('search Query is:  ' + getUpdatedHall);
          mysql.fetchData(function(error, results) {
            if (error) {
              errors = 'Unable to search movie hall at this time.';
              res.status(400).json({ error });
            } else {
              if (results.length > 0) {
                var hallData = {
                  hall_id: results[0].hall_id,
                  hallName: results[0].hall_name,
                  movie_times: results[0].movie_times,
                  nTickets: results[0].number_of_tickets,
                  nScreens: results[0].screen_number,
                  tPrice: results[0].ticket_price
                };

                var data = {
                  message: 'Movie Hall updated Successfully',
                  hallData: hallData
                };
                //res.status(200).json({status:"OK"});
                res.send(data);
              }
            }
          }, getUpdatedHall);
        }
      }
    }, updateMvHall);
  });
};
