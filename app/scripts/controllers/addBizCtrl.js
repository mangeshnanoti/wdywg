'use strict';

angular.module('wdywgApp')
  .controller('addBizCtrl', function ($scope, $location) {
  	$scope.addNewBiz = function(){
  	$location.path('/sidePage');	
  	}
  })