'use strict';

describe('Service: awsProvider', function () {

  // load the service's module
  beforeEach(module('wdywgApp'));

  // instantiate service
  var awsProvider;
  beforeEach(inject(function (_awsProvider_) {
    awsProvider = _awsProvider_;
  }));

  it('should do something', function () {
    expect(!!awsProvider).toBe(true);
  });

});
