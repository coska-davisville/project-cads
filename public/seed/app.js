'use strict';

var myApp = angular.module('myApp', ['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/home");
    //
    // Now set up the states
    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "home/home.html",
            //controller: 'HomeController'
        })
        .state('about', {
            url: "/about",
            templateUrl: "about/about.html",
            //controller: 'AboutController'
        });
        
});