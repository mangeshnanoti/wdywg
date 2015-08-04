angular.module('wdywgApp.services', [])
    .factory('UserService', function ($q, $http, AWSService) {
        var service = {
            _user: null,
            business: null,
            UsersTable: "Users",
            businessTable: "CustomerBusiness",
            counterTable: "Counter",
            Bucket: 'wdywg',

            setCurrentUser: function (u) {
                if (u && !u.error) {
                    AWSService.setToken(u.id_token);
                    return service.currentUser();
                } else {
                    var d = $q.defer();
                    d.reject(u.error);
                    return d.promise;
                }
            },
            currentUser: function () {
                var d = $q.defer();
                if (service._user) {
                    d.resolve(service._user);
                } else {
                    AWSService.credentials().then(function () {
                        gapi.client.oauth2.userinfo.get()
                            .execute(function (e) {
                                var email = e.email;
                                AWSService.dynamo({
                                    params: { TableName: service.UsersTable }
                                })
                                    .then(function (table) {
                                        table.getItem({
                                            Key: {
                                                'User email': {
                                                    S: email
                                                }
                                            }
                                        },
                                            function (err, data) {

                                                if (Object.keys(data).length == 0) {
                                                    // User didn't previously exist
                                                    var itemParams = {
                                                        Item: {
                                                            'User email': { S: email },
                                                            data: {
                                                                S: JSON.stringify(e)
                                                            }
                                                        }
                                                    };
                                                    table.putItem(itemParams, function (err, data) {
                                                        service._user = e;
                                                        d.resolve(e);
                                                    })
                                                } else {
                                                    service._user = JSON.parse(
                                                        data.Item.data.S
                                                        );
                                                    d.resolve(service._user);

                                                }
                                            });
                                    })
                            });
                    });
                }
                return d.promise;
            },
            counter: function () {
                var d = $q.defer();

                //service.currentUser().then(function (user) {

                AWSService.dynamo({
                    params: { TableName: service.counterTable }
                }).then(function (table) {
                    console.log(table);
                    table.query({
                        TableName: service.counterTable,
                        KeyConditions: {
                            "deviceToken": {
                                "ComparisonOperator": "EQ",
                                "AttributeValueList": [
                                    { S: "0123456789" }
                                ]
                            }
                        }
                    }, function (err, data) {
                        if (data) {
                            d.resolve(data);
                            console.log(data)
                        } else {
                            d.reject(err);
                        }
                    })
                });
                //                });

                return d.promise;
            },

            addBusiness: function (business) {
                var d = $q.defer();
                //                service.currentUser().then(function (user) {
                AWSService.dynamo({
                    params: { TableName: service.businessTable }
                }).then(function (table) {
                    var itemParams = {
                            Item: {
                                'custid': {S: '1'},
                                'businessId': {S: '4541'},
                                'businessName': {S: business.BusinessName },
                                'address':{S: business.Address}
                            }
                    };
                    table.putItem(itemParams, function (err, data) {
                        d.resolve(data);
                        console.log(data)
                    })
                });
                return d.promise;
                //                });
            },
            uploadBusinessImage: function(items) {
                var d = $q.defer();
                service.currentUser().then(function(user) {
                    AWSService.s3({
                        params: {
                            Bucket: service.Bucket
                        }
                    }).then(function(s3) {
                        var file = items[0];
                        var params = {
                            Key: file.name,
                            Body: file,
                            ContentType: file.type
                        }

                        console.log(params)

                        s3.putObject(params, function(err, data) {

                            console.log(err)
                            console.log(data)

                            // Also, let's get a url
//                            var params = {
//                                Bucket: service.Bucket,
//                                Key: file.name
//                            };
//                            s3.getSignedUrl('getObject', params, function (err, url) {
//                                AWSService.dynamo({
//                                    params: {TableName: service.UserItemsTable}
//                                }).then(function(table) {
//                                    var itemParams = {
//                                        Item: {
//                                            'ItemId': {S: file.name},
//                                            data: {
//                                                S: JSON.stringify({
//                                                    itemId: file.name,
//                                                    itemSize: file.size,
//                                                    itemUrl: url
//                                                })
//                                            }
//                                        }
//                                    };
//                                    table.putItem(itemParams, function(err, data) {
//                                        d.resolve(data);
//                                    });
//                                });
//                            });

                            d.resolve(data);
                        });
                    });
                });
                return d.promise;
            }
        };
        return service;
    })


    .provider('AWSService', function () {
        var self = this;
        // Set defaults
        AWS.config.region = 'us-east-1';

        self.arn = null;

        self.setArn = function (arn) {
            if (arn) self.arn = arn;
        }

        self.setRegion = function (region) {
            if (region) AWS.config.region = region;
        }

        self.setLogger = function (logger) {
            if (logger) AWS.config.logger = logger;
        }

        self.$get = function ($q, $cacheFactory) {
            var dynamoCache = $cacheFactory('dynamo')
            var s3Cache = $cacheFactory('s3Cache')

                credentialsDefer = $q.defer(),
                credentialsPromise = credentialsDefer.promise;

            return {
                credentials: function () {
                    return credentialsPromise;
                },
                setToken: function (token, providerId) {
                    var config = {
                        RoleArn: self.arn,
                        WebIdentityToken: token,
                        RoleSessionName: 'web-id'
                    }
                    if (providerId) {
                        config['ProviderId'] = providerId;
                    }
                    self.config = config;
                    AWS.config.credentials =
                    new AWS.WebIdentityCredentials(config);
                    credentialsDefer.resolve(AWS.config.credentials);
                },
                dynamo: function (params) {
                    var d = $q.defer();
                    credentialsPromise.then(function () {
                        var table = dynamoCache.get(JSON.stringify(params));
                        if (!table) {
                            var table = new AWS.DynamoDB(params);
                            dynamoCache.put(JSON.stringify(params), table);
                        };
                        d.resolve(table);
                    });
                    return d.promise;
                },
                s3: function(params) {
                    var d = $q.defer();
                    credentialsPromise.then(function() {
                        var s3Obj = s3Cache.get(JSON.stringify(params));
                        if (!s3Obj) {
                            var s3Obj = new AWS.S3(params);
                            s3Cache.put(JSON.stringify(params), s3Obj);
                        }
                        d.resolve(s3Obj);
                    });
                    return d.promise;
                }
            }
        }
    })
