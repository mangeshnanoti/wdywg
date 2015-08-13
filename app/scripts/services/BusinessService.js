angular.module('wdywgApp')
    .factory('businessService', function () {


        return {

            getBusinessList: function() {
                return [
                    {businessName: "23-02-2015", address: "1624 Barton Springs Rd",address2: "Austin TX 78704", people: "534", vehicle: "202", products: "--"},
                    {businessName: "23-02-2015", address: "1624 Barton Springs Rd",address2:"Austin TX 78704", people: "534", vehicle: "202", products: "235"},
                    {businessName: "23-02-2015", address: "1624 Barton Springs Rd",address2:"Austin TX 78704", people: "--", vehicle: "202", products: "--"},
                    {businessName: "23-02-2015", address: "1624 Barton Springs Rd",address2:"Austin TX 78704", people: "534", vehicle: "--", products: "235"},
                    {businessName: "23-02-2015", address: "1624 Barton Springs Rd",address2:"Austin TX 78704", people: "534", vehicle: "202", products: "235"}
                ];
            }

        };


    })
