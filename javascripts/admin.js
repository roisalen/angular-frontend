function readFileToArray(files) {
	console.log("in file to array");
	var reader = new FileReader();
	reader.readAsText(files[0]);
	reader.onload = function(event) {
		var csvText = event.target.result;
		postSpeakersFromArray(csvText.csvToArray(), getSpeakers);
	};
	reader.onerror = errorHandler;
}

function errorHandler(evt) {
    if(evt.target.error.name == "NotReadableError") {
        alert("Cannot read file !");
    }
}

function postSpeakersFromArray(csvAsArray, done) {
	console.log(csvAsArray)
	csvAsArray.forEach(postSpeakerFromArray);
	done();
}

function postSpeakerFromArray(entry) {
		var speaker = {};
		speaker.number = entry[0];
		if (entry[1]) {
			speaker.name = entry[1];
		};

		if (entry[2]) {
			speaker.group = entry[2];
		};
		if (entry[3]) {
			speaker.sex = entry[3];
		};

		console.log("posting speaker "+speaker.name);
		
		$.post(SERVER_URL + "/speakers",JSON.stringify(speaker));
}


function getSpeakers() {
	$.get(SERVER_URL + "/speakers", parseAndShowSpeakers);
}

function parseAndShowSpeakers(data) {
	$("#representatives tr.entry").remove();
	data.forEach(generateTableRowFromSpeaker);
	$(".delete-representative").click(removeRepresentative);
}

function removeRepresentatives() {
	$.ajax({
		url: SERVER_URL + "/speakers/" + index,
		type: "DELETE",
		success: getSpeakers
		});

}

function generateTableRowFromSpeaker(speaker) {
	var tableRow = "<tr class='entry'>";
	tableRow += "<td>"+speaker.number+"</td>";
	tableRow += "<td>"+speaker.name+"</td>";
	tableRow += "<td>"+speaker.group+"</td>";
	tableRow += "<td>"+speaker.sex+"</td>";
	tableRow += "<td class='delete-representative'>X</td>";
	tableRow += "</tr">

	$("#representatives tr:last").after(tableRow);
}

function postSpeakerFromForm() {
	var number,name, group, sex;
	var speakerArray = [];

	number = $("#number").val();
	name = $("#name").val();
	group = $("#group").val();
	sex = $("#sex").val();
	
	postSpeakerFromArray([number, name, group, sex]);
	getSpeakers();
};

$(document).ready(function() {
	getSpeakers();
});