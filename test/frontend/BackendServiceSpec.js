// tests for BackendService

describe('BackendService', function() {

    var BackendService;

    beforeEach(module('cadsApp'));

    beforeEach(inject(function(_BackendService_) {
        BackendService = _BackendService_;
    }));

    it('credential should be empty before login', function() {
        expect(BackendService.getUserCredential().email).toEqual("");
        expect(BackendService.getUserCredential().token).toEqual("");
    });
    
    it('isUserLoggedIn should be false before login', function() {
        expect(BackendService.isUserLoggedIn()).toEqual(false);
    });

    it('callApi should return 401 unauthorized before login', function() {
        
        var response;

        BackendService.callApi(
            { method: "GET", url: "/users" },
            function (r) { response = r; }, // successCallback
            function (r) { response = r; }  // errorCallback
        );

        expect(response.status).toEqual(401);
        expect(response.statusText).toEqual("Unauthorized");
    });

    describe('Mocked Http Requests', function() {
        
        var $httpBackend;

        beforeEach(inject(function($injector) {
            
            $httpBackend = $injector.get('$httpBackend');
            $httpBackend
                .when('POST', '/users/login')
                .respond(200, {email: 'abc@abc.com', token: 'xxx'});
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('login should be succeeded', function() {
            
            var response;

            BackendService.login(
                "abc@abc.com", "abcd",
                function (r) { response = r; }, // successCallback
                function (r) { response = r; }  // errorCallback
            );

            $httpBackend.expect('POST', '/user/login');

            //expect(response.status).toEqual(200);
            expect(BackendService.getUserCredential().email).toEqual("abc@abc.com");
            expect(BackendService.getUserCredential().token).toEqual("xxx");

            $httpBackend.flush();
        });
    });
});
