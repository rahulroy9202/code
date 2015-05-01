/**
 * Plix Referral Tracking Server
 * rahulroy9202@gmail.com
 */

var express = require('express'),
    app = express(),
    Waterline = require('waterline'),
    bodyParser = require('body-parser'),
	uuid = require('node-uuid');

var redirect_url = 'http://www.google.com';

// Instantiate a new instance of the ORM
var orm = new Waterline();


//////////////////////////////////////////////////////////////////
// WATERLINE CONFIG
//////////////////////////////////////////////////////////////////

// Require any waterline compatible adapters here
var mysqlAdapter = require('sails-mysql');


// Build A Config Object
var config = {

  // Setup Adapters
  // Creates named adapters that have have been required
	adapters: {
		'default': mysqlAdapter,
		mysql: mysqlAdapter
	},
	
	// Build Connections Config
	// Setup connections using the named adapter configs
	connections: {
		myLocalMySql: {
		adapter	  : 'mysql',
		module    : 'sails-mysql',
		host      : process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost',
		port      : process.env.OPENSHIFT_MYSQL_DB_PORT || 3306,
		user      : process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'admin',
		password  : process.env.OPENSHIFT_MYSQL_DB_PASSWORD ||'admin',
		database  : 'plix'
		}
	},
	
	defaults: {
		migrate: 'create'
	}

};

console.log(config.connections.myLocalMySql);

//////////////////////////////////////////////////////////////////
// WATERLINE MODELS
//////////////////////////////////////////////////////////////////

var Referral = Waterline.Collection.extend({
	
	identity: 'referral',
	connection: 'myLocalMySql',
	
	attributes: {
		email: {
		  type: 'string',
		  unique: true
		},
		referral_code: 'string',
		count: 'integer'
	}
	
});

// Load the Models into the ORM
orm.loadCollection(Referral);



//////////////////////////////////////////////////////////////////
// EXPRESS SETUP
//////////////////////////////////////////////////////////////////


// Setup Express Application
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	//console.log(req.url);
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});


// Build Express Routes (CRUD routes for /users)




app.get('/ref/:code', function(req, res) {
	res.redirect(301, redirect_url);
	if(req.params.code) {
		app.models.referral.findOne({ referral_code: req.params.code }, function(err, model) {
			if(err) return console.log("error",{ err: err });
			model.count += 1;
			model.save();
		});
	}
});


app.get('/referral/:email', function(req, res) {
	app.models.referral.findOne({ email: req.params.email }, function(err, model) {
		if(err) return res.status(500).json({ success: false, err: err });
		else {
			if(model===undefined) {	
				var _referral = uuid.v4();
				app.models.referral.create({email:req.params.email, referral_code: _referral, count: 0}, function(err, model) {
					if(err) return res.status(500).json({ success: false, err: err });

					res.json({success: true, referral_code: model.referral_code});
				});
			}
			else
				res.json({success: true, referral_code: model.referral_code});	
		}
	});
});


//////////////////////////////////////////////////////////////////
// START WATERLINE
//////////////////////////////////////////////////////////////////

// Start Waterline passing adapters in
orm.initialize(config, function(err, models) {
	if(err) throw err;
	
	app.models = models.collections;
	app.connections = models.connections;
	
	var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080;
	var ipaddress = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '127.0.0.1';
	
	// Start Server
	app.listen(port, ipaddress);
	console.log("server on ",ipaddress,port);
});
