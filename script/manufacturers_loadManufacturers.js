/* Setter of product info at dryFood.html */

function generateManufacturers() {

    fetch("https://doggyfoodyapi.azurewebsites.net/api/manufacturers").then(function (response1) {
        return response1.json();
    }).then(function (manufacturerJson) {
        fetch("https://doggyfoodyapi.azurewebsites.net/api/products").then(function (response) {
            return response.json();
        }).then(function (productJson) {

            let manufacturer = manufacturerJson;
            let product = productJson;

            let html = "";
            let ManufacturerCount = 0;

            for (var i = 0; i < manufacturer.length; i++) {
                ManufacturerCount = 0;
                html += "<a id='ManufacturerLink' href='./manufacturerPage.html?id=" + manufacturer[i].Id + "'>";
                html += "<div id='ManufacturerDiv'>";
                html += "<p id='ManufacturerName'><b>" + manufacturer[i].Name + "</b></p>";

                for (var o = 0; o < product.length; o++) {
                    if (product[o].ManufacturerId == manufacturer[i].Id) {
                        ManufacturerCount += 1;
                    }
                }
                html += "<p id='ManufacturerCount'>Number of products: " + ManufacturerCount + "</p>";
                html += "<p id='ManufacturerAddress'>Address: " + manufacturer[i].Address + "</p>";
                html += "</div>";
                html += "</a>";
                html += "<hr>";
            }
            document.getElementById("ManufacturerShow").innerHTML = html;
        });});
    }