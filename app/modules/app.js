(function () {
    'use strict';

    angular.module('zuriPopApp', [
        'highcharts-ng',

        'config',
        'zuriPopApp.common',

        'zuriPopApp.globe',
        'zuriPopApp.timeline',
        'zuriPopApp.donut'
    ])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.cache = true;
    }])
    .run(['$rootScope', 'dataService', function ($rootScope, dataService) {

        $rootScope.safeApply = function (fn) {
            var phase = this.$root.$$phase;
            if(phase == '$apply' || phase == '$digest') {
                if(fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

        $rootScope.state = {
            year: 2000,
            minYear: 1991,
            maxYear: 2010,
            location: false,  // false|int             BFS-ID
            mode: 'default'   // 'default'|'scenario'  Map Mode
        };

        dataService.getGemeindeKeys()
            .success(function successCallback (data) {
                console.log(data);
                $rootScope.areaData = data;
            });

        dataService.getPopulationKanton()
            .success(function successCallback (data) {
                console.log(data);
            });

        dataService.getPopulationGemeinden()
            .success(function successCallback (data) {
                console.log(data);
            });

        $(document).mousewheel(function(event) {
            event.preventDefault();
            var year = _.max([$rootScope.state.minYear, _.min([$rootScope.state.maxYear, $rootScope.state.year + (event.deltaY*event.deltaFactor)/100])]);
            $rootScope.safeApply(function () {
                if (year !== $rootScope.state.year) $rootScope.state.year = year;
            });
        });

    }]);

}());