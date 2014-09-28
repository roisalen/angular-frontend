// To avoid polluting the global scope with our function declarations, we wrap
// everything inside an IIFE
(function () {

	// create app
	angular.module('speakerApp', [
		'ui.router',
		'speakerAppControllers',
		'speakerAppFactories'
	]);

	// add app constants
	angular.module('speakerApp')
	.constant('speakerAppSettings', {
		server_url: 'http://roisalen.herokuapp.com',
		css: 'vtoa.bootstrap.min.css',
		organization_name: 'Velferdstinget OA'
		// server_url: 'http://127.0.0.1:8080'
	});

	// edit config
	angular.module('speakerApp')
	.config(function($stateProvider, $urlRouterProvider) {
		// set default
		$urlRouterProvider.otherwise('speaker-list');

		$stateProvider
			.state('speaker-list', {
				url: '/speaker-list',
				templateUrl: 'partials/speaker-list.html',
				controller: 'speakerListController',
				controllerAs: 'speakerListController'
			})
			.state('admin-representatives', {
				url: '/admin-representatives',
				templateUrl: 'partials/admin-representatives.html',
				controller: 'adminRepresentativesController',
				controllerAs: 'adminRepresentativesController'
			})
			.state('lead-meeting', {
				url: '/lead-meeting',
				templateUrl: 'partials/lead-meeting.html',
				controller: 'leadMeetingController',
				controllerAs: 'leadMeetingController'
			});
	})
	// in order to add the active class to the nav-links that are active, we
	// need access to $state in our header. we'll just add it to the
	// rootScope, even though that makes us cringe.
	.run(function($rootScope, $state, speakerAppSettings) {
		$rootScope.$state = $state;
		$rootScope.css = speakerAppSettings.css;
		$rootScope.organization_name = speakerAppSettings.organization_name;
	});

})();