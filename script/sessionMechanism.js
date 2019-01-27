var websitesEnum = {
    index: 0,
    signIn: 1,
    signUp: 2,
    logout: 3,
    userPanel: 4,
    adminPanel: 5,
    headAdminPanel: 6,
    dryFood: 7,
    wetFood: 8,
    productPage: 9,
    manufacturers: 10,
    manufacturersPage: 11,
    stories: 12,
    signUpAfterRegister: 13
};

var UserTypeEnum = {
    User: 1,
    Admin: 3,
    HeadAdmin: 7,
}

function checkSession(website) {
    if (sessionStorage.getItem("UserId") != null){
        if(sessionStorage.getItem("UserType") == UserTypeEnum.User){
            document.getElementById("LinkBarTableFirstLink").href="UserPanel.html";
            document.getElementById("LinkBarTableFirstText").innerHTML="User Panel";
            document.getElementById("LinkBarTableSecondLink").href="Logout.html";
            document.getElementById("LinkBarTableSecondText").innerHTML="Logout";

                // User's rights regarding websites

            if(website == websitesEnum.adminPanel){
                document.getElementById("AdminPanelMainBlockDiv").innerHTML="Access denied";
            }
            
            if(website == websitesEnum.headAdminPanel){
                document.getElementById("HeadAdminPanelMainBlockDiv").innerHTML="Access denied";
            }
            
        }
        if(sessionStorage.getItem("UserType") == UserTypeEnum.Admin){
            document.getElementById("LinkBarTableFirstLink").href="AdminPanel.html";
            document.getElementById("LinkBarTableFirstText").innerHTML="Admin Panel";
            document.getElementById("LinkBarTableSecondLink").href="Logout.html";
            document.getElementById("LinkBarTableSecondText").innerHTML="Logout";

                // Admin's rights regarding websites

            if(website == websitesEnum.headAdminPanel){
                document.getElementById("HeadAdminPanelMainBlockDiv").innerHTML="Access denied";
            }

        }
        if(sessionStorage.getItem("UserType") == UserTypeEnum.HeadAdmin){
            document.getElementById("LinkBarTableFirstLink").href="HeadAdminPanel.html";
            document.getElementById("LinkBarTableFirstText").innerHTML="Head Admin Panel";
            document.getElementById("LinkBarTableSecondLink").href="Logout.html";
            document.getElementById("LinkBarTableSecondText").innerHTML="Logout";

                // Head Admin's rights regarding websites

        }

                // Sign in user's rights regarding websites

        if(website == websitesEnum.signUp){
            document.getElementById("signUpMainBlockDiv").innerHTML="You are already sign in!";
        }
        if(website == websitesEnum.signIn){
            document.getElementById("signInMainBlockDiv").innerHTML="You are already sign in!";
        }

    } else {
        document.getElementById("LinkBarTableFirstLink").href="SignIn.html";
        document.getElementById("LinkBarTableFirstText").innerHTML="Sign In ";
        document.getElementById("LinkBarTableSecondLink").href="SignUp.html";
        document.getElementById("LinkBarTableSecondText").innerHTML=" Sign Up";

                // Not sign in user's rights regarding websites

        if(website == websitesEnum.userPanel){
            document.getElementById("UserPanelMainBlockDiv").innerHTML="Access denied";
        }
        if(website == websitesEnum.adminPanel){
            document.getElementById("AdminPanelMainBlockDiv").innerHTML="Access denied";
        }
        if(website == websitesEnum.headAdminPanel){
            document.getElementById("HeadAdminPanelMainBlockDiv").innerHTML="Access denied";
        }
    }

}