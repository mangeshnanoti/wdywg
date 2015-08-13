'use strict';

angular.module('wdywgApp')
  .factory('Overviewservice', function Overviewservice() {
    // AngularJS will instantiate a singleton by calling "new" on this function

        return {
            getDailyTrends: function() {
                return [
                    {date: "23-02-2015", promotions: "999", total: "534", male: "202", female: "160",Sale: "$",transaction: "999", abandonment: "00%", revenue: "$999"},
                    {date: "23-02-2015", promotions: "999", total: "534", male: "202", female: "160",Sale: "$",transaction: "999", abandonment: "00%", revenue: "$999"},
                    {date: "23-02-2015", promotions: "999", total: "534", male: "202", female: "160",Sale: "$",transaction: "999", abandonment: "00%", revenue: "$999"},
                    {date: "23-02-2015", promotions: "999", total: "534", male: "202", female: "160",Sale: "$",transaction: "999", abandonment: "00%", revenue: "$999"},
                    {date: "23-02-2015", promotions: "999", total: "534", male: "202", female: "160",Sale: "$",transaction: "999", abandonment: "00%", revenue: "$999"},
                    {date: "23-02-2015", promotions: "999", total: "534", male: "202", female: "160",Sale: "$",transaction: "999", abandonment: "00%", revenue: "$999"},
                    {date: "23-02-2015", promotions: "999", total: "534", male: "202", female: "160",Sale: "$",transaction: "999", abandonment: "00%", revenue: "$999"},
                    {date: "23-02-2015", promotions: "999", total: "534", male: "202", female: "160",Sale: "$",transaction: "999", abandonment: "00%", revenue: "$999"}
                ];
            },
            getOverView: function() {
                return[
                    {date: "2015-02-1", total_people: "999", total_vehicles: "254", total_products: "574"},
                    {date: "2015-02-2", total_people: "524", total_vehicles: "352", total_products: "574"},
                    {date: "2015-02-3", total_people: "999", total_vehicles: "758", total_products: "574"},
                    {date: "2015-02-4", total_people: "852", total_vehicles: "457", total_products: "574"},
                    {date: "2015-02-5", total_people: "745", total_vehicles: "534", total_products: "574"},
                    {date: "2015-02-6", total_people: "365", total_vehicles: "685", total_products: "574"},
                    {date: "2015-02-7", total_people: "123", total_vehicles: "214", total_products: "574"},
                    {date: "2015-02-8", total_people: "524", total_vehicles: "869", total_products: "574"}
                ]
            },
            getTodaycount: function(){
                return[
                    { total_people: "852", total_vehicles: "456", total_products: "--"}
                    ]

            },
            getweekcount: function(){
                return[
                    { total_people: "9499", total_vehicles: "5344", total_products: "5744"}
                ]
            },
            getmonthlycount: function(){
                return[
                    { total_people: "97199", total_vehicles: "19834", total_products: "15754"}
                ]
            }
        };

  });
