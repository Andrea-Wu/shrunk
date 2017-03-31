(function () {

    function parseDate(dateStr) {
        var date = dateStr.split('/');
        var month = date[0] - 1; //january is 0 in js;
        var day = date[1];
        var year = date[2];
        return new Date(year, month, day);
    }
    var myApp = angular.module('shrunkApp', ['ngAnimate', 'ui.bootstrap', 'ngRoute', 'chart.js', 'angularModalService']);
    myApp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/main.html',
            controller: 'indexCtrl'
        }).when('/main', {
            templateUrl: 'views/main.html',
            controller: 'indexCtrl'
        }).when('/imei', {
            templateUrl: 'views/imei.html',
            controller: 'indexCtrl'
        }).when('/volte', {
            templateUrl: 'views/volte.html',
            controller: 'indexCtrl'
        }).otherwise({
            redirectTo: 'views/main.html',
            controller: 'indexCtrl'
        })
}]);
    myApp.filter('beginWith', function () {
        return function (data, start) {
            return data.slice(start);
        }
    });
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
    });
    myApp.service('SelectDate', function () {
        var self = this;
        self.getNewArray = function (dataArray, dateStart, dateEnd) {
            var newArray = [];
            var index;
            for (index in dataArray) {
                var thisobj = dataArray[index];
                var date = parseDate(thisobj.date);
                var sd = dateStart.getDate();
                var sm = dateStart.getMonth() - 1;
                var sy = dateStart.getFullYear();
                var ed = dateEnd.getDate();
                var em = dateEnd.getMonth() - 1;
                var ey = dateEnd.getFullYear();
                if (date >= new Date(sy, sm, sd) && date <= new Date(ey, em, ed)) {
                    newArray.push(thisobj);
                }
            }
            return newArray;
        }
    });
    myApp.controller('indexCtrl', ['$scope', '$http', 'GetData', function ($scope, $http, GetData) {
        var closesidenav = document.getElementById("closesidenav"),
            openicon = document.getElementById("openicon"),
            sidebar = document.getElementById("sidebar-wrapper"),
            shrunk = document.getElementById("shrunk"),
            dialogoverlay = document.getElementById('dialogoverlay'),
            navlink = document.querySelectorAll(".navlink"),
            winW = window.innerWidth,
            winH = window.innerHeight;

        function openNav() {
            sidebar.style.marginLeft = "0px";
            shrunk.style.width = winW + "px";
            shrunk.style.marginLeft = "340px";
            dialogoverlay.style.display = "block";
            dialogoverlay.style.height = winH + "px";
            dialogoverlay.style.width = winW + "px";
            document.body.style.height = winH + "px";
            document.body.style.overflow = "hidden";
        };

        function closeNav() {
            sidebar.style.marginLeft = "-340px";
            shrunk.style.marginLeft = "0";
            dialogoverlay.style.display = "none";
            document.body.style.overflowY = "scroll";
        };
        openicon.onclick = function () {
            openNav();
        };
        for (i = 0; i < navlink.length; i++) {
            navlink[i].onclick = function () {
                closeNav();
            };
        }
        dialogoverlay.onclick = function () {
            closeNav();
        };

}]);
    myApp.controller('viewController', ['$scope', '$routeParams', function ($scope, $rootScope, $routeParams) {
        //    $scope.result = $rootScope.results[$routeParams.id];
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

    myApp.controller('voLTE', ['$scope', 'SelectDate', 'ModalService', 'GetData', function ($scope, SelectDate, ModalService, GetData) {
        $scope.pageSize = 10;
        $scope.currentPage = 1;
        $scope.showHint = function () {
            // show tooltip
        };

        $scope.tableData = [];
        $scope.newData = [];

        GetData.getTableJson().then(function (data) {
            $scope.tableData = data;
            $scope.newData = $scope.tableData;
        });

        $scope.newDataset = function () {
            $scope.filteredData = [];
            $scope.filteredData = SelectDate.getNewArray($scope.tableData, $scope.dateStart, $scope.dateEnd);
            $scope.newData = $scope.filteredData;
        }

        var modalChart = document.getElementById("modalChart");
        var overlay = document.getElementById("overlayVo");
        $scope.openModal = function (index) {
            modalChart.style.top = "15%";
            overlay.style.height = window.innerHeight + "px";
            overlay.style.width = window.innerWidth + "px";
            $scope.selectedRow = this.tableData[index];
            $scope.modallabels = ["KPI1", "KPI2", "KPI3", "KPI4", "KPI5", "KPI6", "KPI7", "KPI8"];
            $scope.modalseries = ["KPI1-8"];
            $scope.modaldata = [
            $scope.selectedRow.kpi1, $scope.selectedRow.kpi2, $scope.selectedRow.kpi3, $scope.selectedRow.kpi4, $scope.selectedRow.kpi5, $scope.selectedRow.kpi6, $scope.selectedRow.kpi7, $scope.selectedRow.kpi8
        ];
            $scope.modaloptions = {
                animation: {
                    duration: 3000
                }
            };
        };
        $scope.closeModal = function () {
            modalChart.style.top = "-1000px";
            overlay.style.height = "0";
        };
}]);

    myApp.controller('ModalController', function ($scope, close) {
        $scope.close = function (result) {
            close(result, 500); // close, but give 500ms for bootstrap to animate
        };
    });
    myApp.controller('imeiCtrl', ['$scope', 'SelectDate', 'GetData', function ($scope, SelectDate, GetData) {

        $scope.tableData = [];
        $scope.newData = [];

        GetData.getTableJson().then(function (data) {
            $scope.tableData = data;
            $scope.newData = $scope.tableData;
        });

        $scope.newDataset = function () {
            $scope.filteredData = [];
            $scope.filteredData = SelectDate.getNewArray($scope.tableData, $scope.dateStart, $scope.dateEnd);
            $scope.newData = $scope.filteredData;
        }

        $scope.newDataset = function () {
            $scope.filteredData = [];
            $scope.filteredData = SelectDate.getNewArray($scope.tableData, $scope.dateStart, $scope.dateEnd);
            $scope.newData = $scope.filteredData;

            $scope.dateArr = [];
            for (var i = 0; i < $scope.newData.length; i++) {
                $scope.dateArr.push($scope.newData[i].date);
            }
            $scope.kpi1Arr = [];
            for (var i = 0; i < $scope.newData.length; i++) {
                $scope.kpi1Arr.push($scope.newData[i].kpi1);
            }
            $scope.kpi2Arr = [];
            for (var i = 0; i < $scope.newData.length; i++) {
                $scope.kpi2Arr.push($scope.newData[i].kpi2);
            }
            $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72', '#FDB45C'];
            $scope.onClick = function (points, evt) {
                console.log(points, evt);
            };
            $scope.datasetOverride = [{
                yAxisID: 'y-axis-1'
        }, {
                yAxisID: 'y-axis-2'
        }];
            $scope.options = {
                animation: {
                    duration: 3000
                },
                scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left'
                }
                    , {
                            id: 'y-axis-2',
                            type: 'linear',
                            display: false,
                            position: 'right'
                }
              ]
                }
            };
            var linecanvas = document.getElementById("line"),
                barcanvas = document.getElementById("bar");
            $scope.chartType == undefined;
            if ($scope.chartType == "bar") {
                $scope.barlabels = $scope.dateArr;
                $scope.barseries = ['KPI 1', 'KPI 2'];
                $scope.bardata = [$scope.kpi1Arr, $scope.kpi2Arr];
                $scope.labels = undefined;
                $scope.series = undefined;
                $scope.data = undefined;
                linecanvas.style.position = "fixed";
                linecanvas.style.zIndex = "-20";
                barcanvas.style.position = "relative";
                barcanvas.style.zIndex = "0";
            }
            if ($scope.chartType == "line") {
                $scope.labels = $scope.dateArr;
                $scope.series = ['KPI 1', 'KPI 2'];
                $scope.data = [$scope.kpi1Arr, $scope.kpi2Arr];
                $scope.barlabels = undefined;
                $scope.barseries = undefined;
                $scope.bardata = undefined;
                barcanvas.style.position = "fixed";
                barcanvas.style.zIndex = "-20";
                linecanvas.style.position = "relative";
                linecanvas.style.zIndex = "0";
            }
        }
}]);
})();