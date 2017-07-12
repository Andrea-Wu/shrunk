(function () {
    var myApp = angular.module("shrunkApp");
    myApp.controller('statController', ['$scope', '$rootScope', '$routeParams', 'SelectDate', 'ParseDate', 'OrderObjectBy', 'CreateChart', 'ToggleView', 'GetData', function ($scope, $rootScope, $routeParams, SelectDate, ParseDate, OrderObjectBy, CreateChart, ToggleView, GetData) {
        $scope.result = $rootScope.results[$routeParams.id];
        $scope.newData = $rootScope.tableData;
        $scope.currentPage = 1;
        $scope.tableSize = 10;
        $scope.sortBy = "";
        $scope.clicked = true;
        $scope.lineClicked = false;
        $scope.barClicked = false;
    
        function occurrence(array) {
            var result = {};
            if (array instanceof Array) { // Check if input is array.
                array.forEach(function (v, i) {
                    if (!result[v]) { // Initial object property creation.
                        result[v] = [i]; // Create an array for that property.
                    } else { // Same occurrences found.
                        result[v].push(i); // Fill the array.
                    }
                });
            }
            return result;
        };
        
        var agents;
        $scope.userAgent = {
            data:[],
            labels:[]
        };  
        GetData.getAgentJson().then(function (data) {
            var rawData = [], newRawData = [];
            rawData = data;
            for(var i=0; i< rawData.length; i++){
                newRawData.push(rawData[i].browser.toString());
            }
            agents = occurrence(newRawData);
            $scope.userAgent.labels = Object.getOwnPropertyNames(agents);
            var agentval = Object.values(agents);
            agentval.forEach(function(item){
                $scope.userAgent.data.push(item.length);
            })
        });

        var visualBtn = document.getElementById("visualBtn"), visualGroup = document.getElementById("visualGroup"), visualForm = document.getElementById("visualForm");
        
        visualBtn.onclick = function(){
            ToggleView.toggleButton(visualBtn, visualGroup, visualForm, "Hide", "Start Visualization", "320px");
        }
        
        $scope.newDataset = function () {
            $scope.filteredData = [];
            $scope.filteredData = SelectDate.getNewArray($rootScope.tableData, $scope.dateStart, $scope.dateEnd);
            $scope.filteredData = OrderObjectBy.doFilter($scope.filteredData, $scope.sortBy);
            return $scope.newData = $scope.filteredData;
        }
        $scope.newChart = function (chartType) {
            var chart;
            $scope.chartSeries = {};
            if(chartType == "line"){
                $scope.lineClicked = true;
                $scope.barClicked = false;
            }
            if(chartType == "bar"){
                $scope.barClicked = true;
                $scope.lineClicked = false;
            }
            
            var newData = $scope.newDataset();
            if($scope.fieldToDraw == ''){
                $scope.fieldToDraw = 'internalView';
            }
            chart = CreateChart.createChart(newData, 'dateViewed', $scope.fieldToDraw);
            $scope.chartSeries.labels = chart.dateArr;
            $scope.chartSeries.data = [chart.dataArr];
        }
        
//Color Scheme for Charts
        $scope.colors = ["#E80C81", "#E61184", "#E51688", "#E41B8B", "#E3208F", "#E22693", "#E12B96", "#E0309A", "#DF359E", "#DE3BA1", "#DD40A5", "#DC45A9", "#DB4AAC", "#DA50B0", "#D955B4", "#D85AB7", "#D75FBB", "#D665BF", "#D56AC2", "#D46FC6", "#D374CA", "#D27ACD", "#D17FD1", "#D084D5", "#CF89D8", "#CE8FDC", "#CD94E0", "#CC99E3", "#CB9EE7", "#CAA4EB"];
        
//Settings for Charts
        $scope.datasetOverride = [{
                yAxisID: 'y-axis-1'
                }
                , {
                yAxisID: 'y-axis-2'
                }];
        $scope.options = {
            animation: {
                duration: 3000
            }
            , scales: {
                yAxes: [
                    {
                        id: 'y-axis-1'
                        , type: 'linear'
                        , display: true
                        , position: 'left'
                }
                    , {
                        id: 'y-axis-2'
                        , type: 'linear'
                        , display: false
                        , position: 'right'
                }
              ]
            }
        };

        //end of controllor        
}]);
    //Self-Invoking Function closing    
})();