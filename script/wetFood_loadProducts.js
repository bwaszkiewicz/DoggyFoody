/* Setter of product info at wetFood.html */

function generateProducts() {
    fetch("https://doggyfoodyapi.azurewebsites.net/api/products/foodType?foodType=Wet").then(function (response) {
        return response.json();
    }).then(function (myJson) {

        fetch("https://doggyfoodyapi.azurewebsites.net/api/manufacturers").then(function (response1) {
            return response1.json();
        }).then(function (manufacturerJson) {

        let manufacturer = manufacturerJson;
        let product = myJson;

        let html = "";

        for (var i = 0; i < product.length; i++) {

                html += "<a id='ProductLink' href='./productPage.html?id=" + product[i].Id + "'>";
                html += "<div id='ProductDiv'>";
                html += "<img id='ProductImage' src='"+ product[i].ImageAddress +"'>";
                html += "<div id='ProductInfo'>";
                html += "<p id='ProductName'><b>" + product[i].Name + "</b></p>";
                html += "<p id='ProductRating'>Rating: ";

                //add rating stars
                for (var j = 0; j < Math.round(product[i].Score); j++) {
                    html += "<span class='Rating'>★</span>"
                }
                //fill missing rating stars
                for (var k = 0; k < (5 - Math.round(product[i].Score)); k++) {
                    html += "<span class='Rating'>☆</span>"
                }

                html += "</p>";

                for (var o = 0; o < manufacturer.length; o++) {
                    if(manufacturer[o].Id == product[i].ManufacturerId)
                    {
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