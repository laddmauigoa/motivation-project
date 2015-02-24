var Quotes = require('./../models/Quotes');
var mongoose = require('mongoose');

module.exports = {
	create: function(req, res) {
		var newQuotes = new Quotes(req.body);
		newQuotes.save(function(err, quotes) {
			if(err) {
				return res.status(500).end();
			}
			return res.json(quotes);
		})
	},

	get: function(req, res) {
		Quotes.find({}).exec().then(function(quotes) {
			console.log(quotes)
			res.status(200).json(quotes)
		});
		
	}

}