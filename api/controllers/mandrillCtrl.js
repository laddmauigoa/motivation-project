var mandrill = require('mandrill-api/mandrill');
var mandrillM = new mandrill.Mandrill('Z2F_tcYGpD85NXdoUQCZUg');


module.exports = {

post: function(req, res) {
	mandrillM.messages.send({"message": {
    text: req.body.body,
    from_email: req.body.email,
    from_name: req.body.name,
    	to: [{

            	email: 'inbound.motivation@gmail.com'
         
        	}]
    }
		}, function(result) {
    		console.log("in mandrill")
    		res.status(200).send('message sent successfully');
			
		}, function(e) {
    		// Mandrill returns the error as an object with name and message keys
    		console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    		// A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
		});
	}
	
}
