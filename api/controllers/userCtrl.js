var User = require('./../models/User');
var mongoose = require('mongoose');


module.exports = {
	create: function(req, res) {
		var newUser = new User(req.body);
		newUser.save(function(err, user) {
			if(err) {
				return res.status(500).end();
			}
			return res.json(user);
		})
	},

	get: function(req, res) {
		User.find({}).exec().then(function(users) {
			console.log(users)
			res.status(200).json(users)
		});
		
	}

}


// module.exports = function(req, res) {
// 	User.find({}, function(err, docs) {
// 		if(!err) {
// 			if(docs.length === 0){
// 				res.status(404).json(docs)
// 			} else {
// 				res.status(200).json(docs);
// 			}
			
// 		}
// 		else {res.status(500).json(err)}
// 	})
// };

// module.exports = {
// 	post: function(req, res) {
// 	User.create(req.body, function(err, results) {
// 		if(!err) {
// 			res.status(200).json(results)
// 		}
// 	})
// },
// get: function(req, res) {
// 	User.find({}, function(err, docs) {
// 		if(!err) {
// 			if(docs.length === 0){
// 				res.status(404).json(docs)
// 			} else {
// 				res.status(200).json(docs);
// 			}
			
// 		}
// 		else {res.status(500).json(err)}
// 	})
// }
// }