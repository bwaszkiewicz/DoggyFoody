/* Setter of product info at productPage.html */

function generateProduct() {

    // get param
    let productId = location.search.split('id=')[1]

    fetch("https://doggyfoodyapi.azurewebsites.net/api/products?id=" + productId).then(function (response) {
        return response.json();
    }).then(function (myJson) {

        let product = myJson;

        let html = "";

        html += "<img id='ProductImage' src='./products/" + product.Id + ".jpg'>";
        html += "<div id='ProductInfo'>";
        html += "<p id='ProductName'>" + product.Name + "</p>";
        html += "<hr>";
        html += "<p id='ProductRating'><b>Rating: </b>";
        html += "<span id='RatingContainer'>";

        //fill rating stars
        for (var k = 0; k < (5 - Math.round(product.Score)); k++) {
            html += "<span class='Rating' onclick=''>☆</span>"
        }
        for (var j = 0; j < Math.round(product.Score); j++) {
            html += "<span id='rating1' class='Rating' onclick=''>★</span>"
        }

        html += "</span>";
        html += "</p>";

        fetch("https://doggyfoodyapi.azurewebsites.net/api/manufacturers?id=" + product.ManufacturerId).then(function (response) {
            return response.json();
        }).then(function (manufacturerJson) {

            html += "<p id='ProductManufacturer'><b>Manufacturer:</b> " + manufacturerJson.Name + "</p>";

        });

        html += "<p id='ProductIngredients'><b>Ingredients:</b>"+ product.Ingredients +"</p>";
        html += "<p id='ProductDescription'><b>Description:</b>"+ product.Description +"</p>";
        html += "</div>";
        html += "</div>";

        document.getElementById("ProductDiv").innerHTML = html;

    });
}