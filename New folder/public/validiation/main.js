// Name and Password from the register-form
var name1 = document.getElementById('username');
var pw = document.getElementById('password');
var email1 = document.getElementById("email");
var flag;

function validiateInput(){
    flag = 0;
    if(email1.value === "" || email1.value === " " || email1.value.indexOf("@") === -1 || email1.value.indexOf(".com") === -1){
        var label_email = document.getElementById("label-email");
        label_email.style.visibility = "visible";
        flag = 1;
    }
    if(name1.value === "" || name1.value === " "){
        var label_name = document.getElementById("label-username");
        label_name.style.visibility = "visible";
        flag = 1
    }

    if(pw.value === "" || pw.value === " "){
        var label_password = document.getElementById("label-password");
        label_password.style.visibility = "visible";
        flag = 1;
    }
}

// storing input from register-form
function store() {
    validiateInput();
    if(flag === 0) {
        localStorage.setItem('name1', name1.value);
        localStorage.setItem('pw', pw.value);
        window.location.assign("./login.html");
    }
}

// check if stored data from register-form is equal to entered data in the   login-form
function check() {

    // stored data from the register-form
    var storedName = localStorage.getItem('name1');
    var storedPw = localStorage.getItem('pw');

    // entered data from the login-form
    var userName = document.getElementById('username');
    var userPw = document.getElementById('password');

    // check if stored data from register-form is equal to data from login form
    if(userName.value !== storedName || userName.value === " " || userName.value !== ""){
        document.getElementById("label-username").style.visibility = "visible";
    }

    //Displaying a message if user doesn't enter correct password
    if(userPw.value !== storedPw){
        document.getElementById("label-password").style.visibility = "visible";
    }
    // if admin then Redirect to admin panel
    if(userName.value == "admin" && userPw.value == "admin"){

        window.location.assign("../index.html");
    }
    //Redirect User to user panel
    if(userName.value == storedName && userPw.value == storedPw) {
        alert('You are loged in.');
        window.location.assign("../user.html");
    }
}