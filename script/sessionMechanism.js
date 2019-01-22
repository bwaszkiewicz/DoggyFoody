function checkSession() {
    if (sessionStorage.getItem("SignIn") == "1"){
        document.getElementById("LinkBarTableFirstLink").href="userPanel.html";
        document.getElementById("LinkBarTableFirstText").innerHTML="User Panel";
        document.getElementById("LinkBarTableSecondLink").href="stories.html";
        document.getElementById("LinkBarTableSecondText").innerHTML="Logout";
    } else {
        document.getElementById("LinkBarTableFirstLink").href="SignIn.html";
        document.getElementById("LinkBarTableFirstText").innerHTML="Sign In ";
        document.getElementById("LinkBarTableSecondLink").href="SignUp.html";
        document.getElementById("LinkBarTableSecondText").innerHTML=" Sign Up";
    }

}