(function(){
    
var myApp = angular.module("shrunkApp");
myApp.controller("indexCtrl", ['$scope', '$rootScope', '$http', 'GetData', function ($scope, $rootScope, $http, GetData) {
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
        shrunk.style.width = winW + "px";
        shrunk.style.marginLeft = "340px";
        dialogoverlay.style.display = "block";
        dialogoverlay.style.height = window.innerWidth+ "px";
        dialogoverlay.style.width = window.innerWidth + "px";
        document.body.style.height = window.innerHeight + "px";
        document.body.style.overflow = "hidden";
    };

    function closeNav() {
        sidebar.style.marginLeft = "-340px";
        shrunk.style.marginLeft = "0";
        dialogoverlay.style.display = "none";
        document.body.style.overflowY = "scroll";
    };
    openicon.onclick = function () {
        openNav();
    };
    for (i = 0; i < navlink.length; i++) {
        navlink[i].onclick = function () {
            closeNav();
        };
    }
    dialogoverlay.onclick = function () {
        closeNav();
    };
    
    $scope.userGroup = $rootScope.userGroup;
}]);

})();
