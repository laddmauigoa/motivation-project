var mongoose = require('mongoose');

var schema = mongoose.Schema ({
		quote: String,
		author: String
});

module.exports = mongoose.model('Quotes', schema);
