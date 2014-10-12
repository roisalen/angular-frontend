(function() {   



   function organisationController (OrganisationFactory, speakerAppSettings, $window, $rootScope, $scope, $http) {
   		var vm = $scope;

   		vm.chooseOrganisation = function (organisation) {
   			$http.defaults.headers.common['X-organisation'] = organisation.shortName;
   			$rootScope.organization_name = organisation.name;



   			if (organisation.css) {
 	  			  $rootScope.css = organisation.css;
   			} else {
               $rootScope.css = "spuio.bootstrap.min.css";
            }
			
   			$window.history.back();
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