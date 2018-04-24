var express = require('express');
var router = express.Router();
var pageClickModel = require('../models/PageClicks');
var movieClickModel = require('../models/MovieClicks');

router.get('/getPageClicks', function(req, res, next) {
  pageClickModel.findOne({},
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
});


router.post('/updatePageClick', function(req, res, next) {
  console.log("Page Details: " + JSON.stringify(req.body));
  var updateData = {};
  updateData[req.body.page] = 1;
  console.log("update: " + JSON.stringify(updateData));
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
});

router.post('/updateMovieClick', function(req, res, next) {
  console.log("Movie Details: " + JSON.stringify(req.body));
  var updateData = {};
  updateData[req.body.page] = 1;
  console.log("update: " + JSON.stringify(updateData));
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
});

module.exports = router;
