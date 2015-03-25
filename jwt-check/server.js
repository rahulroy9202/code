var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var utils = require('./utils');
var config = require('./config');
//var jwt = require('express-jwt');

var app = express();
var auth = utils.authenticate;

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));

app.use(bodyParser.json());       	// to support JSON-encoded bodies
app.use(bodyParser.urlencoded({		// to support URL-encoded bodies
	extended: true
}));


app.use(function(req, res, next) {
	//console.log(req.headers);
	console.log(req.body);
	//console.log(req.headers.referrer);
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

//app.use(jwt({ secret: 'shhhhhhared-secret'}).unless({path: ['/login/','/signup/']}));

utils.initDB(config.dburl, utils.initDB);
app.listen(config.port, config.ipaddress);

app.post('/login/', function(req, res) {
	auth(req, res, function (_user, _jwtToken) {
		console.log(_user);
		console.log(_jwtToken);
		return res.json({status:'ok', user: _user, jwtToken: _jwtToken});
	});
});

app.post('/verify/', function(req, res) {
	utils.verify(req, res, function (isValid) {
		console.log(isValid);
		if(isValid)
			return res.json({status:'ok'});
		return res.json({status:'not ok'});
		
	});
});

app.post('/signup/', function(req, res) {
	utils.signup(req, res, function (_user) {
		console.log(_user);
		return res.json({status:'ok', user: _user});
	});
});
