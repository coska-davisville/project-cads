// tests for LoginController

describe('LoginController', function() {
    beforeEach(module('cadsApp'));

    //https://github.com/christopherthielen/ui-router-extras/issues/127
    beforeEach(module(function ($urlRouterProvider) {
        $urlRouterProvider.deferIntercept();
    }));

    var LoginController, $state, $scope, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, _$state_, _$controller_, _$rootScope_) {
        $httpBackend = _$httpBackend_;
        $state = _$state_;
        $scope = _$rootScope_.$new();
        LoginController = _$controller_('LoginController', {
            $scope: $scope
        });
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    describe('login', function() {
        it('should go to list page', function() {
            //test stub - http://www.drurly.com/blog/2013/05/18/angularjs-unexpected-request-no-more-request-expected
            //$httpBackend.whenGET('/assets/app/user/memberList.html').respond([]);

            spyOn($state, 'go');
            $httpBackend.whenPOST('/users/login').respond(200, {email: 'abc@abc.com', token: 'xxx'});

            $scope.login(
                "abc@abc.com", "abcd",
                function (r) { response = r; }, // successCallback
                function (r) { response = r; }  // errorCallback
            );

            $httpBackend.flush();

            expect($state.go).toHaveBeenCalledWith('memberList');
        });
    });
});
