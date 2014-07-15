$(document).ready(function () {
	$("form").submit(function(ev) {
		console.log("in listener");
		ev.preventDefault();
		var number = $("#speakerNumber").val();
		console.log("Adding "+number);
		$.post("http://127.0.0.1:8080/speakerList", number, parseSpeakerQueue);
	});
});
console.log("loaded");
function generateTableRowFromSpeaker(speaker) {
	console.log("generating table row for "+speaker);
	var tableRow = "<tr class='entry'>";
	tableRow += "<td>"+speaker.number+"</td>";
	tableRow += "<td>"+speaker.name+"</td>";
	tableRow += "</tr">

	$("#speakerList").find('tbody').append(tableRow);
}

function parseSpeakerQueue(data) {
	$("#speakerList tr.entry").remove();
	data.forEach(generateTableRowFromSpeaker);
	$("#speakerNumber").val("");

}

