var loginApp = angular.module('vmasLogin', ['ngRoute', 'ngAnimate']);

loginApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl: 'views/loginview.html'
    })
    .when('/login',{
        templateUrl: 'views/loginview.html'
    })
    .when('/signup',{
        templateUrl: 'views/signupview.html'
    })
    .otherwise({
        redirectTo: 'views/loginview.html'
    })    
}]);

loginApp.controller('loginCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
    
}]);

loginApp.controller('signupCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
    
}]);