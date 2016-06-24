var app = angular.module('app');
app.service('employeesService', ["$http", function ($http) {
    var getData = function () {
        return $http({ method: "GET", url: 'app/data/staff.json' }).then(function (result) {
            return result.data;
        });
    }
    return { getData: getData }
}]);
