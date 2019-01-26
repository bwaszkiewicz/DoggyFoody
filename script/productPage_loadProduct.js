/* Setter of product info at productPage.html */

function generatePage() {

    // get param
    let productId = location.search.split('id=')[1]

    fetch("https://doggyfoodyapi.azurewebsites.net/api/products?id=" + productId).then(function (response) {
        return response.json();
    }).then(function (myJson) {

        let product = myJson;

        fetch("https://doggyfoodyapi.azurewebsites.net/api/manufacturers?id=" + product.ManufacturerId + "").then(function (response1) {
            return response1.json();
        }).then(function (manufacturerJson) {

            let html = "";
            let productRating = 0.0;

            html += "<img id='ProductImage' src='" + product.ImageAddress + "'>";
            html += "<div id='ProductInfo'>";
            html += "<p id='ProductName'>" + product.Name + "</p>";
            html += "<hr>";
            html += "<p id='ProductRating'><b>Rating: </b>";
            html += "<span id='RatingContainer'>";

            for (var l = 0; l < product.Rates.length; l++) {
                productRating += product.Rates[l].Score;
            }
            productRating = productRating / product.Rates.length;

            if (JSON.stringify(product.Rates) == "[]") {
                for (var f = 5; 0 < f; f--) {
                    html += "<span class='Rating' onclick='rate(" + f + ")'>☆</span>"
                }
            }
            else {
                //fill rating stars
                for (var k = 5; k > (Math.round(productRating)); k--) {
                    html += "<span class='Rating' onclick='rate(" + k + ")'>☆</span>"
                }
                for (var j = Math.round(productRating); 0 < j; j--) {
                    html += "<span class='Rating' onclick='rate(" + j + ")'>★</span>"
                }
            }
            html += "</span>";
            html += "<span> (" + product.Rates.length + " votes)</span>"
            html += "</p>";

            html += "<p id='ProductManufacturer'><b>Manufacturer: </b> " + manufacturerJson.Name + "</p>";

            html += "<p id='ProductIngredients'><b>Ingredients: </b>" + product.Ingredients + "</p>";
            html += "<p id='ProductDescription'><b>Description: </b>" + product.Description + "</p>";
            html += "</div>";
            html += "</div>";

            document.getElementById("ProductDiv").innerHTML = html;

            loadComments(product);
        });
    });

    setUserCommentSection();
}

function loadComments(productJson) {
    let html = "";
    let userType = null;
    let userLogin = null;
    if ("UserLogin" in sessionStorage) {
        userType = sessionStorage.getItem("UserType");
        userLogin = sessionStorage.getItem("UserLogin");
    } 

    if (productJson.Comments == null || JSON.stringify(productJson.Comments) == "[]") {
        html += "<div id='Comment'>"
        html += "<div id='UserComment'>"
        html += "<article class='Article'>" + "There are no comments for this product yet. Be first to add yours below!" + "</article>"
        html += "</div>"
        html += "</div>"
    }
    else {
        for (var m = 0; m < productJson.Comments.length; m++) {
            html += "<div class='Comment' id='Comment" + productJson.Comments[m].Id + "'>"
            html += "<div id='UserInfo'>"
            html += "<p id='Username'><b>" + productJson.Comments[m].Author + "</b></p>"
            html += "<p id='UserGroup'>" + productJson.Comments[m].Published.substring(0, 10) + "</p>"
            if (userType !== null && userLogin !== null) { 
            if (productJson.Comments[m].Author == userLogin || userType == 3 || userType == 7) {
                html += "<p id='DeleteComment' onclick='deleteComment(" + productJson.Comments[m].Id + ")'>Delete comment</p>"
            }
        }
        html += "</div>"
        html += "<hr>"
        html += "<div id='UserComment'>"
        html += "<article class='Article'>" + productJson.Comments[m].Text + "</article>"
        html += "</div>"
        html += "</div>"
    }
}
document.getElementById("CommentsDiv").innerHTML = html;
}

function setUserCommentSection() {

    let html = "";

    //check if logged in
    if (sessionStorage.getItem("UserId") != null) {

        html += "<div id='AddCommentSection'>";
        html += "<h1 id='AddYourCommentHeader'>Add your comment</h1 >";
        //html += "<form name='submitComment' action='" + window.location + "' onsubmit='addComment()' method='post'>";
        html += "<textarea id='commentText' rows = '5' maxlength = '256' ></textarea >";
        html += "<input type = 'button' value = 'Post' onclick='addComment()' id='submitComment'>";
        //html += "</form>";
        html += "</div>";

        document.getElementById("AddCommentDiv").innerHTML = html;

    } else {

        html += "<div class='SeparateLink'>";
        html += "<a href='signIn.html'>» You have to be logged in to add comment! «</a>";
        html += "</div>";

        document.getElementById("AddCommentDiv").innerHTML = html;

    }
}

function addComment() {

    let userId = sessionStorage.getItem("UserId").toString();
    let productId = location.search.split('id=')[1];
    let presentDate = new Date();

    let submittedText = document.getElementById("commentText").value.toString();

    fetch("https://doggyfoodyapi.azurewebsites.net/api/users?id=" + userId).then(function (response) {
        return response.json();
    }).then(function (myJson) {

        let userJson = myJson;
        let login = userJson.Login;

        let data = JSON.stringify(
            {
                Author: login,
                Text: submittedText,
                Published: presentDate
            }
        );

        fetch("https://doggyfoodyapi.azurewebsites.net/api/products/addComment?productId=" + productId + "&userId=" + userId, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: data
        }).then(res => res.json());

    });

    setTimeout(refreshPage, 2000);
    return false;
}

function rate(rating) {

    let userId = sessionStorage.getItem("UserId").toString();
    let productId = location.search.split('id=')[1];
    let data = JSON.stringify({ Score: rating });

    fetch("https://doggyfoodyapi.azurewebsites.net/api/products/addRate?productId=" + productId + "&userId=" + userId, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: data
    }).then(res => res.json());

    document.getElementById("ProductRating").innerHTML = "Thank You!"

    setTimeout(refreshPage, 2000);

}

function refreshPage() {
    location.reload();
}

function deleteComment(commentId) {

    fetch("https://doggyfoodyapi.azurewebsites.net/api/products/deleteComment?id=" + commentId, {
        method: 'delete'
    }).then(res => res.json());

    document.getElementById("Comment" + commentId).style.textDecoration = "line-through";

    setTimeout(refreshPage, 1000);

}