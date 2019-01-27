var validationErrorCode = {
    noLogin: 0,
    noPassword: 1,
    noConfirmPassword: 2,
    notEqualPasswords: 3,
    noEmail: 4,
    wrongEmailFormat: 5
}

function addUser(){
    var accountValidationResult = accountValidation();
if(accountValidationResult.size == 0){

    let login = document.getElementById("loginSignUp").value.toString();
    let password = document.getElementById("pswSignUp").value.toString();
    let email = document.getElementById("emailSignUp").value.toString();

    let data = JSON.stringify(
        {
            Login: login,
            Password: password,
            Email: email,
            Columns: null,
            UserType: UserTypeEnum.User
        }
    );

    fetch("https://doggyfoodyapi.azurewebsites.net/api/users/register", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: data
        }).then(res => res.json());

        setTimeout(toSignUpResult, 2000);

} else {

    if(accountValidationResult.has(validationErrorCode.noLogin)){
        document.getElementById("loginErrorSpan").innerHTML = "You must enter a login!";
        document.getElementById("loginErrorSpan").style.display = "inline";
    }
    
    if(accountValidationResult.has(validationErrorCode.noPassword)){
        document.getElementById("passwordErrorSpan").innerHTML = "You must enter a password!";
        document.getElementById("passwordErrorSpan").style.display = "inline";
    }
    
    if(accountValidationResult.has(validationErrorCode.noConfirmPassword)){
        document.getElementById("ConfirmPswErrorSpan").innerHTML = "You must enter a confirm password!";
        document.getElementById("ConfirmPswErrorSpan").style.display = "inline";
    }
    
    if(accountValidationResult.has(validationErrorCode.notEqualPasswords)){
        document.getElementById("passwordErrorSpan").innerHTML = "The passwords are not the same!";
        document.getElementById("ConfirmPswErrorSpan").innerHTML = "The passwords are not the same!";
        document.getElementById("passwordErrorSpan").style.display = "inline";
        document.getElementById("ConfirmPswErrorSpan").style.display = "inline";
    }
    
    if(accountValidationResult.has(validationErrorCode.noEmail)){
        document.getElementById("EmailErrorSpan").innerHTML = "You must enter a e-mail!";
        document.getElementById("EmailErrorSpan").style.display = "inline";
    }
    
    if(accountValidationResult.has(validationErrorCode.wrongEmailFormat)){
        document.getElementById("EmailErrorSpan").innerHTML = "Wrong email address format";
        document.getElementById("EmailErrorSpan").style.display = "inline";
    }
}
}

function accountValidation(){

    var validationSet = new Set();

    let login = document.getElementById("loginSignUp").value.toString();
    let password = document.getElementById("pswSignUp").value.toString();
    let confirmPassword = document.getElementById("confirmPswSignUp").value.toString();
    let email = document.getElementById("emailSignUp").value.toString();

    if(login == ""){
        validationSet.add(validationErrorCode.noLogin);
    }

    if(password == ""){
        validationSet.add(validationErrorCode.noPassword);
    }
    
    if(confirmPassword == ""){
        validationSet.add(validationErrorCode.noConfirmPassword);
    }

    if(password != confirmPassword){
        validationSet.add(validationErrorCode.notEqualPasswords);
    }

    if(email == ""){
        validationSet.add(validationErrorCode.noEmail);
    }

    let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!emailRegex.test(email)){
        validationSet.add(validationErrorCode.wrongEmailFormat);
    }

    return validationSet;
}

function toSignUpResult()
{
        // Auto sign in

    let login = document.getElementById("loginSignUp").value.toString();
    let psw = document.getElementById("pswSignUp").value.toString();

    fetch("https://doggyfoodyapi.azurewebsites.net/api/users/login?username="+login+"&password="+psw).then(function(response) {
        return response.json();}).then(function(myJson){
            var data = myJson;
    
            if(data.Login==login){
                sessionStorage.setItem("UserId", data.Id);
                sessionStorage.setItem("UserLogin", login);
                sessionStorage.setItem("UserType", data.UserType);
            }
        });

        let mainBlockDivHanderl = document.getElementById("signUpMainBlockDiv");

        mainBlockDivHanderl.innerHTML = "The account has been registered correctly. </br> You will be logged in automatically.";
        mainBlockDivHanderl.style.color = "#29432c";
        mainBlockDivHanderl.style.textAlign = "center";
        mainBlockDivHanderl.style.paddingBottom = "2vw";
        mainBlockDivHanderl.style.paddingTop = "2vw";

        setTimeout(redirectToMain, 3000);
}

function redirectToMain()
{
    window.location.replace("./index.html")
}