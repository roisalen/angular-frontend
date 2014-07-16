var timer;

function setupListeners() {
	$("form").submit(addSpeaker);
	$(".delete-link").click(removeSpeaker);
}

function generateTableRowFromSpeaker(speaker) {
	var tableRow = "<tr class='entry'>";
	tableRow += "<td class='number'>"+speaker.number+"</td>";
	tableRow += "<td class='name'>"+speaker.name+"</td>";
	tableRow += "<td class='delete-link'>X</td>";
	tableRow += "</tr">

	$("#speakerList").find('tbody').append(tableRow);
}

function parseSpeakerQueue(data) {
	$("#speakerList tr.entry").remove();
	data.forEach(generateTableRowFromSpeaker);
	$(".delete-link").click(removeSpeaker);
	$("#speakerNumber").val("");
}

function removeSpeaker(ev, index) {
	var index;
	if(index === undefined) {
		index = $(this).parent().index();
	}

	$.ajax({
		url: SERVER_URL + "/speakerList/" + index,
		type: "DELETE",
		success: function(response) {
			$.get(SERVER_URL + "/speakerList", parseSpeakerQueue);
		}
	});
}

function addSpeaker(ev) {
	ev.preventDefault();
	var number = $("#speakerNumber").val();
	if(!number) {
		removeSpeaker(null, 0);
		timer.reset();
		timer.start();
	} else {
		timer.start();
		console.log("Adding "+number);
		$.post(SERVER_URL + "/speakerList", number, parseSpeakerQueue);
	}
}

$(document).ready(function () {
	setupListeners();
	timer = new Stopwatch(document.getElementById("stopwatch"), {delay: 1000});
	$.get(SERVER_URL + "/speakerList", parseSpeakerQueue);
});