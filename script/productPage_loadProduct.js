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
            html += "</p>";

            html += "<p id='ProductManufacturer'><b>Manufacturer: </b> " + manufacturerJson.Name + "</p>";

            html += "<p id='ProductIngredients'><b>Ingredients: </b>" + product.Ingredients + "</p>";
            html += "<p id='ProductDescription'><b>Description: </b>" + product.Description + "</p>";
            html += "</div>";
            html += "</div>";

            document.getElementById("ProductDiv").innerHTML = html;

            html = "";

            if (product.Comments == null || JSON.stringify(product.Comments) == "[]") {
                html += "<div id='Comment'>"
                html += "<div id='UserComment'>"
                html += "<article class='Article'>" + "There are no comments for this product yet. Be first to add yours below!" + "</article>"
                html += "</div>"
                html += "</div>"
            }
            else {
                for (var m = 0; m < product.Comments.length; m++) {
                    html += "<div id='Comment'>"
                    html += "<div id='UserInfo'>"
                    html += "<p id='Username'><b>" + product.Comments[m].Author + "</b></p>"
                    html += "<p id='UserGroup'>" + product.Comments[m].Published.substring(0, 10) + "</p>"
                    html += "</div>"
                    html += "<hr>"
                    html += "<div id='UserComment'>"
                    html += "<article class='Article'>" + product.Comments[m].Text + "</article>"
                    html += "</div>"
                    html += "</div>"
                }
            }
            document.getElementById("CommentsDiv").innerHTML = html;
        });
    });

    setUserCommentSection();
}

function setUserCommentSection() {

    let html = "";

    //check if logged in
    if (sessionStorage.getItem("SignIn") == "1") {

        html += "<div id='AddCommentSection'>";
        html += "<h1 id='AddYourCommentHeader'>Add your comment</h1 >";
        html += "<form name='submitComment' action='" + window.location + "' onsubmit='addComment()' method='post'>";
        html += "<textarea name='commentText' rows = '5' maxlength = '256' ></textarea >";
        html += "<input type = 'submit' value = 'Post' id='submitComment'>";
        html += "</form>";
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
    let submittedText = document.forms["submitComment"]["commentText"].value.toString();

    fetch("https://doggyfoodyapi.azurewebsites.net/api/users?id=" + userId + "").then(response => response.json())
        .then(myJson => {

            let userJson = myJson;
            let login = userJson.Login;

            let xhr = new XMLHttpRequest();

            xhr.open("POST", "https://doggyfoodyapi.azurewebsites.net/api/products/addComment?productId=" + productId + "&userId=" + userId + "", true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(
                {
                    Author: login,
                    Text: submittedText,
                    Published: presentDate
                }
            ));
        });
}

function rate(rating) {

    let userId = sessionStorage.getItem("UserId").toString();
    let productId = location.search.split('id=')[1];
    //let xhr = new XMLHttpRequest();
    let data = JSON.stringify({ Score: rating.toString(), Id: userId });

   /* xhr.open("POST", "https://doggyfoodyapi.azurewebsites.net/api/products/addRate?productId=" + productId + "&userId=" + userId + "", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(data).catch(console.log);
*/
    fetch("https://doggyfoodyapi.azurewebsites.net/api/products/addRate?productId=" + productId + "&userId=" + userId, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: data
    }).then(res => res.json())
        .then(res => console.log(res));

    /*(async () => {
        const rawResponse = await fetch("https://doggyfoodyapi.azurewebsites.net/api/products/addRate?productId=" + productId + "&userId=" + userId + "", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({Score: rating.toString(),Id: userId})
        });
        const content = await rawResponse.json();
      
        console.log(content);
      })();
*/
}