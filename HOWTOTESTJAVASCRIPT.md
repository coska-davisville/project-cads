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
```
//controller
angular.module('myApp')
.controller('HomeController', ['$scope', function($scope) {
    $scope.sum = function(a, b) {
        return a + b;
    };
}]);
```
```
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
```
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
```
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
```
//filter
angular.module('myApp')
.filter('upper', function() {
    return function(input) {
        input = input || '';
        return input.toUpperCase();
    };
});
```
```
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
```
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
```
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
