(function(){
var myApp = angular.module("shrunkApp");
    myApp.service('GetData', function ($http) {
        var self = this;
        self.getTableJson = function () {
            var promise1 = $http.get('../data/table.json').then(function (response) {
                return response.data;
            });
            return promise1;
        }

        self.getIPJson = function () {
            var promise2 = $http.get('../data/geoip.json').then(function (response) {
                return response.data;
            });
            return promise2;
        }

        self.getUrlJson = function () {
            var promise3 = $http.get('../data/url.json').then(function (response) {
                return response.data;
            });
            return promise3;
        } 

        self.getStatsJson = function () {
            var promise4 = $http.get('../data/stats.json').then(function (response) {
               return response.data;
            });
            return promise4;
        }
    });
})();