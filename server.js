// server.js

// BASE SETUP
// =============================================================================
// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// connect to our database
var mongoose   = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://dba:dba@ds133388.mlab.com:33388/raiseyourhand'); // connect to our database
mongoose.connect('mongodb://dba:dba@mean.psu.ac.th:27017/raiseyourhand'); // connect to our database
// create model object
var Hand     = require('./app/models/hand.js');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here// more routes for our API will happen here

// on routes that end in /bears
// ----------------------------------------------------
router.route('/hands')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        console.log(req.body.name + ' ' + req.body.message);

        var hand = new Hand();      // create a new instance of the Bear model
        hand.name = req.body.name; // set the student id (comes from the request)
        hand.message = req.body.message;  // set the message (comes from the request)
        // save the bear and check for errors
        hand.save(function(err) {
            if (err){
                res.send(err);
              }
            res.json({ message: 'Hand up created!' });
        });

    })

    // get all the bears (accessed at GET http://localhost:8080/api/hands)
    .get(function(req, res) {
        Hand.find(function(err, hands) {
            if (err)
                res.send(err);

            res.json(hands);
        });
    });

    // on routes that end in /bears/:bear_id
    // ----------------------------------------------------
    router.route('/hands/:hands_id')

    	// get the bear with that id
    	.get(function(req, res) {
    		Hand.findById(req.params.hands_id, function(err, hand) {
    			if (err)
    				res.send(err);
    			res.json(hand);
    		});
    	})

    	// update the bear with this id
    	.put(function(req, res) {
    		Hand.findById(req.params.hands_id, function(err, hand) {

    			if (err)
    				res.send(err);

    			hand.name = req.body.name;
    			hand.save(function(err) {
    				if (err)
    					res.send(err);

    				res.json({ message: 'Hand up updated!' });
    			});

    		});
    	})

    	// delete the bear with this id
    	.delete(function(req, res) {
    		Hand.remove({
    			_id: req.params.hand_id
    		}, function(err, hand) {
    			if (err)
    				res.send(err);

    			res.json({ message: 'Successfully deleted' });
    		});
    	});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
