var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var localStrategy = require('passport-local').Strategy;
var cronJob = require('cron').CronJob;


var User = require('./api/models/User');
var ProfileController = require('./api/controllers/profileCtrl');
var UserController = require('./api/controllers/userCtrl');
var TwilioController = require('./api/controllers/twilioCtrl')
var QuoteController = require('./api/controllers/quoteCtrl')
var port = 8888;


var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'))

//twilio text 
var textQuote = new cronJob('18 18 * * *', function() {
	TwilioController.get()

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
app.delete("/api/profile", isAuthed, ProfileController.delete);
app.get("/api/user", UserController.get);


app.post('/api/quotes', QuoteController.create);
app.get('/api/quotes', QuoteController.get)



mongoose.connect('mongodb://localhost/motivation')


app.listen(port, function() {
	console.log('listening to ' + port)
});