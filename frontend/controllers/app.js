(function () {
    "use strict";
    var myApp = angular.module("shrunkApp", ['ngAnimate', 'ui.bootstrap', 'ngRoute', 'chart.js', 'angularModalService']);
    myApp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/home.html'
            , controller: 'indexCtrl'
        }).when('/', {
            templateUrl: 'views/home.html'
            , controller: 'indexCtrl'
        }).when('/imei', {
            templateUrl: 'views/imei.html'
            , controller: 'indexCtrl'
        }).when('/volte', {
            templateUrl: 'views/volte.html'
            , controller: 'indexCtrl'
        }).when('/stat/:id', {
            templateUrl: 'views/stats.html'
            , controller: 'statController'
        }).when('/blockurl', {
            templateUrl: 'views/blockurl.html'
            , controller: 'indexCtrl'
        }).when('/usermgmt', {
            templateUrl: 'views/usermgmt.html'
            , controller: 'indexCtrl'
        }).when('/blacklist', {
            templateUrl: 'views/blacklist.html'
            , controller: 'indexCtrl'
        }).otherwise({
            redirectTo: 'views/home.html'
            , controller: 'indexCtrl'
        });
}]);
    myApp.filter('beginWith', function () {
        return function (data, start) {
            return data.slice(start);
        }
    });

    myApp.run(function ($rootScope, GetData) {
        $rootScope.results = [];
        GetData.getUrlJson().then(function (data) {
            $rootScope.results = data;
        });
        $rootScope.userGroup = ["Administrator", "Power User", "User"];
        $rootScope.tableData = [];
        GetData.getStatsJson().then(function (data) {
            $rootScope.tableData = data;
        });
    });
    
    myApp.controller('blockurlFX', ['$scope', function ($scope) {
        $scope.blockurls = [];
        $scope.addUrl = function () {
            $scope.blockurls.unshift({
                list: $scope.newurl.list
            });
            $scope.newurl.list = "";
        };
        $scope.removeUrl = function (el) {
            var removeurl = $scope.blockurls.indexOf(el);
            $scope.blockurls.splice(removeurl, 1);
        };
}]);
    myApp.controller('blacklistFX', ['$scope', function ($scope) {
        $scope.blUsers = [];
        $scope.addUser = function () {
            $scope.blUsers.unshift({
                list: $scope.newuser.list
            });
            $scope.newuser.list = "";
        };
        $scope.removeUser = function (el) {
            var removeuser = $scope.blUsers.indexOf(el);
            $scope.blUsers.splice(removeuser, 1);
        };
}]);
    myApp.controller('usermgmtFX', ['$scope', function ($scope) {
        $scope.allUsers = [{
            fisrtname: 'John'
            , lastname: 'Smith'
            , netid: 'JS123'
    }, {
            fisrtname: 'Clay'
            , lastname: 'Slone'
            , netid: 'JS345'
    }, {
            fisrtname: 'Neo'
            , lastname: 'Matrix'
            , netid: 'NM123'
    }, {
            fisrtname: 'Peter'
            , lastname: 'Glen'
            , netid: 'PG123'
    }, {
            fisrtname: 'Matt'
            , lastname: 'Clark'
            , netid: 'MC123'
    }];
        $scope.removeUser = function (el) {
            var removeuser = $scope.allUsers.indexOf(el);
            $scope.allUsers.splice(removeuser, 1);
        };
}]);

    myApp.controller('mainCtrl', ['$scope', 'GetData', function ($scope, GetData) {
        IPMapper.initializeMap("ipMap");
        var ipArray = [];
        GetData.getIPJson().then(function (data) {
            for (i = 0; i < data.length; i++) {
                ipArray.push(data[i].ipAddress);
            }
            IPMapper.addIPArray(ipArray);
        });
}]);
    
})();