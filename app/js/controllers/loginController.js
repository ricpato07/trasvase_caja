'use strict';

angular.module('myApp')
        .controller('LoginController', ['$scope', '$state', 'ConsultaService', 'MessageService',
            function ($scope,$state,ConsultaService, MessageService) {
               $scope.usuario={}; 
                
                // $scope.ingresar = function(){
                //     if($scope.usuario.login == "admin" && $scope.usuario.password == "admin"){
                //     $state.go("app.captcha");
                // }else{
                //    $scope.mensaje= "Usuario o contraseña incorrecta";
                // }
                // };
                
               $scope.ingresar = function () {
                   var parameters = {usuario: $scope.usuario.login, password: $scope.usuario.password};
                   ConsultaService.setRestAngular("login",parameters)
                           .then(function (result) {
                               console.log(result);
                               $state.go("app.captcha");
                           })
                           .catch(function (men) {
                               console.log("Exception: ");
                               console.log(men);
                               $scope.usuario.password = null;
                               $scope.mensaje= "Usuario o contraseña incorrecta";
                           });
               };

                
            }]);
