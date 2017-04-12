(function () {

    var myApp = angular.module("shrunkApp");

    myApp.controller('statController', ['$scope', '$rootScope', '$routeParams', 'SelectDate', 'ParseDate', 'orderObjectBy', function ($scope, $rootScope, $routeParams, SelectDate, ParseDate, orderObjectBy) {
        $scope.result = $rootScope.results[$routeParams.id];


        $scope.newData = $rootScope.tableData;
        $scope.currentPage = 1;
        $scope.tableSize = 10;
        $scope.key = "";
        
        $scope.newDataset = function () {
            $scope.filteredData = [];
            $scope.filteredData = SelectDate.getNewArray($rootScope.tableData, $scope.dateStart, $scope.dateEnd);
            console.log($scope.key);
            $scope.filteredData = orderObjectBy.doFilter($scope.filteredData, $scope.key);
            console.log($scope.filteredData);
            $scope.newData = $scope.filteredData;
        }
}]);

})();