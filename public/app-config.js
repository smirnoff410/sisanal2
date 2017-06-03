const vpoliteve = angular.module("vpoliteve", [
    'toHome',
    'toProfile',
    'toNews',
    'toGroup',
    'toAbout',
    'ngAnimate',
    'ngCookies',
    'ngRoute'
]);

vpoliteve.
    config(['$routeProvider', '$locationProvider',
        function config($routeProvider, $locationProvider) {
            $locationProvider.hashPrefix('!');
            $routeProvider.when('/profile', {
                template: "<to-profile></to-profile>"
            }).when('/news', {
                template: "<to-news></to-news>"
            }).when('/group', {
                template: "<to-group></to-group>"
            }).when('/about', {
                template: "<to-about></to-about>"
            }).when('/', {
                template: "<to-home></to-home>"
            }).otherwise('/');
        }
    ]);
