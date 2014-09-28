// To avoid polluting the global scope with our function declarations, we wrap
// everything inside an IIFE
(function() {

	// define the module that will hold all the controllers we're gonna use
    angular.module('speakerAppControllers', []);

	// -----
	// used with partials/speaker-list.html
	function speakerListController($interval, SpeakersFactory) {

	    var vm = this;

	    // fetch stuff every 1 second
	    $interval(function() {

		    // get the current speaker _list_ from server
		    SpeakersFactory.getSpeakerListFromServer()
		    .success(function(data) {
		    	vm.speakerList = data;
		    })
		    .error(function() {
		    	console.log('could not get data from server')
		    });

		    // get the current subject title form the sever
		    SpeakersFactory.getSubjectTitleFromServer()
		    .success(function(data) {
		    	vm.subjectTitle = JSON.parse(data);
		    })
		    .error(function() {
		    	console.log('could not get data from server')
		    });

	    }, 1000);

	    return vm;

	}

	// add it to our bookControllers module
	angular
	    .module('speakerAppControllers')
	    .controller('speakerListController', speakerListController);
	// -----

	// -----
	// used with partials/admin-representatives.html
	function adminRepresentativesController($scope, $interval, SpeakersFactory) {
	    var vm = this;

	    // fetch stuff every 1 second
	    $interval(function() {

	    	// get registered representatives from server
	    	SpeakersFactory.getRepresentativesFromServer()
	    	.success(function(data) {
	    		vm.representatives = data;
	    	})
	    	.error(function() {
	    		console.log('could not get data from server')
	    	});

	    	// get the current speaker _list_ from server
	    	SpeakersFactory.getSpeakerListFromServer()
	    	.success(function(data) {
	    		vm.speakerList = data;
	    	})
	    	.error(function() {
	    		console.log('could not get data from server')
	    	});

	    }, 1000);
	    
	    // variables and submit handler for manually adding speakers
	    vm.number = null;
	    vm.name = null;
	    vm.group = null;
	    vm.sex = null;
	    vm.postSpeakerFromForm = function() {
	    	SpeakersFactory.postSpeakerFromArray([vm.number, vm.name, vm.group, vm.sex]);
	    };

	    // handler for removing a representative
	    vm.removeRepresentative = function(number) {
	    	SpeakersFactory.removeRepresentative(number);
	    };

	    //Function for handling csv-upload
		$scope.readFileToArray = function(files) {
			var reader = new FileReader();
			reader.readAsText(files[0]);
			reader.onload = function(event) {
				var csvText = event.target.result;
				SpeakersFactory.registerRepresentativesFromArray(csvText.csvToArray());
			};
		};

	    return vm;
	}

	// add it to our bookControllers module
	angular
	    .module('speakerAppControllers')
	    .controller('adminRepresentativesController', adminRepresentativesController);
	// -----

	// -----
	// used with partials/lead-meeting.html
	function leadMeetingController($http, $interval, SpeakersFactory) {

	    var vm = this;

	    vm.timer = new Stopwatch(document.getElementById("stopwatch"), {delay: 1000});

	    // get registered speakers from server
	    SpeakersFactory.getRepresentativesFromServer()
	    .success(function(data) {
	    	vm.speakers = data;
	    })
	    .error(function() {
	    	console.log('could not get data from server')
	    });

	    // get the current subject title form the sever
	    SpeakersFactory.getSubjectTitleFromServer()
	    .success(function(data) {
	    	vm.subjectTitle = JSON.parse(data);
	    })
	    .error(function() {
	    	console.log('could not get data from server')
	    });

	    // fetch stuff every 1 second
	    $interval(function() {

	    	// get the current speaker _list_ from server
	    	SpeakersFactory.getSpeakerListFromServer()
	    	.success(function(data) {
	    		vm.speakerList = data;
	    	})
	    	.error(function() {
	    		console.log('could not get data from server')
	    	});

	    }, 1000);

	    // handler for setting the current case subject
	    vm.setSubject = function() {
	    	// TO DO: lagre sakstittel (kanskje i en ny factory)
	    };

	    // variables and handler for adding a speaker to the speaker list
	    vm.speakerNumber = null;
	    vm.addSpeaker = function() {

	    	console.log('Let\'s try to add a new speaker to the list:' + vm.speakerNumber);
	    	
	    	var callback = function() {
	    		// this is called when the action is done successfully
	    		vm.speakerNumber = null;
	    	};

	    	if (!vm.speakerNumber) {

	    		SpeakersFactory.nextSpeaker();
	    		vm.timer.reset();
	    		vm.timer.start();

	    	} else if (vm.speakerNumber.charAt(0) === "r") {

	    		SpeakersFactory.addReplyToFirstSpeaker(vm.speakerNumber.slice(1), callback);
	    		
	    	} else if (!isNaN(parseInt(vm.speakerNumber))) {

	    		vm.timer.start();
	    		SpeakersFactory.addSpeakerToBottom(vm.speakerNumber, callback);

	    	} else {

	    		vm.timer.start();
	    		SpeakersFactory.registerUnknownRepresentativeAndAddSpeakerToBottom(vm.speakerNumber);

	    	}
	    };

	    // handler for removing a speaker from the speaker list
	    vm.removeSpeaker = function(index) {
	    	SpeakersFactory.removeSpeaker(index);
	    };

	    // handler for removing a replicant from the current
	    vm.removeReplicant = function(index) {
	    	SpeakersFactory.removeReplicant(index);
	    };

	    // handler for setting the current subject title
	    vm.setSubjectTitle = function() {
	    	SpeakersFactory.setSubjectTitleOnServer(vm.subjectTitle)
	    	.success(function() {
	    		console.log('Subject title updated.');
	    	})
	    	.error(function() {
	    		console.log('Could not set subject title.');
	    	});
	    }

	    return vm;

	}

	// add it to our bookControllers module
	angular
	    .module('speakerAppControllers')
	    .controller('leadMeetingController', leadMeetingController);
   // -----

})();