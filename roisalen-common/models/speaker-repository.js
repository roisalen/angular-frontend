var _speakersList = {};

function SpeakerRepository(view) {
	this.add = add;
	this.getSpeakers = getSpeakers;
	this.size = size;
	this.storeSpeakers = storeSpeakers;
	this.getSpeakerByNum = getSpeakerByNum;
	this.removeSpeakerByNum = removeSpeakerByNum;
	this.view = view;

	function getSpeakers() {
		if (size() === 0) {
			//_speakersList = JSON.parse(localStorage.getItem('speakers')); // used to use localstorage
			$.get("http://127.0.0.1:8080/speakers", function(data) {
				_speakersList = data;
			}); // mongodb
		}
		return $.extend({},_speakersList);
	}

	function add(speaker) {
		_speakersList[speaker.number] = speaker;
		storeSpeakers();
	}

	function storeSpeakers() {
		//localStorage.setItem('speakers', JSON.stringify(_speakersList)); // used to use localstorage
		$.post("http://127.0.0.1:8080/speakers", JSON.stringify(speaker)); // mongodb
		console.log("speakers stored");
	}
	
	function size() {
		return Object.keys(_speakersList).length;
	}

	function getSpeakerByNum(number) {
		console.log("Getting speaker number "+number + " from "+JSON.stringify(_speakersList));
		if (number in _speakersList) {
			console.log("Found: "+JSON.stringify(_speakersList[number]));
			return _speakersList[ number ];
		} else {
			console.log("Error: Tried to get speaker number " + number + ", but it does not exist.");
			return null;
		}
	}

	function removeSpeakerByNum(number) {
		if(!(delete _speakersList[ number ])) {
			console.log("Error: Tried to remove speaker number " + number +", but it does not exist.");
		}
		storeSpeakers();
	}
}