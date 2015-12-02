# How to test javascript code

## Installation

Install `angular-mocks` with bower
```
$ bower install angular-mocks --save-dev
```

Install Karma and plugins
```
$ npm install karma --save-dev
$ npm install karma-jasmine karma-phantomjs-launcher --save-dev
```

## Generating karma config file
```
$ karma init
```
`karma init` will create `karma.config.js`.

## Starting Karma
```
$ ./node_modules/karma/bin/karma start
```

or using command line interface
```
$ npm install -g karma-cli
$ karma start
```

or using gulp
```
gulp test
```

---


# Testing with Jasmine

## Controller
```js
//controller
angular.module('myApp')
.controller('HomeController', ['$scope', function($scope) {
    $scope.sum = function(a, b) {
        return a + b;
    };
}]);
```
```js
//test for controller
describe('HomeController', function() {
    beforeEach(module('myApp'));

    var $controller;

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    describe('$scope.sum', function() {
        it('sum(1,2) should be 3', function() {
            var $scope = {};
            var controller = $controller('HomeController', {$scope:$scope});
            expect($scope.sum(1,2)).toEqual(3);
        }));
    })
});
```
## Service
```js
//service
angular.module('myApp')
.factory('MathService', function() {
    return {
        add : function(a, b) {
            return a + b;
        },
        subtract : function(a, b) {
            return a - b;
        }
    };
});
```
```js
//test for service
describe('HomeService', function() {
    beforeEach(module('myApp'));

    var MathService;

    beforeEach(inject(function(_MathService_) {
        MathService = _MathService_;
    }))

    describe('HomeService.MathService', function() {
        it('MathService.add(2, 3) should be 5', function() {
            expect(MathService.add(2,3)).toEqual(5);
        });

        it('MathService.subtract(4, 2) should be 2', function() {
            expect(MathService.subtract(4,2)).toEqual(2);
        })

    });
});
```
## Filter
```js
//filter
angular.module('myApp')
.filter('upper', function() {
    return function(input) {
        input = input || '';
        return input.toUpperCase();
    };
});
```
```js
//test for filter
describe('HomeFilter', function() {
    beforeEach(module('myApp'));

    var upperFilter;

    beforeEach(inject(function(_$filter_) {
        upperFilter = _$filter_('upper');
    }));

    describe('Upper', function() {
        it('abcd|upper should be ABCD', function() {
            expect(upperFilter('abcd')).toEqual('ABCD');
        });
    })
});
```

## Directive
```js
//directive
angular.module('myApp')
.directive('aGreatEye', function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<h1>lidless, wreathed in flame, {{1 + 1}} times</h1>'
    };
});
```
```js
//test for directive
describe('HomeDirective', function() {
    beforeEach(module('myApp'));

    var $compile, $rootScope;

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    describe('AGreatEye Filter', function() {
        it('replaces the element', function() {
            var element = $compile('<a-great-eye></a-great-eye>')($rootScope);
            $rootScope.$digest();
            expect(element.html()).toEqual("lidless, wreathed in flame, 2 times");
        });
    });
});
```

## HTTP
```js
cadsApp.controller('LoginController', ['$scope', '$http', function ($scope, $http) {
	$http.get('/users/a@a.com').then(function(data) {
		$scope.data = data.data;
	});
}]);
```
```js
//test for http
describe('httpTest', function() {
    beforeEach(module('cadsApp'));

    var $httpBackend, $rootScope, createController;

   beforeEach(inject(function($injector) {
     // Set up the mock http service responses
     $httpBackend = $injector.get('$httpBackend');
     // backend definition common for all tests
     $httpBackend.when('GET', '/users/a@a.com').respond({
         "program":"Snow Valley",
         "province":"ON",
         "membership":"volunteer",
         "email":"a@a.com",
         "firstName":"John",
         "lastName":"Smith"
     });

     // Get hold of a scope (i.e. the root scope)
     $rootScope = $injector.get('$rootScope');
     // The $controller service is used to create instances of controllers
     var $controller = $injector.get('$controller');

     createController = function() {
       return $controller('LoginController', {'$scope' : $rootScope });
     };
   }));

   afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

   it('should fetch authentication token', function() {
     $httpBackend.expectGET('/users/a@a.com');
     var controller = createController();
     $httpBackend.flush();
     expect($rootScope.data.firstName).toEqual('John');
   });
})
```
