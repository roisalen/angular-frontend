// Retrieve the object from storage
var todos = [];
window.onbeforeunload = storeTodos;
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





 

if (localStorage.getItem('todos')) 
	todos = JSON.parse(localStorage.getItem('todos'));

function storeTodos() {
	localStorage.setItem('todos', JSON.stringify(todos))
}

function getId() {
	return id++;
}

function Todo(s) {
	this.streng = s;
	this.replikker = [];	
}

function addReplikk(replikk) {
	if (todos.length > 0) {
		todos[0].replikker.splice(todos[0].replikker.length, 0, replikk);
		renderTodos();
	}
}

function addTodo(todo) {
	if(todo.streng[0] == "r") {
		todo.streng = todo.streng.slice(1, todo.streng.length);
		addReplikk(todo);
		return;
	}
	if  (i != -1) {
		todos.splice(i, 0, todo);
		i = -1;
	}
	else {
		todos.push(todo);
	}
	
	renderTodos();
}

function removeFromTodo(index) {
	if (index < 0) 
		todos[0].splice((index*-1)+1, 1);
	else
		todos.splice(index, 1);
	renderTodos();
}

function changeTodo(index) {
	if (index < 0)
	var t = todos[index];
	$("input#itemName").val(t.streng);
	removeFromTodo(index);
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
	var item = $(document.createElement("li")).addClass("todoitem");
	var slettKnapp = $(document.createElement("a")).addClass("slettKnapp");
	var endreKnapp = $(document.createElement("a")).addClass("endreKnapp");
	var replikker = "";

	slettKnapp.attr("onclick","removeFromTodo("+id+")");
	endreKnapp.attr("onclick","changeTodo("+id+")");

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


function renderTodos() {
	var items = $("ul.item-list");
	items.html("");
	var slettKnappStart = "<a class='slettKnapp' onclick='removeFromTodo(";
	var slettKnappSlutt = ")'>Slett</a>";
	var endreKnappStart = "<a class='endreKnapp' onclick='changeTodo(";
	var endreKnappSlutt = ")'>Endre</a>";
	
	if (todos.length === 0) {
		$("ul.item-list").append("<img src='aadne.png' width='400px'/> <br />SI NOE DA");
	}
	for(var t in todos){
		items.append(renderTaler(todos[t], t));
	};

	storeTodos();

}




$("#addItemForm").on("submit", function (event) {
	event.preventDefault();
	var text = $("input#itemName").val();
	$("input#itemName").val("");
	if (text.length > 0) { 
		var todo = new Todo(text);
		addTodo(todo);
	};
});

renderTodos();
