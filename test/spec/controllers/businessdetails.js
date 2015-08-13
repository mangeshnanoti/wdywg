'use strict';

describe('Controller: BusinessdetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('wdywgApp'));

  var BusinessdetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BusinessdetailsCtrl = $controller('BusinessdetailsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
