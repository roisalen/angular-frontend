//$("#speakerName").on("submit", function (event) { //old with jquery didnt get it to work
function addSpeaker() {
	event.preventDefault(); //to stop autorefresh
	
	var no = $("input#speakerNo").val();
	$("input#speakerNo").val("");
	
	var name = $("input#speakerName").val();
	$("input#speakerName").val("");
	
	if (name.length > 0 && isNumber(no)) {
		var speaker = new Speaker(name,no);
		var sr = new SpeakerRepository();
		sr.add(speaker);
		
		updateSpeakerList();
	}
}

function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function updateSpeakerList() {
		var sr = new SpeakerRepository();
		var items = $("#speakerList");
		console.log(items);
		items.html("");
		var speakers = sr.getSpeakers();
		for(var s in sr.getSpeakers()) {
			var template = "<li>{{number}}. {{name}}</li>";
			var output = Mustache.render(template, sr.getSpeakers()[s]);
			items.append(output);
			//console.log(output);
		}
}