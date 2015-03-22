(function() {


	function leadMeetingController($scope, $http, $interval, SpeakerListFactory, SubjectFactory, RepresentativeFactory) {
	    var vm = this;

	    function updateList(data) {
			vm.speakerList = data;
		}

		function updateRepresentatives(data) {
			vm.representatives = data;
		}

		function errorHandler() {
			console.log('Error from server. '+ JSON.stringify(arguments));
		}

		function setSubject(data) {
	    	if(data) {
	    		vm.subjectTitle = data;
	    		// vm.subjectTitle = JSON.parse(data);
	    	}
	    }

	    function setMessage(data) {
	    	if (data) {
	    		vm.message = data;
	    	}
	    }

	    vm.timer = new Stopwatch(document.getElementById("stopwatch"), {delay: 1000});

	    SpeakerListFactory.getSpeakerListFromServer()
	    .success(updateList)
	    .error(errorHandler);
	    
	    // get registered speakers from server
	    RepresentativeFactory.getRepresentativesFromServer()
	    .success(updateRepresentatives)
	    .error(errorHandler);

	    // get the current subject title form the sever
	    SubjectFactory.getSubjectTitleFromServer()
	    .success(setSubject)
	    .error(errorHandler);

	    SubjectFactory.getMessageOnServer()
		    .success(setMessage)
		    .error(errorHandler);

	    // fetch stuff every 5 seconds
	    var stop = $interval(function() {
	    	// get the current speaker _list_ from server
	    	SpeakerListFactory.getSpeakerListFromServer()
	    	.success(updateList)
	    	.error(errorHandler);

	    }, 5000);

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

	    // variables and handler for adding a speaker to the speaker list
	    vm.speakerNumber = null;
	    vm.addSpeaker = function() {

	    	console.log('Let\'s try to add a new speaker to the list:' + vm.speakerNumber);
	    	
	    	var updateListAndResetInput = function(data) {
	    		// this is called when the action is done successfully
	    		updateList(data);
	    		vm.speakerNumber = null;
	    	};

	    	var updateListAndResetStopWatch = function(data) {
	    		updateList(data);
	    		if (vm.speakerList.length > 0) {
	    			vm.timer.start();
	    		} else {
	    			vm.timer.stop();
	    		}
	    		vm.timer.reset();
	    	}

	    	if (!vm.speakerNumber) {
	    		SpeakerListFactory.nextSpeaker()
	    		.success(updateListAndResetStopWatch)
				.error(errorHandler);
	    		
	    		
	    	} else if (vm.speakerNumber.charAt(0) === "r") {

	    		SpeakerListFactory.addReplyToFirstSpeaker(vm.speakerNumber.slice(1))
	    		.success(updateListAndResetInput)
	    		.error(errorHandler);
	    		
	    	} else if (!isNaN(parseInt(vm.speakerNumber))) {

	    		vm.timer.start();
	    		SpeakerListFactory.addSpeakerToBottom(vm.speakerNumber)
	    		.success(updateListAndResetInput)
	    		.error(errorHandler);

	    	} else {

	    		vm.timer.start();
	    		SpeakerListFactory.registerUnknownRepresentativeAndAddSpeakerToBottom(vm.speakerNumber)
	    		.success(updateListAndResetInput)
	    		.error(errorHandler);

	    	}
	    };

	    // handler for removing a speaker from the speaker list
	    vm.removeSpeaker = function(index) {
	    	SpeakerListFactory.removeSpeaker(index)
	    	.success(updateList)
	    	.error(errorHandler);
	    };

	    // handler for removing a replicant from the current
	    vm.removeReplicant = function(index) {
	    	SpeakerListFactory.removeReplicant(index)
	    	.success(updateList)
	    	.error(errorHandler);
	    };

	    // handler for setting the current subject title
	    vm.setSubjectTitle = function() {
	    	SubjectFactory.setSubjectTitleOnServer(vm.subjectTitle)
	    	.success(setSubject)
	    	.error(errorHandler);
	    }

	    vm.updateMessage = function() {
	    	SubjectFactory.setMessageOnServer(vm.message)
	    	.success(setMessage)
	    	.error(errorHandler);
	    }

	    return vm;

	}

	// add it to our bookControllers module
	angular
	    .module('speakerAppControllers')
	    .controller('leadMeetingController', leadMeetingController);
   // -----

})();