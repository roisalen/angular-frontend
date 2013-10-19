// Retrieve the object from storage
var talere = [];
//window.onbeforeunload = storeTalere;
var id = 0;
var i = -1;

var representanter = {}
representanter[1] = "Kristina Erikstad Sæterdal";
representanter[2] = "Daniel Sandbakken Nilsen";
representanter[3] = "Marianne Andenæs";
representanter[4] = "Ivo Kantardjiev";
representanter[5] = "Lars Andreas Madsen";
representanter[6] = "Hamed Hassan ";
representanter[7] = "Eirik Sti";
representanter[8] = "Madeleine Sjøbrend";
representanter[9] = "Armin Khoshnewiszadeh";
representanter[10] = "Emilie Wold";
representanter[11] = "Henrik Sveinsson";
representanter[12] = "Mikkel Haugen";
representanter[13] = "Marie Samuelsen";
representanter[14] = "Vetle Bo Saga";
representanter[15] = "Kåre Sagård";
representanter[16] = "Heidrun Elisabeth Lode";
representanter[17] = "Mads Danielsen";
representanter[18] = "Hilde Mari Syverstad Vik";
representanter[19] = "Ingrid Keenan";
representanter[20] = "Knut Frydenlund";
representanter[21] = "Alexander Fleicher";
representanter[22] = "Espen Grøtberg";
representanter[23] = "Celestina Da Silva";
representanter[24] = "Håkon Beckstrøm";
representanter[25] = "Markus Weierud";
representanter[26] = "Caroline Sosialdemokratene";
representanter[27] = "Marja Liisa Andreassen";
representanter[28] = "Robin Orne Svenungsen";
representanter[29] = "Håkon Sjøvold";
representanter[31] = "Ingelin Rendal";
representanter[32] = "Ingvild Finsrud";
representanter[34] = "Marthe Oldernes";
representanter[35] = "Vegard Paulsen";
representanter[100] = "Gabrielle L. Gjerdset";
representanter[101] = "Eva Holthe Enoksen";
representanter[102] =  "Ådne Hindenes";
representanter[103] = "Martin Uleberg";
representanter[104] = "Amanda Schei";
representanter[200] = "Kontrollkomiteen";
representanter[201] = "Velferdstinget";
representanter[202] = "Norsk Studentorganisasjon";





 

if (localStorage.getItem('talere')) 
	talere = JSON.parse(localStorage.getItem('talere'));

function storeTalere() {
	localStorage.setItem('talere', JSON.stringify(talere));
	console.log("talere stored")
}

function getId() {
	return id++;
}

function Taler(s) {
	this.streng = s;
	this.replikker = [];	
}

function addReplikk(replikk) {
	if (talere.length > 0) {
		talere[0].replikker.splice(talere[0].replikker.length, 0, replikk);
		renderTalere();
	}
}

function addTaler(taler) {
	if(taler.streng[0] == "r") {
		taler.streng = taler.streng.slice(1, taler.streng.length);
		addReplikk(taler);
		return;
	}
	if  (i != -1) {
		talere.splice(i, 0, taler);
		i = -1;
	}
	else {
		talere.push(taler);
	}
	
	renderTalere();
}

function removeFromTaler(index) {
	if (index < 0) 
		talere[0].splice((index*-1)+1, 1);
	else
		talere.splice(index, 1);
	rendertalere();
}

function changeTaler(index) {
	if (index < 0)
	var t = talere[index];
	$("input#itemName").val(t.streng);
	removeFromtaler(index);
	i = index;
}

function textRepresentant(rep) {
	if (representanter[parseInt(rep.streng)]){
			return rep.streng+" "+representanter[parseInt(rep.streng)];
		}
		else {
			return rep.streng;
		}

}

function renderTaler(t, id) {
	var item = $(document.createElement("li")).addClass("taleritem");
	var slettKnapp = $(document.createElement("a")).addClass("slettKnapp");
	var endreKnapp = $(document.createElement("a")).addClass("endreKnapp");
	var replikker = "";

	slettKnapp.attr("onclick","removeFromTaler("+id+")");
	endreKnapp.attr("onclick","changeTaler("+id+")");

	console.log(t);
	slettKnapp.text("Slett");
	endreKnapp.text("Endre");

	if (t.replikker.length > 0) {	
		replikker = $(document.createElement("ul")).addClass("replikker");
		var i = -1;
		for (var replikk in t.replikker) {
			replikker.append(renderTaler(t.replikker[replikk], i--));
		}
	}
	
	item.text(textRepresentant(t));

	console.log(parseInt(t.streng));
	console.log(representanter[parseInt(t.streng)]);
		
	item.append(slettKnapp);
	item.append(endreKnapp);
	item.append(replikker);
	return item;


}


function renderTalere() {
	var items = $("ul.item-list");
	items.html("");
	var slettKnappStart = "<a class='slettKnapp' onclick='removeFromTaler(";
	var slettKnappSlutt = ")'>Slett</a>";
	var endreKnappStart = "<a class='endreKnapp' onclick='changeTaler(";
	var endreKnappSlutt = ")'>Endre</a>";
	
	console.log(talere.length);
	if (talere.length === 0) {
		$("ul.item-list").append("<img src='./img/aadne.png' width='400px'/> <br />SI NOE DA");
	}
	for(var t in talere){
		items.append(renderTaler(talere[t], t));
	};


	storeTalere();

}




$("#addItemForm").on("submit", function (event) {
	event.preventDefault();
	console.log("got event");
	var text = $("input#itemName").val();
	$("input#itemName").val("");
	if (text.length > 0) { 
		var taler = new Taler(text);
		addTaler(taler);
	};
});

renderTalere();
