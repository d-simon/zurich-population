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
                            invert: 'x',
                            zoomDisabled: true
                        });
                    }
                }
            };
        })
        .controller('globeController', ['$scope', '$rootScope', 'dataService', function ($scope, $rootScope, dataService) {
            if (Detector.webgl) {

                var tweens = [],
                    inited = false,
                    maxYearT = $rootScope.state.maxYear - $rootScope.state.minYear;

                $scope.setTime = function(globe, t, tMax) {
                    return function() {
                        // console.log('setTime', globe, t, tMax);
                        if (t/tMax !== globe.time) {
                            TWEEN.removeAll()
                            new TWEEN.Tween(globe)
                                .to({
                                    time: t / tMax
                                }, 500)
                                .easing(TWEEN.Easing.Cubic.Out)
                                .start();
                        }
                    };
                };
                // console.log(dataService.getGlobeData());
                dataService.getGlobeData().success(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        $scope.globe.addData(data[i][1], {
                            format: 'magnitude',
                            name: data[i][0],
                            animated: true
                        });
                    }
                    $scope.globe.createPoints();
                    $scope.setTime($scope.globe, 19, maxYearT)();
                    $scope.globe.animate();
                    inited = true;
                });


                $rootScope.$watch('state.year', _.throttle(function (newYear) {
                    var y = Math.round(newYear - $rootScope.state.minYear);
                    if (inited) $scope.setTime($scope.globe, y, maxYearT)();
                },132));


            }
        }]);
}());