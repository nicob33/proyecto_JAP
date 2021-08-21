//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var productsArray = [];


function addToArray(arrayResult){

    if(arrayResult != undefined){
        productsArray = arrayResult;
    }

    showProductsList();
}

console.log(productsArray);


function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < productsArray.length; i++){
        let products = productsArray[i];

            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + products.imgSrc + `" alt="` + products.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ products.name +`</h4>
                            <p>`+products.currency +` `+ products.cost + `</p>
                        </div>
                        <p class="mb-1">` + products.description + `</p>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
};


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            addToArray(resultObj.data);
        }
    });
});
