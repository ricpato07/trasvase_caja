'use strict';

angular.module('services.config', [])
    .constant('configuration', {
        apiEndpoint: '@@apiEndpoint',
        secure: '@@secure'
    });
