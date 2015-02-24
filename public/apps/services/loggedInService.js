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

	this.unsubscribeMe = function() {
		var deferred = $q.defer();
		console.log('unsubscribeMe almost resovlved')
		$http({
			method: 'DELETE',
			url: '/api/profile'
		}).then(function(response) {
			console.log('unsubscribeMe promise resolved')
			deferred.resolve(response);
		});
		return deferred.promise;
	}
})