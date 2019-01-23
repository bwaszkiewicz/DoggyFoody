function checkSession() {
    if (sessionStorage.getItem("SignIn") == "1"){
        document.getElementById("LinkBarTableFirstLink").href="UserPanel.html";
        document.getElementById("LinkBarTableFirstText").innerHTML="User Panel";
        document.getElementById("LinkBarTableSecondLink").href="Logout.html";
        document.getElementById("LinkBarTableSecondText").innerHTML="Logout";
    } else {
        document.getElementById("LinkBarTableFirstLink").href="SignIn.html";
        document.getElementById("LinkBarTableFirstText").innerHTML="Sign In ";
        document.getElementById("LinkBarTableSecondLink").href="SignUp.html";
        document.getElementById("LinkBarTableSecondText").innerHTML=" Sign Up";
    }

}


function userPanelCheckSession() {
    if(sessionStorage.Storage.getItem("SignIn") == "1"){
        document.getElementById("LinkBarTableFirstLink").href="UserPanel.html";
        document.getElementById("LinkBarTableFirstText").innerHTML="User Panel";
        document.getElementById("LinkBarTableSecondLink").href="Logout.html";
        document.getElementById("LinkBarTableSecondText").innerHTML="Logout";
    } else {
        document.getElementById("LinkBarTableFirstLink").href="SignIn.html";
        document.getElementById("LinkBarTableFirstText").innerHTML="Sign In ";
        document.getElementById("LinkBarTableSecondLink").href="SignUp.html";
        document.getElementById("LinkBarTableSecondText").innerHTML=" Sign Up";

        document.getElementById("UserPanelMainBlockDiv").innerHTML="Access denied";

    }
}

function SignInCheckSession() {
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
    
    }
}

function SignUpCheckSession() {

}