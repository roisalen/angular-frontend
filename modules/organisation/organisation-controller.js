(function() {   

   function organisationController (OrganisationFactory, speakerAppSettings, $location, $rootScope, $http) {
   		var vm = this;

   		vm.chooseOrganisation = function (organisation) {
   			$http.defaults.headers.common['X-organisation'] = organisation.shortName;
   			$rootScope.organization_name = organisation.name;

   			if (organisation.css) {
 	  			$rootScope.css = organisation.css;
   			}
			
   			$location.url('/speaker-list')
   		}

   		OrganisationFactory.getOrganisations()
   		.success(function(data) {
   			vm.organisations = data;
   		})
   		.error(function() {
   			console.log("could not get organisations");
   		});
   }

   angular
	    .module('speakerAppControllers')
	    .controller('organisationController', organisationController);   

})();