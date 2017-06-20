'use strict';

angular.module('myApp')
    .directive('sidebar', function () {
        return {
            templateUrl: 'views/directives/sidebar.html',
            restrict: 'E',
            replace: true
        }
    });