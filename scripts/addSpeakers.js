//$("#speakerName").on("submit", function (event) { //old with jquery didnt get it to work
function addSpeaker() {
	event.preventDefault();
	console.log("got event");
	
	var no = $("input#speakerNo").val();
	$("input#speakerNo").val("");
	
	var name = $("input#speakerName").val();
	$("input#speakerName").val("");
	
	if (name.length > 0 && isNumber(no)) { 
		var speaker = new Speaker(no,name);
		var sr = new SpeakerRepository();
		sr.add(speaker);
		
		//update speakerlist below
		/*var items = $("ul.item-list");
		items.html("");
		var speakers = SpeakerRepository.getSpeakers();
		for(var s in speakers){
			items.append(showSpeaker(talere[t], t));
		};*/
	};
	
	console.log(sr.getSpeakers());
	console.log(sr.size());
};

function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}