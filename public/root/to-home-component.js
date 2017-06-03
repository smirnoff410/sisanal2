angular.module('toHome', []);

angular.
    module('toHome').
    component('toHome', {
        templateUrl: 'public/root/to-home-template.html',
        controller: ['$rootScope', '$http',
            function toHomeController($rootScope, $http) {

            }
        ]
    });
