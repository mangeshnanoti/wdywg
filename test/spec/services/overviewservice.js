'use strict';

describe('Service: overviewService', function () {

  // load the service's module
  beforeEach(module('wdywgApp'));

  // instantiate service
  var overviewService;
  beforeEach(inject(function (_overviewService_) {
    overviewService = _overviewService_;
  }));

  it('should do something', function () {
    expect(!!overviewService).toBe(true);
  });

});
