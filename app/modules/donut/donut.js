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
                        width: 400,
                        height: 300,
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        margin: [0, 120, 0, 30],
                        spacingTop: 0,
                        spacingBottom: 0,
                        spacingLeft: 0,
                        spacingRight: 0
                    },
                    credits: {
                        enabled: false
                    },
                    legend: {
                        align: 'right',
                        borderWidth: 0,
                        layout: 'vertical',
                        itemMarginTop: 7,
                        itemMarginBottom: 7,
                        verticalAlign: 'top',
                        x: -10,
                        y: 60,
                        floating: true,
                        itemStyle: {
                            color: '#FFF'
                        },
                        itemHoverStyle: {
                            color: '#FFF'
                        },
                        useHTML: true,
                        labelFormatter: function () {
                            return ("<span class='highcharts-legend'>" + this.name + "</span>");
                        }
                    },
                    plotOptions: {
                        pie: {

                            innerSize: '50%',
                            size: '65%',
                            center: ['38%'],

                            borderWidth: 0,
                            showInLegend: true,
                            point: {
                                events: {
                                    legendItemClick: function () {
                                        return false; // <== returning false will cancel the default action
                                    }
                                }
                            },
                            dataLabels: {
                                connectorWidth: 1
                            }
                        },
                        series: {
                            dataLabels: {
                                enabled: true,
                                borderRadius: 0,
                                backgroundColor: 'rgba(255, 255, 255, 0.0)',
                                borderWidth: 0,
                                borderColor: '#FFF',
                                connectorWidth: 1, // hide the connector
                                distance: 10,
                                y: 0,
                                x: 0,
                                useHTML: true,
                                formatter: function() {
                                    return ("<span class='highcharts-datalabel'>" + this.y + " %" + "</span>");
                                }
                            },
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
                        ["Siedlungsfläche", 16.2],
                        ["Gewässerfläche", 1.2],
                        ["Landwirtschaftsfläche", 43.4],
                        ["Waldfläche", 31.6],
                        ["Verkehrsfläche", 6.6],
                        ["unproduktive Fläche", 1.1]
                    ],
                    startAngle: 5,
                    endAngle: 175,
                    showInLegend: true,
                    colors: ['#DDD', '#23a5ff', '#39B341', '#16A720', '#098A11', '#098A11']

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
                        ["Siedlungsfläche", 47.4],
                        ["Gewässerfläche", 1.3],
                        ["Landwirtschaftsfläche", 10.1],
                        ["Waldfläche", 26.2],
                        ["Verkehrsfläche", 14.6],
                        ["unproduktive Fläche", 0.4]
                    ].reverse(),
                    startAngle: 185,
                    endAngle: 355,
                    showInLegend: false,
                    colors: ['#DDD', '#23a5ff', '#39B341', '#16A720', '#098A11', '#098A11'].reverse()
                }]
            };

            // $scope.$watch('chartObj', function () {
            //     console.log($scope.chartObj);
            // });

            // dataService.getAreaWhgDaten().success(function (data) {
            // });

            // $rootScope.$watch('state.year', function (newVal) {
            //     if ($scope.chartObj.tooltip && $scope.chartObj.series.length && $scope.chartObj.series[0].points.length) {
            //         updateTooltip();
            //     }
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