'use strict';

angular.module('myApp')
        .controller('MainController', ['$scope', '$rootScope', '$state',
            function ($scope, $rootScope, $state) {

                $rootScope.class_menu = "sidebar-mini";
                $scope.bcollapse = false;

                $scope.collapse = function () {
                    if (!$scope.bcollapse) {
                        $rootScope.class_menu = "sidebar-mini sidebar-collapse";
                    } else {
                        $rootScope.class_menu = "sidebar-mini";
                    }
                    $scope.bcollapse = !$scope.bcollapse;
                };

                $scope.logout = function () {
                    $state.go("login");
                };

            }]);

