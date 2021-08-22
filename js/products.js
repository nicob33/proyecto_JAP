//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){         //Traigo los datos de la url, usando la funcion getJSONData que esta en init.js
        if (resultObj.status === "ok"){                         //Miro que el estado de los datos este ok, y seguidamente los uso para la funcion addToArray
            addToArray(resultObj.data);               
        }
    });
});


var productsArray = [];


//Agrego a la array productsArray los datos traidos de la URL
function addToArray(arrayResult){           

    if(arrayResult != undefined){
        productsArray = arrayResult;
    }

    showProductsList();  //Una vez agregados los datos, ejecuto la funcion showProductsList
}


//En esta funcion armo el html para mostrar el listado de productos
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



