'use strict';

angular.module('myApp')
    .factory('ValidaService', function () {
        var mail_pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var alfanumerico_pattern = /^[a-zA-Z0-9\.\, ñÑáéíóúüÁÉÍÓÚÜ]*$/;
        var nombre_pattern = /^[a-zA-Z\. ñÑáéíóúÁÉÍÓÚ]*$/;
        var nombre_coma_pattern = /^[a-zA-Z\.\, ñÑáéíóúÁÉÍÓÚ]*$/;
        var numerico_pattern = /^[0-9]*$/;
        var moneda_pattern = /^[0-9]{1,7}(\.[0-9]{1,2})?$/;
        var moneda5_pattern = /^[0-9]{1,5}(\.[0-9]{1,2})?$/;
        var telefono_pattern = /^[0-9 \.\-\(\)]*$/;
        var telefono_ext_pattern = /^[0-9 \.\-\(\)ext]*$/;
        var horario_pattern = /^[a-zA-Z0-9 \.\:\-\(\)]*$/;
        var alfanum_simbolos_pattern = /^[a-zA-Z0-9\. ñÑáéíóúÁÉÍÓÚ\.\,\;\:\_\/\-\_\(\)\[\]\=\*\+]*$/;
        var RFC_pattern = /^([A-ZÑ]{4})([0-9]{6})([A-ZÑ0-9]{3})+$/;
        var CURP_pattern = /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/
        var folio_pattern = /^[0-9]{5}\/[0-9]{4}$/;
        var formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        var caja_pattern = /^[S][0-9]{8}$/;
        var expediente_pattern = /^[U][0-9]{10}$/;
        var precinto_pattern = /^[C][V][0-9]{6}[ ][0-9]{6}$/;
        var valija_pattern = /^[G][0-9]{12}$/;
        var documento_pattern = /^[T][0-9]{11}$/;
        var expediente_documento_pattern = /^[T][0-9]{11}|[U][0-9]{10}$/;

        return {
            validamail: function (mail) {
                var exr = mail_pattern;
                return exr.test(mail);
            },
            alfanumerico: function (str) {
                var exr = alfanumerico_pattern;
                return exr.test(str);
            },
            numerico: function (str) {
                var exr = numerico_pattern;
                return exr.test(str);
            },
            moneda: function (str) {
                var exr = moneda_pattern;
                return exr.test(str);
            },
            eshorario: function (str) {
                var exr = horario_pattern;
                return exr.test(str);
            },
            esnulo: function (str) {
                if (typeof str !== "undefined" && str != null && str != "") {
                    return false;
                }
                return true;
            },
            //convierte un string de Date formato(2015-11-10T09:09:00.000Z) a variabla Date
            toUTCDate: function (value) {
                if (value == undefined) {
                    return null;
                }
                var year = value.substring(0, 4);
                var month = parseInt(value.substring(5, 7));
                var day = value.substring(8, 10);
                var hours = value.substring(11, 13);
                var minutes = value.substring(14, 16);
                var seconds = value.substring(17, 19);
                var date = new Date(year, month - 1, day, hours, minutes, seconds);
                return date;
            },
            //Convierte String a Date en formato dd/mm/yyyy
            StringtoDate: function (value) {
                if (value == undefined) {
                    return null;
                }
                var arr = value.split("/");
                var date = new Date(arr[2], arr[1] - 1, arr[0]);
                return date;
            },
            //convierte una fecha Date en String formato dd/mm/yyyy
            dateToString: function (value) {
                if (value == undefined) {
                    return null;
                }
                var date = (value.getDate() < 10 ? "0" : "") + value.getDate() + "/" + (value.getMonth() < 9 ? "0" : "") + (value.getMonth() + 1) + "/" + value.getFullYear();
                return date;
            },
            //convierte una fecha Date en String formato yyyy/mm/dd
            dateToStringYMD: function (value) {
                if (value == undefined) {
                    return null;
                }
                var date = value.getFullYear() + "/" + (value.getMonth() < 9 ? "0" : "") + (value.getMonth() + 1) + "/" + (value.getDate() < 10 ? "0" : "") + value.getDate();
                return date;
            },
            //convierte una fecha Date en String en formato 2015-12-12T00:26:00.532Z
            dateToISOString: function (value) {
                if (value == undefined) {
                    return null;
                }
                var date = value.toISOString();
                return date;
            },
            //Agrega 0 al lado izquierdo de un número para convertirlo en 01
            addZero: function (i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            },
            //convierte una fecha en String formato HH:MM en 24 hrs
            dateToStringHHmm: function (value) {
                var date = this.addZero(value.getHours()) + ":" + this.addZero(value.getMinutes());
                return date;
            },
            //convierte un texto a minúsculas, sin acentos y reemplazando espacios con guión bajo
            StringtoName: function (value) {
                if (value != null) {
                    value = value.toLowerCase();
                    value = value.replace(/ /g, "_");
                    value = value.replace(/á/g, "a");
                    value = value.replace(/é/g, "e");
                    value = value.replace(/í/g, "i");
                    value = value.replace(/ó/g, "o");
                    value = value.replace(/ú/g, "u");
                }
                return value;
            },
            mail_pattern: function () {
                return mail_pattern;
            },
            alfanumerico_pattern: function () {
                return alfanumerico_pattern;
            },
            alfanum_simbolos_pattern: function () {
                return alfanum_simbolos_pattern;
            },
            numerico_pattern: function () {
                return numerico_pattern;
            },
            moneda_pattern: function () {
                return moneda_pattern;
            },
            moneda5_pattern: function () {
                return moneda5_pattern;
            },
            nombre_pattern: function () {
                return nombre_pattern;
            },
            nombre_coma_pattern: function () {
                return nombre_coma_pattern;
            },
            telefono_pattern: function () {
                return telefono_pattern;
            },
            telefono_ext_pattern: function () {
                return telefono_ext_pattern;
            },
            horario_pattern: function () {
                return horario_pattern;
            },
            RFC_pattern: function () {
                return RFC_pattern;
            },
            CURP_pattern: function () {
                return CURP_pattern;
            },
            folio_pattern: function () {
                return folio_pattern;
            },
            caja_pattern: function () {
                return caja_pattern;
            },
            expediente_pattern: function () {
                return expediente_pattern;
            },
            precinto_pattern: function () {
                return precinto_pattern;
            },
            valija_pattern: function () {
                return valija_pattern;
            },
            documento_pattern: function () {
                return documento_pattern;
            },
            expediente_documento_pattern: function () {
                return expediente_documento_pattern;
            },
            formats_date: function () {
                return formats;
            },
            disabled: function (campo) {
                $(campo).attr("disabled", true);
            },
            enabled: function (campo) {
                $(campo).attr("disabled", false);
            },
            get_browser: function () {
                var user_agent = navigator.appVersion;
                if (user_agent.indexOf('MSIE') !== -1)
                    return 'MSIE'; //Internet explorer
                else if (user_agent.indexOf('Trident') !== -1)
                    return 'Trident'; //Internet explorer 11
                else if (user_agent.indexOf('Firefox') !== -1)
                    return 'Firefox';  //Mozilla Firefox
                else if (user_agent.indexOf('Chrome') !== -1)
                    return 'Chrome';  //Google Chrome
                else if (user_agent.indexOf('Opera Mini') !== -1)
                    return "Opera Mini";  //Opera Mini
                else if (user_agent.indexOf('Opera') !== -1)
                    return "Opera";  //Opera
                else if (user_agent.indexOf('Safari') !== -1)
                    return "Safari";  //Safari
                else
                    return 'Desconocido';
            },
            //Método que devuelve los años secuenciales desde el año colocado como inicio
            //hasta el año actual orden descendente
            getAniosCursados: function (inicio) {
                var anio_actual = (new Date()).getFullYear();
                var inicio = inicio;
                var anioslist = [];
                for (var i = anio_actual; i >= inicio; i--) {
                    var item = {};
                    item.id = i;
                    item.nombre = i;
                    anioslist.push(item);
                }
                return anioslist;
            },
            //método que devuelve los meses en una lista donde Enero=1, Febrero:2 , etc.
            getMeses: function () {
                var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
                var meseslist = [];
                for (var i = 0; i < meses.length; i++) {
                    var item = {};
                    item.id = i + 1;
                    item.nombre = meses[i];
                    meseslist.push(item);
                }
                return meseslist;
            },
            //método que resta 2 fecha date1-date2 y devuelve el número de días
            restaFechas: function (date1, date2) {
                var dif = date1 - date2;
                var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
                return dias;
            },
            //método que suma o resta días a una fecha para restar hay que colocar el número negativo
            sumarDiasFecha: function (fecha, days) {
                var milisegundos = parseInt(35 * 24 * 60 * 60 * 1000);

                var day = fecha.getDate();
                // el mes es devuelto entre 0 y 11
                var month = fecha.getMonth() + 1;
                var year = fecha.getFullYear();

                //Obtenemos los milisegundos desde media noche del 1/1/1970
                var tiempo = fecha.getTime();
                //Calculamos los milisegundos sobre la fecha que hay que sumar o restar...
                milisegundos = parseInt(days * 24 * 60 * 60 * 1000);
                //Modificamos la fecha actual
                var total = fecha.setTime(tiempo + milisegundos);
                day = fecha.getDate();
                month = fecha.getMonth() + 1;
                year = fecha.getFullYear();

                return new Date(year, month - 1, day);
            }
        };
    })
    .directive('upperCase', function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attr, ngModel) {

                ngModel.$parsers.unshift(function (value) {
                    if (value != undefined && value != null) {
                        value = value.toUpperCase();
                    }
                    return value;
                });
            }
        };
    })
    .directive('validaFechade', ['ValidaService', function (ValidaService) {
        //las 2 fechas inicio y término son obligatorias para la búsqueda
        return {
            require: 'ngModel',
            link: function (scope, elem, attr, ngModel) {
                ngModel.$parsers.unshift(function (value) {
                    if (scope.busqueda.form.fechaa.$viewValue !== undefined) {
                        var fechaa = ValidaService.StringtoDate(scope.busqueda.form.fechaa.$viewValue);
                    }
                    if (value !== null) {
                        value.setHours(0);
                        value.setMinutes(0);
                        value.setMinutes(0);
                        value.setSeconds(0);
                        value.setMilliseconds(0);
                    }
                    scope.busqueda.form.fechaa.$setValidity('vfechafin', fechaa >= value);

                    return value;
                });
            }
        };
    }])
    .directive('validaFechaa', ['ValidaService', function (ValidaService) {
        //las 2 fechas inicio y término son obligatorias para la búsqueda
        return {
            require: 'ngModel',
            link: function (scope, elem, attr, ngModel) {
                ngModel.$parsers.unshift(function (value) {
                    if (scope.busqueda.form.fechade.$viewValue !== undefined) {
                        var fechade = ValidaService.StringtoDate(scope.busqueda.form.fechade.$viewValue);
                    }
                    if (value !== null) {
                        value.setHours(0);
                        value.setMinutes(0);
                        value.setMinutes(0);
                        value.setSeconds(0);
                        value.setMilliseconds(0);
                    }
                    ngModel.$setValidity('vfechafin', value >= fechade);
                    return value;
                });
            }
        }
    }])
//        .directive('dateTimePicker', [function () {
//                return {
//                    restrict: 'E',
//                    require: 'ngModel',
//                    scope: {
//                        ngModel: '=',
//                        ngReadonly: '=?',
//                        minDate: '=?',
//                        maxDate: '=?',
//                        dtpRequired: '=?',
//                        dateOptions: '=?'
//                    },
//                    template: '<div class="row">' +
//                            '<div class="col-md-6">' +
//                            '<p class="input-group">' +
//                            '<input type="text" class="form-control" datepicker-popup="{{format}}"' +
//                            'ng-model="ngModel" is-open="opened"' +
//                            'min-date="minDate" max-date="maxDate"' +
//                            'datepicker-options="dateOptions" date-disabled="disabled(date, mode)"' +
//                            'ng-required="dtpRequired" close-text="Close" ng-readonly="ngReadonly" ng-click="openPopup()" />' +
//                            '<span class="input-group-btn">' +
//                            '<button type="button" class="btn btn-default" ng-click="openPopup($event)">' +
//                            '<i class="glyphicon glyphicon-calendar"></i></button>' +
//                            '</span>' +
//                            '</p>' +
//                            '</div>' +
//                            '</div>',
//                    controller: function ($scope) {
//                        // check if it was defined.  If not - set a default            
//                        $scope.dateOptions = $scope.dateOptions || {
//                            formatYear: 'yy',
//                            startingDay: 1,
//                            showWeeks: false
//                        };
//
//                        $scope.openPopup = function ($event) {
//                            $event.stopPropagation();
//                            $scope.opened = true;
//                        };
//
//                        // Disable weekend selection
//                        $scope.disabled = function (date, mode) {
//                            return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
//                        };
//
//                        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
//                        $scope.format = $scope.formats[0];
//                    },
//                    link: function ($scope, element, attrs) {
//
//                    }
//                };
//            }])
;

        