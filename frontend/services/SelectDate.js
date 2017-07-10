(function () {

    var myApp = angular.module("shrunkApp");

    myApp.service('ParseDate', function () {
        var self = this;
        self.doParse = function(dateStr){
                    // dateStr is String
        var date = dateStr.split('/');
        var month = date[0] - 1; //january is 0 in js;
        var day = date[1];
        var year = date[2];
        return new Date(year, month, day);
        }

    });

    myApp.service('SelectDate', function(ParseDate) {
        var self = this;
        self.getNewArray = function (dataArray, dateStart, dateEnd) {
            // dataArray is a json obj; each obj is a key-value pair
            // 0: {propa:"sth", propb: "sthelse" }
            // dateStart is Date obj
            // dateEnd is Date obj
            var newArray = [];
            var index;

            for (index in dataArray) {
                var thisobj = dataArray[index];
                var date = ParseDate.doParse(thisobj.dateViewed);
               
                if (date >= dateStart && date <= dateEnd) {
                    newArray.push(thisobj);
                }
            }
            return newArray;
        }
    });

})();