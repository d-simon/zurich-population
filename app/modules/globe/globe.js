(function () {
    'use strict';

    angular.module('zuriPopApp.globe', [])
        .directive('globe', function () {
            return {
                restrict: 'EA',
                // replace: true,
                // template: '<div class="mapViewer-container"></div>',
                controller: 'globeController',
                link: function postLink ($scope, $element, $attrs) {
                    if (!Detector.webgl) {
                        Detector.addGetWebGLMessage();
                    } else {
                        $scope.lookupTable = {};
                        $scope.lookupBFS = function (lat, lng) {
                            if ($scope.lookupTable[lng] && $scope.lookupTable[lng][lat]) {
                                return $scope.lookupTable[lng][lat];
                            } else {
                                return 0;
                            }
                        };

                        var colorFunctions = {
                            'random': (function () {
                                        var bfsStore = [];

                                        for (var i = 0; i < 300; i++) {
                                            bfsStore[i] = Math.random();
                                        }

                                        return function (x, lng, lat, i) {
                                            // look up BFS with long and lat
                                            var bfs = $scope.lookupBFS(lng, lat);
                                            var sat = +bfs/300;
                                            // console.log(x, sat);

                                            var c = new THREE.Color();
                                            c.setHSL(
                                                (bfs === 0) ? 0 : bfsStore[+bfs] * 0.6, // ( 0.6 - ( x * 0.5 ) ),
                                                (bfs === 0) ? 0 : 1,//sat,
                                                0.5
                                            );
                                            if (x >= 1) console.log('ERROR: x larger than 1! x = ', x);
                                            return c;
                                        };
                                    }()),
                            'greenHillsGreyBlocks': (function () {
                                            var bfsStore = [];

                                            for (var i = 0; i < 300; i++) {
                                                bfsStore[i] = Math.random();
                                            }

                                            return function (x, lng, lat, i) {
                                                var bfs = $scope.lookupBFS(lng, lat);
                                                var sat = +bfs/300;

                                                var c = new THREE.Color();
                                                c.setHSL(
                                                    (bfs === 0) ? 0 : ( (bfsStore[+bfs]* 0.05) + 0.35 - ( x * 0.5 ) ),
                                                    (bfs === 0) ? 0 : (x < 0.001) ? 0.7 - (bfsStore[+bfs] * 0.3) : 0.05,
                                                    0.5 - (x * 0.5)
                                                );
                                                if (x >= 1) console.log('ERROR: x larger than 1! x = ', x);
                                                return c;
                                            };
                                        }()),
                            'greenHillsGreyBlocksBlueLakes': (function () {
                                            var bfsStore = [];

                                            for (var i = 0; i < 300; i++) {
                                                bfsStore[i] = Math.random();
                                            }

                                            return function (x, lng, lat, i) {
                                                var bfs = $scope.lookupBFS(lng, lat);
                                                var sat = +bfs/300;

                                                var c = new THREE.Color();
                                                c.setHSL(
                                                    (bfs === 0) ? 0.6 : ( (bfsStore[+bfs]* 0.05) + 0.35 - ( x * 0.5 ) ),
                                                    (bfs === 0) ? 0.6 : (x < 0.001) ? 0.7 - (bfsStore[+bfs] * 0.3) : 0,
                                                    0.5 - (x * 0.5)
                                                );
                                                if (x >= 1) console.log('ERROR: x larger than 1! x = ', x);
                                                return c;
                                            };
                                        }()),
                            'greenHillsRedBlocksBlueLakes': (function () {
                                            var bfsStore = [];

                                            for (var i = 0; i < 300; i++) {
                                                bfsStore[i] = Math.random();
                                            }

                                            return function (x, lng, lat, i) {
                                                var bfs = $scope.lookupBFS(lng, lat);
                                                var sat = +bfs/300;

                                                var c = new THREE.Color();
                                                c.setHSL(
                                                    (bfs === 0) ? 0.6 : (x < 0.001) ? 0.35 : ( (bfsStore[+bfs]* 0.05) + 0.95 - ( x * 0.3 ) ),
                                                    (bfs === 0) ? 0.6 : (x < 0.001) ? 0.7 - (bfsStore[+bfs] * 0.3) : x * 0.2 + 0.6,//sat,
                                                    0.5 - (x * 0.5)
                                                );
                                                if (x >= 1) console.log('ERROR: x larger than 1! x = ', x);
                                                return c;
                                            };
                                        }())
                        };

                        $scope.globe = new DAT.Globe($element[0], {
                            imgDir: './',
                            // invert: 'x',
                            distanceTarget: 320,
                            zoomDisabled: true,
                            pointSize: 1,
                            colorFn: colorFunctions.greenHillsGreyBlocksBlueLakes
                        });
                    }
                }
            };
        })
        .controller('globeController', ['$scope', '$rootScope', '$timeout', 'dataService', function ($scope, $rootScope, $timeout, dataService) {
            if (Detector.webgl) {

                var tweens = [],
                    inited = false,
                    maxYearT = $rootScope.state.maxYear - $rootScope.state.minYear;

                $scope.setTime = function(globe, t, tMax, tweenDelay) {
                    return function() {
                        // t += 0.05
                        // console.log('setTime', globe, t, tMax);
                        if (t/tMax !== globe.time) {
                            TWEEN.removeAll();
                            if (typeof tweenDelay !== 'undefined' && (tweenDelay === false || tweenDelay === 0)) {
                                globe.time = t/tMax;
                            } else {
                                new TWEEN.Tween(globe)
                                    .to({
                                        time: t / tMax
                                    }, tweenDelay || 500)
                                    .easing(TWEEN.Easing.Cubic.Out)
                                    .onComplete(function () {
                                        // globe.time = t/tMax;
                                    })
                                    .start();
                            }
                        }
                    };
                };

                // Look away!
                dataService.getGlobeLookUpTable().success(function (data) {
                    $scope.lookupTable = data;
                    dataService.getGlobeData().success(function (data) {
                        for (var i = 0; i < data.length; i++) {
                            $scope.globe.addData(data[i][1], {
                                format: 'magnitude',
                                name: data[i][0],
                                animated: true
                            });
                        }
                        $scope.globe.createPoints();
                        $scope.setTime($scope.globe, $rootScope.state.year - $rootScope.state.minYear, maxYearT)();
                        $scope.globe.animate();
                        inited = true;
                    });
                });

                var switching = false;
                $rootScope.$watch('state.mode', function (newMode, oldMode) {
                    var newY;
                    if (inited && newMode !== oldMode) {
                        switching = true;

                        switch(newMode) {
                            case 'scenario':
                                newY = Math.ceil($rootScope.state.maxYearLimit - $rootScope.state.minYear);
                                $scope.setTime($scope.globe, newY, maxYearT)();
                                $timeout(function () {
                                    newY = Math.ceil(($rootScope.state.maxYearLimit - $rootScope.state.minYear) + ($rootScope.state.maxYear - $rootScope.state.maxYearLimit )/2);
                                    $rootScope.state.year = $rootScope.state.minYear + y;
                                    $scope.setTime($scope.globe, newY, maxYearT, false)();
                                    switching = false;
                                }, 550);

                                break;
                            default:
                                newY = Math.ceil(($rootScope.state.maxYearLimit - $rootScope.state.minYear) + ($rootScope.state.maxYear - $rootScope.state.maxYearLimit )/2);
                                $scope.setTime($scope.globe, newY, maxYearT)();

                                $timeout(function () {
                                    var newY = $rootScope.state.maxYearLimit - $rootScope.state.minYear;
                                    $rootScope.state.year = $rootScope.state.maxYearLimit;
                                    $scope.setTime($scope.globe, newY, maxYearT, false)();
                                    switching = false;
                                }, 550);

                                break;
                        }

                    } else {
                         switch(newMode) {
                            case 'scenario':
                                newY = Math.ceil($rootScope.state.maxYearLimit - $rootScope.state.minYear);
                                $scope.setTime($scope.globe, newY, maxYearT)();

                                break;
                            default:
                                newY = Math.ceil(($rootScope.state.maxYearLimit - $rootScope.state.minYear) + ($rootScope.state.maxYear - $rootScope.state.maxYearLimit )/2);
                                $scope.setTime($scope.globe, newY, maxYearT)();

                                break;
                        }
                    }

                });

                $rootScope.$watch('state.year', _.throttle(function (newYear) {
                    if (inited && !switching) {
                        var newY = Math.ceil(newYear - $rootScope.state.minYear);
                        $scope.setTime($scope.globe, newY, maxYearT)();

                    }
                },250));


                $rootScope.$on('zoom', function (event, data) {
                    $scope.globe.zoom(+data);
                });


            }
        }]);
}());