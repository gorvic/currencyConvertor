(function () {
    'use strict';

    //https://docs.angularjs.org/error/ngModel/numfmt
    angular
        .module('vgConvertor.convertor')
        .directive('stringToNumber', stringToNumber);

    function stringToNumber() {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function (value) {
                    return '' + value;
                });
                ngModel.$formatters.push(function (value) {
                    return parseFloat(value);
                });
            }
        };
    }
})();
