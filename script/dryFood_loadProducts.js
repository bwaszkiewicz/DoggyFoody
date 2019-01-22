/* Setter of product info at dryFood.html */

function generateProducts() {
    fetch("https://doggyfoodyapi.azurewebsites.net/api/products/foodType?foodType=Dry").then(function (response) {
        return response.json();
    }).then(function (myJson) {

        fetch("https://doggyfoodyapi.azurewebsites.net/api/manufacturers").then(function (response1) {
            return response1.json();
        }).then(function (manufacturerJson) {

            let manufacturer = manufacturerJson;
            let product = myJson;

            let productRating = 0.0;
            let html = "";

            for (var i = 0; i < product.length; i++) {

                productRating = 0.0;

                html += "<a id='ProductLink' href='./productPage.html?id=" + product[i].Id + "'>";
                html += "<div id='ProductDiv'>";
                html += "<img id='ProductImage' src='" + product[i].ImageAddress + "'>";
                html += "<div id='ProductInfo'>";
                html += "<p id='ProductName'><b>" + product[i].Name + "</b></p>";
                html += "<p id='ProductRating'>Rating: ";

                if(product[i].Rates == null || product[i].Rates == "[]"){
                    for (var k = 0; k < 5 ; k++) {
                        html += "<span class='Rating'>☆</span>"
                    }
                }
                else{
                for (var l = 0; l < product[i].Rates.length; l++) {
                    productRating += product[i].Rates[l].Score;
                }
                productRating = productRating / product[i].Rates.length;
        
                    //add rating stars
                    for (var j = 0; j < Math.round(productRating); j++) {
                        html += "<span class='Rating'>★</span>"
                    }
                    //fill missing rating stars
                    for (var k = 0; k < (5 - Math.round(productRating)); k++) {
                        html += "<span class='Rating'>☆</span>"
                    }
                }
                html += "</p>";

                for (var o = 0; o < manufacturer.length; o++) {
                    if (manufacturer[o].Id == product[i].ManufacturerId) {
                        html += "<p id='ProductManufacturer'>Manufacturer: " + manufacturer[o].Name + "</p>";
                        break;
                    }
                }

                html += "</div>";
                html += "</div>";
                html += "</a>";
                html += "<hr>";

            }
            document.getElementById("ProductShow").innerHTML = html;
        });
    });
}