(function() {   



   function organisationController (OrganisationFactory, speakerAppSettings, $window, $rootScope, $scope, $http) {
   		var vm = $scope;

			// remove organisationspecific css if we returned from an organisation
			if (document.getElementById("orgcss") != null) {
				document.getElementsByTagName("head")[0].removeChild(document.getElementById("orgcss"));
			}

   		vm.chooseOrganisation = function (organisation) {
   			$http.defaults.headers.common['X-organisation'] = organisation.shortName;
   			$rootScope.organization_name = organisation.name;

   			if (organisation.css) {
   				$('head').append('<link id="orgcss" rel="stylesheet" type="text/css" href="resources/css/' + organisation.css + '" >');
   			}
			
   			$rootScope.$state.go("speaker-list");
   		}

         vm.organisations = [];
         function checkIfOrgHasLogo(organisation, orgs) {
            var img = new Image();
            img.onload = function() {
               organisation.logoUrl = 'resources/images/logo_'+organisation.shortName+ '.jpg';
               vm.organisations.push(organisation);
               vm.$apply();
            };
            img.onerror = function() {
               organisation.logoUrl = 'resources/images/question.jpg';
               vm.organisations.push(organisation);
               vm.$apply();
            };

            img.src = 'resources/images/logo_'+organisation.shortName+ '.jpg'; // fires off loading of image
         }

         function checkIfOrgsHaveLogoAndSetOnVM(data) {
            var orgs = [];
            for (organisationIndex in data) {
               checkIfOrgHasLogo(data[organisationIndex], orgs);
            }
            
         }


   		OrganisationFactory.getOrganisations()
   		.success(checkIfOrgsHaveLogoAndSetOnVM)
   		.error(function() {
   			console.log("could not get organisations");
   		});

         return vm;


   }

   angular
	    .module('speakerAppControllers')
	    .controller('organisationController', organisationController);   

})();
