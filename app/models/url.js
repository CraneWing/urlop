// url model module
var mongoose = require('mongoose');

// schema for campgrounds. adds reference to associated
// comments for particular campground
var urlSchema = new mongoose.Schema({
    orig_url: String,
    short_url: String
});

// create campground model
module.exports = mongoose.model('Url', urlSchema);