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
                        $scope.globe = new DAT.Globe($element[0], {
                            imgDir: './',
                            // invert: 'x',
                            distanceTarget: 400,
                            zoomDisabled: true
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
                // console.log(dataService.getGlobeData());
                dataService.getGlobeData().success(function (data) {
                    // console.log(data[0][0]);
                        console.log(data.length)
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

                var switching = false;
                $rootScope.$watch('state.mode', function (newMode, oldMode) {
                    if (inited && newMode !== oldMode) {
                        switching = true;

                        switch(newMode) {
                            case 'scenario':
                                var y = Math.ceil($rootScope.state.maxYearLimit - $rootScope.state.minYear);
                                $scope.setTime($scope.globe, y, maxYearT)();
                                $timeout(function () {
                                    y = Math.ceil(($rootScope.state.maxYearLimit - $rootScope.state.minYear) + ($rootScope.state.maxYear - $rootScope.state.maxYearLimit )/2);
                                    $rootScope.state.year = $rootScope.state.minYear + y;
                                    $scope.setTime($scope.globe, y, maxYearT, false)();
                                    switching = false;
                                }, 550);

                                break;
                            case 'default':
                            default:
                                var y = Math.ceil(($rootScope.state.maxYearLimit - $rootScope.state.minYear) + ($rootScope.state.maxYear - $rootScope.state.maxYearLimit )/2);
                                $scope.setTime($scope.globe, y, maxYearT)();

                                $timeout(function () {
                                    var y = $rootScope.state.maxYearLimit - $rootScope.state.minYear;
                                    $rootScope.state.year = $rootScope.state.maxYearLimit;
                                    $scope.setTime($scope.globe, y, maxYearT, false)();
                                    switching = false;
                                }, 550);

                                break;
                        }

                    } else {
                         switch(newMode) {
                            case 'scenario':
                                var y = Math.ceil($rootScope.state.maxYearLimit - $rootScope.state.minYear);
                                $scope.setTime($scope.globe, y, maxYearT)();

                                break;
                            case 'default':
                            default:
                                var y = Math.ceil(($rootScope.state.maxYearLimit - $rootScope.state.minYear) + ($rootScope.state.maxYear - $rootScope.state.maxYearLimit )/2);
                                $scope.setTime($scope.globe, y, maxYearT)();

                                break;
                        }
                    }

                });

                $rootScope.$watch('state.year', _.throttle(function (newYear) {
                    if (inited && !switching) {
                        var y = Math.ceil(newYear - $rootScope.state.minYear);
                        $scope.setTime($scope.globe, y, maxYearT)();

                    }
                },250));


            }
        }]);
}());