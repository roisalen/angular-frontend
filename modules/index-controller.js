(function () {

	function indexController ($translate) {
		console.log("Heeei");
		var ctrl = this;
		ctrl.language = 'nn'; //Default language
		ctrl.languages = ['nn','nb']; //Aviaible languages
		ctrl.updateLanguage = function() {
			$translate.use(ctrl.language);
		};
	}
	angular
		.module('speakerAppControllers')
		.controller('indexController', indexController);

})();
