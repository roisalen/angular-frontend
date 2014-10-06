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
<<<<<<< Updated upstream:modules/speakerApp.js
		css: 'spuio.bootstrap.min.css',
		organization_name: 'Studentparlamentet UiO',
		organization_shortName: "spuio",
		//server_url: 'http://127.0.0.1:8080'
=======
		css: 'vtoa.bootstrap.min.css',
		organization_name: 'Velferdstinget',
		organization_shortName: "vtoa"
		// server_url: 'http://127.0.0.1:8080'
>>>>>>> Stashed changes:js/speakerApp.js
	});

	angular.module('speakerAppControllers', []);
	angular.module('speakerAppFactories', []);

	// edit config
	angular.module('speakerApp')
	.config(function($stateProvider, $urlRouterProvider) {
		// set default
		$urlRouterProvider.otherwise('organisation');

		$stateProvider
			.state('speaker-list', {
				url: '/speaker-list',
				templateUrl: 'modules/speaker-list/speaker-list.html',
				controller: 'speakerListController',
				controllerAs: 'speakerListController'
			})
			.state('admin-representatives', {
				url: '/admin-representatives',
				templateUrl: 'modules/admin-representatives/admin-representatives.html',
				controller: 'adminRepresentativesController',
				controllerAs: 'adminRepresentativesController'
			})
			.state('lead-meeting', {
				url: '/lead-meeting',
				templateUrl: 'modules/lead-meeting/lead-meeting.html',
				controller: 'leadMeetingController',
				controllerAs: 'leadMeetingController'
			})
			.state('statistics', {
				url: '/statistics',
				templateUrl: 'modules/statistics/statistics.html',
				controller: 'statisticsController',
				controllerAs: 'statisticsController'
			})
			.state('organisation', {
				url: '/',
				templateUrl: 'modules/organisation/organisation.html',
				controller: 'organisationController',
				controllerAs: 'organisationController'

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