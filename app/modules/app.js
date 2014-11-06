(function () {
    'use strict';

    angular.module('zuriPopApp', [
        'highcharts-ng',

        'config',
        'zuriPopApp.common',

        'zuriPopApp.globe',
        'zuriPopApp.timeline'
    ])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.cache = true;
    }])
    .run(['$rootScope', 'dataService', function ($rootScope, dataService) {
        $rootScope.state = {
            year: 1983,
            location: false,  // false|int             BFS-ID
            mode: 'default'   // 'default'|'scenario'  Map Mode
        };

        dataService.getGemeindeKeys()
            .success(function successCallback (data) {
                console.log(data);
            });

        dataService.getPopulationKanton()
            .success(function successCallback (data) {
                console.log(data);
            });

        dataService.getPopulationGemeinden()
            .success(function successCallback (data) {
                console.log(data);
            });
    }]);

}());