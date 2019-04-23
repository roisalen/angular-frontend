
(function() {
	function StatisticsFactory($http, speakerAppSettings) {
		StatisticsFactory.getStatistics = function(type, start_date, end_date) {

			$http.defaults.headers.common['X-organisation'] = "vtoa";
			if (!start_date) {
				return $http.get(speakerAppSettings.server_url + "/statistics/" + type);
			}
			if (!end_date) {
				return $http.get(speakerAppSettings.server_url + "/statistics/" + type + "/" + start_date);
			}

			return $http.get(speakerAppSettings.server_url + "/statistics/" + type + "/" + start_date + "/" + end_date);

		};

		return StatisticsFactory;
	}

	// add it to our factories module
	angular
	    .module('speakerAppFactories')
	    .factory('StatisticsFactory', StatisticsFactory);
    // -----
})();