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
    .run(['$rootScope', '$timeout', 'dataService', function ($rootScope, $timeout, dataService) {

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
            year: 1990,
            minYear: 1990,
            maxYearLimit: 2010,
            maxYear: 2031,
            location: false,  // false|int             BFS-ID
            mode: 'default'   // 'default'|'scenario'  Map Mode
        };
        $rootScope.data = {

        };

        $rootScope.switchMode = function (mode) {
            switch(mode) {
                case 'scenario':
                    $rootScope.state.mode = 'scenario';
                    break;
                case 'default':
                default:
                    $rootScope.state.mode = 'default';
                    // $rootScope.state.year = $rootScope.getYear();
                    break;
            }
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

        dataService.getAdditionalSidebarInfo()
            .success(function successCallback (data) {
                console.log(data);
                $rootScope.data.sidebar = data;

                // "133": "Bevölkerung" [Personen],
                // "460": "Bevölkerungsdichte [Einwohner pro Quadratkilometer]",
                // "200": "Bevölkerungszunahme 1 Jahr [Personen]",
                // "201": "Bevölkerungszunahme 1 Jahr [%]",

            });

        $rootScope.getYear = function (delta) {
            var maxYear = ($rootScope.state.mode == 'scenario') ? $rootScope.state.maxYear : $rootScope.state.maxYearLimit-0.1;
            var minYear = ($rootScope.state.mode == 'scenario') ? $rootScope.state.maxYearLimit + 1.1 : $rootScope.state.minYear;
            var year = _.max([minYear, _.min([maxYear, $rootScope.state.year + (delta || 0)])]);
            return year;
        }

        $rootScope.getBoundedYear = function () {
            var maxYear = $rootScope.state.maxYearLimit-0.1,
                minYear = $rootScope.state.minYear;
            var year = Math.ceil(_.max([minYear, _.min([maxYear, $rootScope.state.year])]));
            return year;
        }

        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
        }


        $rootScope.getTotalPopulation = function () {
            return ($rootScope.data.sidebar &&
                    $rootScope.data.sidebar[133] &&
                    $rootScope.data.sidebar[133][261] &&
                    $rootScope.data.sidebar[133][261][$rootScope.getBoundedYear()]) ? numberWithCommas($rootScope.data.sidebar[133][261][$rootScope.getBoundedYear()]) : '—';
        };

        $rootScope.getTotalPopulationDenisty = function () {
            return ($rootScope.data.sidebar &&
                    $rootScope.data.sidebar[133] &&
                    $rootScope.data.sidebar[133][261] &&
                    $rootScope.data.sidebar[133][261][$rootScope.getBoundedYear()]) ? numberWithCommas($rootScope.data.sidebar[133][261][$rootScope.getBoundedYear()]) : '—';
        };


        $(document).mousewheel((function () {

            var updateMouswheel = _.throttle(function(event) {

                var year = $rootScope.getYear((event.deltaY*event.deltaFactor)/100);
                $rootScope.safeApply(function () {
                    if (year !== $rootScope.state.year) $rootScope.state.year = year;
                });
            });

            return function (event) {
                 event.preventDefault();
                 updateMouswheel(event);
            };

        }()));

    }]);

}());