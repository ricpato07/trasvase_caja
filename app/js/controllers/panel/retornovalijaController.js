'use strict';

angular.module('myApp')
        .controller('RetornovalijaController', ['$scope', '$timeout', '$modal', 'ValidaService', 'ConsultaService',
            function ($scope, $timeout, $modal, ValidaService, ConsultaService) {
                $scope.forma = {};
                $scope.cat = {};
                $scope.valija = {};
                $scope.mensaje = {};
                $scope.error = {};                
                $scope.valija_pattern = ValidaService.valija_pattern();

            
                $scope.agregar = function () {
                    
                    if ($scope.cat.svalija == undefined) {
                        $scope.forma.form.valija.$setValidity('required', false);
                        return;
                    }
                                       
                    $scope.mensaje = {};
                    var svalija = $scope.cat.svalija;
                    $scope.cat = {};
                    $scope.valija = {};
                    
                    ConsultaService.getRestAngular("valida_valija.action?svalija=" + svalija)
                            .then(function (result) {
                                console.log(result);
                                $scope.valija = result;
                                $scope.mensaje.bcorrecto = true;
                                $scope.mensaje.texto = "La valija "+ svalija + " se actualizó a estado disponible";
                            })
                            .catch(function (error) {
                                console.log(error);
                                $scope.mensaje.berror = true;
                                $scope.mensaje.texto = error.data.men;
                            });
                            
                };

           
                $scope.limpiar_error = function () {
                    $scope.error = {};
                    $scope.forma.form.$error = {};
                    $scope.mensaje = {};
                    $scope.forma.form.valija.$error = {};
                    $scope.forma.form.valija.$invalid = false;
                };

                $scope.limpiar = function () {
                    $scope.cat = {};
                    $scope.valija = {};
                    $scope.limpiar_error();
                    $("#valija").val(null);
                };

    
            }]);
