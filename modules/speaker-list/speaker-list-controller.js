(function() {
	// -----
	// used with partials/speaker-list.html
	function speakerListController($scope, $interval, SpeakerListFactory, SubjectFactory) {

	    var vm = this;

	    function getSpeakerListAndSubject() {
	    	SpeakerListFactory.getSpeakerListFromServer()
		    .success(function(data) {
		    	vm.speakerList = data;
		    })
		    .error(function() {
		    	console.log('could not get data from server')
		    });

		    // get the current subject title form the sever
		    SubjectFactory.getSubjectTitleFromServer()
		    .success(function(data) {
		    	if (data) {
		    		vm.subjectTitle = JSON.parse(data);
		    	}
		    })
		    .error(function() {
		    	console.log('could not get data from server')
		    });

		    SubjectFactory.getMessageOnServer()
		    .success(function(data) {
		    	if (data) {
		    		vm.message = JSON.parse(data);
		    	}

		    });
	    }

	    getSpeakerListAndSubject();
	    // fetch stuff every 1 second
	    var stop = $interval(getSpeakerListAndSubject, 1000);

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

	// add it to our bookControllers module
	angular
	    .module('speakerAppControllers')
	    .controller('speakerListController', speakerListController);
	// -----
})();