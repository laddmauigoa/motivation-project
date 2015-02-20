var app = angular.module('motivation');

app.service('registerService', function($http, $q) {

	this.registerNewUser = function(emailer, pass, fone) {
		var dfd = $q.defer();
		$http({
			method: 'Post',
			url: '/api/register',
			data: {
				email: emailer,
				password: pass,
				phone: fone
			}
		})
		.then(function(response) {
			console.log('register service herererere')
			dfd.resolve(response.data);
		})
		.catch(function(err) {
			console.log('error in the registration service');
			dfd.reject(err);
		})
		return dfd.promise;
	}

	this.getProfile = function() {
		var deferred = $q.defer();
		console.log('almost resolved')
		$http({
			method: 'GET',
			url: '/api/profile'
		}).then(function(response) {
			console.log('profile promise resolved')
			deferred.resolve(response.data);
		});
		return deferred.promise;
	};
	
})