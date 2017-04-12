(function () {

    var myApp = angular.module("shrunkApp");

    myApp.service('orderObjectBy', function () {
        var self = this;
        
        this.doFilter = function (input, attribute) {
   
            if (!angular.isObject(input)) return input;
//            console.log(input);

            //            for (var objectKey in input) {
            //                array.push(input[objectKey]);
            //            }

            input.sort(function (a, b) {
                switch (attribute) {
                    case 'bounceRate':
                        a = parseFloat(a[attribute]);
                        b = parseFloat(b[attribute]);
                        return a - b;
                    case 'dateViewedAsc':
                        a = Date.parse(a['dateViewed']);
                        b = Date.parse(b['dateViewed']);
                        return a - b; 
                    case 'dateViewedDesc':
                        a = Date.parse(a['dateViewed']);
                        b = Date.parse(b['dateViewed']);
                        return b - a;
                    case 'totalView':
                        a = parseInt(a['internalView']) + parseInt(a['externalView']);
                        b = parseInt(b['internalView']) + parseInt(b['externalView']);
                        return a - b;                           
                    default:
                        a = parseInt(a[attribute]);
                        b = parseInt(b[attribute]);
                        return a - b;
                }
            });
//            console.log(input);
            return input;
         
        }
    });
})();