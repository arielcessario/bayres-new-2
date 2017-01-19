(function () {

    'use strict';

    angular.module('bayres.agreement', [])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/agreement', {
                templateUrl: './agreement/agreement.html',
                controller: 'AgreementController'
            });
        }])
        .controller('AgreementController', AgreementController);

    AgreementController.$inject = ['$scope', '$location', '$window', 'LinksService', '$cookies'];

    function AgreementController($scope, $location, $window, LinksService, $cookies) {
        var vm = this;

        vm.acepto = acepto;
        vm.noAcepto = noAcepto;

        var agree = $cookies.get('agree');

        if(agree != undefined && agree > (new Date).getTime() - (10 * 24 * 60 * 60 * 1000)){
            acepto()
        }

        function acepto() {
            $location.path('/main');
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