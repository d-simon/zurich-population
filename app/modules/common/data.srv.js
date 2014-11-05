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

            return service;
        }]);

}());