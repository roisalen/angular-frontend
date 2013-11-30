

var speakers = {};

function getSpeakers() {
	if (speakers.size === 0) {
		speakers = JSON.parse(localStorage.getItem('speakers'));
	}
	return speakers;
}

function add(speaker, key) {
	speakers[key] = speaker;
} 



function storeSpeakers() {
	localStorage.setItem('speakers', JSON.stringify(speakers));
	console.log("speakers stored")
}