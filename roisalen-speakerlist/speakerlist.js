function setupListeners() {
	$("form").submit(addSpeaker);
	$(".delete-link").click(removeSpeaker);
}

function generateTableRowFromSpeaker(speaker) {
	console.log("generating table row for "+speaker);
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

function removeSpeaker(ev) {
	console.log($(this).parent().index());
	var number = $(this).parent().index();
	console.log("number "+number);

	$.ajax({
		url: "http://127.0.0.1:8080/speakerList/"+number,
		type: "DELETE",
		success: function(response) {
			$.get("http://127.0.0.1:8080/speakerList", parseSpeakerQueue);

		}
	});
}
function addSpeaker(ev) {
	ev.preventDefault();
	var number = $("#speakerNumber").val();
	console.log("Adding "+number);
	$.post("http://127.0.0.1:8080/speakerList", number, parseSpeakerQueue);
}

$(document).ready(function () {
	setupListeners();
	$.get("http://127.0.0.1:8080/speakerList", parseSpeakerQueue);
});
