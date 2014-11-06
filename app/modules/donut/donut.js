(function () {
    'use strict';
    angular.module('zuriPopApp.donut', [])
        .directive('donut', function () {
            return {
                restrict: 'EAC',
                scope: {
                    'donutData': '='
                },
                controller: 'donutController',
                template: '<highchart config="donutConf" chart-obj="chartObj"></highchart>'
            }
        })
        .controller('donutController', ['$scope', '$rootScope', function ($scope, $rootScope) {
            $scope.chartObj = {};
            $scope.donutConf = {
                options: {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        spacingTop: 0,
                        spacingBottom: 0
                    },
                    colors: ['#39B341', '#16A720', '#098A11',  '#098A11',  '#007207',  '#005406'],
                    credits: {
                        enabled: false
                    },
                    legend: {
                        align: 'right',
                        verticalAlign: 'top',
                        layout: 'vertical',
                        borderWidth: 0,
                        floating: true,
                        itemStyle: {
                            color: '#FFF'
                        },
                        itemHoverStyle: {
                            color: '#FFF'
                        },
                        itemMarginBottom: 10,
                        y: 100,
                        x: -120,
                        useHTML:true,
                        labelFormatter: function () {
                            return ("<span class='highcharts-legend'>" + this.name + "</span>");
                        }
                    },
                    plotOptions: {
                        pie: {
                            borderWidth: 0,
                            showInLegend: true,
                                point: {
                                events: {
                                    legendItemClick: function () {
                                        return false; // <== returning false will cancel the default action
                                    }
                                }
                            }
                        },
                        series: {
                            dataLabels: {
                                enabled: true,
                                borderRadius: 0,
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                borderWidth: 0,
                                borderColor: '#FFF',
                                y: 0,
                                x: 0,
                                useHTML: true,
                                formatter: function() {
                                    return ("<span class='highcharts-datalabel'>" + this.y + " %" + "</span>");
                                }
                            }
                        }
                    },
                    tooltip: {
                        enabled: false
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
                        states: {
                            hover: {
                                enabled: false
                            }
                        },
                    type: 'pie',
                    data: [
                        ["Red", 2],
                        ["Yellow", 5],
                        ["Green", 3]
                    ],
                    center: ['30%'],
                    startAngle: 5,
                    endAngle: 175,
                    name: 'foo',
                    innerSize: '80%',
                    size: '50%',
                    showInLegend: true
                },
                {
                    animation: false,
                        states: {
                            hover: {
                                enabled: false
                            }
                        },
                    type: 'pie',
                    linkedTo: ':previous',
                    data: [
                        ["Red", 1],
                        ["Yellow", 2],
                        ["Green", 7]
                    ],
                    center: ['30%'],
                    startAngle: 185,
                    endAngle: 355,
                    name: 'bar',
                    innerSize: '80%',
                    size: '50%',
                    showInLegend: false
                }]
            };

            $scope.$watch('chartObj', function () {
                console.log($scope.chartObj);
            });

            // $scope.$watch('chartObj.tick', function () {
            //     if ($scope.chartObj.tooltip && $scope.chartObj.series.length && $scope.chartObj.series[0].points.length) {
            //         updateTooltip();
            //     }
            // });

            // dataService.getDonutData().success(function (data) {
            // });


            // $scope.watch('donutData', function () {
            //     // set series
            // });

            // $rootScope.$watch('state.year', function (newVal) {
            //     // set series
            // });

            // function normalizeVal (val, max, min) {
            //     return _.max([min, _.min([max,Math.round(val)])]);
            // }

        }]);
}());