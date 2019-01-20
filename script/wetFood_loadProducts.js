/* Setter of product info at wetFood.html */

function generateProducts() {
    fetch("https://doggyfoodyapi.azurewebsites.net/api/products").then(function (response) {
        return response.json();
    }).then(function (myJson) {

        //data = array of json objects (products)
        let data = myJson;

        let html = "";

        for (var product in data) {
            if (product.FoodType.localeCompare("Wet") == 0) {
                for (var i = 0; i < Object.keys(data).length; i++) {
                    html += "<a id='ProductLink' href='./productPage?id=" + product.Id + ".html'>";
                    html += "<div id='ProductDiv'>";
                    html += "<img id='ProductImage' src='./products/" + product.Id + ".jpg'>";
                    html += "<div id='ProductInfo'>";
                    html += "<p id='ProductName'><b>" + product.Name + "</b></p>";
                    html += "<p id='ProductRating'>Rating: ";

                    //add rating stars
                    for (var j = 0; j < Math.round(product.Score); j++) {
                        html += "<span class='Rating'>★</span>"
                    }
                    //fill missing rating stars
                    for (var k = 0; k < (5 - Math.round(product.Score)); k++) {
                        html += "<span class='Rating'>☆</span>"
                    }

                    html += "</p>";

                    fetch("https://doggyfoodyapi.azurewebsites.net/api/manufacturers?id=" + product.ManufacturerId).then(function (response) {
                        return response.json();
                    }).then(function (manufacturerJson) {

                        html += "<p id='ProductManufacturer'>Manufacturer:" + manufacturerJson.Name + "</p>";

                    });

                    html += "</div>";
                    html += "</div>";
                    html += "</a>";
                    html += "<hr>";
                }
            }
        }
        document.getElementById("ProductShow").innerHTML = html;

    });
}