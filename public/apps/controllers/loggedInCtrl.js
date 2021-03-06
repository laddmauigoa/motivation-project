var app = angular.module('motivation');

app.controller('loggedInCtrl', function($scope, $location, loggedInService, app) {
 $scope.profile = app;
 $scope.logout = function() {
 	loggedInService.logMeOut().then(function() {
 		$location.path('/')
 	})
 	.catch(function(err) {
 		console.log('error in the logged in ctrl', err)
 	})
 }

 $scope.unsubscribe = function() {
 	console.log();
 	loggedInService.unsubscribeMe().then(function () {
 		$location.path('/')
 	})
 	.catch(function(err) {
 		console.log('error in the logged in ctrl', err)
 	})
 }

});