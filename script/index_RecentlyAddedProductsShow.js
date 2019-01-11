/* Setter of product info on RecentlyAddedProducts div at index.html */

/* temp arrays */
let links = ["./products/man1/product1.html","./products/man1/product2.html","./products/man1/product3.html"];
let images = ["./products/Product1.jpg","./products/Product2.jpg","./products/Product3.jpg"];
var names = ["Science Diet - Chicken & Barley Entree","Pedigree Adult Chicken","Purina Beneful grain free"];

function callApi(){
	fetch("https://doggyfoodyapi.azurewebsites.net/api/manufacturers?id=1").then(function(response) {
    return response.json();}).then(function(myJson){
		var data = myJson;
    
	names[0] = data.Name;
	
	
	setLinks();
	setImages();
	setNames();
});
}

function setLinks(){
    document.getElementById("RecentlyAddedProductsProduct1Link").href = links[0];
    document.getElementById("RecentlyAddedProductsProduct2Link").href = links[1];
    document.getElementById("RecentlyAddedProductsProduct3Link").href = links[2];
}

function setImages(){
    document.getElementById("RecentlyAddedProductsProduct1Image").setAttribute("src",images[0]);
    document.getElementById("RecentlyAddedProductsProduct2Image").setAttribute("src",images[1]);
    document.getElementById("RecentlyAddedProductsProduct3Image").setAttribute("src",images[2]);
}

function setNames(){
    document.getElementById("RecentlyAddedProductsProduct1Name").innerHTML = names[0];
    document.getElementById("RecentlyAddedProductsProduct2Name").innerHTML = names[1];
    document.getElementById("RecentlyAddedProductsProduct3Name").innerHTML = names[2];
}
