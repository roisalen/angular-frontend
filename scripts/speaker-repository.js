

var speakers = {};

function getSpeakers() {
	if (speakers.size === 0) {
		speakers = JSON.parse(localStorage.getItem('speakers'));
	}
	return speakers;
}

function add(speaker) {
	speakers[speaker.number] = speaker;
} 



function storeSpeakers() {
	localStorage.setItem('speakers', JSON.stringify(speakers));
	console.log("speakers stored")
}

exports.getSpeakers = getSpeakers;
exports.add = add
exports.storeSpeakers =storeSpeakers;