(function() { 

	function logController($scope, $interval, StatisticsFactory) {
		function getLogForDate(date) {
			StatisticsFactory.getStatistics("date")
		    .success(function(data) {
		    	vm.logData = data;
		    })
		    .error(function() {
		    	console.log('could not get data from server')
		    });
		}

		getLogForDate();
	    // fetch stuff every 1 second
	    var stop = $interval(getLogForDate, 1000);

	    $scope.stopInterval = function() {
      		if (angular.isDefined(stop)) {
        		$interval.cancel(stop);
        		stop = undefined;
      		}
    	};
	    $scope.$on('$destroy', function() {
      // Make sure that the interval is destroyed too
      		$scope.stopInterval();
    	});

	    return vm;
	}


	angular
	    .module('speakerAppControllers')
	    .controller('logController', logController);
})();