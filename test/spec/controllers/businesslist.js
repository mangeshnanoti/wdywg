'use strict';

describe('Controller: BusinesslistCtrl', function () {

  // load the controller's module
  beforeEach(module('wdywgApp'));

  var BusinesslistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BusinesslistCtrl = $controller('BusinesslistCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
