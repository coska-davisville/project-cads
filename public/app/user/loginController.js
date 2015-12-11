'use strict';

angular.module('cadsApp')
.controller('LoginController', ['$scope', '$state', 'BackendService', function ($scope, $state, bs) {
	$scope.login = function(user) {
		bs.login(user.email, user.password, function(response) {
			$state.go('memberList');
		});
	};
}]);
