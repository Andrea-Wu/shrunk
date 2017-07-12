(function () {
    var myApp = angular.module("shrunkApp");
    myApp.controller("indexController", ['$scope', '$rootScope', '$http', 'GetData', function ($scope, $rootScope, $http, GetData) {
        function getEl(id) {
            return document.getElementById(id);
        }

        function showEl(id) {
            getEl(id).style.display = "block";
        }

        function hideEl(id) {
            getEl(id).style.display = "none";
        }
        
        var closesidenav = getEl("closesidenav")
            , openicon = getEl("openicon")
            , sidebar = getEl("sidebar-wrapper")
            , shrunk = getEl("shrunk")
            , dialogoverlay = getEl('dialogoverlay')
            , navlink = document.querySelectorAll(".navlink")
            , winW = window.innerWidth
            , winH = window.innerHeight;

        function playClip() {
            if (navigator.appName == "Microsoft Internet Explorer" && (navigator.appVersion.indexOf("MSIE 7") != -1) || (navigator.appVersion.indexOf("MSIE 8") != -1)) {
                if (document.all) {
                    document.all.sound.src = "click.mp3";
                }
            }
            else {
                var audio = document.getElementsByTagName("audio")[0];
                audio.play();
            }
        }
        
        function openNav() {
            sidebar.style.marginLeft = "0px";
            shrunk.style.width = winW + "px";
            shrunk.style.marginLeft = "340px";
            dialogoverlay.style.display = "block";
            dialogoverlay.style.height = window.innerWidth + "px";
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
        
        // this will display the user group on the navigation bar
        $scope.userGroup = $rootScope.userGroup;
        
        var aList = document.querySelectorAll('.clickable, .btn');
   
        for(var i=0; i<aList.length; i++){
            aList[i].onmouseover = function(){playClip();};
        }
        
}]);
})();