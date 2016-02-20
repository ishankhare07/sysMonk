angular.module('sysMonk').factory('chartService', function() {
    this.chartjs = Chart.noConflict();

    return this;
});
