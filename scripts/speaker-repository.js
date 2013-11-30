

var _speakersList = {};

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

var speakerRepository = {
	getSpeakers: getSpeakers,
	storeSpeakers: storeSpeakers,
	add: add,
	size: function() { return Object.keys(_speakersList).length}
}