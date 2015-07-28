'use strict';

describe('Service: StripeService', function () {

  // load the service's module
  beforeEach(module('wdywgApp'));

  // instantiate service
  var StripeService;
  beforeEach(inject(function (_StripeService_) {
    StripeService = _StripeService_;
  }));

  it('should do something', function () {
    expect(!!StripeService).toBe(true);
  });

});
