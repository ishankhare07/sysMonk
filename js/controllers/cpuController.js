angular.module('sysMonk').controller('cpuController', function($scope, chartService, cpuService) {
    var self = this;
    this.options = {
        segmentStrokeWidth : 0,
        segmentShowStroke : false,
        percentageInnerCutout : 90,
        animateRotate : true,
        animationEasing : "easeInOutCubic",
        animationSteps : 80
    }

    this.chart1 = new chartService.chartjs(angular.element('#cpu1')[0].getContext('2d')).Doughnut([
            {
                value: 1,
                color:"white"
            },
            {
                value: 100,
                color: "green"
            }
        ], this.options);

    this.chart2 = new chartService.chartjs(angular.element('#cpu2')[0].getContext('2d')).Doughnut([
            {
                value: 1,
                color:"white"
            },
            {
                value: 100,
                color: "green"
            }
        ], this.options);

    this.chart3 = new chartService.chartjs(angular.element('#cpu3')[0].getContext('2d')).Doughnut([
            {
                value: 1,
                color:"white"
            },
            {
                value: 100,
                color: "green"
            }
        ], this.options);

    this.chart4 = new chartService.chartjs(angular.element('#cpu4')[0].getContext('2d')).Doughnut([
            {
                value: 1,
                color:"white"
            },
            {
                value: 100,
                color: "green"
            }
        ], this.options);

    this.graphs = {
        "1": {
            chart: this.chart1
        },

        "2": {
            chart: this.chart2
        },

        "3": {
            chart: this.chart3
        },

        "4": {
            chart: this.chart4
        }
    }

    $scope.$on('cpu-update', function(event, cpuId) {
        var percent = cpuService.cpus[cpuId].value;
        if (percent) {                                  // avoid setting 0 percent on graph
            self.graphs[cpuId].chart.segments[0].value = percent;
            self.graphs[cpuId].chart.segments[1].value = 100 - percent;
            self.graphs[cpuId].chart.update();
        }
    })
});
