var app = angular.module('app');

app.directive('teamNameValidator', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, mCtrl) {
            var regEx = new RegExp("^[a-zA-Z0-9]{1,}$");
            function myValidation(value) {
                if (regEx.test(value)) {
                    mCtrl.$setValidity('teamName', true);
                } else {
                    mCtrl.$setValidity('teamName', false);
                }
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
});