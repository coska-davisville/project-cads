
cadsApp.controller('MemberListController', ['$scope', 'BackendService', function ($scope, bs) {
	$scope.title = "Member List Controller";
    
    $scope.users = [];
    
    
    $scope.init = function() {
        
        // check authentication using bs or 
        if (!bs.isUserLoggedIn()) {
            console.log('you are not logined');
            return ;
        }
        
        
        // get the list using bs
        bs.callApi(
            {method:'GET', url: '/users'}, 
            function(r) { 
                $scope.users = r.data;
                
                console.log(r.data);
            }, 
            function(r) { 
                $scope.message = r.statusText;
            });            
    };
    
    $scope.init();

    $scope.isLogin = function(){
        return bs.isUserLoggedIn();
    };    
    
    $scope.search = function(keyword) {
        console.log(keyword);
        
        // try to search using bs
        // if it is success, update $scope.users.
        $scope.users = [];      // when result.length is 0
    };
    
    
}]);
