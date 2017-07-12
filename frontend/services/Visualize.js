(function () {
    var myApp = angular.module("shrunkApp");
    myApp.service('CreateChart', function () {
        var self = this;
        var chart = {};
        this.createChart = function (data, xaxis, yaxis, yaxis1) {
            chart.dateArr = [];
            for (var i = 0; i < data.length; i++) {
                chart.dateArr.push(data[i][xaxis]);
            }
            chart.dataArr = [];
            for (var i = 0; i < data.length; i++) {
                chart.dataArr.push(data[i][yaxis]);
            }
            chart.dataArr1 = [];
            for (var i = 0; i < data.length; i++) {
                chart.dataArr1.push(data[i][yaxis1]);
            }
            return chart;
        }
    });
})();