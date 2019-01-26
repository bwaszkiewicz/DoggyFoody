function logout(){
    if(sessionStorage.getItem("UserId") != null){
        document.getElementById("LinkBarTableFirstLink").href="SignIn.html";
        document.getElementById("LinkBarTableFirstText").innerHTML="Sign In ";
        document.getElementById("LinkBarTableSecondLink").href="SignUp.html";
        document.getElementById("LinkBarTableSecondText").innerHTML=" Sign Up";
        sessionStorage.clear();
    } else {
        document.getElementById("LinkBarTableFirstLink").href="SignIn.html";
        document.getElementById("LinkBarTableFirstText").innerHTML="Sign In ";
        document.getElementById("LinkBarTableSecondLink").href="SignUp.html";
        document.getElementById("LinkBarTableSecondText").innerHTML=" Sign Up";
    
        document.getElementById("LogoutMainBlockDiv").innerHTML="You must sign in first!"
    }

    setTimeout(redirectToMain, 2000);
}

function redirectToMain()
{
    window.location.replace("./index.html")
}