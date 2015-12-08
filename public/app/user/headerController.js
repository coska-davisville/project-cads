'use strict';

angular.module('cadsApp')
.controller('HeaderController', ['$scope', '$state', 'BackendService', function ($scope, $state, bs) {
	$scope.logout = function() {
		bs.logout().then(function(response) {
			$state.go('login');
		});
	};
}]);
