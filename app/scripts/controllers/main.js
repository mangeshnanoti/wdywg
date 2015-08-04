'use strict';

angular.module('wdywgApp')
  .controller('MainCtrl', function ($scope, $location,  AWSService, UserService ) {

        $scope.signedIn = function(oauth) {
            UserService.setCurrentUser(oauth)
                .then(function(user) {
                    $scope.user = user;
                    $location.path('/sidePage');

                });


//           UserService.counter()
//               .then(function(counter) {
//                $scope.counter = counter;
//            });

        }

  });



