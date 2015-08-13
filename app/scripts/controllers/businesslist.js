'use strict';

angular.module('wdywgApp')
  .controller('BusinesslistCtrl', function ($scope,$location, uiGmapGoogleMapApi, uiGmapIsReady, AWSService, UserService,$interval,businessService) {


       $scope.businessList = businessService.getBusinessList();

        console.log ($scope.businessList)


        $scope.overView = function() {
            $location.path('/overView');
        }

        $scope.showBusinessMap = true;
        $scope.showBusinessList = true;

        $scope.ShowMapView = function () {
            $location.path('/businessListMap');
//            $scope.showBusinessMap = true;
//            $scope.showBusinessList = false;
        }

        $scope.ShowListView = function () {
            $location.path('/businessList');
//            $scope.showBusinessMap = false;
//            $scope.showBusinessList = true;
        }





        $scope.map = {
            center: {
                latitude: 30.423881,
                // Float longitude is broken. Try with an integer, it works !
                longitude: -97.846098
            },
            zoom: 10,
            dragging: false,
            bounds: {},
            markers: []
        };

        uiGmapIsReady.promise().then(function () {

            $scope.counter =  UserService.counter();

            UserService.counter()
                .then(function(counter) {
                    $scope.counter = counter;
                    console.log($scope.counter);
                    $scope.map.markers = [
                        {
                            id: 1,
                            latitude: 30.423881,
                            longitude: -97.846098,
                            showWindow: true,
//                        women:2,
//                        men: 3,
                            women:$scope.counter.Items[0].DataCount.M.WomenIn.N,
                            men:$scope.counter.Items[0].DataCount.M.MenIn.N,
                            options : {
                                boxClass: 'custom-info-window',
                                disableAutoPan: true
                            }
                        },
                        {
                            id: 2,
                            latitude: 30.418552,
                            longitude: -97.678556,
                            showWindow: true,
                            options : {
                                boxClass: 'custom-info-window',
                                disableAutoPan: true
                            }
                        },
                        {
                            id: 3,
                            latitude: 30.177852,
                            longitude:-97.804213,
                            showWindow: true,
                            options : {
                                boxClass: 'custom-info-window',
                                disableAutoPan: true
                            }
                        },
                        {
                            id: 4,
                            latitude:  30.274855,
                            longitude: -97.744132,
                            showWindow: true,
                            options : {
                                boxClass: 'custom-info-window',
                                disableAutoPan: true
                            }
                        }
                    ];
                });

        });

  });
