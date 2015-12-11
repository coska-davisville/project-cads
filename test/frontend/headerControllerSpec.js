// tests for HeaderController

describe('HeaderController', function() {
    beforeEach(module('cadsApp'));

    var $rootScope, $controller, $state, $q, $scope, backendService;

    beforeEach(inject(function(_$rootScope_, _$state_, _$controller_, _$q_, _BackendService_) {
        $scope = _$rootScope_.$new();
        $state = _$state_;
        $controller = _$controller_('HeaderController', {$scope: $scope});
        $q = _$q_;
        backendService = _BackendService_;
    }));

    describe('logout', function() {
        it('should go to login page after logout', function() {
            var deferred = $q.defer();
            spyOn(backendService, 'logout').and.returnValue(deferred.promise);
            spyOn($state, 'go');

            $scope.logout();
            deferred.resolve();
            $scope.$digest();

            expect($state.go).toHaveBeenCalledWith('login');
        });
    })
});
