'use strict';

angular.module('myApp')
    .directive('footerPanel', function () {
        return {
            templateUrl: 'views/directives/footer.html',
            restrict: 'E',
            replace: true
        }
    });