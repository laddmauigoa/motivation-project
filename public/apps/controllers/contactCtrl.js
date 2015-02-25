var app = angular.module('motivation');

app.controller('contactCtrl', function($scope, $location, contactService) {
	$scope.contactSubmit = function() {
		
		contactService.contactUs($scope.contactName, $scope.contactEmail, $scope.contactMessage).then(function() {
			console.log('im in the contact controller');
			$location.path('/')

		}, function(err) {
			console.log(err)
		})
		.catch(function(err) {
		 	console.log(err)
		 });
	}
})