/* Setter of product info at dryFood.html */

function generateProducts() {

    let manuId = location.search.split('id=')[1]

    fetch("https://doggyfoodyapi.azurewebsites.net/api/products").then(function (response) {
        return response.json();
    }).then(function (myJson) {

        fetch("https://doggyfoodyapi.azurewebsites.net/api/manufacturers").then(function (response1) {
            return response1.json();
        }).then(function (manufacturerJson) {


            let manufacturer = manufacturerJson;
            let product = myJson;

            let manuName = "";
            let html = "";
            let productRating = 0.0;

            for (var o = 0; o < manufacturer.length; o++) {
                if (manufacturer[o].Id == manuId) {
                    document.getElementById("ManufacturerHeader").innerHTML = "Showing only: " + manufacturer[o].Name;
                    manuName = manufacturer[o].Name;
                    break;
                }
            }

            for (var i = 0; i < product.length; i++) {

                productRating = 0.0;

                if (product[i].ManufacturerId == manuId) {
                    html += "<a id='ProductLink' href='./productPage.html?id=" + product[i].Id + "'>";
                    html += "<div id='ProductDiv'>";
                    html += "<img id='ProductImage' src='" + product[i].ImageAddress + "'>";
                    html += "<div id='ProductInfo'>";
                    html += "<p id='ProductName'><b>" + product[i].Name + "</b></p>";
                    html += "<p id='ProductRating'>Rating: ";

                    if (product[i].Rates == null) {
                        for (var k = 0; k < 5; k++) {
                            html += "<span class='Rating'>☆</span>"
                        }
                    }
                    else {
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

                    html += "<p id='ProductManufacturer'>Manufacturer: " + manuName + "</p>";

                    html += "</div>";
                    html += "</div>";
                    html += "</a>";
                    html += "<hr>";
                }
            }
            document.getElementById("ProductShow").innerHTML = html;
        });
    });
}