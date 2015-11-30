
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

## Generate karma config file
```
$ karma init
```

## Start Karma
```
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
//directives
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

