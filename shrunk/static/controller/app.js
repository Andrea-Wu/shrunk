var myApp = angular.module('shrunkApp', ['ngAnimate', 'ui.bootstrap', 'ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl: '/static/views/home.html',
        controller: 'urlShortener'
    })
    .when('/stat/:id',{
        templateUrl: '/static/views/stats.html',
        controller: 'viewController'
    })
    .otherwise({
        redirectTo: '/static/views/home.html',
        controller: 'urlShortener'
    })    
}]);

myApp.filter('beginWith',function(){
    return function(data,start){
        return data.slice(start);
    }
});

myApp.service('myService', function(){
    this.results = []; 
});

myApp.controller('urlShortener', ['$scope', 'myService', function($scope, myService){
    
    var editInput = document.getElementById("editInput"),
        box1 = document.getElementById("box1"),
        box2 = document.getElementById("box2");
    
    $scope.results = myService.results;
    
    $scope.addRow = function(){
        $scope.results.unshift({
            title: $scope.newrow.title,
            longUrl: $scope.newrow.longUrl,
            shortUrl: "test",
            timeCreated: new Date(),
        });
        $scope.newrow.title = "";
        $scope.newrow.longUrl = "";
    };
    
    $scope.pageSize = 5;
    $scope.currentPage = 1; 
    
    $scope.editData = function(elrow){
        $scope.current = elrow;
        editInput.style.display = "table-row";
    };
    
    $scope.saveData = function(elrow){
        $scope.current = {};
        editInput.style.display = "none";
    };

}]);

myApp.controller('viewController',['$scope', 'myService', '$routeParams', function($scope, myService, $routeParams){
    $scope.result = myService.results[$routeParams.id];
}]);
