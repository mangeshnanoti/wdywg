'use strict';

describe('Service: awsprovider', function () {

  // load the service's module
  beforeEach(module('wdywgApp'));

  // instantiate service
  var awsprovider;
  beforeEach(inject(function (_awsprovider_) {
    awsprovider = _awsprovider_;
  }));

  it('should do something', function () {
    expect(!!awsprovider).toBe(true);
  });

});
