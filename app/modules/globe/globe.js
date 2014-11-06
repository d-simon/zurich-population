(function () {
    'use strict';

    angular.module('zuriPopApp.globe', [])
        .directive('globe', function () {
            return {
                restrict: 'EA',
                scope: true,
                // replace: true,
                // template: '<div class="mapViewer-container"></div>',
                controller: 'globeController',
                link: function postLink ($scope, $element, $attrs) {
                    console.log($element[0]);
                    if (!Detector.webgl) {
                        Detector.addGetWebGLMessage();
                    } else {
                        $scope.globe = new DAT.Globe($element[0], {
                            imgDir: './',
                            invert: 'x'
                        });
                    }
                }
            };
        })
        .controller('globeController', ['$scope', 'dataService', function ($scope, dataService) {
            if (Detector.webgl) {

                var tweens = [];

                $scope.setTime = function(globe, t, tMax) {
                    return function() {
                        new TWEEN.Tween(globe).to({
                            time: t / tMax
                        }, 500).easing(TWEEN.Easing.Elastic.InOut).start();
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
                    $scope.setTime($scope.globe, 1, 20)();
                    $scope.globe.animate();
                });


            }
        }]);
}());