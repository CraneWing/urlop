var express  	= require('express'),
	shortId     = require('shortid'),
	URL	        = require('../models/url.js'),
	router 	    = express.Router();

router.get('/', function(req, res) {
  res.render('index');
});

router.post('/', function(req, res) {
  var orig_url, short_url;
  // valid URL regex tester
  var urlReg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  // get user URL from form
  orig_url = req.body.url.trim();
  
  if (urlReg.test(orig_url)) {
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
  }
  else {
    res.send('Sorry, invalid URL. Try again');
  }
 
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