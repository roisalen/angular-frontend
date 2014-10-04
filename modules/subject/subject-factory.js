(function() { 

	function SubjectFactory($http, speakerAppSettings) {

		/*
		 * Stores the current subject title on the server.
		 */
		SubjectFactory.setSubjectTitleOnServer = function(subjectTitle) {
			return $http.post(speakerAppSettings.server_url + "/subject", JSON.stringify(subjectTitle));
		}

		/*
		 * Gets the current subject title from the server.
		 */
		SubjectFactory.getSubjectTitleFromServer = function() {
			return $http.get(speakerAppSettings.server_url + "/subject");
		}

		return SubjectFactory;
	}

	// add it to our factories module
	angular
	    .module('speakerAppFactories')
	    .factory('SubjectFactory', SubjectFactory);
    // -----

})();