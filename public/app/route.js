cadsApp.config(function($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "/assets/app/home/home.html",
            controller: 'HomeController'
        })
        .state('about', {
            url: "/about",
            templateUrl: "/assets/app/about/about.html",
            controller: 'AboutController'
        });
});