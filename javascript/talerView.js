

var talere = [];

function renderTalere() {
	if (localStorage.getItem('talere')) 
		talere = JSON.parse(localStorage.getItem('talere'));
	var items = $("ul.tale-liste");
	items.html("");
	

	for(var t in talere){
		var item = $(document.createElement("li")).addClass("todoitem");
		
		endreKnapp.text("Endre");
		item.text(talere[t].nr+" "+talere[t].name+" "+talere[t].liste+ " "+talere[t].kjonn);

		items.append(item);
	};

}


setInterval(renderTalere, 500);