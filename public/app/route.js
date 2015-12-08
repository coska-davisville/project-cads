cadsApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/login");

    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "/assets/app/user/home.html"
        })
        .state('login', {
            url: "/login",
            templateUrl: "/assets/app/user/login.html",
            controller: 'LoginController'
        })
        .state('registration', {
            url: "/registration",
            templateUrl: "/assets/app/user/registration.html",
            controller: 'RegistrationController',
            data: {
                requireLogin: true
            }
        })
        .state('memberDetail', {
            url: "/memberDetail",
            templateUrl: "/assets/app/user/memberDetail.html",
            controller: 'MemberDetailController',
            data: {
                requireLogin: true
            }
        })
        .state('memberList', {
            url: "/memberList",
            templateUrl: "/assets/app/user/memberList.html",
            controller: 'MemberListController',
            data: {
                requireLogin: true
            }
        })
        .state('roleManagement', {
            url: "/roleManagement",
            templateUrl: "/assets/app/admin/roleManagement.html",
            controller: 'RoleManagementController',
            data: {
                requireLogin: true
            }
        });
}]);
