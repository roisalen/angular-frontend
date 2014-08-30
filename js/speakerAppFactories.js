// To avoid polluting the global scope with our function declarations, we wrap
// everything inside an IIFE
(function() {

	// define the module that will hold all the factories we're gonna use
    angular.module('speakerAppFactories', []);

	// -----
	// will hold all the speakers on the client side
	function SpeakersFactory($http, speakerAppSettings) {

		/*
		 * Holds all registered speakers.
		 */
		SpeakersFactory.registeredSpeakers = [];

		/*
		 * Holds all the speaker list.
		 */
		SpeakersFactory.speakerList = [];

		/*
		 * Gets all registered speakers from the server.
		 */
		SpeakersFactory.getSpeakersFromServer = function() {
			return $http.get(speakerAppSettings.server_url + "/speakers");
		};

		/*
		 * Gets the speaker _list_ from the server.
		 */
		SpeakersFactory.getSpeakerListFromServer = function() {
			return $http.get(speakerAppSettings.server_url + "/speakerList");
		};

		/*
		 * Posts (registers) a new speaker to the server.
		 */
		SpeakersFactory.postSpeakerFromArray = function(entry) {
			var speaker = {};
			speaker.number = entry[0];
			if (entry[1]) {
				speaker.name = entry[1];
			};

			if (entry[2]) {
				speaker.group = entry[2];
			};
			if (entry[3]) {
				speaker.sex = entry[3];
			};

			console.log(JSON.stringify(speaker));

			$http.post(speakerAppSettings.server_url + "/speakers", JSON.stringify(speaker))
			.success(function() {
				console.log('Successfully posted speaker: ' + speaker.number);
			})
			.error(function() {
				console.log('Unable to post speaker: ' + speaker.number);
			});
		};

		/*
		 * Will remove the speaker with the given number.
		 */
		SpeakersFactory.removeSpeakerByNumber = function(number) {
			$http.delete(speakerAppSettings.server_url + "/speakers/" + index)
			.success(function() {
				console.log('Successfully deleted speaker: ' + index);
			})
			.error(function() {
				console.log('Unable to delete speaker: ' + index);
			});
		}

		/*
		 * Will move the speaker list on to the next person and then update the
		 * speaker list.
		 */
		SpeakersFactory.nextSpeaker = function() {
			$http.post(speakerAppSettings.server_url + "/speakerList/0")
			.success(function() {
				console.log('Moved to next speaker.');
			})
			.error(function() {
				console.log('Unable to nextSpeaker()');
			});
		};

		/*
		 * Will add a replicant to the current speaker.
		 */
		SpeakersFactory.addReplyToFirstSpeaker = function(replicantNumber, callback) {
			$http.post(speakerAppSettings.server_url + "/speakerList/0/replies", replicantNumber)
			.success(function() {
				console.log('Added replicant.');
				callback();
			})
			.error(function() {
				console.log('Unable to add replicant.');
			});
		};

		/*
		 * Will remove the speaker with the given index
		 */
		SpeakersFactory.removeSpeaker = function(index) {
			$http.delete(speakerAppSettings.server_url + "/speakerList/" + index)
			.success(function() {
				console.log('Speaker removed.');
			})
			.error(function() {
				console.log('Unable to remove speaker.');
			});
		}

		/*
		 * Will remove the replicant with the given index
		 */
		SpeakersFactory.removeReplicant = function(index) {
			$http.delete(speakerAppSettings.server_url + "/speakerList/0/replies/" + index)
			.success(function() {
				console.log('Replicant removed.');
			})
			.error(function() {
				console.log('Unable to remove replicant.');
			});
		}

		/*
		 * Will add a new speaker to the bottom of the speaker list.
		 */
		SpeakersFactory.addSpeakerToBottom = function(speakerNumber, callback) {
			$http.post(speakerAppSettings.server_url + "/speakerList", speakerNumber)
			.success(function() {
				console.log('Added speaker.');
				callback();
			})
			.error(function() {
				console.log('Unable to add speaker.');
			});
		};

		/*
		 * Will take input from the add speaker field, and decide what to do
		 * next.
		 */
		SpeakersFactory.addSpeaker = function(input, callback) {
			if (!input) {

				SpeakersFactory.nextSpeaker();
				// timer.reset();
				// timer.start();

			} else if (input.charAt(0) === "r") {

				SpeakersFactory.addReplyToFirstSpeaker(input.slice(1), callback);
				
			} else if (!isNaN(parseInt(input))) {

				// timer.start();
				SpeakersFactory.addSpeakerToBottom(input, callback);

			} else {

				// timer.start();
				SpeakersFactory.registerUnknownSpeakerAndAddSpeakerToBottom(input);

			}
		};

	    return SpeakersFactory;

	}

	// add it to our factories module
	angular
	    .module('speakerAppFactories')
	    .factory('SpeakersFactory', SpeakersFactory);
    // -----

})();