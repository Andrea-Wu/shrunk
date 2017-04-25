var loginApp = angular.module('shrunkLogin', ['ngRoute', 'ngAnimate']);

loginApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl: 'views/loginview.html'
    })
    .when('/signup',{
        templateUrl: 'views/signupview.html'
    })
    .otherwise({
        redirectTo: 'views/loginview.html'
    })    
}]);
