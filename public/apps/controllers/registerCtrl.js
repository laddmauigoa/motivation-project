var app = angular.module('motivation');

app.controller('registerCtrl', function($scope, $location, registerService) {
		$scope.registerMe = function() {
		registerService.registerNewUser($scope.email, $scope.password, $scope.phone).then(function() {
			$location.path('/loggedIn')
		}).catch(function(err) {
			console.log(err)
		});
	};
});