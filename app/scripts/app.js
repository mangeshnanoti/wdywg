'use strict';

angular
    .module('wdywgApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'ng-bootstrap-datepicker',
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
            .when('/dashboard', {
                templateUrl: 'views/template/dashboard.html',
                controller: 'DashboardCtrl'
            })
            .when('/login', {
                templateUrl: '/views/template/login.html',
                controller: 'LoginCtrl'
            })
            .when('/businessList', {
                templateUrl: '/views/template/businessDetail/businessList.html',
                controller: 'BusinesslistCtrl'
            })
            .when('/businessListMap', {
                templateUrl: '/views/template/businessDetail/businessListMap.html',
                controller: 'BusinesslistCtrl'
            })
            .when('/overView', {
                templateUrl: '/views/template/businessDetail/overView.html',
                controller: 'OverviewCtrl'
            })
            .when('/dailyTrends', {
                templateUrl: '/views/template/businessDetail/dailyTrends.html',
                controller: 'OverviewCtrl'
            })
            .when('/promotions', {
                templateUrl: '/views/template/businessDetail/promotions.html',
                controller: 'OverviewCtrl'
            })
            .when('/abandonment', {
                templateUrl: '/views/template/businessDetail/abandonment.html',
                controller: 'OverviewCtrl'
            })
            .when('/counterName', {
                templateUrl: '/views/template/businessDetail/counterName.html',
                controller: 'OverviewCtrl'
            })
            .when('/counterConfiguration', {
                templateUrl: '/views/template/counter/counterConfiguration.html',
                controller: 'CounterCtrl'
            })
            .otherwise({
                redirectTo: '/'
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