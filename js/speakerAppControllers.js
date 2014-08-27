// To avoid polluting the global scope with our function declarations, we wrap
// everything inside an IIFE
(function() {

	// define the module that will hold all the controllers we're gonna use
    angular.module('speakerAppControllers', []);

	// -----
	// used with partials/speaker-list.html
	function speakerListController(RegisteredSpeakersFactory) {

	    var vm = this;

	    // get the current speaker _list_ from server
	    RegisteredSpeakersFactory.getSpeakerListFromServer()
	    .success(function(data) {
	    	vm.speakerList = data;
	    })
	    .error(function() {
	    	console.log('could not get data from server')
	    });

	    // handler for setting the current case subject
	    vm.setSubject = function() {
	    	// TO DO: lagre sakstittel (kanskje i en ny factory)
	    };

	    // handler for å legge til taler
	    vm.addSpeaker = function() {
	    	// TO DO: hente over logikken for å legge til taler fra speakerlist-manager.js
	    }

	    return vm;

	}

	// add it to our bookControllers module
	angular
	    .module('speakerAppControllers')
	    .controller('speakerListController', speakerListController);
	// -----

	// -----
	// used with partials/admin-speakers.html
	function adminSpeakersController(RegisteredSpeakersFactory) {

	    var vm = this;

	    // get registered speakers from server
	    RegisteredSpeakersFactory.getSpeakersFromServer()
	    .success(function(data) {
	    	vm.speakers = data;
	    })
	    .error(function() {
	    	console.log('could not get data from server')
	    });

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
	    	// TO DO: hente logikken for å registrere ny representant fra admin.js
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
	function leadMeetingController($http, RegisteredSpeakersFactory) {

	    var vm = this;

	    // get registered speakers from server
	    RegisteredSpeakersFactory.getSpeakersFromServer()
	    .success(function(data) {
	    	vm.speakers = data;
	    })
	    .error(function() {
	    	console.log('could not get data from server')
	    });

	    // get the current speaker _list_ from server
	    RegisteredSpeakersFactory.getSpeakerListFromServer()
	    .success(function(data) {
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
	    .controller('leadMeetingController', leadMeetingController);
   // -----

})();