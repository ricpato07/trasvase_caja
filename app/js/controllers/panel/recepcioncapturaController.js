'use strict';

angular.module('myApp')
        .controller('RecepcioncapturaController', ['$scope', '$timeout', '$modal', '$rootScope', '$stateParams', 'ValidaService', 'ConsultaService', 'MessageService', 'sharedProperties',
            function ($scope, $timeout, $modal, $rootScope, $stateParams, ValidaService, ConsultaService, MessageService, sharedProperties) {
                $scope.forma = {};
                $scope.cat = {};
                $scope.error = {};
                $scope.no_cajas = 0;
                $scope.no_valijas = 0;
                $scope.no_expedientes = 0;
                $scope.expedienteslist = [];
                $scope.bhabilita_guardar = false;
                $scope.caja_pattern = ValidaService.caja_pattern();
                $scope.expediente_pattern = ValidaService.expediente_pattern();
                $scope.valija_pattern = ValidaService.valija_pattern();
                $scope.numerico_pattern = ValidaService.numerico_pattern();
                $scope.alfanumerico_pattern = ValidaService.alfanumerico_pattern();
                $scope.modal = {};
                //paginación
                $scope.currentPage = 1;
                $scope.numPerPage = 5;
                $scope.maxSize = 5;
                $scope.listafull = [];
                //variables final
                var TESTIMONIOAPERTURA = 1596;


                $scope.get_tipo_recepcion = function () {
                    ConsultaService.getRestAngular("get_tipo_recepcion.action")
                            .then(function (result) {
                                $scope.tiporecepcionlist = result;
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                };
                $scope.get_tipo_recepcion();

                $scope.get_incidencias = function () {
                    ConsultaService.getRestAngular("get_incidencias.action")
                            .then(function (result) {
                                $scope.incidenciaslist = result;
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                };
                $scope.get_incidencias();

                function get_sucursales(tipoflujo) {
                    ConsultaService.getRestAngular("get_sucursales.action?tipoflujo=" + tipoflujo)
                            .then(function (result) {
                                $scope.sucursaleslist = result;
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                }

                $scope.habilitainput = function (opcion) {
                    $scope.btipoflujo = false;
                    $scope.btiporecepcion = false;
                    $scope.bsucursal = false;
                    $scope.bincidencia = false;
                    $scope.bcaja = false;
                    $scope.bvalija = false;
                    $scope.bsegurisello = false;
                    $scope.bexpediente = false;

                    switch (opcion) {
                        case "tipoflujo":
                            $scope.btipoflujo = true;
                            break;
                        case "tipo_recepcion":
                            $scope.btiporecepcion = true;
                            break;
                        case "sucursal":
                            $scope.bsucursal = true;
                            break;
                        case "incidencia":
                            $scope.bincidencia = true;
                            break;
                        case "expediente":
                            switch ($scope.cat.tipo_recepcion) {
                                case "1":
                                    $scope.bvalija = true;
                                    $timeout(function () {
                                        $("#valija").focus();
                                    });
                                    break;
                                case "2":
                                    $scope.bcaja = true;
                                    $timeout(function () {
                                        $("#caja").focus();
                                    });
                                    break;
                                case "3":
                                    $scope.bexpediente = true;
                                    $timeout(function () {
                                        $("#expediente").focus();
                                    });
                                    break;
                            }
                            break;
                    }
                };

                $scope.habilitainput("tipoflujo");

                $scope.muestrarecepcion = function (opcion) {
                    $scope.bshowcaja = false;
                    $scope.bshowvalija = false;
                    $scope.bshowsegurisello = false;

                    switch (opcion) {
                        case "caja":
                            $scope.bshowcaja = true;
                            break;
                        case "valija":
                            $scope.bshowvalija = true;
                            $scope.bshowsegurisello = true;
                            break;
                    }
                };

                $scope.muestracredito = function (opcion) {
                    $scope.bshowcredito = false;
                    $scope.bshowfolio = false;
                    $scope.bcredito = false;
                    $scope.bfolio = false;
                    switch (opcion) {
                        case "credito":
                            $scope.bshowcredito = true;
                            break;
                        case "folio":
                            $scope.bshowfolio = true;
                            break;
                    }
                };

                $scope.$watch('cat.tipoflujo', function (newValue, oldValue) {
                    if ($scope.forma.form !== undefined) {
                        if (newValue != undefined && newValue != "") {
                            $scope.habilitainput("tipo_recepcion");
                            $scope.forma.form.tipo_flujo.$setValidity('required', true);
                            $scope.bnuevarecepcion = true;
                            get_sucursales(newValue);
                            configura_folio(newValue);
                        } else {
                            $scope.forma.form.tipo_flujo.$setValidity('required', false);
                            $scope.bnuevarecepcion = false;
                        }
                    }
                });

                function configura_folio(tipo_flujo) {
                    switch (tipo_flujo) {
                        case "1":
                            $scope.folio_pattern = $scope.numerico_pattern;
                            break;
                        case "2":
                            $scope.folio_pattern = $scope.alfanumerico_pattern;
                            break;
                    }
                }

                $scope.$watch('cat.tipo_recepcion', function (newValue, oldValue) {
                    if ($scope.forma.form !== undefined) {
                        if (newValue != undefined && newValue != "") {
                            $scope.habilitainput("sucursal");
                            var tipo;
                            switch (newValue) {
                                case "1":
                                    tipo = "valija";
                                    break;
                                case "2":
                                    tipo = "caja";
                                    break;
                                case "3":
                                    tipo = "expediente";
                                    break;
                            }
                            $scope.muestrarecepcion(tipo);
                            $scope.forma.form.tipo_recepcion.$setValidity('required', true);
                        } else {
                            $scope.forma.form.tipo_recepcion.$setValidity('required', false);
                        }
                    }
                });

                $scope.$watch('cat.sucursal', function (newValue, oldValue) {
                    if ($scope.forma.form !== undefined) {
                        if (newValue != undefined && newValue != "") {
                            $scope.habilitainput("incidencia");
                            $scope.forma.form.sucursal.$setValidity('required', true);
                            switch (newValue) {
                                //TESTIMONIO APERTURA 
                                case "1596":
                                    $scope.muestracredito("credito");
                                    break;
                                    //TESTIMONIO CANCELADO    
                                case "1595":
                                    $scope.muestracredito("credito");
                                    //REORIGINACIONES
                                case "1601":
                                    $scope.muestracredito("credito");
                                    break;
                                default:
                                    $scope.muestracredito("folio");
                            }

                        } else {
                            $scope.forma.form.sucursal.$setValidity('required', false);
                        }
                    }
                });

                $scope.$watch('cat.incidencia', function (newValue, oldValue) {
                    if ($scope.forma.form !== undefined) {
                        if (newValue != undefined && newValue != "") {
                            $scope.habilitainput("expediente");
                            $scope.forma.form.incidencia.$setValidity('required', true);
                        } else {
                            $scope.forma.form.incidencia.$setValidity('required', false);
                        }
                    }
                });

                $scope.bshowcaja = true;
                $scope.bcaja = true;
                $scope.caja_action = function () {
                  console.log($scope.cat.caja);
                    if ($scope.cat.caja != undefined) {
                        if (buscar_valija_caja_lista($scope.cat.caja, 2) == true) {
                            $scope.forma.form.caja.$setValidity('error_caja', false);
                            $scope.error.error_caja = "La caja ya fue agregada al listado";
                            return null;
                        }
                                                            
                        ConsultaService.getRestAngular("valida_caja_recepcion.action?caja=" + $scope.cat.caja)
                                .then(function (result) {
                                    $scope.forma.form.caja.$setValidity('error_caja', true);
                                    $scope.error.error_caja = undefined;
                                    $scope.bcaja = false;
                                    $scope.bexpediente = true;
                                    $timeout(function () {
                                        $("#expediente").focus();
                                    });
                                })
                                .catch(function (error) {
                                    console.log(error);
                                    $scope.forma.form.caja.$setValidity('error_caja', false);
                                    $scope.error.error_caja = error.data.men;
                                });
                    }
                };

                $scope.valija_action = function () {
                    if ($scope.cat.valija != undefined) {
                        if (buscar_valija_caja_lista($scope.cat.valija, 1) == true) {
                            $scope.forma.form.valija.$setValidity('error_valija', false);
                            $scope.error.error_valija = "La valija ya fue agregada al listado";
                            return null;
                        }
                        $scope.forma.form.valija.$setValidity('error_valija', true);
                        $scope.error.error_valija = undefined;
                        ConsultaService.getRestAngular("get_no_relaciones_valija.action?ssccod=" + $scope.cat.sucursal)
                                .then(function (result) {
                                    console.log("valija_action");
                                    console.log(result);
                                    var no_relaciones = result.no_relaciones;
                                    if (no_relaciones >= 5) {
                                        $scope.modal.titulo = "Relación valija - sucursal";
                                        $scope.modal.mensaje = "La sucursal ya tiene " + no_relaciones + " valijas relacionadas";
                                        angular.element('#modalMensajes').modal('show');
                                    } else {
                                        ver_confirma_relacion_valijas();
                                    }
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });

                    }
                };

                function buscar_valija_caja_lista(elem, tiporecepcion) {
                    var lista = $scope.listafull;
                    if (lista != undefined && lista != null) {
                        for (var key in lista) {
                            // skip loop if the property is from prototype
//                            if (!lista.hasOwnProperty(key))
//                                continue;
                            var obj = lista[key];
                            for (var prop in obj) {
                                // skip loop if the property is from prototype
//                                if (!obj.hasOwnProperty(prop))
//                                    continue;
                                if (prop == "tiporecepcion") {
                                    if (obj[prop] == tiporecepcion) {
                                        if (obj["etiqueta"] == elem) {
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return false;
                }

                function ver_confirma_relacion_valijas() {
                    $scope.modal.titulo_confirm = "Relación valija - sucursal";
                    $scope.modal.mensaje_confirm = "La valija actual será relacionada con la sucursal seleccionada, ¿Es correcto?";
                    angular.element('#modalConfirm').modal('show');
                }

                $scope.segurisello_action = function () {
                    if ($scope.cat.segurisello != undefined) {
                        $scope.bsegurisello = false;
                        $scope.bexpediente = true;
                        $timeout(function () {
                            $("#expediente").focus();
                        });
                    }
                };

                $scope.expediente_action = function () {
                    if ($scope.cat.expediente != undefined) {
                        ConsultaService.getRestAngular("valida_expediente_recepcion.action?expediente=" + $scope.cat.expediente)
                                .then(function (result) {
                                    console.log("valida_expediente_recepcion");
                                    console.log(result);
                                    $scope.bexpediente = false;
                                    $scope.error.error_expediente = null;
                                    $scope.forma.form.expediente.$setValidity('error_expediente', true);
                                    $timeout(function () {
                                        if ($scope.bshowcredito) {
                                            $scope.bcredito = true;
                                            $timeout(function () {
                                                $("#credito").focus();
                                            });
                                        } else {
                                            $scope.bfolio = true;
                                            $timeout(function () {
                                                $("#folio").focus();
                                            });
                                        }
                                    });
                                })
                                .catch(function (error) {
                                    console.log(error);
                                    $scope.forma.form.expediente.$setValidity('error_expediente', false);
                                    $scope.error.error_expediente = error.data.men;
                                });
                    }
                };


                $scope.folio_action = function () {
                    if ($scope.cat.folio != undefined) {

                        var params = {
                            idRecepcion: $scope.cat.idrecepcion,
                            tipoflujo: $scope.cat.tipoflujo,
                            tiporecepcion: $scope.cat.tipo_recepcion,
                            ssccod: $scope.cat.sucursal,
                            incidencia: $scope.cat.incidencia,
                            etiqueta: $scope.cat.tipo_recepcion == 1 ? $scope.cat.valija : $scope.cat.caja,
                            segurisello: $scope.cat.segurisello,
                            expediente: Number($scope.cat.expediente.substring(1)),
                            folioSEA: $scope.cat.tipoflujo == 1 ? $scope.cat.folio : null,
                            folioPYME: $scope.cat.tipoflujo == 2 ? $scope.cat.folio : null
                        };
                        ConsultaService.setRestAngular("valida_folio_recepcion.action", params)
                                .then(function (result) {
                                    console.log("valida_folio_recepcion");
                                    console.log(result);
                                    $scope.bexpediente = true;
                                    $scope.bfolio = false;
                                    $scope.cat.expediente = null;
                                    $scope.cat.folio = null;
                                    $scope.cat.idrecepcion = result.idRecepcion;
                                    $scope.cat.producto = result.producto;
                                    $scope.forma.form.folio.$error = {};
                                    $scope.forma.form.folio.$touched = false;
                                    $scope.forma.form.expediente.$error = {};
                                    $scope.forma.form.expediente.$touched = false;
                                    $scope.forma.form.expediente.$invalid = false;
                                    if ($scope.cat.tipoflujo == 1) {
                                        if (result.statusFolio == 0) {
                                            $scope.modal.titulo = "FOLIO";
                                            $scope.modal.mensaje = "El folio: " + result.folioSEA + " no se encontró en la base cliente, se marcará como no conciliado";
                                            angular.element('#modalMensajes2').modal('show');
                                        }
                                    }
                                    $timeout(function () {
                                        $("#expediente").focus();
                                    });

                                    listar($scope.cat.idrecepcion);
                                })
                                .catch(function (error) {
                                    console.log(error);
                                    $scope.forma.form.folio.$setValidity('error_folio', false);
                                    $scope.error.error_folio = error.data.men;
                                });
                    } else {
                        $scope.forma.form.folio.$invalid = true;
                    }
                };


                $scope.credito_action = function () {
                    if ($scope.cat.credito != undefined) {
                        $scope.bshowcredito = false;
                        $scope.cat.creditoinverso = undefined;
                        angular.element('#modalCreditoInverso').modal('show');
                        $timeout(function () {
                            $scope.error.error_creditoinverso = undefined;
                            $("#creditoinverso").focus();
                        }, 500);
                    }
                };

                $scope.credito_inverso_action = function () {
                    if ($scope.cat.creditoinverso != undefined) {

                        if ($scope.cat.credito != ValidaService.invertir_cadena($scope.cat.creditoinverso)) {
                            $scope.error.error_creditoinverso = "El crédito inverso es incorrecto";
                            return null;
                        }

                        angular.element('#modalCreditoInverso').modal('hide');
                        $scope.bshowcredito = true;

                        var params = {
                            idRecepcion: $scope.cat.idrecepcion,
                            tipoflujo: $scope.cat.tipoflujo,
                            tiporecepcion: $scope.cat.tipo_recepcion,
                            ssccod: $scope.cat.sucursal,
                            incidencia: $scope.cat.incidencia,
                            etiqueta: $scope.cat.tipo_recepcion == 1 ? $scope.cat.valija : $scope.cat.caja,
                            segurisello: $scope.cat.segurisello,
                            expediente: Number($scope.cat.expediente.substring(1)),
                            credito: $scope.cat.credito,
                            folioSEA: null,
                            folioPYME: null
                        };
                        ConsultaService.setRestAngular("valida_credito_recepcion.action", params)
                                .then(function (result) {
                                    console.log("valida_credito_recepcion");
                                    console.log(result);
                                    $scope.cat.idrecepcion = result.idRecepcion;
                                    if ($scope.cat.tipoflujo == 1) {
                                        if ($scope.cat.sucursal == TESTIMONIOAPERTURA && result.statusFolio == 0) {
                                            $scope.modal.titulo = "CRÉDITO";
                                            $scope.modal.mensaje = "El crédito: " + result.credito + " no se encontró en la base cliente, se marcará como no conciliado.";
                                            angular.element('#modalMensajes2').modal('show');
                                        }
                                    } else if ($scope.cat.tipoflujo == 3) {
                                        if (result.bnuevoIngreso == 1) {
                                            $scope.modal.titulo = "CRÉDITO";
                                            $scope.modal.mensaje = "El crédito: " + result.credito + " no se encontró en custodia AdeA, se marcará como nuevo ingreso";
                                            angular.element('#modalMensajes2').modal('show');
                                        }
                                    }
                                    $scope.bexpediente = true;
                                    $scope.bcredito = false;
                                    $scope.cat.expediente = null;
                                    $scope.cat.credito = null;
                                    $timeout(function () {
                                        $scope.forma.form.credito.$error = {};
                                        $scope.forma.form.credito.$touched = false;
                                        $scope.error.error_credito = null;
                                        $scope.forma.form.credito.$setValidity('error_credito', true);
                                        $scope.forma.form.expediente.$error = {};
                                        $scope.forma.form.expediente.$touched = false;
                                        $scope.forma.form.expediente.$invalid = false;
                                        $("#expediente").focus();
                                    });
                                    listar($scope.cat.idrecepcion);
                                })
                                .catch(function (error) {
                                    console.log(error);
                                    $scope.forma.form.credito.$setValidity('error_credito', false);
                                    $scope.error.error_credito = error.data.men;
                                });

                        listar($scope.cat.idrecepcion);
                    } else {
                        $scope.error.error_creditoinverso = "Debes colocar el crédito inverso";
                    }
                };
                $scope.credito_inverso_cancelar = function () {
                    $scope.bshowcredito = true;
                    angular.element('#modalCreditoInverso').modal('hide');
                    $timeout(function () {
                        $("#credito").focus();
                    });
                };

                function listar(idrecepcion) {
                    ConsultaService.getRestAngular("get_expedientes_recepcion.action?idRecepcion=" + idrecepcion)
                            .then(function (result) {
                                console.log("listar");
                                console.log(result);
                                $scope.listafull = result;
                                $scope.paginacion(1);
                                contar_expedientes(result);
                            })
                            .catch(function (error) {
                                console.log(error);
                                $scope.listafull = [];
                                $scope.lista = [];
                                contar_expedientes($scope.listafull)
                            });
                }

                function contar_expedientes(lista) {
                    $scope.no_valijas = 0;
                    $scope.no_cajas = 0;
                    $scope.no_expedientes = 0;
                    if (lista != undefined && lista.length > 0) {
                        for (var key in lista) {
                            // skip loop if the property is from prototype
                            if (!lista.hasOwnProperty(key))
                                continue;

                            var obj = lista[key];
                            for (var prop in obj) {
                                // skip loop if the property is from prototype
                                if (!obj.hasOwnProperty(prop))
                                    continue;

                                if (prop == "tiporecepcion") {
                                    switch (obj[prop]) {
                                        case 1:
                                            $scope.no_valijas = $scope.no_valijas + 1;
                                            break;
                                        case 2:
                                            $scope.no_cajas = $scope.no_cajas + 1;
                                            break;
                                        case 3:
                                            $scope.no_expedientes = $scope.no_expedientes + 1;
                                            break;
                                    }
                                }
                            }
                        }
                    }
                }

                $scope.paginacion = function (pagina) {
                    $scope.currentPage = pagina;
                    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                            , end = begin + $scope.numPerPage;
                    $scope.lista = $scope.listafull.slice(begin, end);
                };

                $scope.limpiar_error = function () {
                    $scope.error = {};
                    $scope.forma.form.$error = {};
                    $scope.forma.form.tipo_flujo.$error = {};
                    $scope.forma.form.tipo_flujo.$touched = false;
                    $scope.forma.form.tipo_recepcion.$error = {};
                    $scope.forma.form.tipo_recepcion.$touched = false;
                    $scope.forma.form.sucursal.$error = {};
                    $scope.forma.form.sucursal.$touched = false;
                    $scope.forma.form.incidencia.$error = {};
                    $scope.forma.form.incidencia.$touched = false;
                    if ($scope.forma.form.caja != undefined) {
                        $scope.forma.form.caja.$error = {};
                        $scope.forma.form.caja.$touched = false;
                    }
                    if ($scope.forma.form.valija != undefined) {
                        $scope.forma.form.valija.$error = {};
                        $scope.forma.form.valija.$touched = false;
                    }
                    if ($scope.forma.form.segurisello != undefined) {
                        $scope.forma.form.segurisello.$error = {};
                        $scope.forma.form.segurisello.$touched = false;
                    }
                    if ($scope.forma.form.credito != undefined) {
                        $scope.forma.form.credito.$error = {};
                        $scope.forma.form.credito.$touched = false;
                    }
                    if ($scope.forma.form.folio != undefined) {
                        $scope.forma.form.folio.$error = {};
                        $scope.forma.form.folio.$touched = false;
                    }
                    $scope.forma.form.expediente.$error = {};
                    $scope.forma.form.expediente.$touched = false;
                };

                $scope.limpiar = function () {
                    $scope.cat = {};
                    $scope.listafull = [];
                    $scope.lista = [];
                    contar_expedientes($scope.listafull);
                    $scope.habilitainput("tipoflujo");
                    $scope.muestrarecepcion(null);
                    $scope.limpiar_error();
                    $scope.close_message();
                };

                $scope.eliminar_etiqueta = function (idRecepcion, tiporecepcion, etiqueta) {
                    var elem_eliminar;
                    var elem_resto;
                    switch (tiporecepcion) {
                        //valija
                        case 1:
                            elem_eliminar = "la valija";
                            elem_resto = " y todo su contenido";
                            break;
                            //caja
                        case 2:
                            elem_eliminar = "la caja";
                            elem_resto = " y todo su contenido";
                            break;
                            //expediente
                        case 3:
                            elem_eliminar = "el expediente";
                            elem_resto = "";
                            break;
                    }
                    var mensaje = "¿En verdad deseas eliminar " + elem_eliminar + ": " + etiqueta + elem_resto + "?";

                    var res = window.confirm(mensaje);
                    if (res == true) {
                        ConsultaService.getRestAngular("delete_etiqueta_recepcion.action?idRecepcion=" + idRecepcion
                                + "&etiqueta=" + etiqueta + "&tiporecepcion=" + tiporecepcion)
                                .then(function (result) {
                                    listar($scope.cat.idrecepcion);
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                    }
                };


                $scope.nueva_recepcion = function () {
                    var tipoflujo = $scope.cat.tipoflujo;
                    var idrecepcion = $scope.cat.idrecepcion;
                    $scope.cat = {};
                    $scope.cat.tipoflujo = tipoflujo;
                    $scope.cat.idrecepcion = idrecepcion;
                    $scope.habilitainput("tipo_recepcion");
                    $scope.muestrarecepcion(null);
                    $scope.muestracredito(null);
                    $scope.limpiar_error();
                };

                $scope.close_message = function () {
                    MessageService.close($scope);
                };

                $scope.close_modal = function () {
                    angular.element('#modalMensajes').modal('hide');
                    ver_confirma_relacion_valijas();
                };

                $scope.close_modal2 = function () {
                    angular.element('#modalMensajes2').modal('hide');
                    $timeout(function () {
                        $("#expediente").focus();
                    });
                };


                $scope.aceptar_modal = function () {
                    ConsultaService.getRestAngular("save_relacion_valija.action?ssccod=" + $scope.cat.sucursal + "&valija=" + $scope.cat.valija)
                            .then(function (result) {
                                $scope.bvalija = false;
                                $scope.bsegurisello = true;
                                angular.element('#modalConfirm').modal('hide');
                                $timeout(function () {
                                    $("#segurisello").focus();
                                });
                            })
                            .catch(function (error) {
                                console.log(error);
                            });

                };

                $scope.cancelar_modal = function () {
                    angular.element('#modalConfirm').modal('hide');
                };


            }]);
   