angular.module('wdywgApp')
    .factory('businessService', function ($q, $http) {
//        var service = {
//            name: null,
//            businessTable: "CustomerBusiness"

//            setBusiness: function () {
//                AWSService.credentials().then(function () {
//                    AWSService.dynamo({
//                        params: {TableName: service.businessTable}
//                    })
//                        .then(function (table) {
//                            table.getItem({
//                                    Key: {
//                                        'businessName': {
//                                            S: "bar"
//                                        }
//                                    }
//                                },
//                                function (err, data) {
//
//                                    if (Object.keys(data).length == 0) {
//                                        // User didn't previously exist
//                                        var itemParams = {
//                                            Item: {
//                                                'businessName': {S: businessName},
//                                                data: {
//                                                    S: JSON.stringify(e)
//                                                }
//                                            }
//                                        };
//                                        table.putItem(itemParams, function (err, data) {
//                                            service.name = e;
//                                            d.resolve(e);
//
//
//                                        })
//                                    } else {
//                                        service.name = JSON.parse(
//                                            data.Item.data.S
//                                        );
//                                        d.resolve(service.name);
//
//                                    }
//                                });
//                        })
//
//                });
//            }
//
//        }
//        return service;
    })
