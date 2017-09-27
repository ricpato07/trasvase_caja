'use strict';

angular.module('myApp')
        .controller('LogisticaexternaController', ['$scope', '$timeout', '$modal', '$rootScope', '$stateParams', 'ValidaService', 'ConsultaService', 'MessageService', 'sharedProperties',
            function ($scope, $timeout, $modal, $rootScope, $stateParams, ValidaService, ConsultaService, MessageService, sharedProperties) {
                $scope.forma = {};
                $scope.cat = {};
                $scope.cat.totalValijas = 0;
                $scope.valija = {};
                $scope.error = {};
                $scope.deta = {};
                $scope.valijaslist = [];
                $scope.bhabilita_guardar = false;
                $scope.bhabilita_faltantes = false;
                $scope.numerico_pattern = ValidaService.numerico_pattern();
                $scope.valija_pattern = ValidaService.valija_pattern();
                $scope.precinto_pattern = ValidaService.precinto_pattern();


                $scope.validar_lote = function () {
                    console.log($scope.cat.idLote);
                    if ($scope.cat.idLote === undefined || $scope.cat.idLote === null) {
                        $scope.forma.form.lote.$setValidity('required', false);
                        return;
                    }

                    ConsultaService.getRestAngular("valida_lote_banco.action?idLote=" + $scope.cat.idLote)
                            .then(function (result) {
                                console.log("lote");
                                console.log(result);
                                $scope.cat = result;
                                $scope.get_usuario();
                                $scope.habilitainput("valija");
                                $scope.listar_valijas();
                                sharedProperties.setObject($scope.cat);
                                $scope.forma.form.lote.$invalid = false;
                                $scope.forma.form.lote.$error = {};
                                $scope.forma.form.persona_entrega.$touched = true;
                            })
                            .catch(function (error) {
                                console.log(error);
                                $scope.forma.form.lote.$setValidity('error_lote', false);
                                $scope.error.error_lote = error.data.men;
                            });

                };

                $scope.get_usuario = function () {
                    ConsultaService.getRestAngular("usuario.action")
                            .then(function (result) {
                                console.log("usuario");
                                console.log(result);
                                $scope.cat.personaBancoRecibe = result.user.nombre;
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                };

                $scope.validar_valija = function () {

                    if ($scope.valija.svalija === undefined || $scope.valija.svalija===null) {
                        $scope.forma.form.valija.$setValidity('required', false);
                        return;
                    }
                    if ($scope.valija.precinto === undefined || $scope.valija.precinto === null) {
                        $scope.forma.form.precinto.$setValidity('required', false);
                        return;
                    }
                                       
                    if ($scope.cat.personaBancoEntrega === undefined || $scope.cat.personaBancoEntrega === null) {
                        alert("Debes colocar el nombre de la persona que entrega");
                        return;
                    }
                    if ($scope.cat.personaBancoRecibe === undefined || $scope.cat.personaBancoRecibe === null) {
                        alert("Debes colocar el nombre de la persona que recibe");
                        return;
                    }

                    var params = {
                        pk: {
                            idLote: $scope.cat.idLote,
                            nunico: Number($scope.valija.svalija.substring(1))
                        },
                        scltcod: null,
                        precinto: $scope.valija.precinto,
                        fecha: null,
                        usuario: null,
                        status: 4
                    };
                    ConsultaService.setRestAngular("valida_lote_valijas_banco.action", params)
                            .then(function (result) {
                                console.log(result);
                                $scope.listar_valijas();
                            })
                            .catch(function (error) {
                                console.log(error);
                                $scope.forma.form.valija.$setValidity('error_valija', false);
                                $scope.error.error_valija = error.data.men;

                            });
                    $scope.valija.svalija = undefined;
                    $scope.valija.precinto = undefined;
                    $("#valija").val(null);
                    $("#precinto").val(null);
                    $scope.error = {};
                    $scope.forma.form.$error = {};
                    $scope.forma.form.valija.$error = {};
                    $scope.forma.form.precinto.$error = {};
                    $scope.forma.form.valija.$touched = false;
                    $scope.forma.form.precinto.$touched = false;
                };

                $scope.listar_valijas = function () {
                    ConsultaService.listRestAngular("lista_lote_valijas_banco.action?idLote=" + $scope.cat.idLote + "&status=4", null)
                            .then(function (result) {
                                console.log("valijaslist");
                                console.log(result);
                                $scope.valijaslist = result;
                                $scope.bhabilita_faltantes = $scope.valijaslist.length < $scope.cat.totalValijas;
                            })
                            .catch(function (error) {
                                console.log(error);
                                $scope.bhabilita_faltantes = true;
                            });
                };

                $scope.close_message = function () {
                    MessageService.close($scope);
                };


                $scope.limpiar_error = function () {
                    $scope.error = {};
                    $scope.forma.form.$error = {};
                    $scope.forma.form.lote.$error = {};
                    $scope.forma.form.valija.$error = {};
                    $scope.forma.form.precinto.$error = {};
                    $scope.forma.form.persona_entrega.$error = {};
                    $scope.forma.form.persona_recibe.$error = {};
                    $scope.forma.form.persona_entrega.$invalid = false;
                    $scope.forma.form.lote.$touched = false;
                    $scope.forma.form.valija.$touched = false;
                    $scope.forma.form.precinto.$touched = false;
                    $scope.forma.form.persona_entrega.$touched = false;
                    $scope.forma.form.persona_recibe.$touched = false;
                    $scope.bhabilita_faltantes = false;
                };

                $scope.habilitainput = function (opcion) {
                    $scope.blote = false;
                    $scope.bpersonas = false;
                    $scope.bvalija = false;
                    switch (opcion) {
                        case "lote":
                            $scope.blote = true;
                            break;
                        case "valija":
                            $scope.bvalija = true;
                            break;
                    }
                };

                $scope.habilitainput("lote");

                $scope.limpiar = function () {
                    $scope.cat = {};
                    $scope.cat.totalValijas = 0;
                    $scope.valija = {};
                    $scope.valijaslist = [];
                    $("#valija").val(null);
                    $("#precinto").val(null);
                    $("#lote").val(null);
                    $("#persona_entrega").val(null);
                    $("#persona_recibe").val(null);
                    $scope.habilitainput("lote");
                    $scope.limpiar_error();
                    $scope.close_message();
                };


                $scope.guardar = function () {
                    
                    if ($scope.cat.personaBancoEntrega === undefined || $scope.cat.personaBancoEntrega === null) {
                        alert("Debes colocar el nombre de la persona que entrega");
                        return;
                    }
                    if ($scope.cat.personaBancoRecibe === undefined || $scope.cat.personaBancoRecibe === null) {
                        alert("Debes colocar el nombre de la persona que recibe");
                        return;
                    }
                    
                    var res = window.confirm("¿En verdad deseas cerrar el lote?");
                    if (res == true) {
                        var idlote = $scope.cat.idLote;
                        var params = {
                            idLote: idlote,
                            scltcod: null,
                            fecha: null,
                            usuario: null,
                            personaEntrega: null,
                            personaRecibe: null,
                            personaBancoEntrega:$scope.cat.personaBancoEntrega,
                            personaBancoRecibe: $scope.cat.personaBancoRecibe        
                        };
                        
                        ConsultaService.setRestAngular("save_lote_logistica_banco.action", params)
                                .then(function (result) {
                                    console.log(result);
                                    $scope.limpiar_error();
                                    $scope.limpiar();
                                    alert("El lote " + idlote + " se ha cerrado correctamente.");
                                })
                                .catch(function (error) {
                                    console.log(error);
                                    MessageService.error($scope, error.data.men);
                                });
                    }
                };

                $scope.ver_faltantes = function () {
                    var modalInstance = $modal.open({
                        animation: true,
                        templateUrl: 'views/directives/modal_faltantes.html',
                        controller: 'FaltantesBancoController'
                    });
                };

                $scope.$watchCollection('valijaslist', function (newValue, oldValue) {
                    if ($scope.forma.form !== undefined) {
                        if (newValue != undefined) {
                            if (newValue.length > 0) {
                                $scope.bhabilita_guardar = newValue.length == $scope.cat.totalValijas;
                            }
                        }
                    }
                });

            }]);

angular.module('myApp')
        .controller('FaltantesBancoController', ['$scope', '$modal', '$modalInstance', 'ConsultaService', 'sharedProperties',
            function ($scope, $modal, $modalInstance, ConsultaService, sharedProperties) {
                $scope.modalform = {};
                $scope.faltanteslist = [];

                $scope.close = function () {
                    $modalInstance.close();
                };

                $scope.listar_faltantes = function () {
                    var cat = sharedProperties.getObject();
                    ConsultaService.listRestAngular("lista_lote_valijas_banco.action?idLote=" + cat.idLote + "&status=3", null)
                            .then(function (result) {
                                console.log("faltantes");
                                console.log(result);
                                $scope.faltanteslist = result;
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                };
                $scope.listar_faltantes();

            }]);
