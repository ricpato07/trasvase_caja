'use strict';

angular.module('myApp')
        .factory('UtilService', ['$timeout', '$q', function ($timeout, $q) {
                //URL que construye el archivo excel    
                var uri_excel = 'data:application/vnd.ms-excel;base64,',
                        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
                        base64 = function (s) {
                            return window.btoa(unescape(encodeURIComponent(s)));
                        },
                        format = function (s, c) {
                            return s.replace(/{(\w+)}/g, function (m, p) {
                                return c[p];
                            })
                        };
                // valores utilizados para activa y desactivar el scroll        
                // left: 37, up: 38, right: 39, down: 40,
                // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
                var keys = {37: 1, 38: 1, 39: 1, 40: 1};

                return {
                    //Método que convierte una a cadena a minusculas sin acentos y guion bajo en lugar de espacios
                    //value: cadena cualquiera
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
                    //Método que devuelve el navegador que se está usando en forma de cadena
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
                    //Método que convierte una tabla HTML con id en un archivo Excel
                    //tableId: Identificador de la tabla HTML
                    //Name: nombre del archivo que se va a exportar (Puede ser con espacios y acentos se tratará para que sea un formato válido)
                    tableToExcel: function (tableId, Name) {
                        var name_file = this.StringtoName(Name);
                        var table = $("#" + tableId),
                                ctx = {worksheet: Name, table: table.html()},
                        href = uri_excel + base64(format(template, ctx));
                        //Creamos un Elemento Temporal en forma de enlace
                        var tmpElemento = document.createElement('a');
                        tmpElemento.href = href;
                        tmpElemento.download = name_file + '.xls';
                        var browser = this.get_browser();
                        if (browser == "Chrome") {
                            tmpElemento.click();
                            return null;
                        }
                        return tmpElemento;
                    },
                    preventDefault: function (e) {
                        e = e || window.event;
                        if (e.preventDefault)
                            e.preventDefault();
                        e.returnValue = false;
                    },
                    preventDefaultForScrollKeys: function (e) {
                        if (keys[e.keyCode]) {
                            preventDefault(e);
                            return false;
                        }
                    },
                    disableScroll: function () {
                        if (window.addEventListener) // older FF
                            window.addEventListener('DOMMouseScroll', this.preventDefault, false);
                        window.onwheel = this.preventDefault; // modern standard
                        window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
                        window.ontouchmove = this.preventDefault; // mobile
                        document.onkeydown = this.preventDefaultForScrollKeys;
                    },
                    enableScroll: function () {
                        if (window.removeEventListener)
                            window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
                        window.onmousewheel = document.onmousewheel = null;
                        window.onwheel = null;
                        window.ontouchmove = null;
                        document.onkeydown = null;
                    },
                    pieChart: function () {
                        return {
                            chart: {
                                type: 'pieChart',
                                height: 250,
                                x: function (d) {
                                    return d.key;
                                },
                                y: function (d) {
                                    return d.y;
                                },
                                showLabels: true,
                                valueFormat: function (d) {
                                    return d3.format(',.0f')(d);
                                },
                                duration: 500,
                                labelThreshold: 0.01,
                                labelSunbeamLayout: true,
                                //color: ['#98DF8A', '#FF7F0E'],
                                legendPosition: "top",
                                noData: "No hay datos que mostrar",
                                legend: {
                                    margin: {
                                        top: 5,
                                        right: 10,
                                        bottom: 0,
                                        left: 0
                                    }
                                },
//                                pie: {
//                                    dispatch: {
//                                        elementClick: function (t, u) {
//                                            console.log('elementClick');
//                                            console.log(t);
//                                            $scope.exportarExcel();
//                                        }
//                                    }
//                                }
                            }
                        };
                    },
                    barChart: function () {
                        return {
                            chart: {
                                type: 'multiBarChart',
                                height: 250,
                                margin: {
                                    top: 20,
                                    right: 20,
                                    bottom: 120,
                                    left: 45
                                },
                                clipEdge: true,
                                duration: 500,
                                stacked: false,
                                wrapLabels: true,
                                noData: "No hay datos que mostrar",
                                controlLabels: {
                                    grouped: "Agrupados",
                                    stacked: "Apilados"
                                },
                                xAxis: {
                                    axisLabel: '',
                                    showMaxMin: false,
                                    tickFormat: function (d) {
                                        return d;
                                    }
                                },
                                yAxis: {
                                    axisLabel: '',
                                    axisLabelDistance: -20,
                                    tickFormat: function (d) {
                                        return d3.format(',.0f')(d);
                                    }
                                }
                            }
                        }
                    },
                    gridOptions: function () {
                        return{
                            enableColumnMenus: false,
                            enableColumnResizing: true,
                            enableFiltering: false,
                            maxVisibleColumnCount: 100000,
                            paginationPageSizes: [10, 25, 50, 100],
                            paginationPageSize: 10,
                            data: 'result'
                        }
                    }
                }
            }]);

