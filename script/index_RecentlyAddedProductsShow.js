/* Setter of product info on RecentlyAddedProducts div at index.html */

function callApi(){
	fetch("https://doggyfoodyapi.azurewebsites.net/api/products").then(function(response) {
    return response.json();}).then(function(myJson){

		var data = myJson;

    //dont hate me for that :/
    document.getElementById("RecentlyAddedProductsShow").innerHTML = "<div><a id='RecentlyAddedProductsProduct1Link' href='index.html'><img id='RecentlyAddedProductsProduct1Image' src=''></a><p id='RecentlyAddedProductsProduct1Name'><b>product 1</b></p></div><div><a id='RecentlyAddedProductsProduct2Link' href='index.html'><img id='RecentlyAddedProductsProduct2Image' src=''></a><p id='RecentlyAddedProductsProduct2Name'><b>product 2</b></p></div><div><a id='RecentlyAddedProductsProduct3Link' href='index.html'><img id='RecentlyAddedProductsProduct3Image' src=''></a><p id='RecentlyAddedProductsProduct3Name'><b>product 3</b></p></div>"

    document.getElementById("RecentlyAddedProductsProduct1Name").innerHTML = data[data.length - 1].Name;
    document.getElementById("RecentlyAddedProductsProduct1Link").setAttribute("href", "./productPage.html?id=" + data[data.length - 1].Id);
    document.getElementById("RecentlyAddedProductsProduct1Image").setAttribute("src",data[data.length - 1].ImageAddress);

    document.getElementById("RecentlyAddedProductsProduct2Name").innerHTML = data[data.length - 2].Name;
    document.getElementById("RecentlyAddedProductsProduct2Link").setAttribute("href", "./productPage.html?id=" + data[data.length - 2].Id);
    document.getElementById("RecentlyAddedProductsProduct2Image").setAttribute("src",data[data.length - 2].ImageAddress);

    document.getElementById("RecentlyAddedProductsProduct3Name").innerHTML = data[data.length - 3].Name;
    document.getElementById("RecentlyAddedProductsProduct3Link").setAttribute("href", "./productPage.html?id=" + data[data.length - 3].Id);
    document.getElementById("RecentlyAddedProductsProduct3Image").setAttribute("src",data[data.length - 3].ImageAddress);


});
}