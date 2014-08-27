// To avoid polluting the global scope with our function declarations, we wrap
// everything inside an IIFE
(function() {

	// define the module that will hold all the factories we're gonna use
    angular.module('speakerAppFactories', []);

	// -----
	function RegisteredSpeakersFactory($http, speakerAppSettings) {

		/*
		 * Gets all registered speakers from the server.
		 */
		RegisteredSpeakersFactory.getSpeakersFromServer = function() {
			return $http.get(speakerAppSettings.server_url + "/speakers");
		};

		/*
		 * Gets the speaker _list_ from the server.
		 */
		RegisteredSpeakersFactory.getSpeakerListFromServer = function() {
			return $http.get(speakerAppSettings.server_url + "/speakerList");
		};

	    return RegisteredSpeakersFactory;

	}

	// add it to our bookControllers module
	angular
	    .module('speakerAppFactories')
	    .factory('RegisteredSpeakersFactory', RegisteredSpeakersFactory);
   // -----

})();