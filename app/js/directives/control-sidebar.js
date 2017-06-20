'use strict';

angular.module('myApp')
    .directive('controlSidebar', function () {
        return {
            templateUrl: 'views/directives/control-sidebar.html',
            restrict: 'E',
            replace: true
        }
    });