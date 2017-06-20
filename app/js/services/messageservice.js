'use strict';

angular.module('myApp')
        .factory('MessageService', function () {

            return {
                getMessage: function (text, type) {
                    var message = '<div ng-if="true">\n\
                                       <div class="alert alert-content.type alert-dismissible" role="alert">\n\
                                        <button type="button" class="close" ng-click="close_message()" aria-label="Close"><span\n\
                                            aria-hidden="true">&times;</span></button>\n\
                                            content.text\n\
                                            </div>\n\
                                       </div>';
                    message = message.replace("content.show", "true");
                    message = message.replace("content.text", text);
                    message = message.replace("content.type", type);
                    return message;
                },
                success: function ($scope,text) {
                    $scope.message = {};
                    $scope.message.html = this.getMessage(text, 'success');
                },
                error: function ($scope, text) {
                    $scope.message = {};
                    $scope.message.html = this.getMessage(text, 'danger');
                    console.log($scope.message.html);
                },
                warning: function ($scope, text) {
                    $scope.message = {};
                    $scope.message.html = this.getMessage(text, 'warning');
                },
                info: function ($scope, text) {
                    $scope.message = {};
                    $scope.message.html = this.getMessage(text, 'info');
                },
                close: function ($scope) {
                    $scope.message = {};
                    $scope.message.html = null;
                }
            }

        });
