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
    .when('/blockurl',{
        templateUrl: '/static/views/blockurl.html',
        controller: 'urlShortener'
    })
    .when('/usermgmt',{
        templateUrl: '/static/views/usermgmt.html',
        controller: 'urlShortener'
    })
    .when('/blacklist',{
        templateUrl: '/static/views/blacklist.html',
        controller: 'urlShortener'
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

/*
myApp.service('myService', function(){
    this.results = []; 
});
*/

myApp.run(function($rootScope) {
    $rootScope.results = [];
});

myApp.controller('urlShortener', ['$scope', '$rootScope', function($scope, $rootScope){
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
        shrunk.style.marginLeft = "250px";
        dialogoverlay.style.display = "block";
        dialogoverlay.style.height = winH+"px";
        dialogoverlay.style.width = winW+"px";
    };
    function closeNav() {
        sidebar.style.marginLeft = "-250px";
        shrunk.style.marginLeft = "0";
        dialogoverlay.style.display = "none"; 
    };
    openicon.onclick = function(){
        openNav(); 
    };
    for(i=0; i<navlink.length; i++){
        navlink[i].onclick = function(){
            closeNav();   
        };
    }
    dialogoverlay.onclick = function(){
        closeNav();   
    };    
}]);

myApp.controller('appBody', ['$scope', '$rootScope', function($scope, $rootScope){
    
    
    var editInput = document.getElementById("editInput"),
        box1 = document.getElementById("box1"),
        box2 = document.getElementById("box2"),
        primarybtn = document.getElementById("primarybtn"),
        inputGroup = document.getElementById("inputGroup"),
        inputForm = document.getElementById("inputForm");
        
    function toggleView(btn,content,content2,text1,text2){
        var maxH = "266px";
        if (content.style.height == maxH) {
            setTimeout(function(){content2.style.visibility = "collapse";}, 200);
            setTimeout(function(){content.style.height = "0px";}, 200);
            btn.innerText = text2;
        }
        else {
            content.style.height = maxH;
            setTimeout(function(){content2.style.visibility = "visible";}, 350);
            btn.innerText = text1;
        }
    };
    $scope.results = $rootScope.results;
    
    $scope.addRow = function(){
        $scope.results.unshift({
            title: $scope.newrow.title,
            longUrl: $scope.newrow.longUrl,
            shortUrl: "test",
            alias: $scope.newrow.alias,
            timeCreated: new Date(),
            owner: "userid",
            internalviews: Math.floor(Math.random() * 100),
            externalviews: Math.floor(Math.random() * 100)
        });
        $scope.newrow.title = "";
        $scope.newrow.longUrl = "";
        $scope.newrow.alias = "";    
    };
        
    $scope.removeRow = function(el){
        var removeRow = $scope.results.indexOf(el);
        $scope.results.splice(removeRow, 1);
    };
    
    $scope.pageSize = 4;
    $scope.currentPage = 1; 
    
    $scope.editData = function(elrow){
        $scope.current = elrow;
        editInput.style.display = "block";
    };
    
    $scope.saveData = function(elrow){
        $scope.current = {};
        editInput.style.display = "none";
    };
    
    primarybtn.onclick = function(){
        toggleView(primarybtn,inputGroup,inputForm,"Hide","Shorten URL");
    };
}]);

myApp.controller('viewController',['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $routeParams){
    $scope.result = $rootScope.results[$routeParams.id];   
}]);

myApp.controller('blockurlFX', ['$scope', function($scope){
    $scope.blockurls = [];
    $scope.addUrl = function(){
        $scope.blockurls.unshift({
            list: $scope.newurl.list
        });
        $scope.newurl.list= "";
    };
    
    $scope.removeUrl = function(el){
        var removeurl = $scope.blockurls.indexOf(el);
        $scope.blockurls.splice(removeurl, 1);
    };
}]);

myApp.controller('blacklistFX', ['$scope', function($scope){
    $scope.blUsers = [];
    $scope.addUser = function(){
        $scope.blUsers.unshift({
            list: $scope.newuser.list
        });
        $scope.newuser.list= "";
    };
    
    $scope.removeUser = function(el){
        var removeuser = $scope.blUsers.indexOf(el);
        $scope.blUsers.splice(removeuser, 1);
    };
}]);

myApp.controller('usermgmtFX', ['$scope', function($scope){
    $scope.allUsers = [{fisrtname:'John', lastname:'Smith', netid:'JS123'},{fisrtname:'Clay', lastname:'Slone', netid:'JS345'},{fisrtname:'Neo', lastname:'Matrix', netid:'NM123'},{fisrtname:'Peter', lastname:'Glen', netid:'PG123'},{fisrtname:'Matt', lastname:'Clark', netid:'MC123'}];
    $scope.removeUser = function(el){
        var removeuser = $scope.allUsers.indexOf(el);
        $scope.allUsers.splice(removeuser, 1);
    };
}]);
