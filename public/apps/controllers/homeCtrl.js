var app = angular.module('motivation');

app.controller('homeCtrl', function($scope, $location, homeService) {
	$scope.logMeIn = function() {
		homeService.login($scope.email, $scope.password).then(function() {
			$location.path('/loggedIn');
		}).catch(function(err) {
			console.log(err)
		});
	};
})