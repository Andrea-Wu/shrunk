(function () {
    var myApp = angular.module("shrunkApp");
    myApp.controller('statController', ['$scope', '$rootScope', '$routeParams', 'SelectDate', 'ParseDate', 'OrderObjectBy', 'CreateChart', 'ToggleView', function ($scope, $rootScope, $routeParams, SelectDate, ParseDate, OrderObjectBy, CreateChart, ToggleView) {
        $scope.result = $rootScope.results[$routeParams.id];
        $scope.newData = $rootScope.tableData;
        $scope.currentPage = 1;
        $scope.tableSize = 10;
        $scope.sortBy = "";
        $scope.clicked = true;
        $scope.lineClicked = false;
        $scope.barClicked = false;
        
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
            $scope.labels = chart.dateArr;
            $scope.data = [chart.dataArr];
        }
        
        $scope.colors = ['#ff6384'];
//        $scope.onClick = function (points, evt) {
//            console.log(points, evt);
//        };
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