(function() {

	function OrganisationFactory($http, speakerAppSettings) {
		OrganisationFactory.getOrganisations = function() {
			return $http.get(speakerAppSettings.server_url + "/organisations");
		}

		return OrganisationFactory;
	}


	// add it to our factories module
	angular
	    .module('speakerAppFactories')
	    .factory('OrganisationFactory', OrganisationFactory);
    // -----


})();