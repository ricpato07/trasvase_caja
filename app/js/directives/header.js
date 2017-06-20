'use strict';

angular.module('myApp')
    .directive('headerPanel', function () {
        return {
            templateUrl: 'views/directives/header.html',
            restrict: 'E',
            replace: true
        }
    });