// adds manufacturer to database
function add()
{
  /*  
const url = "https://doggyfoodyapi.azurewebsites.net/api/manufacturers/add";
const Data = {
    "Name": "Pedigree",
    "Address": "Dundee Road, Berkshire SL1 4LG"
};

const param={
    headers: { "Content-Type": "application/json" },
    body:Data,
    method:"POST"
};

fetch(url, param)
.then(data=>{return data.json()})
.then(res=>{console.log(res)})
.catch(error=>console.log(error))

*/
fetch("https://doggyfoodyapi.azurewebsites.net/api/manufacturers").then(function (response) {
        return response.json();
    }).then(function (myJson) {
        let data = myJson;
    });
}