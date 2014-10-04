
(function() {
	function StatisticsFactory($http, speakerAppSettings) {
		StatisticsFactory.getStatistics = function(type, options, callback) {
			return $http.get(speakerAppSettings.server_url + "/statistics/" + type);
		};

		return StatisticsFactory;
	}

	// add it to our factories module
	angular
	    .module('speakerAppFactories')
	    .factory('StatisticsFactory', StatisticsFactory);
    // -----
})();