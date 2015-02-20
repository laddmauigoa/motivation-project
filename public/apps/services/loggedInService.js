var app = angular.module('motivation');

app.service('loggedInService', function($http, $q) {

	this.logMeOut = function() {
		var deferred = $q.defer();
		console.log('logout almost resovlved')
		$http({
			method: 'GET',
			url: '/api/logout'
		}).then(function(response) {
			console.log('logout promise resolved')
			deferred.resolve(response.data);
		});
		return deferred.promise;
	}
})