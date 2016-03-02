angular.module('sysMonk').factory('cpuService', function($interval, $rootScope) {
    const spawn  =require('child_process').spawn;

    this.cpus = {
        "1": {
            value: 0
        },

        "2": {
            value: 0
        },

        "3": {
            value: 0
        },

        "4": {
            value: 0
        }
    };

    this.data = {
        "1": {
            info: []
        },
        "2": {
            info: []
        },
        "3": {
            info: []
        },
        "4": {
            info: []
        },
    }

    var self = this;

    $interval(function() {
        var command = spawn('grep', ['cpu[0-9]', '/proc/stat']);

        command.stdout.on('data', function(data) {
            var lines = data.toString().match(/cpu(\d)( \d+)+/g);
            this.percent=0;
            for (var x in lines) {
                //parse each line into array of values
                var info = lines[x].match(/\d+/g);

                // convert to array of numbers
                info = info.map(function(x) {
                    return parseInt(x, 10);
                });

                if(!self.data[parseInt(x)+1].info.length) {
                    //this is first query
                    self.data[parseInt(x)+1].info = info;
                    this.percent = (info[1] + info[2] + info[3]) /
                                (info[4]) * 100;
                } else {
                    // previous data exists hence get the difference
                    var previous = self.data[parseInt(x)+1].info;
                    this.percent = ((info[1] - previous[1]) +
                                    (info[2] - previous[2]) +
                                    (info[3] - previous[3])
                                ) / (info[4] - previous[4]) * 100;
                    // update with new data
                    self.data[parseInt(x)+1].info = info;
                }

                self.cpus[parseInt(x)+1].value = this.percent;
                $rootScope.$broadcast('cpu-update', parseInt(x)+1);
            }
        })
    }, 1000);

    return this;
});
