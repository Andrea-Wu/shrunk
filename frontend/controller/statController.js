(function () {

var myApp = angular.module("shrunkApp");

myApp.controller('statController', ['$scope', '$rootScope', '$routeParams', 'SelectDate', function ($scope, $rootScope, $routeParams, SelectDate) {
    $scope.result = $rootScope.results[$routeParams.id];
    
     
    $scope.newData = $rootScope.tableData;
    $scope.currentPage = 1;
    $scope.tableSize = 10;
    
   
       

        $scope.newDataset = function () {
            $scope.filteredData = [];
            $scope.filteredData = SelectDate.getNewArray($scope.tableData, $scope.dateStart, $scope.dateEnd);
            $scope.newData = $scope.filteredData;
         }
}]);

})();