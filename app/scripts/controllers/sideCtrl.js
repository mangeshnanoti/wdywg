'use strict';

angular.module('wdywgApp')
    .controller('sideCtrl', function ($scope, $location,AWSService, UserService) {


        $scope.submit = function () {
            $scope.Business = [{
            BusinessName : this.BusinessName,
            BusinessType : this.BusinessType,
            Address : this.Address,
            City : this.City,
            ZIP : this.ZIP,
            PhoneNo : this.PhoneNo,
            DeviceId : this.DeviceId,
            FbUrl : this.FbUrl
        }]

        UserService.addBusiness($scope.Business[0]).then(function (data) {
            $location.path('/addbizsuccess');
        });

        }


        $scope.onFile = function(files) {
            console.log(files)
            UserService.uploadBusinessImage(files)
                .then(function(data) {
                    console.log(data)
                });
        }


//           UserService.counter()
//            .then(function(counter) {
//                $scope.counter = counter;
//                console.log($scope.counter);
//            });



    })