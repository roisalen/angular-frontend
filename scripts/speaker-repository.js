

var _speakersList = {};



function SpeakerRepository() {
	this.add = add;
	this.getSpeakers = getSpeakers;
	this.size = size;
	this.storeSpeakers = storeSpeakers;



	function getSpeakers() {
		if (_speakersList.size === 0) {
			_speakersList = JSON.parse(localStorage.getItem('speakers'));
		}
		return _speakersList;
	}

	function add(speaker) {
		_speakersList[speaker.number] = speaker;
	}	 

	function storeSpeakers() {
		localStorage.setItem('speakers', JSON.stringify(speakers));
		console.log("speakers stored")
	}
	
	function size() { 
		return Object.keys(_speakersList).length;
	}
}