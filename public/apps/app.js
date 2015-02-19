var app = angular.module('motivation', ['ngRoute'])

app.config(function($routeProvider) {
	$routeProvider

	.when('/', {
		templateUrl: '/templates/homeTmpl.html',
		controller: 'homeCtrl'
	})
	.when('/register', {
		templateUrl:'/templates/registerTmpl.html',
		controller: 'registerCtrl'
	})
	.when('/loggedIn', {
		templateUrl: '/templates/loggedInTmpl.html',
		controller: 'loggedInCtrl'
	})

	.otherwise({
		redirectTo: '/'
	})
})

