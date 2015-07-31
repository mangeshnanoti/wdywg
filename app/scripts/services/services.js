angular.module('wdywgApp.services', [])
    .factory('UserService', function ($q, $http, AWSService) {
        var service = {
            _user: null,
            business: null,
            UsersTable: "Users",
            UserItemsTable: "UsersItems",
            ChargeTable: "UserCharges",
            businessTable: "CustomerBusiness",
            Bucket: 'ng-newsletter-example',

            counterTable: "Counter",

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
                //                service.currentUser().then(function (user) {
                AWSService.dynamo({
                    params: { TableName: service.counterTable }
                }).then(function (table) {
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
                                'businessId': {S: '2015'},
                                'businessName': {S: "businessName1" },
                                'address':{S: '2015'},
                                'customerName':{S: '2015'},
                                'lan':{S: '2015'},
                                'lat':{S: '2015'}
                            }
                    };
                    table.putItem(itemParams, function (err, data) {
                        d.resolve(data);
                        console.log(data)
                    })
                });

                //                });

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
            var s3Cache = $cacheFactory('s3Cache'),
                dynamoCache = $cacheFactory('dynamo'),
                snsCache = $cacheFactory('sns'),
                sqsCache = $cacheFactory('sqs');
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
                s3: function (params) {
                    var d = $q.defer();
                    credentialsPromise.then(function () {
                        var s3Obj = s3Cache.get(JSON.stringify(params));
                        if (!s3Obj) {
                            var s3Obj = new AWS.S3(params);
                            s3Cache.put(JSON.stringify(params), s3Obj);
                        }
                        d.resolve(s3Obj);
                    });
                    return d.promise;
                },
                dynamo: function (params) {
                    var d = $q.defer();
                    credentialsPromise.then(function () {
                        var table = dynamoCache.get(JSON.stringify(params));
                        if (!table) {
                            var table = new AWS.DynamoDB(params);
                            dynamoCache.put(JSON.stringify(params), table);
                        }
                        ;
                        d.resolve(table);
                    });
                    return d.promise;
                },
                sns: function (params) {
                    var d = $q.defer();
                    credentialsPromise.then(function () {
                        var sns = snsCache.get(JSON.stringify(params));
                        if (!sns) {
                            sns = new AWS.SNS(params);
                            snsCache.put(JSON.stringify(params), sns);
                        }
                        d.resolve(sns);
                    })
                    return d.promise;
                },
                sqs: function (params) {
                    var d = $q.defer();
                    credentialsPromise.then(function () {
                        var url = sqsCache.get(JSON.stringify(params)),
                            queued = $q.defer();
                        if (!url) {
                            var sqs = new AWS.SQS();
                            sqs.createQueue(params, function (err, data) {
                                if (data) {
                                    url = data.QueueUrl;
                                    sqsCache.put(JSON.stringify(params), url);
                                    queued.resolve(url);
                                } else {
                                    queued.reject(err);
                                }
                            });
                        } else {
                            queued.resolve(url);
                        }
                        queued.promise.then(function (url) {
                            var queue = new AWS.SQS({ params: { QueueUrl: url } });
                            d.resolve(queue);
                        });
                    })
                    return d.promise;
                }
            }
        }
    })
    .provider('StripeService', function () {
        var self = this;

        self.setPublishableKey = function (key) {
            Stripe.setPublishableKey(key);
        }

        self.$get = function ($q) {
            return {
                createCharge: function (obj) {
                    var d = $q.defer();

                    if (!obj.hasOwnProperty('number') || !obj.hasOwnProperty('cvc') || !obj.hasOwnProperty('exp_month') || !obj.hasOwnProperty('exp_year')
                        ) {
                        d.reject("Bad input", obj);
                    } else {
                        Stripe.card.createToken(obj,
                            function (status, resp) {
                                if (status == 200) {
                                    d.resolve(resp);
                                } else {
                                    d.reject(status);
                                }
                            });
                    }

                    return d.promise;
                }
            }
        }
    })