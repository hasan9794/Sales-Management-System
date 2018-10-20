var todos = [];
console.log("hi")
function Todo(name) {
    this.name = name;
    this.completed = false;
}


//Get Todo
function getTodoAtIndex(index) {
    return todos[index];
}

//Set Data to local storage
function setData() {
    var str = JSON.stringify(todos);
    localStorage.setItem("Text", str);
}

//Get data from local storage
function getData() {
    var str = localStorage.getItem("Text");
    todos = JSON.parse(str);
    if (!todos) {
        todos = [];
    }
}

//initialize app
getData();
listTodos();

//List Todos
function listTodos() {
    var html = "";
    for (var i in todos) {
        var todo = todos[i];
        var name = todo.name;
        var completed = todo.completed;
        var button_Del = document.createElement("button");
        button_Del.id = "del_" + i;
        button_Del.innerHTML = "Sell Item";
        button_Del.onclick = delete_List;

        var span = document.createElement("span");
        span.id = "span_" + i;
        var li = document.createElement("li");
        li.id = "list_" + i;
        span.innerHTML = name;
        li.appendChild(span);

        var divName = document.createElement("div");
        divName.appendChild(li);

        var divButtons = document.createElement("div");
        divButtons.id = "div_" + i;
        divButtons.appendChild(button_Del);

        li.appendChild(divButtons);
        document.getElementById("u-list").appendChild(divName);
        // html += "<li>" + name + " " + completed + "<div>" +button_Edit.outerHTML  + button_Del.outerHTML+ "</div>" + "</li>";

    }

    // $("#u-list").html(html);
}

function delete_List() {
    var index = this.id.replace("del_", "");
    var list = document.getElementById("list_" + index);
    list.style.display = "none";
    console.log(index);
    removeTodoAtIndex(index);
}

//Remove Todo
function removeTodoAtIndex(index) {
    todos.splice(index, 1);
    setData();
}
startTime();
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}