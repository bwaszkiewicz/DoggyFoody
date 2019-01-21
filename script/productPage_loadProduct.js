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

        html += "<img id='ProductImage' src='"+ product.ImageAddress +"'>";
        html += "<div id='ProductInfo'>";
        html += "<p id='ProductName'>" + product.Name + "</p>";
        html += "<hr>";
        html += "<p id='ProductRating'><b>Rating: </b>";
        html += "<span id='RatingContainer'>";

        for (var l = 0; l < product.Rates.length; l++) {
            productRating += product.Rates[l].Score;
        }
        productRating = productRating / product.Rates.length;

        //fill rating stars
        for (var k = 0; k < (5 - Math.round(productRating)); k++) {
            html += "<span class='Rating' onclick=''>☆</span>"
        }
        for (var j = 0; j < Math.round(productRating); j++) {
            html += "<span class='Rating' onclick=''>★</span>"
        }

        html += "</span>";
        html += "</p>";



            html += "<p id='ProductManufacturer'><b>Manufacturer: </b> " + manufacturerJson.Name + "</p>";



        html += "<p id='ProductIngredients'><b>Ingredients: </b>"+ product.Ingredients +"</p>";
        html += "<p id='ProductDescription'><b>Description: </b>"+ product.Description +"</p>";
        html += "</div>";
        html += "</div>";

        document.getElementById("ProductDiv").innerHTML = html;

        //COMMENT SECTION

        html = "";
        for (var m = 0; m < product.Comments.length; m++) 
        {
        html += "<div id='Comment'>"
        html += "<div id='UserInfo'>"
        html += "<p id='Username'><b>"+product.Comments[m].Author+"</b></p>"
        html += "<p id='UserGroup'>"+product.Comments[m].Published.substring(0,10)+"</p>"
        html += "</div>"
        html += "<hr>"
        html += "<div id='UserComment'>"
        html += "<article class='Article'>"+product.Comments[m].Text+"</article>"
        html += "</div>"
        html += "</div>"
        }

        document.getElementById("CommentsDiv").innerHTML = html;
    });
    });
}