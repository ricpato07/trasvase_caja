'use strict';

angular.module('myApp')
        .factory('ConsultaService', ['$q', 'Restangular',
            function ($q, Restangular) {
                //Método general para hacer una llamada tipo GET al server declarado en configuration.apiEndpoint y con la url enviada por parámetro
                //configuration.apiEndpoint :  nombre del servidor que realiza las consultas a la bd ejem. http://localhost:8082/pruebaloginric/web/
                //url: nombre del método a llamar despues del nombre del servidor ejem. edades
                return{
                    getBlobURL: function (url) {
                        var str = "onmessage = function (event) { \
                                var xhr = new XMLHttpRequest(); \
                                xhr.onreadystatechange=function(){\
                                if (xhr.readyState==4 && xhr.status==200){\
                                    postMessage(xhr.responseText);\
                                }\
                            }; \
                            xhr.open('GET', '" + url + "' , false); \
                            xhr.send(); \
                            }";
                        return URL.createObjectURL(new Blob([str]), {type: 'application/javascript'});
                    },
                    //método para envía 1 parámetro al método getBlobURL
                    //url: nombre del método ejem: edades
                    //param:  nombre del parámitro ejem:edad
                    //value: valor del parámetro ejem: 20
                    getBlobURLParam1: function (url, param, value) {
                        return this.getBlobURL(url + "?" + param + "=" + value);
                    },
                    //método para enviar 1 o más parámetros el método getBlobURL
                    //url: nombre del método ejem: edades
                    //params: arreglo con los parámetros a agregar al método ejem: [{label:"edad",value:12},label:"nombre", value="juan"]
                    getBlobURLParams: function (url, params) {
                        if (params != undefined && params != null) {
                            var str = "";
                            for (var i = 0; i < params.length; i++) {
                                str += params[i].label + "=" + params[i].value + (i != params.length - 1 ? "&" : "");
                            }
                            return this.getBlobURL(url + "?" + str);
                        } else {
                            return this.getBlobURL(url);
                        }
                    },
                     /** 
                      * @description
                      * Método para mandar llamar una petición GET mediante un worker con el nombre y parámetros enviados
                      * 
                      * @param {string} metodo nombre del método
                      * @param {array} params arreglo con los parámetros a agregar al método ejem: [{label:"edad",value:12},label:"nombre", value="juan"]
                      * @returns {json} respuesta del llamado al método
                      */
                    getWorkerParams: function (metodo, params) {
                        var worker = new Worker(this.getBlobURLParams(metodo, params));
                        var defer = $q.defer();

                        worker.addEventListener('message', function (e) {
                            defer.resolve(JSON.parse(e.data));
                        }, false);
                        worker.postMessage("");

                        return defer.promise;
                    },
                    /** 
                      * @description
                      * Método para mandar llamar una petición GET mediante un worker con el nombre y parámetros enviados
                      * 
                      * @param {string} metodo nombre del método
                      * @returns {json} respuesta del llamado al método
                      */
                    getWorker: function (metodo) {
                       return this.getWorkerParams(metodo,null);
                    },
                    /** 
                      * @description
                      * Método que realiza una petición GET para devolver un objeto
                      * 
                      * @param {string} metodo nombre del método
                      * @returns {json} respuesta del llamado al método
                      */
                    getRestAngular: function (metodo) {
                        console.log("metodo");
                        console.log(metodo);
                        return Restangular.one(metodo).get();
                    },
                    /**
                     * @description
                     * Método que realiza una petición GET para devolver una lista
                     *
                     * @param {string} metodo nombre del método
                     * @param {string} parametros para realizar la búsqueda
                     * @returns {json} respuesta del llamado al método
                     */
                    listRestAngular: function (metodo, params) {
                        console.log("metodo");
                        console.log(metodo);
                        return Restangular.all(metodo).getList(params);
                    },
                    /**
                     * @description
                     * Método que realiza una petición POST
                     *
                     * @metodo {string} metodo nombre del método
                     * @param {string} parametros para insertar
                     * @returns {json} respuesta del llamado al método
                     */
                     setRestAngular: function (metodo,params) {
                        console.log("metodo");
                        console.log(metodo);
                        console.log("params");
                        console.log(params);
                        return Restangular.all(metodo).post(params);
                    }
                }
            }]);

