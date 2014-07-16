function generateTableRowFromSpeaker(speaker) {
	var tableRow = "<tr class='entry'>";
	tableRow += "<td class='number'>"+speaker.number+"</td>";
	tableRow += "<td class='name'>"+speaker.name+"</td>";
	tableRow += "</tr">

	$("#speakerList").find('tbody').append(tableRow);
}

function parseSpeakerQueue(data) {
	$("#speakerList tr.entry").remove();
	data.forEach(generateTableRowFromSpeaker);
}

$(document).ready(function () {
	window.setInterval(function() {
		$.get(SERVER_URL + "/speakerList", parseSpeakerQueue);
	}, 1000);
});