var User = require('./../models/User');
var Quote = require('./../models/Quotes')
var mongoose = require('mongoose');
var twilio = require('twilio')('AC6fed270eef9d913b951650f5c980dd91', '560b028404f0bc8fd1e9d0604c71b17b');

module.exports = {


	get: function() {
		User.find({}).exec().then(function(users) {
			users.forEach(function(item) {
			Quote.find({}).exec().then(function(quotes) {
				var randomQuote = quotes[Math.floor(Math.random() * quotes.length) + 1];

				 twilio.sendMessage({
   				 	to: item.phone, 
    				from: '+13852194588', 
    				body: randomQuote.quote + randomQuote.author
				}, function(err, responseData) { 
    					if (!err) { 
    					console.log('message sent to ' + responseData.to)

    					}
				})
			})

			})
			
		})
		
	}
}

// authy api key = cYLmmsW12MmKolQSSAioBLR66N51s1zWwdh7rUPVqJM
