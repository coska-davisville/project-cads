cadsApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/login");

    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "/assets/app/user/login.html",
            controller: 'LoginController'
        })
        .state('registration', {
            url: "/registration",
            templateUrl: "/assets/app/user/registration.html",
            controller: 'RegistrationController'
        })
        .state('memberDetail', {
            url: "/memberDetail",
            templateUrl: "/assets/app/user/memberDetail.html",
            controller: 'MemberDetailController'
        })
        .state('memberList', {
            url: "/memberList",
            templateUrl: "/assets/app/user/memberList.html",
            controller: 'MemberListController'
        })
        .state('roleManagement', {
            url: "/roleManagement",
            templateUrl: "/assets/app/admin/roleManagement.html",
            controller: 'RoleManagementController'
        });
}]);
