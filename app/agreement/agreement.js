(function () {

    'use strict';

    angular.module('bayres.agreement', [])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/agreement', {
                templateUrl: './agreement/agreement.html',
                controller: 'AgreementController'
            });
            $routeProvider.when('/agreement/:id', {
                templateUrl: './agreement/agreement.html',
                controller: 'AgreementController'
            });
        }])
        .controller('AgreementController', AgreementController);

    AgreementController.$inject = ['$scope', '$location', '$window', 'LinksService', '$cookies', '$routeParams'];

    function AgreementController($scope, $location, $window, LinksService, $cookies, $routeParams) {
        var vm = this;

        vm.acepto = acepto;
        vm.noAcepto = noAcepto;
        vm.id = $routeParams.id;

        var agree = $cookies.get('agree');

        if(agree != undefined && agree > (new Date).getTime() - (10 * 24 * 60 * 60 * 1000)){
            acepto()
        }

        function acepto() {
            if(vm.id != undefined)
            {
                LinksService.pedidoId = vm.id;
                $location.path('/micuenta');
            }else{
                $location.path('/main');
            }
            LinksService.agreement = false;
            LinksService.showPage = true;
            $cookies.put('agree', (new Date()).getTime());
            LinksService.broadcast();
        }

        function noAcepto() {
            $window.location.href = 'http://www.google.com';
        }
    }


})();