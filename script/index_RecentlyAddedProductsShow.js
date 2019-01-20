/* Setter of product info on RecentlyAddedProducts div at index.html */

function callApi(){
	fetch("https://doggyfoodyapi.azurewebsites.net/api/products").then(function(response) {
    return response.json();}).then(function(myJson){

		var data = myJson;

    document.getElementById("RecentlyAddedProductsProduct1Name").innerHTML = data[Object.keys(data).length - 1].Name;
    document.getElementById("RecentlyAddedProductsProduct2Name").innerHTML = data[Object.keys(data).length - 2].Name;
    document.getElementById("RecentlyAddedProductsProduct3Name").innerHTML = data[Object.keys(data).length - 3].Name;
    
    document.getElementById("RecentlyAddedProductsProduct1Link").href = "'./productPage.html?id=" + data[Object.keys(data).length - 1].Id + "'";
    document.getElementById("RecentlyAddedProductsProduct2Link").href = "'./productPage.html?id=" + data[Object.keys(data).length - 2].Id + "'";
    document.getElementById("RecentlyAddedProductsProduct3Link").href = "'./productPage.html?id=" + data[Object.keys(data).length - 3].Id + "'";

    document.getElementById("RecentlyAddedProductsProduct1Image").setAttribute("src","'./products/" + data[Object.keys(data).length - 1].Id + ".jpg'");
    document.getElementById("RecentlyAddedProductsProduct2Image").setAttribute("src","'./products/" + data[Object.keys(data).length - 2].Id + ".jpg'");
    document.getElementById("RecentlyAddedProductsProduct3Image").setAttribute("src","'./products/" + data[Object.keys(data).length - 3].Id + ".jpg'");

});
}