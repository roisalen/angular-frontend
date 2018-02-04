(function () {

	function languageController ($translate) {
		var ctrl = this;
		ctrl.language = 'nn'; 
		ctrl.languages = ['nb', 'nn']; 
		ctrl.updateLanguage = function() {
			$translate.use(ctrl.language);
		};
	}
	angular
		.module('speakerAppControllers')
		.controller('languageController', languageController);

})();
