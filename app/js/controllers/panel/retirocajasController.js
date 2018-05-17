'use strict';

angular.module('myApp')
        .controller('RetiroCajasController', ['$scope', '$timeout', '$modal', '$rootScope', '$stateParams', 'ValidaService', 'ConsultaService', 'MessageService', 'sharedProperties',
            function ($scope, $timeout, $modal, $rootScope, $stateParams, ValidaService, ConsultaService, MessageService, sharedProperties) {
                $scope.forma = {};
                $scope.cat = {};
                $scope.caja = {};
                $scope.error = {};
                $scope.cajaslist = [];
                $scope.bhabilita_guardar = false;
                $scope.caja_pattern = ValidaService.caja_pattern();
                $scope.precinto_pattern = ValidaService.precinto_pattern();

                get_usuario();
                limpiar_cajas ();
                habilitainput("persona_recibe");
                
                /*
                var caja = {
                     cajaId: $scope.caja.scaja,
                     precinto: $scope.caja.precinto,
                     precinto2: $scope.caja.precinto2,
                     tipoTrasvase: 1
                     }
                     $scope.cajaslist.push(caja);
                     */
                function get_usuario() {

                    ConsultaService.getRestAngular("usuario.action")
                            .then(function (result) {
                                console.log("usuario");
                                console.log(result);
                                $scope.cat.personaEntrega = result.user.nombre;
                            })
                            .catch(function (error) {
                                console.log(error);
                            });

                }

                $scope.caja_action = function () {
                    if ($scope.cat.personaEntrega === undefined || $scope.cat.personaEntrega === null) {
                        alert("Debes colocar el nombre de la persona que entrega");
                        return;
                    }
                    if ($scope.cat.personaRecibe === undefined || $scope.cat.personaRecibe === null) {
                        alert("No se encontró el nombre de la persona que recibe");
                        return;
                    }
                    if ($scope.caja.scaja == undefined) {
                        return;
                    }

                    var cajaId = $scope.caja.scaja.substring(1);
                    ConsultaService.getRestAngular("valida_caja_retiro.action?cajaId=" + cajaId)
                            .then(function (result) {
                                console.log("caja_action");
                                console.log(result);
                                habilitainput("precinto");
                                limpiar_error();
                            })
                            .catch(function (error) {
                                console.log(error);
                                $scope.caja.scaja = undefined;
                                $scope.forma.form.caja.$setValidity('error_caja', false);
                                $scope.error.error_caja = error.data.men;
                            });

                };

                $scope.precinto_action = function () {
                    if ($scope.caja.precinto !== undefined) {
                        habilitainput("precinto2");
                    }
                };

                $scope.quitar_item = function (idTrasvase) {
                    ConsultaService.getRestAngular("limpia_cajas_retiro.action?idtrasvase=" + idTrasvase)
                            .then(function (result) {
                                console.log("limpia_cajas_retiro");
                                console.log(result);
                                $scope.listar_cajas();
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                };

                $scope.validar_caja_precintos = function () {

                    if ($scope.cat.personaEntrega === undefined || $scope.cat.personaEntrega === null) {
                        alert("Debes colocar el nombre de la persona que entrega");
                        return;
                    }
                    if ($scope.cat.personaRecibe === undefined || $scope.cat.personaRecibe === null) {
                        alert("Debes colocar el nombre de la persona que recibe");
                        return;
                    }

                    if ($scope.caja.scaja === undefined || $scope.caja.scaja === null) {
                        $scope.forma.form.caja.$setValidity('required', false);
                        return;
                    }

                    if ($scope.caja.precinto === undefined || $scope.caja.precinto === null) {
                        $scope.forma.form.precinto.$setValidity('required', false);
                        return;
                    }

                    if ($scope.caja.precinto2 === undefined || $scope.caja.precinto2 === null) {
                        $scope.forma.form.precinto2.$setValidity('required', false);
                        return;
                    }

                    if ($scope.caja.precinto === $scope.caja.precinto2) {
                        $scope.forma.form.precinto2.$setValidity('error_precinto2', false);
                        $scope.error.error_precinto2 = "El precinto 2 es el mismo colocado en el precinto 1";
                        return;
                    }


                    ConsultaService.getRestAngular("valida_caja_precintos_retiro.action?cajaId=" + $scope.caja.scaja.substring(1) + "&precinto=" + $scope.caja.precinto + "&precinto2=" + $scope.caja.precinto2)
                            .then(function (result) {
                                console.log("validar_caja_precintos");
                                console.log(result);
                                $scope.listar_cajas();
                                $scope.caja.scaja = undefined;
                                $scope.caja.precinto = undefined;
                                $scope.caja.precinto2 = undefined;
                                $("#valija").val(null);
                                $("#precinto").val(null);
                                $("#precinto2").val(null);
                                limpiar_error();
                                habilitainput("caja");
                            })
                            .catch(function (error) {
                                console.log(error);
                                $scope.forma.form.precinto2.$setValidity('error_precinto2', false);
                                $scope.error.error_precinto2 = error.data.men;
                            });
                };
                                
                $scope.listar_cajas = function () {
                   
                    ConsultaService.listRestAngular("lista_cajas_retiro.action", null)
                            .then(function (result) {
                                console.log("cajaslist");
                                console.log(result);
                                $scope.cajaslist = result;
                            })
                            .catch(function (error) {
                                console.log(error);
                            });

                };

                $scope.close_message = function () {
                    MessageService.close($scope);
                };

                function limpiar_error() {
                    $scope.error = {};
                    $scope.error.error_caja = undefined;
                    $scope.error.error_precinto2 = undefined;
                    $scope.forma.form.$error = {};
                    $scope.forma.form.caja.$error = {};
                    $scope.forma.form.precinto.$error = {};
                    $scope.forma.form.precinto2.$error = {};
                    $scope.forma.form.persona_entrega.$error = {};
                    $scope.forma.form.persona_recibe.$error = {};

                    $scope.forma.form.caja.$invalid = false;
                    $scope.forma.form.persona_entrega.$invalid = false;
                    $scope.forma.form.persona_recibe.$invalid = false;
                    $scope.forma.form.precinto.$invalid = false;
                    $scope.forma.form.precinto2.$invalid = false;

                    $scope.forma.form.caja.$touched = false;
                    $scope.forma.form.persona_entrega.$touched = false;
                    $scope.forma.form.persona_recibe.$touched = false;
                    $scope.forma.form.precinto.$touched = false;
                    $scope.forma.form.precinto2.$touched = false;
                }


                function habilitainput(opcion) {
                    $scope.bcaja = false;
                    $scope.bprecinto = false;
                    $scope.bprecinto2 = false;
                    switch (opcion) {
                        case "persona_recibe":
                            $scope.bcaja = true;
                            $timeout(function () {
                                $("#persona_recibe").focus();
                            });
                            break;
                        case "caja":
                            $scope.bcaja = true;
                            $timeout(function () {
                                $("#caja").focus();
                            });
                            break;
                        case "precinto":
                            $scope.bprecinto = true;
                            $timeout(function () {
                                $("#precinto").focus();
                            });
                            break;
                        case "precinto2":
                            $scope.bprecinto2 = true;
                            $timeout(function () {
                                $("#precinto2").focus();
                            });
                            break;
                    }
                }
                
                function limpiar_cajas (){
                    ConsultaService.getRestAngular("limpia_cajas_retiro.action")
                            .then(function (result) {
                                console.log(result);
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                }
                                
                $scope.limpiar_caja = function () {
                    $scope.caja = {};
                    $("#valija").val(null);
                    $("#precinto").val(null);
                    $("#precinto2").val(null);
                    
                    $scope.error.error_caja = undefined;
                    $scope.error.error_precinto2 = undefined;
                    $scope.forma.form.$error = {};
                    $scope.forma.form.caja.$error = {};
                    $scope.forma.form.precinto.$error = {};
                    $scope.forma.form.precinto2.$error = {};
                  
                    $scope.forma.form.caja.$invalid = false;
                    $scope.forma.form.precinto.$invalid = false;
                    $scope.forma.form.precinto2.$invalid = false;

                    $scope.forma.form.caja.$touched = false;
                    $scope.forma.form.precinto.$touched = false;
                    $scope.forma.form.precinto2.$touched = false;
                    
                    habilitainput("caja");
                }

                $scope.limpiar = function () {
                    $scope.cat = {};
                    $scope.caja = {};
                    $scope.cajaslist = [];
                    $("#valija").val(null);
                    $("#precinto").val(null);
                    $("#precinto2").val(null);
                    $("#persona_entrega").val(null);
                    limpiar_error();
                    habilitainput("caja");
                    $scope.close_message();
                    get_usuario();
                    limpiar_cajas();
                };


                $scope.guardar = function () {

                    if ($scope.cat.personaEntrega === undefined || $scope.cat.personaEntrega === null) {
                        alert("Debes colocar el nombre de la persona que entrega");
                        return;
                    }
                    if ($scope.cat.personaRecibe === undefined || $scope.cat.personaRecibe === null) {
                        alert("Debes colocar el nombre de la persona que recibe");
                        return;
                    }

                    var res = window.confirm("¿En verdad deseas Generar el Recibo para cerrar la lectura?");
                    if (res == true) {
                       
                        var params = {
                            idRetiro: null,
                            usuario: null,
                            fechaRetiro: null,
                            personaEntrega: $scope.cat.personaEntrega,
                            personaRecibe: $scope.cat.personaRecibe
                        };

                        ConsultaService.setRestAngular("guardar_retiro_cajas.action", params)
                                .then(function (result) {
                                    console.log("guardar_retiro_cajas.action");
                                    console.log(result);
                                    sharedProperties.setObject(result);
                                    $scope.limpiar();
                                    $modal.open({
                                        animation: true,
                                        templateUrl: 'views/directives/modal_retiro.html',
                                        controller: 'ModalRetiradaController',
                                        backdrop: 'static',
                                        keyboard: false
                                    });
                                })
                                .catch(function (error) {
                                    console.log(error);
                                    MessageService.error($scope, error.data.men);
                                });
                    }
                };

                $scope.ver_modal = function () {
                    $modal.open({
                        animation: true,
                        templateUrl: 'views/directives/modal_retiro.html',
                        controller: 'ModalRetiradaController',
                        backdrop: 'static',
                        keyboard: false
                    });
                };


                $scope.$watchCollection('cajaslist', function (newValue, oldValue) {
                    $scope.bhabilita_guardar = false;
                    if ($scope.forma.form !== undefined) {
                        if (newValue != undefined) {
                            if (newValue.length > 0) {
                                $scope.bhabilita_guardar = true;
                            }
                        }
                    }
                });

            }]);

angular.module('myApp')
        .controller('ModalRetiradaController', ['$scope', '$modal', '$timeout', '$modalInstance', 'ConsultaService', 'sharedProperties',
            function ($scope, $modal, $timeout, $modalInstance, ConsultaService, sharedProperties) {
                $scope.modalform = {};
                $scope.modal = {};
                $scope.bdescargado = false;

                var cat = sharedProperties.getObject();

                $scope.close = function () {
                    $modalInstance.close();
                };

                $scope.show_message = function () {
                    $scope.modal.mensaje = "Se ha realizado el retiro correctamente.";

                };
                $scope.show_message();

                $scope.descargar_remito = function () {
                    $scope.bdescargado = true;
                    ConsultaService.getBlobRestAngular("remito_retiro_cajas.action?idRetiro=" + cat.idRetiro)
                            .then(function (response) {
                                console.log(response);
                                ConsultaService.showBlob(response, "retiro_" + cat.idRetiro + '.pdf');
                            })
                            .catch(function (men) {
                                console.log(men);
                            });
                };


            }]);