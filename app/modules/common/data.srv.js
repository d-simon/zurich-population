(function () {
    'use strict';

    angular.module('zuriPopApp.common')
        .factory('dataService', ['Config', '$http', function (Config, $http) {
            var service = {},
                url = Config.data.url;

            service.getGemeindeKeys = function () {
                return $http.get(url + '/gemeindenr_zh.json');
            };

            service.getPopulationKanton = function () {
                return $http.get(url + '/bev_zh_kantonal.json');
            };

            service.getPopulationGemeinden = function () {
                return $http.get(url + '/bev_zh_gemeinden.json');
            };

            service.getGlobeData = function () {
                return $http.get(url +'/wohnform_ratio_all_5_flat.json');
            };

            service.getIndikatorDaten = function () {
                return $http.get(url +'/indikatoren_zh_gemeinden.json');
            };

            service.getAreaWhgDaten = function () {
                return $http.get(url +'/Area_and_Whg.min.json');
            };

            return service;
        }]);

}());