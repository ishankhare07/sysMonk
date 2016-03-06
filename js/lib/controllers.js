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
                color: "transparent"
            }
        ], this.options);

    this.chart2 = new chartService.chartjs(angular.element('#cpu2')[0].getContext('2d')).Doughnut([
            {
                value: 1,
                color:"white"
            },
            {
                value: 100,
                color: "transparent"
            }
        ], this.options);

    this.chart3 = new chartService.chartjs(angular.element('#cpu3')[0].getContext('2d')).Doughnut([
            {
                value: 1,
                color:"white"
            },
            {
                value: 100,
                color: "transparent"
            }
        ], this.options);

    this.chart4 = new chartService.chartjs(angular.element('#cpu4')[0].getContext('2d')).Doughnut([
            {
                value: 1,
                color:"white"
            },
            {
                value: 100,
                color: "transparent"
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
        self.graphs[cpuId].chart.segments[0].value = percent;
        self.graphs[cpuId].chart.segments[1].value = 100 - percent;
        self.graphs[cpuId].chart.update();
    })
});

angular.module('sysMonk').controller('ramUsageController', function($interval, $scope) {
    this.state = 'progress-bar-success';
    this.value = 0;
    var self = this;

    const spawn = require('child_process').spawn;

    $interval(function() {
        var meminfo = spawn('cat', ['/proc/meminfo']);

        meminfo.stdout.on('data', function(data) {
            var re = /([a-z]+):[ ]+(\d+)/gi;
            var m, dict={};
            while((m = re.exec(data.toString())) !== null) {
                if(m.index === re.lastIndex) {
                    re.lastIndex++;
                }
                dict[m[1]] = parseInt(m[2]);
            }


            self.value = Math.round((dict['MemTotal'] - dict['MemAvailable']) / dict['MemTotal'] * 100);
            if(self.value < 30) {
                self.state = 'progress-bar-info'
            } else if (self.value > 30 && self.value < 50) {
                self.state = 'progress-bar-success'
            } else if (self.value > 50 && self.value < 70) {
                self.state = 'progress-bar-warning'
            } else if (self.value > 70) {
                self.state = 'progress-bar-danger'
            }
            $scope.$apply();
        });
    }, 1000);
});
