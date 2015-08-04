'use strict';

angular
    .module('wdywgApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'uiGmapgoogle-maps',
        'wdywgApp.services',
        'wdywgApp.directives'
    ])
    .config(function (AWSServiceProvider) {
        AWSServiceProvider
            .setArn('arn:aws:iam::485271511689:role/google-web-role');
    })
//    .config(function (StripeServiceProvider) {
//        StripeServiceProvider.setPublishableKey('pk_test_YOURKEY');
//    })
    .config(function (uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: '',
            v: '3',
            libraries: 'weather,geometry,visualization'
        });
    })
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/map', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            })
            .when('/ngMap', {
                templateUrl: 'views/map.html',
                controller: 'mapCtrl'
            })
                .when('/registerCustomer',{
                templateUrl: '/views/template/registerCustomer.html',
                controller: 'addBizCtrl'
            })
            .when('/dashboard', {
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardCtrl'
            })
              .when('/sidePage',{
              templateUrl: '/views/template/sidePage.html',
              controller: 'sideCtrl'
            })
            .when('/addbizsuccess',{
                templateUrl: '/views/template/addbizsuccess.html',
                controller: 'sideCtrl'
            })
                .otherwise({
                redirectTo:'/'
            });
    })


window.onLoadCallback = function () {
    angular.element(document).ready(function () {
        gapi.client.load('oauth2', 'v2', function () {
//            angular.bootstrap(
//                document,
//                ['wdywgApp']
//            );

        });
    });

}