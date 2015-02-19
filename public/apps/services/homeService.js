var app = angular.module('motivation');

app.service('homeService', function($http, $q) {

this.login = function(emailer, pass) {
	var dfd = $q.defer();
	$http({
		method: 'POST',
		url: '/api/auth',
		data: {
			email: emailer,
			password: pass
		
		}
	})
	.then(function(response) {
		console.log('ppppppppppp')
		dfd.resolve(response.data);
	})
	.catch(function(err) {
		console.log('error in the log in');
		dfd.reject(err);
	})
	return dfd.promise;
}

})
