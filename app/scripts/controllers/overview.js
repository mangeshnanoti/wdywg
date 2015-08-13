angular.module('wdywgApp')
    .controller('OverviewCtrl', function ($scope, $location, uiGmapGoogleMapApi, uiGmapIsReady, AWSService, UserService, $interval, Overviewservice) {

//        UserService.counter()
//            .then(function(counter) {
//                $scope.counter = counter;
//                console.log($scope.counter);
//            });

//        $scope.counter = 0;
//        $interval(updateTime, 1000);
//
//        function updateTime() {
//            $scope.counter = $scope.counter+1;
//        }


        //filter script

        $scope.btoday = true;
        $scope.bthisWeak = false;
        $scope.bthisMonth = false;

        $scope.todaytotal = Overviewservice.getTodaycount();

        $scope.totalppl = $scope.todaytotal[0].total_people;
        $scope.totalveh = $scope.todaytotal[0].total_vehicles;
        $scope.totalprod = $scope.todaytotal[0].total_products;


        $scope.thisMonth = function () {
            $scope.btoday = false;
            $scope.bthisWeak = false;
            $scope.bthisMonth = true;

            $scope.monthtotal = Overviewservice.getmonthlycount();
            $scope.totalppl = $scope.monthtotal[0].total_people
            $scope.totalveh = $scope.monthtotal[0].total_vehicles
            $scope.totalprod = $scope.monthtotal[0].total_products

            console.log($scope.monthtotal)
        };

        $scope.thisWeak = function () {
            $scope.btoday = false;
            $scope.bthisWeak = true;
            $scope.bthisMonth = false;

            $scope.todaytotal = Overviewservice.getweekcount();
            $scope.totalppl = $scope.todaytotal[0].total_people;
            $scope.totalveh = $scope.todaytotal[0].total_vehicles;
            $scope.totalprod = $scope.todaytotal[0].total_products;
        };

        $scope.today = function () {
            $scope.btoday = true;
            $scope.bthisWeak = false;
            $scope.bthisMonth = false;

            $scope.todaytotal = Overviewservice.getTodaycount();
            $scope.totalppl = $scope.todaytotal[0].total_people;
            $scope.totalveh = $scope.todaytotal[0].total_vehicles;
            $scope.totalprod = $scope.todaytotal[0].total_products;
        };



        // get data list for table and map

        $scope.dailyTrendsJson = Overviewservice.getDailyTrends();

        $scope.overViewJson = Overviewservice.getOverView();

        $scope.chartppldata = []
        $scope.chartvechdata = []
        $scope.chartproddata = []

        angular.forEach($scope.overViewJson, function (item) {

            console.log(item.total_people);
            console.log(new Date(item.date));
            $scope.chartppldata.push({x: new Date(item.date), y: parseInt(item.total_people)})
            $scope.chartvechdata.push({x: new Date(item.date), y: parseInt(item.total_vehicles)})
            $scope.chartproddata.push({x: new Date(item.date), y: parseInt(item.total_products)})

        })





        //chart script
        $scope.chart = new CanvasJS.Chart("chartContainer",
            {
                title: {
//                    text: "People",
//                    fontFamily: "arial black"
                },


                animationEnabled: true,
                legend: {
                    verticalAlign: "center",
                    horizontalAlign: "right"
                },

                data: [
                    {
                        type: "splineArea",
                        showInLegend: true,
                        color: "rgba(54,158,173,.7)",
                        name: "People",
                        dataPoints: $scope.chartppldata
                    },
                    {
                        type: "splineArea",
                        color: "rgba(194,70,66,.7)",
                        name: "Vehicles",
                        showInLegend: true,
                        dataPoints: $scope.chartvechdata
                    }
                ]
            });

        $scope.chart.render(); //render the chart for the first time

        $scope.changeChartType = function (chartType) {
            $scope.chart.options.data[0].type = chartType;
            $scope.chart.render(); //re-render the chart to display the new layout
        }

        // script for swap table and map
        $scope.showchart = false;
        $scope.showtable = true;

        $scope.table = function () {
            $scope.showtable = true;
            $scope.showchart = false;
        };

        $scope.chart = function () {
            $scope.showchart = true;
            $scope.showtable = false;
        };



        // datepicker
        $scope.datepickerOptions = function () {
            format: 'yyyy-mm-dd'
        }
        $scope.datepickerOptions1 = function () {
            format: 'yyyy-mm-dd'
        }

        $scope.fdate = '2015-03-12'

        $scope.tdate = '2015-03-12'


    });
