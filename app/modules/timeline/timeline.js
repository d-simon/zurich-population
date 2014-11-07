(function () {
    'use strict';
    angular.module('zuriPopApp.timeline', [])
        .directive('timeline', function () {
            return {
                restrict: 'EAC',
                scope: {
                    'timelineData': '='
                },
                controller: 'timelineController',
                template: '<highchart config="timelineConf" chart-obj="chartObj"></highchart>'
            }
        })
        .controller('timelineController', ['$scope', '$rootScope', function ($scope, $rootScope) {
            $scope.chartObj = {};
            $scope.timelineConf = {
                options: {
                    chart: {
                        width: 400,
                        height: 150,
                        marginTop: 50
                    },
                    credits: {
                        enabled: false
                    },
                    plotOptions: {
                        line: {
                            enableMouseTracking: false, // disable hover events
                            marker: {
                                enabled: false,
                                states: {
                                    hover: {
                                        enabled: false
                                    }
                                }
                            },
                            states: {
                                hover: {
                                    enabled: false,
                                }
                            }
                        },
                    },
                    xAxis: {
                        categories: ['1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'],
                        lineWidth: 0,
                        minorGridLineWidth: 0,
                        lineColor: 'transparent',
                        labels: {
                           enabled: false
                        },
                        minorTickLength: 0,
                        tickLength: 0
                    },
                    yAxis: {
                        lineWidth: 0,
                        minorGridLineWidth: 0,
                        lineColor: 'transparent',
                        labels: {
                           enabled: false
                        },
                        minorTickLength: 0,
                        tickLength: 0,
                        gridLineWidth: 0,
                        title: {
                            text: null
                        }
                    },
                    tooltip: {
                        enabled: true,
                        dontHideOnMouseOut: true,
                        borderRadius: 0,
                        borderWidth: 0,
                        backgroundColor: null,
                        shadow: false,
                        useHTML: true,
                        style: {
                            padding: 0
                        },
                        headerFormat: '<div class="timeline-label">{point.key}</div>',
                        pointFormat: '',
                        footerFormat: '',

                        positioner: function(boxWidth, boxHeight, point) {
                            return {x:point.plotX - 5,y:point.plotY };
                        }
                    },
                    exporting: {
                        enabled: false
                    }
                },
                title: {
                    text: ' ',
                },
                series: [{
                    animation: false,
                    data: [1122778, 1127674, 1133362, 1140100, 1145522, 1154681, 1166039, 1158664, 1162120, 1167087, 1172970, 1176347, 1178394, 1184002, 1193789, 1206708, 1223101, 1237920, 1245683, 1255645, 1264141, 1274384, 1300545, 1326775, 1344866, 1371007, 1390124, 1406083, 1421895],
                    showInLegend: false,
                    color: '#FFF',
                    lineWidth: 1
                }]

            };

            $scope.$watch('chartObj', function () {
                console.log($scope.chartObj);
            });

            $scope.$watch('chartObj.tick', function () {
                if ($scope.chartObj.tooltip && $scope.chartObj.series.length && $scope.chartObj.series[0].points.length) {
                    updateTooltip();
                }
            });

            $rootScope.$watch('state.year', function (newVal) {
                if ($scope.chartObj.tooltip && $scope.chartObj.series.length && $scope.chartObj.series[0].points.length) {
                    updateTooltip();
                }
            });

            $rootScope.$watch('state.mode', function (newVal) {
                if ($scope.chartObj.tooltip && $scope.chartObj.series.length && $scope.chartObj.series[0].points.length) {
                    updateTooltip();
                }
            });


            function normalizeVal (val, max, min) {
                return _.max([min, _.min([max,Math.round(val)])]);
            }

            function updateTooltip () {
                var chartPoints = $scope.chartObj.series[0].points;
                var normalizedValue = normalizeVal($rootScope.state.year, $rootScope.state.maxYearLimit, $rootScope.state.minYear);
                var point = _.deepFindKeyValLimited(chartPoints, 'category', ''+normalizedValue, 2);
                if (point.length) {
                    $scope.chartObj.tooltip.refresh(point[0]);
                } else {
                    console.log('WARNING: No point found in tooltip for year: ', normalizedValue);
                }
            }

        }]);
}());