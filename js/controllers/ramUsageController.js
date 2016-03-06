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
