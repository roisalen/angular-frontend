(function() {   

   function addOrganisationController(OrganisationFactory, $state) {
         var vm = this;
         console.log("initialising addorg");
         vm.orgName = null;
         vm.orgShortName = null;
         vm.addOrganisation = function () {
            console.log("in add organisation");
            OrganisationFactory.add({name: vm.orgName, shortName: vm.orgShortName})
            .success(function () {
               $state.go('organisation');
            })
            .error(function() {
               console.log("Noe gikk galt med å legge til en organisasjon");
            });
         }

         return vm;

   }


   angular
       .module('speakerAppControllers')
       .controller('addOrganisationController', addOrganisationController);   

})();