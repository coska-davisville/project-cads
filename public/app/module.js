'use strict';

var cadsApp = angular.module('cadsApp', ['ui.router']);

cadsApp.factory('BackendService', ['$http', function(http) {
    
    var credential = {
        id: "",
        token: ""
    };

    return {
        login: function(id, pw) {
        },
        call: function(configObj, successCallback, errorCallback) {
            
            if (credential.id.length === 0) {
                errorCallback({status:404, statusText: "unauthorized"});
                return;
            }

            http(configObj).then(successCallback, errorCallback);
        }
    };
}]);

cadsApp.controller('TestController', ['$scope','BackendService', function ($scope, bs) {
    
    $scope.message = "";

    $scope.click = function() {
        bs.call(
            {method:'GET', url: '/users'}, 
            function(r) { 
                console.log(r.data);
            }, 
            function(r) { 
                $scope.message = r.statusText; 
            });
    };
 }]);
