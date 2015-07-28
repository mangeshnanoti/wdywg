'use strict';

describe('Service: awsservice', function () {

  // load the service's module
  beforeEach(module('wdywgApp'));

  // instantiate service
  var awsservice;
  beforeEach(inject(function (_awsservice_) {
    awsservice = _awsservice_;
  }));

  it('should do something', function () {
    expect(!!awsservice).toBe(true);
  });

});
