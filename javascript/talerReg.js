// Retrieve the object from storage

var todos = [];

var talere = [];
window.onbeforeunload = storeTodos;
var id = 0;


if (localStorage.getItem('taler')) 
	talere = JSON.parse(localStorage.getItem('talere'));

function Taler (name, nr, liste, kjonn) {
	this.name = name;
	this.nr = nr;
	this.liste = liste;
	this.kjonn = kjonn;

}


function storeTodos() {
	localStorage.setItem('todos', JSON.stringify(todos))
	localStorage.setItem('talere', JSON.stringify(talere))
}

function getId() {
	return id++;
}

function Todo(s) {
	this.streng = s;
	
}

function addTodo(todo) {
	todos.push(todo);
	renderTodos();
	storeTodos();
}

function removeFromTodo(index) {
	todos.splice(index, 1);
	renderTodos();
	storeTodos();
}

function changeTodo(index) {
	var t = todos[index];
	$("input#itemName").val(t.streng);
	removeFromTodo(index);
	storeTodos();
}

function renderTodos() {
	var items = $("ul.tale-liste");
	items.html("");
	var slettKnappStart = "<a class='slettKnapp' onclick='removeFromTodo(";
	var slettKnappSlutt = ")'>Slett</a>";
	var endreKnappStart = "<a class='endreKnapp' onclick='changeTodo(";
	var endreKnappSlutt = ")'>Endre</a>";
	

	for(var t in talere){
		var item = $(document.createElement("li")).addClass("todoitem");
		var slettKnapp = $(document.createElement("a")).addClass("slettKnapp");
		var endreKnapp = $(document.createElement("a")).addClass("endreKnapp");

		slettKnapp.attr("onclick","removeFromTodo("+t+")");
		endreKnapp.attr("onclick","changeTodo("+t+")");


		slettKnapp.text("Slett");
		endreKnapp.text("Endre");
		item.text(talere[t].nr+" "+talere[t].name+" "+talere[t].liste+ " "+talere[t].kjonn);
		item.append(slettKnapp);
		item.append(endreKnapp);

		items.append(item);
	};

}

$("#addTaleForm").on("submit", function (event) {
	event.preventDefault();
	var name = $("input#navn").val();
	var nr = $("input#nr").val();
	var liste = $("input#liste").val();
	var kjonn = $("input#kjonn").val();
	
	var taler = new Taler(name, nr, liste, kjonn);
	talere.push(taler);
	renderTodos();
});


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
