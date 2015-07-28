'use strict';

angular.module('wdywgApp')
  .controller('MainCtrl', function ($scope, $location,  AWSService, UserService, $sessionStorage) {
        $scope.signedIn = function(oauth) {
            UserService.setCurrentUser(oauth)
                .then(function(user) {
                    $scope.user = user;

                    $scope.sessionStorage =  user

                    $location.path('/map');

                });


//           UserService.counter()
//               .then(function(counter) {
//                $scope.counter = counter;
//            });

        }

  });
