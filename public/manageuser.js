//© 2021 Sean Murdock

let userName = "";
let password = "";
let verifypassword = "";
let email = "";
let acccount = "";
let phone = "";

let passwordRegEx=/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[*@#$%!]).{6,40})/;

function setusername(){
    userName = $("#username").val();
}

function setuserpassword(){
    password = $("#password").val();
    var valid=passwordRegEx.exec(password);
    if (!valid){
        alert('Must be 6 digits, upper, lower, number, and symbol');
    }
}

function setverifypassword(){
    verifypassword = $("#verifypassword").val();
    if (verifypassword!=password){
        alert('Passwords must be entered the same twice');
    }
}

function setaccount(){
    account = $("#account").val();
}
function setaccountType() {
    accountType = $("#accountType").val();
}

function setemail(){
    email = $("#email").val();
}

function setphone(){
    phone = $("#phone").val();
}

function savetoken(token){
// whatever passes as token should save into local storage
    if (window.localStorage){
     localStorage.setItem("token", token);
    }

}

function checkexpiredtoken(token){
// read token from local storage - check with ajax call
    if(window.localStorage){
    usertoken = localStorage.getItem("token");
    $.ajax({
       type: 'GET',
        url: '/validate/'+token,
        data: JSON.stringify({usertoken}),
        success: function(data){savetoken(data)},
        contentType: "application/text",
        dataType: 'text' })
    }
}

function userlogin(){
    setuserpassword();
    setusername();
    $.ajax({
        type: 'POST',
        url: '/login',
        data: JSON.stringify({userName, password}),
        success: function(data) {
            window.location.href = "/timer.html#"+data;//add the token to the url
        },
        error: function(data, textstatus,xhr){
            console.log('text status'+textstatus);
            console.log('xhr status'+xhr.status);
            alert('incorrect password.');
        },
        contentType: "application/json",
        dataType: 'text'
    });

}

function readonlyforms(formid){
    form = document.getElementById(formid);
    elements = form.elements;
    for (i = 0, len = elements.length; i < len; ++i) {
    elements[i].readOnly = true;
    }
    createbutton();
}
 function pwsDisableInput( element, condition ) {
        if ( condition == true ) {
            element.disabled = true;

        } else {
            element.removeAttribute("disabled");
        }

 }

function createbutton(){
    var button = document.createElement("input");
    button.type = "button";
    button.value = "OK";
    button.onclick = window.location.href = "/index.html";
    context.appendChild(button);
}


function registerUser(){
    setusername();
    setemail();
    setuserpassword();
    setverifypassword();
    setaccountType();
    setphone();

    $.ajax({
        type: 'POST',
        url: '/register',
        data: JSON.stringify({'userName': userName, 'email': email, 'password': password, 'verifyPassword': verifypassword, 'accountType': accountType, 'phone': phone}),
        success: function(data) { alert(data);
        window.location.href = "/index.html"},
        contentType: "application/text",
        dataType: 'text'
    });
}

function getstephistory(){
      $.ajax({
            type: 'POST',
            url: '/stephistory',
            data: JSON.stringify({userName}),
            success: function(data) { alert(data);
            json = $.parseJSON(data);
            $('#results').html(json.name+' Total Steps: ' + json.stepTotal)},
            contentType: "application/text",
            dataType: 'text'
        });
}

var enterFunction = (event) =>{
    if (event.keyCode === 13){
        event.preventDefault();
        $("#loginbtn").click();
    }
}

var passwordField = document.getElementById("password");

passwordField.addEventListener("keyup", enterFunction);