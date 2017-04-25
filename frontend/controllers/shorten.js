(function () {

var myApp = angular.module("shrunkApp");

    myApp.controller("shorten", ['$scope', '$rootScope', 'ToggleView', function ($scope, $rootScope, ToggleView) {
        var editInput = document.getElementById("editInput"),
            box1 = document.getElementById("box1"),
            box2 = document.getElementById("box2"),
            primarybtn = document.getElementById("primarybtn"),
            inputGroup = document.getElementById("inputGroup"),
            inputForm = document.getElementById("inputForm");
        
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
            ToggleView.toggleButton(primarybtn, inputGroup, inputForm, "Hide", "Shorten URL", "270px");
        };
}]);

})();