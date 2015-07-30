'use strict';

angular.module('wdywgApp')
  .controller('sideCtrl', ['$scope', function ($scope, $location) {
  	$scope.submit = function(){
  	$scope.BusinessName = this.BusinessName
  	$scope.BusinessType = this.BusinessType
  	$scope.Address = this.Address
  	$scope.City = this.City
  	$scope.ZIP = this.ZIP
  	$scope.PhoneNo = this.PhoneNo
	$scope.DeviceId = this.DeviceId
	$scope.FbUrl = this.FbUrl
  console.log($scope.City);
  	}
  }])