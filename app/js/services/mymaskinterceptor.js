angular.module('myApp')
        .factory('myMaskInterceptor', ['$q', function ($q) {
                var loadingCount = 0;
                return {
                    request: function (config) {
                        if (++loadingCount === 1) {
//                            if (config.url.indexOf("/escuelas/") !== -1 ||
//                                    config.url.indexOf("/planes/") !== -1 ||
//                                    config.url.indexOf("/estados/") !== -1) {
//                                $('#gray-background').hide();
//                            } else {
//                                $('#gray-background').show();
//                            }
                            $('#gray-background').show();
                        }
                        return config || $q.when(config);
                    },
                    response: function (response) {
                        if (--loadingCount === 0) {
                            $('#gray-background').hide();
                        }
                        return response || $q.when(response);
                    },
                    responseError: function (response) {
                        if (--loadingCount === 0) {
                            $('#gray-background').hide();
                        }
                        return $q.reject(response);
                    }
                };
            }]);


       