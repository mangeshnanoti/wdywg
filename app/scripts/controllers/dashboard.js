'use strict';

angular.module('wdywgApp')
  .controller('DashboardCtrl', function ($scope) {


        $scope.chart = new CanvasJS.Chart("chartContainer",
            {
                title:{
                    text: "People",
                    fontFamily: "arial black"
                },
                theme: "theme4",
                animationEnabled: true,
                legend:{
                    verticalAlign: "center",
                    horizontalAlign: "right"
                },
                axisY:{
                },
                axisX: {
                    interval: 1,
                    intervalType: "day"
                },
                data: [
                    {
                        type: "stackedColumn",
                        showInLegend:true,
                        color: "#FBB03B",
                        name:"Men > 45yrs",
                        dataPoints: [
                            {  y: 225, x: new Date(2015,7,1)},
                            {  y: 423, x: new Date(2015,7,2)},
                            {  y: 423, x: new Date(2015,7,3)},
                            {  y: 554, x: new Date(2015,7,4)},
                            {  y: 594, x: new Date(2015,7,5)},
                            {  y: 728, x: new Date(2015,7,6)},
                            {  y: 972, x: new Date(2015,7,7)}
                        ]
                    },
                    {
                        type: "stackedColumn",
                        showInLegend:true,
                        name:"Men < 45yrs",
                        color: "#29ABE2",
                        dataPoints: [
                            {  y: 245, x: new Date(2015,7,1)},
                            {  y: 423, x: new Date(2015,7,2)},
                            {  y: 423, x: new Date(2015,7,3)},
                            {  y: 554, x: new Date(2015,7,4)},
                            {  y: 594, x: new Date(2015,7,5)},
                            {  y: 728, x: new Date(2015,7,6)},
                            {  y: 972, x: new Date(2015,7,7)}

                        ]
                    },
                    {
                        type: "stackedColumn",
                        showInLegend:true,
                        name:"Women > 45yrs",
                        color:"#22B573",
                        dataPoints: [
                            {  y: 268, x: new Date(2015,7,1)},
                            {  y: 423, x: new Date(2015,7,2)},
                            {  y: 423, x: new Date(2015,7,3)},
                            {  y: 554, x: new Date(2015,7,4)},
                            {  y: 594, x: new Date(2015,7,5)},
                            {  y: 728, x: new Date(2015,7,6)},
                            {  y: 972, x: new Date(2015,7,7)}

                        ]
                    },
                    {
                        type: "stackedColumn",
                        showInLegend:true,
                        name:"Women < 45yrs",
                        color:"#ED1E79",
                        dataPoints: [
                            {  y: 320, x: new Date(2015,7,1)},
                            {  y: 482, x: new Date(2015,7,2)},
                            {  y: 423, x: new Date(2015,7,3)},
                            {  y: 570, x: new Date(2015,7,4)},
                            {  y: 667, x: new Date(2015,7,5)},
                            {  y: 844, x: new Date(2015,7,6)},
                            {  y: 1058, x: new Date(2015,7,7)}

                        ]
                    }
                ]
            });

        $scope.chart.render(); //render the chart for the first time

        $scope.changeChartType = function(chartType) {
            $scope.chart.options.data[0].type = chartType;
            $scope.chart.render(); //re-render the chart to display the new layout
        }

  });
