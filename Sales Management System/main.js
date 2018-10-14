var attempt;
var id = 1;
var add = document.getElementById("add");
console.log(add.innerText);
add.addEventListener("click", myfunction)

// var text = [];

function pageLoad() {
    for (var i = 1; i <= localStorage.length; i++) {
        myfunction(i, true);
    }

}



function myfunction(preList, flag) {
    var list = document.createElement("li");
    list.id = "list_" + id;

    if (flag) {
        var text = localStorage.getItem("Text" + preList);
    } else {
        var text = document.getElementById('input-text').value;
    }

    var textNode = document.createTextNode(text);
    console.log(textNode);
    var divItem = document.createElement("div");
    divItem.id = "text_" + id;
    divItem.appendChild(textNode);

    if (!flag) {
        localStorage.setItem("Text" + id, divItem.innerText);
    }

    var divButtons = document.createElement("div");
    divButtons.id = "divButtons_" + id;

    var edit = document.createElement("button");
    edit.id = "edit_" + id;
    edit.innerHTML = "Edit";
    edit.onclick = editText;

    var del = document.createElement("button");
    del.innerHTML = "Delete";
    del.id = "del_" + id;
    del.onclick = delText;

    divButtons.appendChild(edit);
    divButtons.appendChild(del);
    console.log(divButtons);

    list.appendChild(divItem);
    list.appendChild(divButtons);

    document.getElementById("u-list").appendChild(list);


    id++

}

function editText() {
    if (attempt === 1) {
        return false;
    }

    var editButton = this.id;
    var editId = this.id.replace("edit_", "");

    var textId = document.getElementById("text_" + editId);
    textId.style.display = "none";

    var inputBox = document.createElement("input");
    inputBox.id = "input_" + id;
    inputBox.type = "text";
    inputBox.value = textId.innerText;

    var list = document.getElementById("list_" + editId);

    var divButtons = document.getElementById("divButtons_" + editId);
    console.log(divButtons);
    list.insertBefore(inputBox, divButtons);
    inputBox.classList = "input-box";
    inputBox.focus();
    attempt = 1;

    inputBox.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            textId.innerText = inputBox.value;
            textId.style.display = "";
            inputBox.style.display = "none";
            localStorage.setItem("Text" + editId, textId.innerText);
            attempt = 0;
        }
    })
}

function delText() {
    var textToDelete = this.id.replace("del_", "");
    textToDelete = document.getElementById("list_" + textToDelete);
    textToDelete.style.display = "none";

    localStorage.removeItem("Text" + this.id.replace("del_",""));
}