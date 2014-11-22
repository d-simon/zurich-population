(function () {
    'use strict';
    angular.module('zuriPopApp.donut', [])
        .directive('donutArea', function () {
            return {
                restrict: 'EAC',
                scope: {
                    'donutData': '='
                },
                controller: 'donutAreaController',
                template: '<highchart config="donutConf" chart-obj="chartObj"></highchart>'
            };
        })
        .controller('donutAreaController', ['$scope', '$rootScope', function ($scope, $rootScope) {
            $scope.chartObj = {};

            $scope.gemeindeId = $rootScope.state.gemeindeId;

            $scope.donutConf = {


                // default donut options

                options: {
                    chart: {
                        width: 400,
                        height: 220,
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        margin: [0, 120, 0, 40],
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
                        y: 30,
                        floating: false,
                        itemStyle: {
                            color: '#FFF',
                            cursor: 'default'
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
                    text: ' ', // don't display a title
                },




                // default series

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
                    colors: ['#DDD', '#23a5ff', '#4f9431', '#79ad63', '#8bb878', '#a5c896']
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
                    colors: ['#DDD', '#23a5ff', '#4f9431', '#79ad63', '#8bb878', '#a5c896'].reverse()
                }]
            };

            function donutUpdate (newData) {
                // "183": "Anteil Landwirtschaftsfläche [%]",
                // "184": "Anteil Waldfläche [%]",
                // "187": "Anteil Verkehrsfläche [%]",
                // "186": "Anteil Siedlungsfläche [%]",
                // "185": "Anteil Gewässerfläche [%]",
                // "459": "Anteil unproduktive Fläche [%]"
                if ($rootScope.data.areaData) {
                    var year = 2007;
                    var indicatorOrder = [186, 185, 183, 184, 187, 459];
                    var array = [];
                    _.forEach(indicatorOrder, function (indicatorId) {
                        array.push($rootScope.data.areaData[''+indicatorId][$rootScope.state.gemeindeId][year]);
                    });

                    array = array.reverse();

                    for (var j = 0; j < $scope.donutConf.series[1].data.length; j++) {
                        $scope.donutConf.series[1].data[j][1] = +array[j];
                    }
                }
            }

            $scope.$watch('donutData', donutUpdate);
            $rootScope.$watch('state.gemeindeId', donutUpdate);

        }])
        .directive('donutWhg', function () {
            return {
                restrict: 'EAC',
                scope: {
                    'donutData': '='
                },
                controller: 'donutWhgController',
                template: '<highchart config="donutConf" chart-obj="chartObj"></highchart>'
            };
        })
        .controller('donutWhgController', ['$scope', '$rootScope', function ($scope, $rootScope) {
            $scope.chartObj = {};

            $scope.gemeindeId = $rootScope.state.gemeindeId;

            $scope.donutConf = {


                // default donut options

                options: {
                    chart: {
                        width: 400,
                        height: 240,
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        margin: [0, 120, 0, 40],
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
                        y: 20,
                        floating: false,
                        itemStyle: {
                            color: '#FFF',
                            cursor: 'default'
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
                    text: ' ', // don't display a title
                },




                // default series

                series: [{
                    animation: false,
                        states: {
                            hover: {
                                enabled: false
                            }
                        },
                    type: 'pie',
                    data: [
                        ["1 Zi.-Wohnungen", 7.1],
                        ["2 Zi.-Wohnungen", 14.4],
                        ["3 Zi.-Wohnungen", 29.0],
                        ["4 Zi.-Wohnungen", 27.7],
                        ["5 Zi.-Wohnungen", 13.8],
                        ["6+ Zi.-Wohnungen", 8.1]
                    ],
                    startAngle: 5,
                    endAngle: 175,
                    showInLegend: true,
                    colors: ['#DDD', '#BBB', '#999', '#777', '#555', '#333']
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
                        ["1 Zi.-Wohnungen", 12.2],
                        ["2 Zi.-Wohnungen", 21.5],
                        ["3 Zi.-Wohnungen", 36.5],
                        ["4 Zi.-Wohnungen", 21.1],
                        ["5 Zi.-Wohnungen", 5.9],
                        ["6+ Zi.-Wohnungen", 2.7]
                    ].reverse(),
                    startAngle: 185,
                    endAngle: 355,
                    showInLegend: false,
                    colors: ['#DDD', '#BBB', '#999', '#777', '#555', '#333'].reverse()
                }]
            };

            function donutUpdate (newData) {
                // "360": "Anteil 1 Zi.-Wohnungen [%]",
                // "361": "Anteil 2 Zi.-Wohnungen [%]",
                // "362": "Anteil 3 Zi.-Wohnungen [%]",
                // "363": "Anteil 4 Zi.-Wohnungen [%]",
                // "364": "Anteil 5 Zi.-Wohnungen [%]",
                // "365": "Anteil 6+ Zi.-Wohnungen [%]",
                if ($rootScope.data.whgData) {
                    var year = 2012;
                    var indicatorOrder = [360, 361, 362, 363, 364, 365];
                    var array = [];
                    _.forEach(indicatorOrder, function (indicatorId) {
                        array.push($rootScope.data.whgData[''+indicatorId][$rootScope.state.gemeindeId][year]);
                    });

                    array = array.reverse();

                    for (var j = 0; j < $scope.donutConf.series[1].data.length; j++) {
                        $scope.donutConf.series[1].data[j][1] = +array[j];
                    }
                }
            }

            $scope.$watch('donutData', donutUpdate);
            $rootScope.$watch('state.gemeindeId', donutUpdate);

        }]);
}());