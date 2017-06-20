'use strict';

angular.module('services.config', [])
    .constant('configuration', {
        apiEndpoint: 'http://localhost/scotiabank-guardavalores/',
        secure: 'false'
    });
