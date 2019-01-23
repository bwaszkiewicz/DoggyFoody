function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";";
  }

function checkCookies(){
    if(sessionStorage.Storage.getItem("SignIn") == "1"){
        document.getElementById("LinkBarTableFirstLink").href="UserPanel.html";
        document.getElementById("LinkBarTableFirstText").innerHTML="User Panel";
        document.getElementById("LinkBarTableSecondLink").href="Logout.html";
        document.getElementById("LinkBarTableSecondText").innerHTML="Logout";

        document.getElementById("signInMainBlockDiv").innerHTML="You are already sign in!";
    } else {
        document.getElementById("LinkBarTableFirstLink").href="SignIn.html";
        document.getElementById("LinkBarTableFirstText").innerHTML="Sign In ";
        document.getElementById("LinkBarTableSecondLink").href="SignUp.html";
        document.getElementById("LinkBarTableSecondText").innerHTML=" Sign Up";
    
        var userlogin = getCookie("userlogin");
        if (userlogin != "") {
          document.getElementById("loginSignIn").value = userlogin;
        }
    }
}

function checkSignIn(login, psw){
	fetch("https://doggyfoodyapi.azurewebsites.net/api/users/login?username="+login+"&password="+psw).then(function(response) {
    return response.json();}).then(function(myJson){
        var data = myJson;
        
        ready = true;

        if(data.Login==login){
            if(document.getElementById("rememberCheckbox").checked == true) {
                setCookie("userlogin",document.getElementById("loginSignIn").value,1);
            }
            sessionStorage.setItem("SignIn", "1");
            sessionStorage.setItem("UserId", data.Id);
            window.location.href = "index.html";
        } else {
            document.getElementById("wrongLoginPswHint").innerHTML="Wrong login / password!";
            document.getElementById("wrongLoginPswHint").style.visibility="visible";
            document.getElementById("loginSignIn").value = "";
            document.getElementById("pswSignIn").value = "";
        }
    });
}

function verification(){
    checkSignIn(document.getElementById("loginSignIn").value, document.getElementById("pswSignIn").value);
}