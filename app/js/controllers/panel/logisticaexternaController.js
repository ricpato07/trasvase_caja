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
                $scope.bhabilita_parcial = false;
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
                    ConsultaService.getRestAngular("persona_entrega_recibe.action?idLote=" + $scope.cat.idLote + "&status=2")
                            .then(function (result) {
                                console.log("usuario");
                                console.log(result);
                                $scope.cat.personaEntrega = result.personaEntrega;
                                $scope.cat.personaRecibe = result.personaRecibe;
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                };

                $scope.valija_action = function () {
                    if ($scope.valija.svalija !== undefined) {
                        $("#precinto").focus();
                    }
                };

                $scope.validar_valija = function () {

                    if ($scope.valija.svalija === undefined || $scope.valija.svalija === null) {
                        $scope.forma.form.valija.$setValidity('required', false);
                        return;
                    }
                    if ($scope.valija.precinto === undefined || $scope.valija.precinto === null) {
                        $scope.forma.form.precinto.$setValidity('required', false);
                        return;
                    }

                    if ($scope.cat.personaEntrega === undefined || $scope.cat.personaEntrega === null) {
                        alert("Debes colocar el nombre de la persona que entrega");
                        return;
                    }
                    if ($scope.cat.personaRecibe === undefined || $scope.cat.personaRecibe === null) {
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
                        status: 6
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
                    $("#valija").focus();
                };

                $scope.listar_valijas = function () {
                    ConsultaService.listRestAngular("lista_lote_valijas_banco.action?idLote=" + $scope.cat.idLote + "&status=7", null)
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
                    $scope.bhabilita_parcial = false;
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

                $scope.guardar_parcial_restante2 = function () {
                    console.log("guardar_parcial_restante2");
                    sharedProperties.setEstado("PARCIAL");
                    sharedProperties.setObject($scope.cat);
                    sharedProperties.setList($scope.valijas_leidas);
                    $scope.limpiar();
                    $modal.open({
                        animation: true,
                        templateUrl: 'views/directives/modal_creado.html',
                        controller: 'CreadoBancoController',
                        backdrop: 'static',
                        keyboard: false
                    });
                };

                $scope.guardar_parcial_restante = function () {
                    console.log("guardar_parcial_restante");
                    ConsultaService.listRestAngular("lista_lote_valijas.action?idLote=" + $scope.cat.idLote + "&status=4", null)
                            .then(function (result) {
                                console.log("valijaslist pendientes");
                                console.log(result);
                                $scope.valijas_leidas = $scope.valijas_leidas.concat(result);
                                $scope.guardar_parcial_restante2();
                            })
                            .catch(function (error) {
                                console.log(error);
                                $scope.guardar_parcial_restante2();
                            });
                };

                $scope.guardar_parcialmente = function () {
                    if ($scope.cat.personaEntrega === undefined || $scope.cat.personaEntrega === null) {
                        alert("Debes colocar el nombre de la persona que entrega");
                        return;
                    }
                    if ($scope.cat.personaRecibe === undefined || $scope.cat.personaRecibe === null) {
                        alert("Debes colocar el nombre de la persona que recibe");
                        return;
                    }

                    var res = window.confirm("¿En verdad deseas cerrar parcialmente el lote?");
                    if (res == true) {
                        var params = {
                            idLote: $scope.cat.idLote,
                            scltcod: null,
                            fecha: null,
                            usuario: null,
                            status: 6,
                            personaEntrega: $scope.cat.personaEntrega,
                            personaRecibe: $scope.cat.personaRecibe
                        };
                        ConsultaService.setRestAngular("save_lote_logistica_banco.action", params)
                                .then(function (result) {
                                    console.log(result);
                                    ConsultaService.listRestAngular("lista_lote_valijas.action?idLote=" + $scope.cat.idLote + "&status=7", null)
                                            .then(function (result) {
                                                console.log("valijaslist leidas");
                                                console.log(result);
                                                $scope.valijas_leidas = result;
                                                $scope.guardar_parcial_restante();
                                            })
                                            .catch(function (error) {
                                                $scope.valijas_leidas = [];
                                                $scope.guardar_parcial_restante();
                                                console.log(error);
                                            });
                                })
                                .catch(function (error) {
                                    console.log(error);
                                    $scope.guardar_restante();
                                });


                    }
                };

                $scope.guardar_restante = function () {
                    sharedProperties.setEstado("COMPLETO");
                    $scope.limpiar();
                    $modal.open({
                        animation: true,
                        templateUrl: 'views/directives/modal_creado.html',
                        controller: 'CreadoBancoController',
                        backdrop: 'static',
                        keyboard: false
                    });
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

                    var res = window.confirm("¿En verdad deseas cerrar el lote?");
                    if (res == true) {
                        var idlote = $scope.cat.idLote;
                        var params = {
                            idLote: idlote,
                            scltcod: null,
                            fecha: null,
                            usuario: null,
                            status: 7,
                            personaEntrega: $scope.cat.personaEntrega,
                            personaRecibe: $scope.cat.personaRecibe
                        };

                        ConsultaService.setRestAngular("save_lote_logistica_banco.action", params)
                                .then(function (result) {
                                    console.log(result);
                                    ConsultaService.listRestAngular("lista_lote_valijas.action?idLote=" + idlote + "&status=7", null)
                                            .then(function (result) {
                                                console.log("valijaslist leidas");
                                                console.log(result);
                                                sharedProperties.setList(result);
                                                $scope.guardar_restante();
                                            })
                                            .catch(function (error) {
                                                console.log(error);
                                                $scope.guardar_restante();
                                            });
                                })
                                .catch(function (error) {
                                    console.log(error);
                                    $scope.guardar_restante();
                                });
                    }
                };

                $scope.ver_faltantes = function () {
                    $modal.open({
                        animation: true,
                        templateUrl: 'views/directives/modal_faltantes.html',
                        controller: 'FaltantesBancoController',
                        backdrop: 'static',
                        keyboard: false
                    });
                };

                $scope.$watchCollection('valijaslist', function (newValue, oldValue) {
                    if ($scope.forma.form !== undefined) {
                        if (newValue != undefined) {
                            if (newValue.length > 0) {
                                $scope.bhabilita_guardar = newValue.length == $scope.cat.totalValijas;
                                $scope.bhabilita_parcial = newValue.length < $scope.cat.totalValijas;
                            }
                        }
                    }
                });

            }]);

angular.module('myApp')
        .controller('FaltantesBancoController', ['$scope', '$modal', '$modalInstance', 'ConsultaService', 'sharedProperties', 'UtilService',
            function ($scope, $modal, $modalInstance, ConsultaService, sharedProperties, UtilService) {
                $scope.modalform = {};
                $scope.faltanteslist = [];

                $scope.close = function () {
                    $modalInstance.close();
                };

                $scope.listar_faltantes = function () {
                    var cat = sharedProperties.getObject();
                    ConsultaService.listRestAngular("lista_lote_valijas_banco.action?idLote=" + cat.idLote + "&status=4", null)
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

                $scope.exportar_faltantes = function (tableId) {
                    var exportHref = UtilService.tableToExcel(tableId, 'valijas faltantes');
                    if (exportHref !== null) {
                        $timeout(function () {
                            location.href = exportHref;
                        }, 100); // trigger download
                    }
                };

            }]);
angular.module('myApp')
        .controller('CreadoBancoController', ['$scope', '$modal', '$timeout', '$modalInstance', 'ConsultaService', 'sharedProperties', 'UtilService',
            function ($scope, $modal, $timeout, $modalInstance, ConsultaService, sharedProperties, UtilService) {
                $scope.modalform = {};
                $scope.modal = {};
                $scope.bdescargado = false;
                $scope.bexcel = false;
                $scope.status_leidas;
                var cat = sharedProperties.getObject();
                var estado = sharedProperties.getEstado();
                console.log(estado);
                $scope.valijas_leidas = sharedProperties.getList();
                console.log("$scope.valijas_leidas");
                console.log($scope.valijas_leidas);

                $scope.close = function () {
                    $modalInstance.close();
                };

                $scope.show_message = function () {
                    if (estado == "PARCIAL") {
                        $scope.status_leidas = 7;
                        $scope.modal.mensaje = "El lote " + cat.idLote + " se ha cerrado parcialmente.";
                    } else {
                        $scope.status_leidas = 7;
                        $scope.modal.mensaje = "El lote " + cat.idLote + " se ha cerrado correctamente.";
                    }
                };
                $scope.show_message();

                $scope.descargar_remito = function () {
                    $scope.bdescargado = true;
                    var remito_logistica;
                    if (estado == "PARCIAL") {
                        remito_logistica = "remito_logistica_banco.action?idLote=" + cat.idLote + "&status=6";
                    } else {
                        remito_logistica = "remito_logistica_banco.action?idLote=" + cat.idLote + "&status=7";
                    }
                    ConsultaService.getBlobRestAngular(remito_logistica)
                            .then(function (response) {
                                console.log(response);
                                ConsultaService.showBlob(response, "remito_lote_" + cat.idLote + '.pdf');
                            })
                            .catch(function (men) {
                                console.log(men);
                            });
                };
                $scope.descargar_excel = function (tableId) {
                    $scope.bexcel = true;
                    var exportHref = UtilService.tableToExcel(tableId, 'valijas recibidas');
                    if (exportHref !== null) {
                        $timeout(function () {
                            location.href = exportHref;
                        }, 100); // trigger download
                    }
                };

            }]);

