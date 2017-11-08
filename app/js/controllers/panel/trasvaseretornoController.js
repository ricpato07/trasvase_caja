'use strict';

angular.module('myApp')
        .controller('TrasvaseretornoController', ['$scope', '$timeout', '$modal', '$rootScope', '$stateParams', 'ValidaService', 'ConsultaService', 'MessageService', 'sharedProperties',
            function ($scope, $timeout, $modal, $rootScope, $stateParams, ValidaService, ConsultaService, MessageService, sharedProperties) {
                $scope.forma = {};
                $scope.cat = {};
                $scope.error = {};
                $scope.deta = {};
                $scope.bhabilita_cerrar = false;
                $scope.caja_pattern = ValidaService.caja_pattern();
                $scope.expediente_documento_pattern = ValidaService.expediente_documento_pattern();


                $scope.get_operatorias = function () {
                    ConsultaService.listRestAngular("operatorias_retorno.action", null)
                            .then(function (result) {
                                console.log(result);
                                $scope.operatoriaslist = result;
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                };
                $scope.get_operatorias();


                $scope.guardar_cab = function () {
                    console.log($scope.cat.subTipoTrasvase);
                    if ($scope.cat.subTipoTrasvase == undefined) {
                         $scope.forma.form.control.$setValidity('required', false);
                        return;
                    }

//                    $scope.habilitainput("caja");
//                    $scope.limpiar_error();

                    ConsultaService.getRestAngular("valida_caja_retorno.action?cajaId=" + $scope.cat.cajaId.substring(1))
                            .then(function (result) {
                                console.log(result);
                                console.log(result.status);

                                if (result.status == null || result.status == undefined) {
                                    var params = {
                                        idtrasvase: null,
                                        usuario: null,
                                        fechaRegistro: null,
                                        cajaId: Number($scope.cat.cajaId.substring(1)),
                                        precinto: null,
                                        status: 0,
                                        precinto2: null,
                                        tipoTrasvase: null,
                                        subTipoTrasvase: $scope.cat.subTipoTrasvase
                                    };
                                    ConsultaService.setRestAngular("trasvasecajacab_retorno.action", params)
                                            .then(function (result2) {
                                                console.log(result2);
                                                $scope.cat.idtrasvase = result2.idtrasvase;
                                                sharedProperties.setObject($scope.cat);
                                                $scope.habilitainput("caja");
                                                $scope.limpiar_error();
                                            })
                                            .catch(function (error2) {
                                                console.log(error2);
                                                $scope.forma.form.caja.$setValidity('error_caja', false);
                                                $scope.error.error_caja = error2.data.men;
                                            });
                                } else {
                                    $scope.cat.idtrasvase = result.trasvase.idtrasvase;
                                    $scope.cat.subTipoTrasvase = result.trasvase.subTipoTrasvase;
                                    sharedProperties.setObject($scope.cat);
                                    $scope.habilitainput("caja");
                                    $scope.listar_etiquetas();
                                    $scope.limpiar_error();
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                                $scope.forma.form.caja.$setValidity('error_caja', false);
                                $scope.error.error_caja = error.data.men;
                            });

                };

                $scope.guardar_deta = function () {

                    if ($scope.cat.etiqueta == undefined) {
                        $scope.forma.form.etiqueta.$setValidity('required', false);
                        return;
                    }

                    ConsultaService.getRestAngular("valida_expediente_documento_retorno.action?etiqueta=" + $scope.cat.etiqueta + "&control=" + $scope.cat.subTipoTrasvase)
                            .then(function (result) {
                                console.log(result);
                                var idoperatoria;
                                if ($scope.cat.subTipoTrasvase === 'ING' || $scope.cat.subTipoTrasvase === 'INT') {
                                    idoperatoria = $scope.cat.idoperatoria;
                                } else {
                                    idoperatoria = result.idoperatoria;
                                }
                                var params = {
                                    pk: {
                                        idtrasvase: $scope.cat.idtrasvase,
                                        etiqueta: Number($scope.cat.etiqueta.substring(1))
                                    },
                                    idoperatoria: idoperatoria,
                                    scltcod: null,
                                    status: null,
                                    fechaRegistro: null,
                                    usuario: null,
                                    tipoEtiqueta: $scope.cat.etiqueta.substring(0, 1)
                                };
                                ConsultaService.setRestAngular("trasvasecajadeta_retorno.action", params)
                                        .then(function (result2) {
                                            console.log(result2);
                                            $scope.cat.etiqueta = undefined;
                                            $scope.listar_etiquetas();
                                            $scope.limpiar_error();
                                        })
                                        .catch(function (error2) {
                                            console.log(error2);
                                            $scope.forma.form.etiqueta.$setValidity('error_etiqueta', false);
                                            $scope.error.error_etiqueta = error2.data.men;
                                            $scope.cat.etiqueta = undefined;
                                            $("#etiqueta").val(null);
                                        });
                            })
                            .catch(function (error) {
                                console.log(error);
                                $scope.forma.form.etiqueta.$setValidity('error_etiqueta', false);
                                $scope.error.error_etiqueta = error.data.men;
                                $scope.cat.etiqueta = undefined;
                                $("#etiqueta").val(null);
                            });
                };

                $scope.listar_etiquetas = function () {
                    ConsultaService.listRestAngular("trasvasecajadeta_retorno.action?idtrasvase=" + $scope.cat.idtrasvase, null)
                            .then(function (result) {
                                console.log(result);
                                $scope.etiquetaslist = result;
                                if ($scope.etiquetaslist.length > 0) {
                                    $scope.bcontrol = false;
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                };

                $scope.deshabilita_cerrar = function () {
                    if ($scope.etiquetaslist != undefined) {
                        var res = $scope.etiquetaslist.length > 0;
                        return false;
                    }
                    return true;
                };

                $scope.close_message = function () {
                    MessageService.close($scope);
                };


                $scope.$watch('cat.subTipoTrasvase', function (newValue, oldValue) {

                    if ($scope.forma.form !== undefined) {
                        if (newValue != undefined && newValue != "") {
                            $scope.habilitainput("control");
                            $scope.forma.form.control.$setValidity('required', true);
                            $scope.cat.idoperatoria = undefined;
                        } else {
                            $scope.boperatoria = false;
                        }
                    }
                });

                $scope.$watch('cat.idoperatoria', function (newValue, oldValue) {

                    if ($scope.forma.form !== undefined) {
                        if (newValue != undefined && newValue != "") {
                            $scope.habilitainput("operatoria");
                            $scope.forma.form.operatoria.$setValidity('required', true);
                            $scope.betiqueta = true;
                        } else {
                            if ($scope.cat.subTipoTrasvase != undefined) {
                                $scope.habilitainput("caja");
                                $scope.forma.form.operatoria.$setValidity('required', false);
                            }
                        }
                    }
                });

                $scope.limpiar_error = function () {
                    $scope.error = {};
                    $scope.forma.form.$error = {};
                    $scope.forma.form.caja.$error = {};
                    $scope.forma.form.etiqueta.$error = {};
                    $scope.forma.form.control.$error = {};
                    $scope.forma.form.caja.$invalid = false;
                    $scope.forma.form.etiqueta.$invalid = false;
                    $scope.forma.form.control.$invalid = false;
                };

                $scope.limpiar = function () {
                    $scope.habilitainput("control");
                    $scope.cat = {};
                    $scope.etiquetaslist = [];
                    $scope.limpiar_error();
                    $scope.boperatoria = false;
                    $("#etiqueta").val(null);
                    $("#caja").val(null);
                    $("#operatoria").val("");
                    $scope.close_message();
                };

                $scope.habilitainput = function (opcion) {
                    $scope.bcaja = false;
                    $scope.boperatoria = false;
                    $scope.betiqueta = false;
                    $scope.bcontrol = false;
                    $scope.bhabilitaoperatoria = false;
                    switch (opcion) {
                        case "control":
                            console.log("control");
                            $scope.bcontrol = true;
                            $scope.bcaja = true;
                            if ($scope.cat.subTipoTrasvase === 'ING' || $scope.cat.subTipoTrasvase === 'INT') {
                                $scope.boperatoria = true;
                            }
                            break;
                        case "caja":
                            console.log("caja");
                            if ($scope.cat.subTipoTrasvase === 'ING' || $scope.cat.subTipoTrasvase === 'INT') {
                                $scope.boperatoria = true;
                                $scope.bhabilitaoperatoria = true;
                            } else {
                                $scope.betiqueta = true;
                            }
                            break;
                        case "operatoria":
                            console.log("operatoria");
                            $scope.boperatoria = true;
                            $scope.bhabilitaoperatoria = true;
                            $scope.betiqueta = true;
                            break;
                    }
                };

                $scope.habilitainput("control");

                $scope.cerrar_caja = function () {
                    $scope.openmodal();
                };


                $scope.openmodal = function () {
                    var modalInstance = $modal.open({
                        animation: true,
                        templateUrl: 'views/directives/modal_precinto_retorno.html',
                        controller: 'ModalRetornoController',
                        backdrop: 'static',
                        keyboard: false
                    });
                };

                $scope.$watchCollection('etiquetaslist', function (newValue, oldValue) {
                    if ($scope.forma.form !== undefined) {
                        if (newValue != undefined) {
                            $scope.bhabilita_cerrar = newValue.length > 0;
                        }
                    }
                });

                $rootScope.$on("CerrarCajaConfirm", function () {
                    $scope.cerrar_caja_confirm();
                });


                $scope.cerrar_caja_confirm = function () {

                    var cat = sharedProperties.getObject();
                    var params = {
                        idtrasvase: $scope.cat.idtrasvase,
                        usuario: null,
                        fechaRegistro: null,
                        cajaId: null,
                        precinto: cat.precinto,
                        status: 1,
                        precinto2: cat.precinto2
                    };
                    ConsultaService.setRestAngular("uptrasvasecajacab_retorno.action", params)
                            .then(function (result2) {
                                console.log(result2);
                                $scope.limpiar();
                                alert("La caja se ha cerrado correctamente.");
                            })
                            .catch(function (error) {
                                console.log(error);
                                MessageService.error($scope, error.data.men);
                            });
                };

            }])
        ;

angular.module('myApp')
        .controller('ModalRetornoController', ['$scope', '$modal', '$modalInstance', '$rootScope', 'ValidaService', 'sharedProperties',
            function ($scope, $modal, $modalInstance, $rootScope, ValidaService, sharedProperties) {
                $scope.modalform = {};
                $scope.catform = {};
                $scope.precinto_pattern = ValidaService.precinto_pattern();

                $scope.close = function () {
                    $modalInstance.close();
                };

                $scope.cerrar_caja_confirm = function () {
                    if ($scope.modalform.form !== undefined) {
                        if (!$scope.modalform.form.$valid) {
                            alert("Es necesario colocar los precintos para cerrar la caja.");
                            return;
                        }
                        $modalInstance.close();
                        var cat = sharedProperties.getObject();
                        cat.precinto = $scope.catform.precinto;
                        cat.precinto2 = $scope.catform.precinto2;
                        sharedProperties.setObject(cat);
                        $rootScope.$emit("CerrarCajaConfirm", {});
                    }
                };

                $scope.$watch('catform.precinto', function (newValue, oldValue) {

                    if ($scope.modalform.form !== undefined) {
                        if (newValue != undefined && newValue != "") {
                            if ($scope.catform.precinto == $scope.catform.precinto2) {
                                $scope.modalform.form.precinto2.$setValidity('error_precinto', false);
                            } else {
                                $scope.modalform.form.precinto2.$setValidity('error_precinto', true);
                            }
                        }
                    }
                });

                $scope.$watch('catform.precinto2', function (newValue, oldValue) {

                    if ($scope.modalform.form !== undefined) {
                        if (newValue != undefined && newValue != "") {
                            if ($scope.catform.precinto == $scope.catform.precinto2) {
                                $scope.modalform.form.precinto2.$setValidity('error_precinto', false);
                            } else {
                                $scope.modalform.form.precinto2.$setValidity('error_precinto', true);
                            }
                        }
                    }
                });

            }]);
