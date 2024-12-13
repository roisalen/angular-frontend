(function() {	
	
	function RepresentativeFactory($http, speakerAppSettings) {	
		/*
		 * Gets all registered representatives from the server.
		 */
		RepresentativeFactory.getRepresentativesFromServer = function() {
			return $http.get(speakerAppSettings.server_url + "/representatives");
		};

		/*
		 * Posts (registers) a new representative to the server.
		 */
		RepresentativeFactory.registerRepresentative = function(entry) {
			var representative = {};
			representative.number = entry[0];
			if (entry[1]) {
				representative.name = entry[1];
			};

			if (entry[2]) {
				representative.group = entry[2];
			};
			if (entry[3]) {
				representative.sex = entry[3];
			};

			console.log(JSON.stringify(representative));

			return $http.post(speakerAppSettings.server_url + "/representatives", JSON.stringify(representative));
		};

		/*
		 * Will remove the representative with the given number.
		 */
		RepresentativeFactory.removeRepresentative = function(number) {
			return $http.delete(speakerAppSettings.server_url + "/representatives/" + number);
		}

		RepresentativeFactory.registerRepresentativesFromArray = function(representativeArray, successCallback) {
			var counter = representativeArray.length;
			
			function successHandler() {
				if (--counter === 0) {
					successCallback();
				}
			}

			for (var index in representativeArray) {
				RepresentativeFactory.registerRepresentative(representativeArray[index])
				.success(successHandler);
			}


		}

		return RepresentativeFactory;
	}

	angular
	.module('speakerAppFactories')
	.factory('RepresentativeFactory', RepresentativeFactory);

})();