var app = angular.module('motivation');

app.service('contactService', function($http, $q) {

	this.contactUs = function(contactName, emailer, message) {
		var dfd = $q.defer();
		 $http({
			method: 'POST',
			url: '/api/contact',
			data: {
				name: contactName,
				email: emailer,
				body: message
			}
		})
		 .then(function(response) {
		 	console.log('contact service herererere')
		 	dfd.resolve(response);
		 })
		
		 return dfd.promise;
	}
	
})