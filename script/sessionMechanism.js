function checkSession() {
    if (sessionStorage.getItem("SignIn") == "1"){
        document.write("Hello World!");
    }

}