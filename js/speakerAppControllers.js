// To avoid polluting the global scope with our function declarations, we wrap
// everything inside an IIFE
(function() {

	// define the module that will hold all the controllers we're gonna use
    angular.module('speakerAppControllers', []);

	// -----
	// used with partials/speaker-list.html
	function speakerListController(SpeakersFactory) {

	    var vm = this;

	    // get the current speaker _list_ from server
	    SpeakersFactory.getSpeakerListFromServer()
	    .success(function(data) {
	    	console.log(data);
	    	vm.speakerList = data;
	    })
	    .error(function() {
	    	console.log('could not get data from server')
	    });

	    return vm;

	}

	// add it to our bookControllers module
	angular
	    .module('speakerAppControllers')
	    .controller('speakerListController', speakerListController);
	// -----

	// -----
	// used with partials/admin-speakers.html
	function adminSpeakersController($interval, SpeakersFactory) {

	    var vm = this;

	    // fetch stuff every 1 second
	    $interval(function() {

	    	// get registered speakers from server
	    	SpeakersFactory.getSpeakersFromServer()
	    	.success(function(data) {
	    		vm.speakers = data;
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

	    // handler for the csv speaker import
	    vm.readFileToArray = function(files) {
	    	// TO DO: hente logikken for å parse csv-fil fra admin.js
	    	// eventuelt bruke det her: https://code.google.com/p/jquery-csv/
	    };

	    // variables and submit handler for manually adding speakers
	    vm.number = null;
	    vm.name = null;
	    vm.group = null;
	    vm.sex = null;
	    vm.postSpeakerFromForm = function() {
	    	SpeakersFactory.postSpeakerFromArray([vm.number, vm.name, vm.group, vm.sex]);
	    };

	    // handler for removing a representative
	    vm.removeRepresentative = function(index) {
	    	// TO DO: hent fra speakerlist-manager
	    	console.log('slettmeg');
	    };

	    return vm;

	}

	// add it to our bookControllers module
	angular
	    .module('speakerAppControllers')
	    .controller('adminSpeakersController', adminSpeakersController);
	// -----

	// -----
	// used with partials/lead-meeting.html
	function leadMeetingController($http, $interval, SpeakersFactory) {

	    var vm = this;

	    // fetch stuff every 1 second
	    $interval(function() {

	    	// get registered speakers from server
	    	SpeakersFactory.getSpeakersFromServer()
	    	.success(function(data) {
	    		vm.speakers = data;
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

	    // handler for setting the current case subject
	    vm.setSubject = function() {
	    	// TO DO: lagre sakstittel (kanskje i en ny factory)
	    };

	    // variables and handler for adding a speaker to the speaker list
	    vm.speakerNumber = null;
	    vm.addSpeaker = function() {
	    	console.log('Let\'s try to add a new speaker to the list:' + vm.speakerNumber);
	    	SpeakersFactory.addSpeaker(vm.speakerNumber);
	    };

	    // handler for removing a speaker from the speaker list
	    vm.removeSpeaker = function(index) {
	    	SpeakersFactory.removeSpeaker(index);
	    };

	    // handler for removing a replicant from the current
	    vm.removeReplicant = function(index) {
	    	SpeakersFactory.removeReplicant(index);
	    };

	    return vm;

	}

	// add it to our bookControllers module
	angular
	    .module('speakerAppControllers')
	    .controller('leadMeetingController', leadMeetingController);
   // -----

})();