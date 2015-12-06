// tests for LoginController

describe('LoginController', function() {

    beforeEach(module('cadsApp'));

    var $controller;

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    describe('$scope.title', function() {
        it('title should be "Login Controller"', function() {
            var $scope = {};
            var controller = $controller('LoginController', {$scope:$scope});
            expect($scope.title).toEqual("Login Controller");
        });
    });
});
