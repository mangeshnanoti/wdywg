'use strict';

describe('Directive: googledirective', function () {

  // load the directive's module
  beforeEach(module('wdywgApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<googledirective></googledirective>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the googledirective directive');
  }));
});
