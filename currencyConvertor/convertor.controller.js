(function () {

    angular
        .module('vgConvertor.convertor')
        .controller('ConvertorController', ConvertorController);

    ConvertorController.$inject = ['$filter', 'convertorService'];

    function ConvertorController($filter, convertorService) {

        var vm = this;
        vm.currencies = [];
        vm.amount = '';
        vm.currencyFrom = '';
        vm.currencyTo = '';
        vm.result = 0;

        vm.resultIsShown = false;
        vm.isLoading = false;
        vm.errorWhileLoading = false;

        vm.isAboveZero = isAboveZero;

        vm.onSubmit = onSubmit;
        vm.getAllCurrencies = getAllCurrencies;


        activate();

        ///////////////////////
        function onSubmit() {
            var result = convertorService.convert(vm.amount, vm.currencyFrom, vm.currencyTo);

            vm.result = $filter('currency')(vm.amount, vm.currencyFrom.CharCode) + ' is converted to ' +
                $filter('currency')(result, vm.currencyTo.CharCode);

            vm.resultIsShown = true;
        }

        function getAllCurrencies() {
            convertorService.getAllCurrencies()
                .then(function (response) {
                    vm.currencies = response;
                    //if (vm.currencies.length) {
                    //    vm.currencyFrom = vm.currencies[0];
                    //}
                    vm.isLoading = false;
                })
                .catch(function (error) {
                    vm.isLoading = false;
                    vm.errorWhileLoading = true;
                });
        }

        function isAboveZero(amount) {

            function isNumeric(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            }

            if (isNumeric(amount)) {
                return amount > 0;
            } else {
                return true; //предупреждения только для чисел
            }
        }


        function activate() {
            vm.isLoading = true;
            getAllCurrencies();
        }
    }
})();
