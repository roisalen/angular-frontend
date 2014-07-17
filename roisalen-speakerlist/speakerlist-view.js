function generateTableRowFromSpeaker(speaker) {
	var tableRow = "<tr class='entry'>";
	tableRow += "<td class='number'>"+speaker.number+"</td>";
	tableRow += "<td class='name'>"+speaker.name;
	tableRow += "</td></tr>";
	
	tableRow += generateTableRowsForReplies(speaker.replies);

	$("#speakerList").find('tbody').append(tableRow);
}

function generateTableRowsForReplies(replies) {
	var tableRows = "";
	if (replies.length > 0) {
		replies.forEach(function(entry) {
			tableRows += "<tr class='reply'><td class='reply-arrow'>&#8627;</td><td class='replies'>" 
			tableRows += entry.number+" "+entry.name+"</td>";
			tableRows += "</tr>";
		});
	}

	return tableRows;
}

function parseSpeakerQueue(data) {
	$("#speakerList tr").remove();
	data.forEach(generateTableRowFromSpeaker);
}

function setSubject(data) {
	$("h2").text(data);
}

$(document).ready(function () {
	window.setInterval(function() {
		$.get(SERVER_URL + "/speakerList", parseSpeakerQueue);
		$.get(SERVER_URL + "/subject", setSubject)
	}, 1000);
});