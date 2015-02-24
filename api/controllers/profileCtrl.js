var User = require('./../models/User');
var mongoose = require('mongoose');

module.exports = {
	profile: function(req, res) {
		return res.json(req.user);
	},

	delete: function(req, res) {
		console.log('im in the delete function')
		console.log(req.user._id)
		User.findByIdAndRemove(req.user._id).exec().then(function(user) {
			res.status(200).send('user removed')
			
		}, 
		function(err) {
			res.status(500).send('error in remove user')
		})
	}
};