(function () {

var myApp = angular.module("shrunkApp");

    myApp.controller("shorten", ['$scope', '$rootScope', function ($scope, $rootScope) {
        var editInput = document.getElementById("editInput"),
            box1 = document.getElementById("box1"),
            box2 = document.getElementById("box2"),
            primarybtn = document.getElementById("primarybtn"),
            inputGroup = document.getElementById("inputGroup"),
            inputForm = document.getElementById("inputForm");

        function toggleView(btn, content, content2, text1, text2) {
            var maxH = "266px";
            if (content.style.height == maxH) {
                setTimeout(function () {
                    content2.style.visibility = "collapse";
                }, 200);
                setTimeout(function () {
                    content.style.height = "0px";
                }, 200);
                btn.innerText = text2;
            } else {
                content.style.height = maxH;
                setTimeout(function () {
                    content2.style.visibility = "visible";
                }, 350);
                btn.innerText = text1;
            }
        };
        $scope.results = $rootScope.results;

        $scope.addRow = function () {
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

        $scope.removeRow = function (el) {
            var removeRow = $scope.results.indexOf(el);
            $scope.results.splice(removeRow, 1);
        };

        $scope.pageSize = 5;
        $scope.currentPage = 1;

        $scope.editData = function (elrow) {
            $scope.current = elrow;
            editInput.style.display = "block";
        };

        $scope.saveData = function (elrow) {
            $scope.current = {};
            editInput.style.display = "none";
        };

        primarybtn.onclick = function () {
            toggleView(primarybtn, inputGroup, inputForm, "Hide", "Shorten URL");
        };
}]);

})();