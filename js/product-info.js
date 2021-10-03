var product = {};
var related = {};

function showImagesGallery(array){

    let htmlContentToAppend = `
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
        `;

    for(let i = 0; i < array.length; i++){
        if (i == 0){
            htmlContentToAppend += `<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>`
        }else{
            htmlContentToAppend += `
                <li data-target="#carouselExampleIndicators" data-slide-to="${i}"></li>
                `
        }
    }
    htmlContentToAppend += `
        </ol>
        <div class="carousel-inner">
        `

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];
        if (i == 0){
            htmlContentToAppend += `<div class="carousel-item active">
                <img src="${imageSrc}" class="d-block w-100">
                </div> 
            `    
        }else{
            htmlContentToAppend += `
            <div class="carousel-item">
            <img src="${imageSrc}" class="d-block w-100">
            </div>
            `
        } 
    }
    htmlContentToAppend += `
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
            </a>
        </div>
        `

    document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
}


function showRelatedProduct(array){
    let htmlRelatedToAppend = "";

    for (let i = 0; i < array.length; i++){    
        
        let numRelated = array[i];
        console.log (numRelated);
            let productRel = related[numRelated];

            htmlRelatedToAppend += `
            <a href="product-info.html" class="list-group-item-action">
                <div class="card" style="display: inline-block; width: 18rem;height: 23rem ; vertical-align:top;">
                    <img src="${productRel.imgSrc}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${productRel.name}</h5>
                        <p class="card-text">${productRel.description}</p>
                       
                    </div>
                </div>
            </a>


            `
            document.getElementById("related-product").innerHTML = htmlRelatedToAppend;
        
        
    } 

        
}





//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            related = resultObj.data;
        }});
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productCategoryHTML = document.getElementById("productCategory");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
        
            productNameHTML.innerHTML = product.name;
            productCategoryHTML.innerHTML = product.category;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = `${product.currency} ${product.cost}`;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            showRelatedProduct(product.relatedProducts);
        }
    });
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            related = resultObj.data;
        }});
});