var todos = [];

function Todo(name) {
    this.name = name;
    this.completed = false;
}


// Add Todo
function addTodoWithName(name) {
    var t = new Todo(name);
    console.log(t);
    todos.push(t);
    setData();
    location.reload();
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
startTime();

//List Todos
function listTodos() {
    var html = "";
    for (var i in todos) {
        var todo = todos[i];
        var name = todo.name;
        var completed = todo.completed;
        var button_Del = document.createElement("button");
        button_Del.id = "del_" + i;
        button_Del.innerHTML = "Delete";
        button_Del.onclick = delete_List;
        button_Del.className = "del";
        
        var button_Edit = document.createElement("button");
        button_Edit.id = "edit_" + i;
        button_Edit.innerHTML = "Edit";
        button_Edit.onclick = editList;
        button_Edit.className = "edit";

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
        divButtons.appendChild(button_Edit);
        divButtons.appendChild(button_Del);

        li.appendChild(divButtons);
        document.getElementById("u-list").appendChild(divName);
        // html += "<li>" + name + " " + completed + "<div>" +button_Edit.outerHTML  + button_Del.outerHTML+ "</div>" + "</li>";

    }

    // $("#u-list").html(html);
}

//Submit button to add todo
$("#add-todo-click").submit(function (event) {
    event.preventDefault(); // Prevents the default behaviour
    var name = $("#todo-name").val();
    if (name !== "" && name !== " ") {
        name = $("#todo-name").val();
        //Validiate...
        addTodoWithName(name);
        listTodos();
    }
});

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

//Edit Todo
function editList() {
    index = this.id.replace("edit_", "");
    var inputbox = document.createElement("input");
    var span = document.getElementById("span_" + index);
    var list = document.getElementById("list_" + index);
    var divButtons = document.getElementById("div_" + index);


    var temp = span.innerHTML;
    inputbox.value = temp;
    span.style.display = "none";
    list.insertBefore(inputbox, divButtons);
    inputbox.focus();
    this.style.display = "none";

    inputbox.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            span.innerHTML = inputbox.value;
            inputbox.style.display = "none";
            span.style.display = "";
            editTodoAtIndex(index, inputbox.value);
            var edit = document.getElementById("edit_" + index);
            edit.style.display = "";
        }
    })
}

function editTodoAtIndex(index, newText) {
    todos[index].name = newText;
    setData();
}

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