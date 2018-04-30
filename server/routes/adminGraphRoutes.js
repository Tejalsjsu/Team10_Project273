var express = require('express');
var router = express.Router();
var pageClickModel = require('../models/PageClicks');
var movieClickModel = require('../models/MovieClicks');
var userTraceModel = require('../models/TraceDiagram');
var d3_gen = require('./D3_Data_Generation');


router.get('/getPageClicks', function(req, res, next) {
  try {
    pageClickModel.findOne({},
          {_id: 0},
          function (err, result) {
              if (err) {
                console.log("getPageClicks error: " + err);
                throw err;
              }
              console.log("Data: " + JSON.stringify(result));
              if (result !== null) {
                  res.status(200).json({message: `page clicks data`, result: result});
              }
              else {
                res.status(401).json({error: `failed to get page clicks data`});
              }
         }
    );
  } catch (error) {
    res.status(400).json({error: error});
  }
});

router.get('/getMovieClicks', function(req, res, next) {
  try {
    movieClickModel.find({},
          {_id: 0, __v: 0},
          function (err, results) {
              if (err) {
                console.log("getPageClicks error: " + err);
                throw err;
              }
              console.log("Data: " + JSON.stringify(results));
              if (results !== null) {
                  res.status(200).json({message: `movie clicks data`, result: results});
              }
              else {
                res.status(401).json({error: `failed to get movie clicks data`});
              }
         }
    );
  } catch (error) {
    res.status(400).json({error: error});
  }
});

router.get('/getUsersTrace', function(req, res, next) {
  try {
    userTraceModel.find({},
          {_id: 0},
          function (err, results) {
              if (err) {
                console.log("usertrace error: " + err);
                throw err;
              }
              console.log("Data: " + JSON.stringify(results));
              if (results !== null) {
                  d3_gen.generate_d3_tree_data(results[0])
                  res.status(200).json({message: `user trace data`, result: results});
              }
              else {
                res.status(401).json({error: `failed to get user trace data`});
              }
         }
    );
  } catch (error) {
    res.status(400).json({error: error});
  }
});


router.post('/updatePageClick', function(req, res, next) {
  console.log("Page Details: " + JSON.stringify(req.body));
  var updateData = {};
  updateData[req.body.page] = 1;
  console.log("update: " + JSON.stringify(updateData));
  try {
      pageClickModel.findOneAndUpdate({},
            {$inc: updateData},
            {new: true},
            function (err, result) {
                if (err) {
                  console.log("updatePageClick error: " + err);
                  throw err;
                }
                if (result !== null) {
                    console.log("updated data: " + JSON.stringify(result));
                    res.status(200).json({message: `${req.body.page} updated successully`, result: result});
                }
                else {
                  res.status(401).json({error: `failed to update click for: ${req.body.page}`});
                }
           }
      );
   } catch (error) {
     res.status(400).json({error: error});
   }
});

router.post('/updateMovieClick', function (req, res) {
  console.log("Movie Details: " + JSON.stringify(req.body));
  try {
    movieClickModel.findOneAndUpdate(
              {movieId: req.body.movieId},
              {$inc: {clicks: 1}},
              {new: true},
              async (err, result) => {
                  if (err) {
                    console.log("updateMovieClick findOne error: " + err);
                    throw err;
                  }
                  console.log("Data: " + JSON.stringify(result));
                  if (result !== null) {
                    console.log("updated entry: " + JSON.stringify(result));
                    res.status(200).json({result: result});
                  }
                  else {
                    const movieClickData = new movieClickModel({
                                                          movieId: req.body.movieId,
                                                          title: req.body.title
                                                        });
                    console.log("Creating new entry: " + JSON.stringify(movieClickData));
                    await movieClickData.save()
                    res.status(201).json({result: movieClickData});
                  }
          }
    );
  } catch (error) {
    res.status(400).json({error: error});
  }
});

router.post('/updateUserTrace', function (req, res) {
  console.log("User trace Details: " + JSON.stringify(req.body));
  try {
    userTraceModel.findOneAndUpdate(
        {userId: req.body.userId},
        {$push: {pagesVisited: req.body.page}},
        {new: true},
        async (err, result) => {
            if (err) {
              console.log("updateUserTrace findOne error: " + err);
              throw err;
            }
            console.log("Data: " + JSON.stringify(result));
            if (result !== null) {
              console.log("updated entry: " + JSON.stringify(result));
              res.status(200).json({result: result});
            }
            else {
              const userTraceData = new userTraceModel({
                                                    userId: req.body.userId,
                                                    pagesVisited: [req.body.page]
                                                  });
              console.log("Creating new entry: " + JSON.stringify(userTraceData));
              await userTraceData.save()
              res.status(201).json({result: userTraceData});
            }
        }
    );
  } catch (error) {
    console.log("Error in db connection: " + error);
    res.status(400).json({error: error});
  }
});

module.exports = router;
