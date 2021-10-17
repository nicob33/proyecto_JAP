let articles = {};
var subTotal = 0;
var costoEnvio = 0
var totalCart = 0;

// Funcion que actualiza el subtotal de cada producto
function updateProductoSubtotal(i){
    let cantidad = document.getElementById("cont"+i).value;
    let costUnid = articles[i].unitCost;
    let currencyUnid = articles[i].currency;
    let totalCost = cantidad * costUnid;
    document.getElementById("prod"+i).innerHTML = `${currencyUnid} ${totalCost}`;
    updateTotalCart(cantidad,i,costUnid,totalCost);
}

// Funcion que actualiza el subtotal, costo de envio y total del carrito
function updateTotalCart(cant,i,costUnid,newCost){
    let cantOri = articles[i].count
    let oriCost = cantOri * costUnid;
    if(cantOri < cant){
        let diffCost = newCost - oriCost;
        if(articles[i].currency == "UYU"){
            diffCost /= 40
        }
        subTotal += diffCost    
    }else{
        let diffCost =  oriCost - newCost;
        if(articles[i].currency == "UYU"){
            diffCost /= 40
        }
        subTotal -= diffCost;
    }
    totalCart = subTotal
    document.getElementById("subtotalCart").innerHTML = `${subTotal}`;
    document.getElementById("totalCostCart").innerHTML = `${totalCart}`;
    articles[i].count = cant;
}

function showCart(){
    /*mostrar los productos del carrito con el input correspondiente a la cantidad*/
    let htmlToAppend = "";
    let idCount = 0;
    for(let article of articles){
        let subProd = article.count * article.unitCost;
        
        
        htmlToAppend += `
        <tr>
        <td><img src="${article.src}" class = "img-fluid" style ="max-width:50px!important"></td>
        <td class="align-middle col-cart">${article.name}</td>
        <td class="align-middle col-cart" name="${article.unitCost}" id="prec${idCount}">${article.currency} ${article.unitCost}</td>
        <td class="align-middle col-cart"><input class="form-control col-cart-cant" placeholder="" required="" type="number" min ="1" value=${article.count} id="cont${idCount}" onChange ="updateProductoSubtotal(${idCount})"></td>
        <td class="align-middle col-cart" id="prod${idCount}">${article.currency} ${subProd}</td>
        </tr>`
        
        if(article.currency == "UYU"){
            subTotal += subProd / 40            
        }else{
            subTotal += subProd
        }
        totalCart = subTotal
        idCount++
                       
    }

    document.getElementById("cart-body").innerHTML = htmlToAppend;
    document.getElementById("subtotalCart").innerHTML = `${subTotal}`;
    document.getElementById("totalCostCart").innerHTML = `${totalCart}`;
    
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            articles = resultObj.data.articles;
            showCart();

        }});
});