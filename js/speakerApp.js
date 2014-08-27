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
		server_url: 'http://roisalen.herokuapp.com'
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
			.state('admin-speakers', {
				url: '/admin-speakers',
				templateUrl: 'partials/admin-speakers.html',
				controller: 'adminSpeakersController',
				controllerAs: 'adminSpeakersController'
			})
			.state('lead-meeting', {
				url: '/lead-meeting',
				templateUrl: 'partials/lead-meeting.html',
				controller: 'leadMeetingController',
				controllerAs: 'leadMeetingController'
			});
	})
	// in order to add the active class to the nav-links that are active, we
	// need access to the state in our header. we do that this way:
	.run(function($rootScope, $state) {
		$rootScope.$state = $state;
	});

})();