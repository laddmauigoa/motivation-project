var app = angular.module('motivation', ['ngRoute'])

app.config(function($routeProvider) {
	$routeProvider

	.when('/', {
		templateUrl: '/templates/homeTmpl.html',
		controller: 'homeCtrl'
	})
	.when('/about', {
		templateUrl: '/templates/aboutTmpl.html'
	})
	.when('/contact', {
		templateUrl: '/templates/contactTmpl.html',
		controller: 'contactCtrl'
	})
	.when('/register', {
		templateUrl:'/templates/registerTmpl.html',
		controller: 'registerCtrl'
	})
	.when('/loggedIn', {
		templateUrl: '/templates/loggedInTmpl.html',
		controller: 'loggedInCtrl',
		resolve: {
			app: function(registerService) {
				return registerService.getProfile()

			}
		}
	})

	.otherwise({
		redirectTo: '/'
	})
})

