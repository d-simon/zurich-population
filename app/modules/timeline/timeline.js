(function () {
    'use strict';
    angular.module('zuriPopApp.timeline', [])
        .directive('timeline', function () {
            return {
                restrict: 'EAC',
                scope: {
                    'timelineData': '='
                },
                template: '<highchart config="highchartsConf"></highchart>',
                link: function postLink (scope, element, attrs) {

                    scope.highchartsConf = {
                        chart: {
                            backgroundColor: null,
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            borderWidth: 0,
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
                                color: '#000'
                            },
                            itemHoverStyle: {
                                color: '#000'
                            },
                            itemMarginBottom: 10,
                            y: 100,
                            x: -120
                        },
                        plotOptions: {
                            pie: {
                                point: {
                                    events: {
                                        legendItemClick: function() {
                                            this.select();
                                            //elm.tooltip.refresh(this);
                                            return false;
                                        },
                                        mouseOver: function() {
                                            this.select();
                                            //elm.tooltip.refresh(this);
                                            return false;
                                        }
                                    }
                                },
                                borderWidth: 0,
                                borderColor: 'rgba(0,0,0,0)',
                                showInLegend: true
                            },
                            series: {
                                animation: false,
                                dataLabels: {
                                    enabled: false,
                                    style: {
                                        color: '#fff',
                                        fontFamily: '"Exo 2", Helvetica Neue, Helvetica, Arial, sans-serif',
                                        fontSize: '13px',
                                        fontWeight: 'bold'
                                    },
                                    format: '{point.percentage}%',
                                    useHTML: true
                                },
                                states: {
                                    hover: {
                                        enabled: false
                                    }
                                },
                            }
                        },
                        series: [{
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
                            showInLegend: true,
                            borderWidth: 0
                        },
                        {
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
                            showInLegend: false,
                            borderWidth: 0
                        }],
                        title: {
                            margin: 0,
                            style: {
                                color: '#fff',
                                fontFamily: '"Exo 2", Helvetica Neue, Helvetica, Arial, sans-serif',
                                fontSize: '13px',
                                fontWeight: 'bold'
                            },
                            text: '',
                            useHTML: true
                        },
                        tooltip: {
                            enabled: false
                        },
                        exporting: {
                            enabled: false
                        }
                    };
                }
            }
        });

}());