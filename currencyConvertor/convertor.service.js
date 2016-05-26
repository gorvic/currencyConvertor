//Using John Papa's styleguide on factories
//https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#accessible-members-up-top

angular
    .module('vgConvertor')
    .factory('convertorService', convertorService);


// this straightforward $inject is just a little bit faster:
//https://toddmotto.com/angular-js-dependency-injection-annotation-process/
convertorService.$inject = ['$http']; //or ngAnnotate.

function convertorService($http) {


    var API = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%27http%3A%2F%2Fwww.cbr.ru%2Fscripts%2FXML_daily.asp%3F%27&format=json&diagnostics=true&callback="
    //API = 'currencies.json';

    //factory interface
    var service = {
        getAllCurrencies: getAllCurrencies,
        convert: convert
    };
    return service;

    ////////////

    function getAllCurrencies() {
        return $http.get(API)
            .then(function (response) {
                return response.data.query.results.ValCurs.Valute;
            })
            .catch(function (error) {
                return error.data +' ' + error.status  + ' (' + error.statusText +')'
            });
    }

    function convert(amount, currencyFrom, currencyTo) {
        var fromValue = currencyFrom.Value.replace(/,/g,'.'),
            toValue = currencyTo.Value.replace(/,/g, '.');

        return amount * +fromValue / +toValue;
    }
}