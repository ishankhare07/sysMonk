angular.module('sysMonk').factory('cpuService', function($interval, $rootScope) {
    const ipc = require('electron').ipcRenderer;
    var self = this;

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
        },
    }
    this.cpu1 = 0;
    this.cpu2 = 0;
    this.cpu3 = 0;
    this.cpu4 = 0;

    this.getCpuUsage = function(cpuId) {
        ipc.send('asynchronous-message', {
            'request-type': 'cpu-usage',
            'cpuId': cpuId
        })
    }

    ipc.on('asynchronous-reply', function(event, arg) {
        self.cpus[arg.cpuId].value = arg.value;
        $rootScope.$broadcast('cpu-update', arg.cpuId);
    })

    $interval(function() {
        for (var x=1; x <= 4; x++) {
            self.getCpuUsage(x);
        }
    }, 1000);

    return this;
});
