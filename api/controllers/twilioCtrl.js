var User = require('./../models/User');
var mongoose = require('mongoose');
var twilio = require('twilio')('AC6fed270eef9d913b951650f5c980dd91', '560b028404f0bc8fd1e9d0604c71b17b');

module.exports = {

	get: function() {
		User.find({}).exec().then(function(users) {
			users.forEach(function(item) {
				console.log(item.phone)
				twilio.sendMessage({

   				 	to: item.phone, 
    				from: '+13852194588', 
    				body: 'the quotes go here' 

				}, function(err, responseData) { 
    					if (!err) { 
    					console.log(responseData.to)
       			 		console.log(responseData.from); 
        				console.log(responseData.body); 
    					}
				})
			})
			
		});
		
	}
}