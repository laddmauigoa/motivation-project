var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var localStrategy = require('passport-local').Strategy;
var cronJob = require('cron').CronJob;

var twilio = require('twilio')('AC6fed270eef9d913b951650f5c980dd91', '560b028404f0bc8fd1e9d0604c71b17b');
var User = require('./api/models/User');
var ProfileController = require('./api/controllers/profileCtrl');
var UserController = require('./api/controllers/userCtrl');
var port = 8888;


var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'))

//twilio text every minute lol
var textQuote = new cronJob('57 10 * * *', function() {
	UserController.get()

	twilio.sendMessage({

    to:'+18017352199', 
    from: '+13852194588', 
    body: 'the quotes go here' 

}, function(err, responseData) { 
    if (!err) { 
        console.log(responseData.from); 
        console.log(responseData.body); 
    }
})

}, null, true);

app.use(session({
	secret: 'laddy12345'
}));


app.use(passport.initialize());
app.use(passport.session());


passport.use(new localStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, function(username, password, done) {
	User.findOne({email: username}).exec().then (function(user) {
		console.log(user)
		if(!user) {
			return done(null, false);
		} 
		user.comparePassword(password).then(function(isMatch) {
			if(!isMatch) {
				return done(null, false);
			}
			return done (null, user);
		});
	});
}));


passport.serializeUser(function(user, done) {
	//input user model (mongoose)
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	//user object (json)
	done(null, obj);
});


app.post('/api/auth', passport.authenticate('local'), function(req, res) {
	// if auth was successful, this will happen
	return res.status(200).redirect("/#/loggedIn");
});

app.post('/api/register', function(req, res) {
	//create user
	var newUser = new User(req.body);
	newUser.save(function(err, user) {
		if(err) {
			return res.status(500).end();
		}
		passport.authenticate('local')(req, res, function() {
			res.redirect('/#/loggedIn')
		})
	})
});


var isAuthed = function(req, res, next) {
	if(!req.isAuthenticated()) {
		return res.status(401).end();
	}
	return next();
}

app.get('/api/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


app.get("/api/profile", isAuthed, ProfileController.profile);
//app.get("/api/user", UserController.get);



mongoose.connect('mongodb://localhost/motivation')


app.listen(port, function() {
	console.log('listening to ' + port)
});