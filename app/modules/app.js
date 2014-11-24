(function () {
    'use strict';

    angular.module('zuriPopApp', [
        'ngAnimate',
        'highcharts-ng',
        'cfp.hotkeys',

        'config',
        'zuriPopApp.common',

        'zuriPopApp.globe',
        'zuriPopApp.timeline',
        'zuriPopApp.donut'
    ])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.cache = true;
    }])
    .config(['hotkeysProvider', function (hotkeysProvider) {
        hotkeysProvider.includeCheatSheet = false;
    }])
    .run(['$rootScope', '$timeout', 'dataService', 'hotkeys', function ($rootScope, $timeout, dataService, hotkeys) {

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
            scenarioSlider: 10,
            year: 1990,
            minYear: 1990,
            maxYearLimit: 2010,
            maxYear: 2031,
            gemeindeId: 261,  // false|int             BFS-ID
            hideSidebar: false,
            mode: 'default',   // 'default'|'scenario'  Map Mode
            enableToggle: true,
            toggle: {
                introMessage: true,
                globe: false,
                chartButtons: false,
                sidebarRegion: false,
                sidebarChartArea: false,
                sidebarChartWhg: false
            }
        };
        $rootScope.data = {
            gemeindeList: dataService.getGemeindeList()
        };
        $rootScope.switchMode = function (mode) {
            switch(mode) {
                case 'scenario':
                    $rootScope.state.mode = 'scenario';
                    $rootScope.state.hideSidebar = true;
                    break;
                default:
                    $rootScope.state.mode = 'default';
                    // $rootScope.state.year = $rootScope.getYear();
                    break;
            }
        };

        dataService.getGemeindeKeys()
            .success(function successCallback (data) {
                // console.log(data);
                $rootScope.areaData = data;
            });

        // dataService.getPopulationKanton()
        //     .success(function successCallback (data) {
        //         // console.log(data);
        //     });

        // dataService.getPopulationGemeinden()
        //     .success(function successCallback (data) {
        //         // console.log(data);
        //     });

        dataService.getAdditionalSidebarInfo()
            .success(function successCallback (data) {
                // console.log(data);
                $rootScope.data.sidebar = data;

            });
        dataService.getAreaWhgDaten()
            .success(function successCallback (data) {
                // console.log(data);


                var areaData = {},
                    whgData = {};

                var areaKey = {
                    "183": "Anteil Landwirtschaftsfläche [%]",
                    "184": "Anteil Waldfläche [%]",
                    "187": "Anteil Verkehrsfläche [%]",
                    "186": "Anteil Siedlungsfläche [%]",
                    "185": "Anteil Gewässerfläche [%]",
                    "459": "Anteil unproduktive Fläche [%]"
                };
                var whgKey = {
                    "360": "Anteil 1 Zi.-Wohnungen [%]",
                    "361": "Anteil 2 Zi.-Wohnungen [%]",
                    "362": "Anteil 3 Zi.-Wohnungen [%]",
                    "363": "Anteil 4 Zi.-Wohnungen [%]",
                    "364": "Anteil 5 Zi.-Wohnungen [%]",
                    "365": "Anteil 6+ Zi.-Wohnungen [%]",
                };



                $rootScope.safeApply(function () {
                    _.forEach(areaKey, function (val, key) {
                        areaData[key] = data[key];
                    });
                    _.forEach(whgKey, function (val, key) {
                        whgData[key] = data[key];
                    });

                    $rootScope.data.areaData = areaData;
                    $rootScope.data.whgData = whgData;
                    console.log($rootScope);
                });

                // So D.R.Y ...!

            });



        $rootScope.getYear = function (delta) {
            var maxYear = ($rootScope.state.mode == 'scenario') ? $rootScope.state.maxYear : $rootScope.state.maxYearLimit-0.1;
            var minYear = ($rootScope.state.mode == 'scenario') ? $rootScope.state.maxYearLimit + 1.1 : $rootScope.state.minYear;
            var year = _.max([minYear, _.min([maxYear, $rootScope.state.year + (delta || 0)])]);
            return year;
        };
        $rootScope.getBoundedYear = function () {
            var maxYear = $rootScope.state.maxYearLimit-0.1,
                minYear = $rootScope.state.minYear;
            var year = Math.ceil(_.max([minYear, _.min([maxYear, $rootScope.state.year])]));
            return year;
        };


        $rootScope.zoom = function (zoomValue) {
            $rootScope.$emit('zoom', zoomValue);
        };




        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
        }

        $rootScope.getIndicator = function (indicator) {
            return ($rootScope.data.sidebar &&
                    $rootScope.data.sidebar[indicator] &&
                    $rootScope.data.sidebar[indicator][$rootScope.state.gemeindeId] &&
                    $rootScope.data.sidebar[indicator][$rootScope.state.gemeindeId][$rootScope.getBoundedYear()]) ? numberWithCommas($rootScope.data.sidebar[indicator][$rootScope.state.gemeindeId][$rootScope.getBoundedYear()]) : '—';
        };
        $rootScope.getTotalPopulation = function () {
            return $rootScope.getIndicator(133);
        };
        $rootScope.getTotalPopulationDenisty = function () {
            return $rootScope.getIndicator(460);
        };
        $rootScope.getTotalPopulationIncreasePersons = function () {
            return $rootScope.getIndicator(200);
        };
        $rootScope.getTotalPopulationIncreasePercentage = function () {
            return $rootScope.getIndicator(201);
        };
        $rootScope.getGemeindeName = function () {
            return $rootScope.data.gemeindeList[$rootScope.state.gemeindeId].GDENAME || '—';
        };


        hotkeys.add({
            combo: 'w',
            description: 'Zoom',
            callback: function(event, hotkey) {
                console.log('zoom out');
                event.preventDefault();
                $rootScope.zoom(-10);
            }
        });

        hotkeys.add({
            combo: 's',
            description: 'Zoom',
            callback: function(event, hotkey) {
                console.log('zoom in');
                event.preventDefault();
                $rootScope.zoom(10);
            }
        });

        hotkeys.add({
            combo: '1',
            description: 'Toggle IntroMessage',
            callback: function(event, hotkey) {
                $rootScope.state.toggle.introMessage = !$rootScope.state.toggle.introMessage;
            }
        });
        hotkeys.add({
            combo: '2',
            description: 'Region',
            callback: function(event, hotkey) {
                $rootScope.state.toggle.sidebarRegion = !$rootScope.state.toggle.sidebarRegion;
            }
        });
        hotkeys.add({
            combo: '3',
            description: 'Region Chart Area',
            callback: function(event, hotkey) {
                $rootScope.state.toggle.sidebarChartArea = !$rootScope.state.toggle.sidebarChartArea;
            }
        });
        hotkeys.add({
            combo: '4',
            description: 'Region Chart Whg',
            callback: function(event, hotkey) {
                $rootScope.state.toggle.sidebarChartWhg = !$rootScope.state.toggle.sidebarChartWhg;
            }
        });
        hotkeys.add({
            combo: '5',
            description: 'Buttons',
            callback: function(event, hotkey) {
                $rootScope.state.toggle.chartButtons = !$rootScope.state.toggle.chartButtons;
            }
        });

        hotkeys.add({
            combo: 'g',
            description: 'Toggle Globe',
            callback: function(event, hotkey) {
                $rootScope.state.toggle.globe = !$rootScope.state.toggle.globe;
            }
        });
        hotkeys.add({
            combo: 'b',
            description: 'Sidebar',
            callback: function(event, hotkey) {
                $rootScope.state.hideSidebar = !$rootScope.state.hideSidebar;
            }
        });


        $rootScope.$watch('state.scenarioSlider', function (newValue) {
            console.log(newValue, $rootScope.state.mode);
            if ($rootScope.state.mode == 'scenario') {
                $rootScope.safeApply(function () {
                    if (newValue !== $rootScope.state.year) $rootScope.state.year = newValue;
                });
            }
        });

        $(document).mousewheel((function () {

            var updateMouswheel = _.throttle(function(event) {
                if ($rootScope.state.mode != 'scenario') {
                    var year = $rootScope.getYear((event.deltaY*event.deltaFactor)/100);
                    $rootScope.safeApply(function () {
                        if (year !== $rootScope.state.year) $rootScope.state.year = year;
                    });
                }
            });

            return function (event) {
                 event.preventDefault();
                 updateMouswheel(event);
            };

        }()));

    }]);

}());