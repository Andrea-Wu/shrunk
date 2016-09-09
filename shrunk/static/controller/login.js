var loginApp = angular.module('shrunkLogin', ['ngRoute', 'ngAnimate']);

loginApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl: '/static/views/loginview.html'
    })
    .when('/signup',{
        templateUrl: '/static/views/signupview.html'
    })
    .otherwise({
        redirectTo: '/static/views/loginview.html'
    })    
}]);
