(function () {
    var myApp = angular.module("shrunkApp");
    myApp.service('ToggleView', function () {
        this.toggleButton = function (btn, outerBox, content, text1, text2, maxH) {
            if (outerBox.style.height == maxH) {
                setTimeout(function () {
                    content.style.visibility = "collapse";
                }, 200);
                setTimeout(function () {
                    outerBox.style.height = "0px";
                }, 200);
                btn.innerText = text2;
            } else {
                outerBox.style.height = maxH;
                setTimeout(function () {
                    content.style.visibility = "visible";
                }, 350);
                btn.innerText = text1;
            }
        }
    });
})();