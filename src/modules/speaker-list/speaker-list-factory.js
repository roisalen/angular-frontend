
(function() {

	// -----
	// will hold all the speakers on the client side
	function SpeakerListFactory($http, speakerAppSettings) {

		/*
		 * Gets the speaker _list_ from the server.
		 */
		SpeakerListFactory.getSpeakerListFromServer = function() {
			return $http.get(speakerAppSettings.server_url + "/speakerList");
		};
		/*
		 * Will move the speaker list on to the next person and then update the
		 * speaker list.
		 */
		SpeakerListFactory.nextSpeaker = function() {
			return $http.post(speakerAppSettings.server_url + "/speakerList/0");
		};

		/*
		 * Will add a replicant to the current speaker.
		 */
		SpeakerListFactory.addReplyToFirstSpeaker = function(replicantNumber, callback) {
			return $http.post(speakerAppSettings.server_url + "/speakerList/0/replies", {"replicantNumber":replicantNumber});	
		};

		/*
		 * Will remove the speaker with the given index
		 */
		SpeakerListFactory.removeSpeaker = function(index) {
			return $http.delete(speakerAppSettings.server_url + "/speakerList/" + index);
			
		};

		/*
		 * Will remove the replicant with the given index
		 */
		SpeakerListFactory.removeReplicant = function(index) {
			return $http.delete(speakerAppSettings.server_url + "/speakerList/0/replies/" + index);
		};

		/*
		 * Will add a new speaker to the bottom of the speaker list.
		 */
		SpeakerListFactory.addSpeakerToBottom = function(speakerNumber) {
			return $http.post(speakerAppSettings.server_url + "/speakerList", {"speakerNumber":speakerNumber});
		};

		SpeakerListFactory.moveSpeaker = function(start, end) {
			return $http.put(speakerAppSettings.server_url + "/speakerlist/"+start, {"newPlace":end});
		};

		return SpeakerListFactory;
	}

	angular
	.module('speakerAppFactories')
	.factory('SpeakerListFactory', SpeakerListFactory);

})();
