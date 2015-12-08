// tests for BackendService

describe('BackendService', function() {

    var BackendService, httpBackend;

    beforeEach(module('cadsApp'));

    beforeEach(module(function ($urlRouterProvider) {
        $urlRouterProvider.deferIntercept();
    }));

    beforeEach(function() {
        inject(function($httpBackend, _BackendService_) {
            BackendService = _BackendService_;
            httpBackend = $httpBackend;
        });
    });

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

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

    it('login should set user credential', function() {

        var response;

        httpBackend.whenPOST('/users/login').respond({email: 'abc@abc.com', token: 'xxx'});

        BackendService.login(
            "abc@abc.com", "abcd",
            function (r) { response = r; }, // successCallback
            function (r) { response = r; }  // errorCallback
        );

        httpBackend.flush();

        expect(response.status).toEqual(200);
        expect(BackendService.getUserCredential().email).toEqual("abc@abc.com");
        expect(BackendService.getUserCredential().token).toEqual("xxx");
    });

    it('callApi should succeed after login', function() {

        var response;

        httpBackend.whenPOST('/users/login')
            .respond({email: 'abc@abc.com', token: 'xxx'});

        BackendService.login(
            "abc@abc.com", "abcd",
            function (r) { response = r; }, // successCallback
            function (r) { response = r; }  // errorCallback
        );

        httpBackend.flush();

        httpBackend.whenGET('/users')
            .respond([
                {"program":"Snow Valley","province":"ON","membership":"volunteer","email":"a@a.com","firstName":"John","lastName":"Smith"},
                {"program":"Horseshoe","province":"ON","membership":"participant skier","email":"b@b.com","firstName":"Jane","lastName":"Doe"},
                {"program":"Horseshoe","province":"ON","membership":"participant skier","email":"bb@bb.com","firstName":"Mariah","lastName":"Carey"},
                {"program":"Mansfield","province":"ON","membership":"participant skier","email":"c@c.com","firstName":"Carrie","lastName":"Underwood"}
            ]);

        BackendService.callApi(
            {method: "GET", url: "/users"},
            function (r) { response = r; },
            function (r) { response = r; }
        );

        httpBackend.flush();

        expect(response.data);
        expect(response.data.length).toEqual(4);
        expect(response.data[0].program).toEqual("Snow Valley");
    });
});
