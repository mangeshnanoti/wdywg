angular.module('wdywgApp.services', [])
.factory('UserService', function($q, $http, AWSService) {
  var service = {
    _user: null,
    UsersTable: "Users",
    UserItemsTable: "UsersItems",
    ChargeTable: "UserCharges",
    Bucket: 'ng-newsletter-example'
    return service;
})
