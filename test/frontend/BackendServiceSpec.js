// tests for BackendService

describe('BackendService', function() {

    beforeEach(module('cadsApp'));

    var BackendService;

    beforeEach(inject(function(_BackendService_) {
        BackendService = _BackendService_;
    }));

    describe('BackendService', function() {
        
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
    });
});
