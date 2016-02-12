var express 	= require('express'),
	bodyParser 	= require('body-parser'),
	mongoose 	= require('mongoose'),
	shortId 	= require('shortid'),
	routes 		= require('./app/routes/routes.js'),
	URL	        = require('./app/models/url.js'),
	app 		= express();

//require('dotenv').load();

app.use('/public', express.static(process.cwd() + '/public'));
mongoose.connect('mongodb://localhost/searches');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(routes);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js started on port ' + port);
});

