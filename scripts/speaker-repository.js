

var speakers = [];

function getSpeakers() {
	if (speakers.size === 0) {
		speakers = JSON.parse(localStorage.getItem('speakers'));
	}
	return speakers;
}

function add(speaker, index) {
	speakers.splice(index, 0, speaker);
} 

function removeSpeakerAt(index) {
	speakers.splice(index, 1);
}


function storeSpeakers() {
	localStorage.setItem('speakers', JSON.stringify(speakers));
	console.log("speakers stored")
}