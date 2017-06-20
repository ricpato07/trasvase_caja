'use strict';

angular.module('myApp')
        .controller('TrasvasecajaController', ['$scope', '$timeout', '$modal', '$rootScope', '$stateParams', 'ValidaService', 'ConsultaService', 'MessageService', 'sharedProperties',
            function ($scope, $timeout, $modal, $rootScope, $stateParams, ValidaService, ConsultaService, MessageService, sharedProperties) {
                $scope.forma = {};
                $scope.cat = {};
                $scope.error = {};
                $scope.deta = {};
                $scope.bhabilita_cerrar = false;
                $scope.caja_pattern = ValidaService.caja_pattern();
                $scope.expediente_pattern = ValidaService.expediente_pattern();


                $scope.get_operatorias = function () {
                    ConsultaService.listRestAngular("operatorias.action", null)
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
                    console.log($scope.cat.cajaId);
                    if ($scope.cat.cajaId == undefined) {
                        $scope.forma.form.caja.$setValidity('required', false);
                        return;
                    }

                    ConsultaService.getRestAngular("valida_caja.action?cajaId=" + $scope.cat.cajaId.substring(1))
                            .then(function (result) {
                                console.log(result);
                                console.log(result.status);
                                /*
                                 private Long idtrasvase;
                                 private String usuario;
                                 private Date fechaRegistro;
                                 private int cajaId;
                                 private String precinto;
                                 private int status;
                                 private String precinto2;
                                 * */
                                if (result.status == null || result.status == undefined) {
                                    var params = {
                                        idtrasvase: null,
                                        usuario: null,
                                        fechaRegistro: null,
                                        cajaId: Number($scope.cat.cajaId.substring(1)),
                                        precinto: null,
                                        status: 0,
                                        precinto2: null
                                    };
                                    ConsultaService.setRestAngular("trasvasecajacab.action", params)
                                            .then(function (result2) {
                                                console.log(result2);
                                                $scope.cat.idtrasvase = result2.idtrasvase;
                                                sharedProperties.setObject($scope.cat);
                                                $scope.habilitainput("operatoria");
                                                $scope.limpiar_error();
                                            })
                                            .catch(function (error2) {
                                                console.log(error2);
                                                $scope.forma.form.caja.$setValidity('error_caja', false);
                                                $scope.error.error_caja = error2.data.men;
                                            });
                                } else {
                                    $scope.cat.idtrasvase = result.trasvase.idtrasvase;
                                    sharedProperties.setObject($scope.cat);
                                    $scope.habilitainput("operatoria");
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

                    /*
                     *private long idtrasvase;
                     private long etiqueta;
                     private int idoperatoria;
                     private Long scltcod;
                     private int status;
                     private Date fechaRegistro;
                     private String usuario;
                     private String tipoEtiqueta;
                     * */

                    ConsultaService.getRestAngular("valida_expediente.action?nunicodoc=" + $scope.cat.etiqueta.substring(1))
                            .then(function (result) {
                                console.log(result);

                                var params = {
                                    pk: {
                                        idtrasvase: $scope.cat.idtrasvase,
                                        etiqueta: Number($scope.cat.etiqueta.substring(1))
                                    },
                                    idoperatoria: $scope.cat.idoperatoria,
                                    scltcod: null,
                                    status: null,
                                    fechaRegistro: null,
                                    usuario: null,
                                    tipoEtiqueta: "U"
                                };
                                ConsultaService.setRestAngular("trasvasecajadeta.action", params)
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
                    ConsultaService.listRestAngular("trasvasecajadeta.action?idtrasvase=" + $scope.cat.idtrasvase, null)
                            .then(function (result) {
                                console.log(result);
                                $scope.etiquetaslist = result;
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


                $scope.$watch('cat.idoperatoria', function (newValue, oldValue) {

                    if ($scope.forma.form !== undefined) {
                        if (newValue != undefined && newValue != "") {
                            $scope.habilitainput("etiqueta");
                            $scope.forma.form.operatoria.$setValidity('required', true);
                        } else {
                            if ($scope.cat.cajaId != undefined) {
                                $scope.habilitainput("operatoria");
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
                    $scope.forma.form.caja.$invalid = false;
                    $scope.forma.form.etiqueta.$invalid = false;
                };

                $scope.limpiar = function () {
                    $scope.habilitainput("caja");
                    $scope.cat = {};
                    $scope.etiquetaslist = [];
                    $scope.limpiar_error();
                    $("#etiqueta").val(null);
                    $("#caja").val(null);
                    $("#operatoria").val("");
                    $scope.close_message();
                };

                $scope.habilitainput = function (opcion) {
                    $scope.bcaja = false;
                    $scope.boperatoria = false;
                    $scope.betiqueta = false;
                    switch (opcion) {
                        case "caja":
                            $scope.bcaja = true;
                            break;
                        case "operatoria":
                            $scope.boperatoria = true;
                            break;
                        case "etiqueta":
                            $scope.boperatoria = true;
                            $scope.betiqueta = true;
                            break;
                    }
                };

                $scope.habilitainput("caja");

                $scope.cerrar_caja = function () {
                    $scope.openmodal();
                };

                $scope.close = function () {
                    $modalInstance.close();
                };

                $scope.quitar_item = function (etiqueta) {
                    var res = window.confirm("¿En verdad deseas borrar el expediente U0" + etiqueta + "?");
                    if (res == true) {
                        ConsultaService.getRestAngular("deltrasvasecajadeta.action?idtrasvase=" + $scope.cat.idtrasvase + "&etiqueta=" + etiqueta)
                                .then(function (result) {
                                    $scope.listar_etiquetas();
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                    }
                };

                $scope.openmodal = function () {
                    var modalInstance = $modal.open({
                        animation: true,
                        templateUrl: 'views/directives/modal_precinto.html',
                        controller: 'ModalController'
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
                    ConsultaService.setRestAngular("uptrasvasecajacab.action", params)
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
        .controller('ModalController', ['$scope', '$modal', '$modalInstance', '$rootScope', 'ValidaService', 'sharedProperties', 'ConsultaService',
            function ($scope, $modal, $modalInstance, $rootScope, ValidaService, sharedProperties, ConsultaService) {
                $scope.modalform = {};
                $scope.catform = {};
                $scope.precinto_pattern = ValidaService.precinto_pattern();

                $scope.close = function () {
                    $modalInstance.close();
                };

                $scope.cerrar_caja_confirm = function () {
                    $modalInstance.close();
                    var cat = sharedProperties.getObject();
                    cat.precinto = $scope.catform.precinto;
                    cat.precinto2 = $scope.catform.precinto2;
                    sharedProperties.setObject(cat);
                    $rootScope.$emit("CerrarCajaConfirm", {});
                };

                $scope.$watch('catform.precinto', function (newValue, oldValue) {
                    
                    if ($scope.modalform.form !== undefined) {
                        if (newValue != undefined && newValue != "") {
                            if ($scope.catform.precinto == $scope.catform.precinto2) {
                                $scope.modalform.form.precinto2.$setValidity('error_precinto', false);
                            }else{
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
                            }else{
                                $scope.modalform.form.precinto2.$setValidity('error_precinto', true);
                            }
                        }
                    }
                });

            }]);

angular.module('myApp')
        .service('sharedProperties', function () {
            var objeto = {};

            return {
                getObject: function () {
                    return objeto;
                },
                setObject: function (value) {
                    objeto = value;
                }
            }
        });