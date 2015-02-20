var app = angular.module('motivation');

app.controller('registerCtrl', function($scope, $location, $timeout, registerService) {
		$scope.registerMe = function() {
		registerService.registerNewUser($scope.email, $scope.password, $scope.phone).then(function() {
			console.log('im in the register control')
			
				$location.path('/loggedIn')
		}).catch(function(err) {
			console.log(err)
		});
	};
});