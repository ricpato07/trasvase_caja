'use strict';

angular.module('myApp', [
    'ui.router',
    'ui.grid',
    'ui.grid.resizeColumns',
    'ui.grid.pagination',
    'restangular',
    'ui.bootstrap',
    'angular-loading-bar',
    'angular-bind-html-compile'
])
        .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'RestangularProvider', '$provide',
            function ($stateProvider, $urlRouterProvider, $httpProvider, RestangularProvider, $provide) {

                //obtener ruta del servidor para asignar el servidor REST
                var pathname = window.location.pathname.substring(1);
                var origin = window.location.origin;
                pathname = pathname.substring(0, pathname.indexOf("/"));
                var path = origin + "/" + pathname + "/";
                console.log(path);
                RestangularProvider.setBaseUrl(path);

                //$httpProvider.interceptors.push('myMaskInterceptor');

                //configurar ui-grid para que tenga textos en español
                $provide.decorator('GridOptions', ['$delegate', 'i18nService', function ($delegate, i18nService) {
                        var gridOptions;
                        gridOptions = angular.copy($delegate);
                        gridOptions.initialize = function (options) {
                            var initOptions;
                            initOptions = $delegate.initialize(options);
                            return initOptions;
                        };
                        //es is the language prefix you want
                        i18nService.setCurrentLang('es');
                        return gridOptions;
                    }]);

                $urlRouterProvider.otherwise('/logistica_interna');
                $stateProvider
                        .state('login', {
                            url: '/login',
                            templateUrl: 'views/login.html',
                            controller: 'LoginController'
                        })
                        .state('app', {
                            url: '/panel',
                            templateUrl: 'views/panel/layout.html',
                            controller: 'MainController'
                        })
                        .state('app.404', {
                            url: '/404',
                            templateUrl: '404.html'
                        })
                        .state('trasvase_caja', {
                            url: '/trasvase_caja',
                            templateUrl: 'views/panel/trasvasecaja.html',
                            controller: 'TrasvasecajaController'
                        })
                        .state('logistica_interna', {
                            url: '/logistica_interna',
                            templateUrl: 'views/panel/logisticainterna.html',
                            controller: 'LogisticainternaController'
                        })
                        .state('logistica_externa', {
                            url: '/logistica_externa',
                            templateUrl: 'views/panel/logisticaexterna.html',
                            controller: 'LogisticaexternaController'
                        })
                        .state('retorno_valijas', {
                            url: '/retorno_valijas',
                            templateUrl: 'views/panel/retornovalijas.html',
                            controller: 'RetornovalijaController'
                        })
                        .state('recepcion_control_calidad', {
                            url: '/recepcion_control_calidad',
                            templateUrl: 'views/panel/recepcion_control_calidad.html',
                            controller: 'RecepcioncontrolcalidadController'
                        })
                        .state('trasvase_retornos', {
                            url: '/trasvase_retornos',
                            templateUrl: 'views/panel/trasvaseretornos.html',
                            controller: 'TrasvaseretornoController'
                        })
            }])
        .run(['$rootScope',function ($rootScope) {
            $rootScope.version = "4.7.4";
        }]);
