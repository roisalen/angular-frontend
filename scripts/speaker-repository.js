

var _speakersList = {};



function SpeakerRepository() {
	this.add = add;
	this.getSpeakers = getSpeakers;
	this.size = size;
	this.storeSpeakers = storeSpeakers;
    this.getSpeakerByNum = getSpeakerByNum;



	function getSpeakers() {
		if (size() === 0) {
			_speakersList = JSON.parse(localStorage.getItem('speakers'));
		}
		return $.extend({},_speakersList);
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

    function getSpeakerByNum(number) {
        try {
            return _speakersList[ number ];
        } finally {
            console.log("Error: Speaker number " + number + " does not exist.");
            return null;
        }
    }

}
