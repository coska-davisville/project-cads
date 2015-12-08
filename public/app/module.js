'use strict';

var cadsApp = angular.module('cadsApp', ['ui.router']);

cadsApp.run(function($rootScope, $state, BackendService) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
        if (toState.data && toState.data.requireLogin && !BackendService.isUserLoggedIn()) {
            $rootScope.toState = toState;
            $rootScope.toParams = toParams;

            event.preventDefault();
            $state.go('/login');
        }
    });
});


cadsApp.factory('BackendService', function($http, $rootScope, $q) {

    var credential = { email: "", token: "" };

    return {
        getUserCredential: function() {
            return credential;
        },
        isUserLoggedIn: function() {
            return !(credential.email.length === 0);
        },
        login: function(email, pw, successCallback, errorCallback) {
            $http({ method: "POST", url: "/users/login", data: {email: email, password: pw} })
            .then(
                function(response) { // succeeded
                    credential = response.data;
                    $rootScope.isLoggedIn = true;
                    $rootScope.user = response.data;
                    $http.defaults.headers.common.Authorization = credential.token;
                    successCallback(response);
                },
                function(response) { // failed
                    $http.defaults.headers.common.Authorization = "";
                    errorCallback(response);
                });
        },
        logout: function() {
            return $q(function(resolve, reject) {
                $http.defaults.headers.common.Authorization = "";
                $rootScope.isLoggedIn = false;
                $rootScope.user = {};
                resolve({
                    'msg': 'logout'
                }); //succeed
            });
        },
        callApi: function(configObj, successCallback, errorCallback) {
            

            if (credential.email.length === 0) {
                errorCallback({status:401, statusText: "Unauthorized"});
                return;
            }

            $http(configObj)
            .then(
                function(response) {
                    successCallback(response);
                },
                function(response) {
                    if (401 === response.status) { // unauthorized
                        credential = {email: "", token: ""}; // clear credential
                        $http.defaults.headers.common.Authorization = "";
                    }
                    errorCallback(response);
                });
        }
    };

});

cadsApp.controller('TestController', ['$scope','BackendService', function ($scope, bs) {

    $scope.message = "";

    $scope.login = function(email, password) {
        bs.login(email, password,
            function(r) { $scope.message = r.statusText; },
            function(r) { $scope.message = r.statusText; });
    };

    $scope.click = function() {
        bs.callApi(
            {method:'GET', url: '/users'},
            function(r) {
                console.log(r.data);
            },
            function(r) {
                $scope.message = r.statusText;
            });
    };
 }]);

 cadsApp.controller('MainController', ['$scope','BackendService', '$state', function ($scope, bs, $state) {

    $scope.message = "123";

    $scope.isLogin = function(){
        return bs.isUserLoggedIn();
    };

    // login
    $scope.login = function(email, password) {
        bs.login(email, password,
            function(r) {
                $scope.message = r.statusText;

                // reload the current state
                $state.reload($state.current.name);
            },
            function(r) { $scope.message = r.statusText; });
    };

    // logout
    $scope.logout = function() {
        $scope.message = "logged out";

        // ask logout to server using bs

    };

 }]);
