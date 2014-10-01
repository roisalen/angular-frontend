// To avoid polluting the global scope with our function declarations, we wrap
// everything inside an IIFE
(function() {

	// define the module that will hold all the controllers we're gonna use
    angular.module('speakerAppControllers', []);

	// -----
	// used with partials/speaker-list.html
	function speakerListController($interval, SpeakersFactory) {

	    var vm = this;

	    // fetch stuff every 1 second
	    $interval(function() {

		    // get the current speaker _list_ from server
		    SpeakersFactory.getSpeakerListFromServer()
		    .success(function(data) {
		    	vm.speakerList = data;
		    })
		    .error(function() {
		    	console.log('could not get data from server')
		    });

		    // get the current subject title form the sever
		    SpeakersFactory.getSubjectTitleFromServer()
		    .success(function(data) {
		    	if (data) {
		    		vm.subjectTitle = JSON.parse(data);
		    	}
		    })
		    .error(function() {
		    	console.log('could not get data from server')
		    });

	    }, 1000);

	    return vm;

	}

	// add it to our bookControllers module
	angular
	    .module('speakerAppControllers')
	    .controller('speakerListController', speakerListController);
	// -----

	// -----
	// used with partials/admin-representatives.html
	function adminRepresentativesController($scope, $interval, SpeakersFactory) {
	    var vm = this;

	    // fetch stuff every 1 second
	    $interval(function() {

	    	// get registered representatives from server
	    	SpeakersFactory.getRepresentativesFromServer()
	    	.success(function(data) {
	    		vm.representatives = data;
	    	})
	    	.error(function() {
	    		console.log('could not get data from server')
	    	});

	    	// get the current speaker _list_ from server
	    	SpeakersFactory.getSpeakerListFromServer()
	    	.success(function(data) {
	    		vm.speakerList = data;
	    	})
	    	.error(function() {
	    		console.log('could not get data from server')
	    	});

	    }, 1000);

	    // variables and submit handler for manually adding speakers
	    vm.number = null;
	    vm.name = null;
	    vm.group = null;
	    vm.sex = null;
	    vm.postRepresentativeFromForm = function() {
	    	SpeakersFactory.registerRepresentative([vm.number, vm.name, vm.group, vm.sex]);
	    };

	    // handler for removing a representative
	    vm.removeRepresentative = function(number) {
	    	SpeakersFactory.removeRepresentative(number);
	    };

	    //Function for handling csv-upload
		$scope.readFileToArray = function(files) {
			var reader = new FileReader();
			reader.readAsText(files[0]);
			reader.onload = function(event) {
				var csvText = event.target.result;
				SpeakersFactory.registerRepresentativesFromArray(csvText.csvToArray());
			};
		};

	    return vm;
	}

	// add it to our bookControllers module
	angular
	    .module('speakerAppControllers')
	    .controller('adminRepresentativesController', adminRepresentativesController);
	// -----

	// -----
	// used with partials/lead-meeting.html
	function leadMeetingController($http, $interval, SpeakersFactory) {

	    var vm = this;

	    vm.timer = new Stopwatch(document.getElementById("stopwatch"), {delay: 1000});

	    // get registered speakers from server
	    SpeakersFactory.getRepresentativesFromServer()
	    .success(function(data) {
	    	vm.representatives = data;
	    })
	    .error(function() {
	    	console.log('could not get data from server')
	    });

	    // get the current subject title form the sever
	    SpeakersFactory.getSubjectTitleFromServer()
	    .success(function(data) {
	    	if(data) {
	    		vm.subjectTitle = JSON.parse(data);
	    	}
	    })
	    .error(function() {
	    	console.log('could not get data from server')
	    });

	    // fetch stuff every 1 second
	    $interval(function() {

	    	// get the current speaker _list_ from server
	    	SpeakersFactory.getSpeakerListFromServer()
	    	.success(function(data) {
	    		vm.speakerList = data;
	    	})
	    	.error(function() {
	    		console.log('could not get data from server')
	    	});

	    }, 1000);

	    // handler for setting the current case subject
	    vm.setSubject = function() {
	    	// TO DO: lagre sakstittel (kanskje i en ny factory)
	    };

	    // variables and handler for adding a speaker to the speaker list
	    vm.speakerNumber = null;
	    vm.addSpeaker = function() {

	    	console.log('Let\'s try to add a new speaker to the list:' + vm.speakerNumber);
	    	
	    	var callback = function() {
	    		// this is called when the action is done successfully
	    		vm.speakerNumber = null;
	    	};

	    	if (!vm.speakerNumber) {

	    		SpeakersFactory.nextSpeaker();
	    		vm.timer.reset();
	    		vm.timer.start();

	    	} else if (vm.speakerNumber.charAt(0) === "r") {

	    		SpeakersFactory.addReplyToFirstSpeaker(vm.speakerNumber.slice(1), callback);
	    		
	    	} else if (!isNaN(parseInt(vm.speakerNumber))) {

	    		vm.timer.start();
	    		SpeakersFactory.addSpeakerToBottom(vm.speakerNumber, callback);

	    	} else {

	    		vm.timer.start();
	    		SpeakersFactory.registerUnknownRepresentativeAndAddSpeakerToBottom(vm.speakerNumber);

	    	}
	    };

	    // handler for removing a speaker from the speaker list
	    vm.removeSpeaker = function(index) {
	    	SpeakersFactory.removeSpeaker(index);
	    };

	    // handler for removing a replicant from the current
	    vm.removeReplicant = function(index) {
	    	SpeakersFactory.removeReplicant(index);
	    };

	    // handler for setting the current subject title
	    vm.setSubjectTitle = function() {
	    	SpeakersFactory.setSubjectTitleOnServer(vm.subjectTitle)
	    	.success(function() {
	    		console.log('Subject title updated.');
	    	})
	    	.error(function() {
	    		console.log('Could not set subject title.');
	    	});
	    }

	    return vm;

	}

	// add it to our bookControllers module
	angular
	    .module('speakerAppControllers')
	    .controller('leadMeetingController', leadMeetingController);
   // -----

   function statisticsController( SpeakersFactory) {
   		var vm = this;

   		vm.getStatisticsByType = function(sortType, containerId, typeLabel, chartType) {
   			SpeakersFactory.getStatistics(sortType)
   			.success(function(data) {

   				var extractedValues = extractValues(data);
   				if (chartType === 'column') {
   					createColumnChart(extractedValues, containerId, typeLabel);
   				} else if (chartType === 'pie') {
   					createPieCharts(extractedValues, containerId, typeLabel);
   				}
   				
   			})
   			.error(function() {
	    		console.log('Could not set subject title.');
	    	});;


   		};

   		vm.getStatisticsByType('sex', ['firstSexChartContainer', 'secondSexChartContainer'], 'Kjønn', 'pie');
   		vm.getStatisticsByType('group', 'groupChartContainer', 'Fraksjon', 'column');
   		vm.getStatisticsByType('name', 'nameChartContainer', 'Representant', 'column');

   		return vm;
   }

   function createPieCharts(data, containerId, typeLabel) {
   	new Highcharts.Chart({
   		chart: {
   			renderTo: containerId[0],
   			type: 'pie'
   		},
   		title: {
   				text: "Innlegg fordelt på " + typeLabel.toLowerCase()
   		},


        series: [{
        			name: "Antall",
                    colorByPoint: true,
                    data: data.idAndEntries
        }],
   			

   	});

   	new Highcharts.Chart({
   		chart: {
   			renderTo: containerId[1],
   			type: 'pie'
   		},
   		title: {
   				text: "Replikker fordelt på " + typeLabel.toLowerCase()
   		},


        series: [{
                    name: "Antall",
                    colorByPoint: true,
                    data: data.idAndReplies
        }],
   			

   	});

   }

   function createColumnChart(data, containerId, typeLabel) {
   		new Highcharts.Chart({
   			chart: {
   				renderTo: containerId,
   				type: 'column',
   			},

   			title: {
   				text: "Innlegg og replikker fordelt på " + typeLabel.toLowerCase()
   			},
   			
   			xAxis: {
   				categories: data.ids,
   				title: {
   					text: typeLabel
   				}
   			},
   			
   			yAxis: {
   				title: {
   					text: 'Antall'
   				}
   			},

   			series: [{
   				name: 'Innlegg',
   				data: data.entries,
   			},
   			{
   				name: 'Replikker',
   				data: data.replies,
   			}]
   		});
   }

   function extractValues(data) {
   		var entries = [];
   		var ids = [];
   		var replies = [];
   		var idAndEntries = [], idAndReplies = [];
   		for (var index in data) {
   			var valueJson = data[index]
   			if (valueJson._id) {
   				ids.push(valueJson._id);
   				entries.push(valueJson.mainEntries);
   				replies.push(valueJson.replies);
   				idAndEntries.push([valueJson._id, valueJson.mainEntries]);
   				idAndReplies.push([valueJson._id, valueJson.replies])
   			}
   		}

   		return {ids: ids, replies: replies, entries: entries, idAndReplies: idAndReplies, idAndEntries: idAndEntries};
   }

   angular
	    .module('speakerAppControllers')
	    .controller('statisticsController', statisticsController);

})();