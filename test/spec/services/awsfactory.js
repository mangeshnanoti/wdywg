'use strict';

describe('Service: awsfactory', function () {

  // load the service's module
  beforeEach(module('wdywgApp'));

  // instantiate service
  var awsfactory;
  beforeEach(inject(function (_awsfactory_) {
    awsfactory = _awsfactory_;
  }));

  it('should do something', function () {
    expect(!!awsfactory).toBe(true);
  });

});
