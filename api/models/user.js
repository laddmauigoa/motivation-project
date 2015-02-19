var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var q = require('q');


var schema = mongoose.Schema ({
	email: {type: String, unique: true},
	password: String,
	phone: String
});

schema.pre('save', function(next) {
	var user = this;
	var progress = function() {
		console.log('progress')
	}
	if(!user.isModified('password')) {
		return next();
	}
	bcrypt.genSalt(12, function(err, salt) {
		if(err) {
			return next(err);
		}
		bcrypt.hash(user.password, salt, progress, function(err, hash) {
			user.password = hash;
			return next();
		});
	});
});


schema.methods.comparePassword = function(pass) {
	console.log(pass)
	var dfd = q.defer();
	
	bcrypt.compare(pass, this.password, function(err, result) {
		if(err) {
			dfd.reject(err)
			console.log('panniccc', err);
		}
		else {
			dfd.resolve(result)
		}
	});
	return dfd.promise
};


// schema.pre('save', function(next) {
// 	var user = this;
// 	if(!user.isModified('password')) {
// 		return next();
// 	}
// 	bcrypt.genSalt(12, function(err, salt) {
// 		if(err) {
// 			return next(err);
// 		}
// 		bcrypt.hash(user.password, salt, function(err, hash) {
// 			user.password = hash;
// 			return next();
// 		});
// 	});
// });


// schema.methods.comparePassword = function(pass) {
// 	var dfd = q.defer();
// 	bcrypt.compare(pass, this.password, function(err, isMatch) {
// 		if(err) {
// 			dfd.reject(err)
// 			console.log('panniccc', err);
// 		}
// 		else {
// 			dfd.resolve(isMatch)
// 		}
// 	});
// 	return dfd.promise
// };

module.exports = mongoose.model('User', schema);