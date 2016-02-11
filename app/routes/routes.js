var express  	= require('express'),
	shortId     = require('shortid'),
	URL	        = require('../models/url.js'),
	router 	    = express.Router();

router.get('/', function(req, res) {
  res.render('index');
});

router.post('/', function(req, res) {
  var orig_url, short_url;
  // get user URL from form
  orig_url = req.body.url.trim();
  // shortid generates a new short ID
  short_url = shortId.generate();
  // create URL object to save to DB
  var newURL = {
    orig_url: orig_url,
    short_url: short_url
  };
  
  // save original and short URLs to MongoDB
  URL.create(newURL, function(err, newlyCreated) {
    if (err) {
      console.log('There was an error: ' + err);
    }
    else {
      console.log('URL saved');
      console.log(newlyCreated);
      res.json({ original_url : orig_url, short_url : short_url });
    }
  });
});

// will get a string from the URL and see if it is in DB
router.get('/:str', function(req, res) {
  var short = req.params.str;
  var query = {};
  
  query['short_url'] = short;
  
  URL.findOne(query, function(err, foundURL) {
    if (err) {
      console.log('There was an error ' + err);
    }
    else {
      console.log('record found!');
      //var orig_url = foundURL['orig_url'];
      res.redirect(foundURL['orig_url']);
    }
  });
});

module.exports = router;