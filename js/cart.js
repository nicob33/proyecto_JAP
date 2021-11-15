////////////////Carrito///////////
let articles = {};
var subTotal = 0;
var costoEnvio = 0
var totalCart = 0;
let tipoEnvioP = 0.15;
let mensajeExito;


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
    costoEnvio = subTotal * tipoEnvioP;
    totalCart = subTotal + costoEnvio;
    document.getElementById("subtotalCart").innerHTML = `${subTotal.toFixed(2)}`;
    document.getElementById("costoEnvioCart").innerHTML = `${costoEnvio.toFixed(2)}`;
    document.getElementById("totalCostCart").innerHTML = `${totalCart.toFixed(2)}`;
    articles[i].count = cant;
}

//Funcion que actualiza el costo de envio
function updateCostEnvio(){
    costoEnvio = subTotal * tipoEnvioP;
    totalCart = subTotal + costoEnvio;
    document.getElementById("costoEnvioCart").innerHTML = `${costoEnvio.toFixed(2)}`;
    document.getElementById("totalCostCart").innerHTML = `${totalCart.toFixed(2)}`;
}

function deletedElement(element){
    let idDeleted = element.name;
    console.log(element.id)
    let idNumDeleted = element.id[0];
    console.log(idNumDeleted)
    let cantArt = document.getElementById("cont"+idNumDeleted).value;
    let costUnidDeleted = articles[idNumDeleted].unitCost;
    let tipoMoneda = articles[idNumDeleted].currency;
    let cantRest = costUnidDeleted * cantArt;
    if (tipoMoneda == "UYU"){
        cantRest /= 40
    }
    subTotal -= cantRest;
    updateCostEnvio();
    document.getElementById("subtotalCart").innerHTML = `${subTotal.toFixed(2)}`;
    document.getElementById(idDeleted).innerHTML = '';
}

//Funcion que muestra el carrito en el HTML
function showCart(){
    let htmlToAppend = "";
    let idCount = 0;
    for(let article of articles){
        let subProd = article.count * article.unitCost;
        
        
        htmlToAppend += `
        <tr id="tablaOe${idCount}">
        <td><img src="${article.src}" class = "img-fluid" style ="max-width:50px!important"></td>
        <td class="align-middle col-cart">${article.name}</td>
        <td class="align-middle col-cart" name="${article.unitCost}" id="prec${idCount}">${article.currency} ${article.unitCost}</td>
        <td class="align-middle col-cart"><input class="form-control col-cart-cant" placeholder="" required="" type="number" min ="1" value=${article.count} id="cont${idCount}" onChange ="updateProductoSubtotal(${idCount})"></td>
        <td class="align-middle col-cart" id="prod${idCount}">${article.currency} ${subProd}</td>
        <td class="align-middle col-cart"><div class="col-md-3"><button  onclick="deletedElement(this)" name="tablaOe${idCount}" typle="button" id="${idCount}deleted-button" class="btn btn-danger justify-content-md-end"><i class="fas fa-trash-alt"></i></button></div></td>
        </tr>`
        
        if(article.currency == "UYU"){
            subTotal += subProd / 40            
        }else{
            subTotal += subProd
        }
        costoEnvio = subTotal * tipoEnvioP;

        totalCart = subTotal + costoEnvio;
        idCount++
                       
    }

    document.getElementById("cart-body").innerHTML = htmlToAppend;
    document.getElementById("subtotalCart").innerHTML = `${subTotal.toFixed(2)}`;
    document.getElementById("costoEnvioCart").innerHTML = `${costoEnvio.toFixed(2)}`;
    document.getElementById("totalCostCart").innerHTML = `${totalCart.toFixed(2)}`;
    
}


//Forma de pago///////////////////////////////////////////////////////
let formPag;
    
var cardNumber = '';
var cvv = '';
var nameT = '';

let bankAccount = '';

//Funcion al seleccionar tarjeta de credito
function creditCard(){
   
    formPag = 1;
    document.getElementById("form-pago").innerHTML = `
            <div class="form-row">
                <div class="custom-control custom-radio">
                    <input id="visa-radio" name="tarjetas" type="radio" class="custom-control-input" checked="" required="">
                    <label class="custom-control-label" for="visa-radio"><i style="font-size: 30px;" class="fab fa-cc-visa"></i></label>
                </div>
                <div class="custom-control custom-radio" style="margin-left: 10px">
                    <input id="master-radio" name="tarjetas" type="radio" class="custom-control-input" required="">
                    <label class="custom-control-label" for="master-radio"><i style="font-size: 30px;" class="fab fa-cc-mastercard"></i></i></label>
                </div>
                <div class="form-group col-md-9">
                    <label for="inputTarjeta" >Numero de tarjeta</label>
                    <input type="number" class="form-control" id="inputTarjeta" value ="${cardNumber}">
                    <div class="invalid-feedback">
                        Por favor ingrese un numero de tarjeta valido
                    </div>
                </div>
                <div class="form-group col-md-3">
                    <label for="inputCodigo">Codigo</label>
                    <input type="number" class="form-control" id="inputCodigo" value ="${cvv}">
                    <div class="invalid-feedback">
                        Por favor ingrese un codigo valido
                    </div>
                </div>
                <div class="form-group col-md-12">
                    <label for="inputNameT">Nombre del titular</label>
                    <input type="text" class="form-control" id="inputNameT" value="${nameT}">
                    <div class="invalid-feedback">
                        Por favor ingrese el nombre del titular de la tarjeta
                    </div>
                </div>
            </div>
    `
}

//Funcion al elegir transferencia bancaria
function bankDep(){
    
    formPag = 2;
    document.getElementById("form-pago").innerHTML = `
            <div class="form-row">
            <div class="form-group col-md-10">
                <label for="inputCuenta">Numero de cuenta</label>
                <input type="text" class="form-control" id="inputCuenta" value="${bankAccount}">
                <div class="invalid-feedback">
                    Por favor ingrese un numero de cuenta
                </div>
            </div>
            </div>
    `
}

let fpValid = false;

function saveChanges(){
    if (formPag == 1){
        cardNumber = document.getElementById("inputTarjeta").value;
        cvv = document.getElementById("inputCodigo").value;
        nameT = document.getElementById("inputNameT").value;
        let cnValid = false;
        let cvvValid = false;
        let nTValid = false;

        if(cardNumber.length !==  16){
            document.getElementById("inputTarjeta").classList.add('is-invalid');
            cnValid = false;
        }else{
            cnValid = true;
            document.getElementById("inputTarjeta").classList.remove('is-invalid');
        }

        if(cvv.length !== 3){
            document.getElementById("inputCodigo").classList.add('is-invalid');
            cvvValid = false;
        }else{
            document.getElementById("inputCodigo").classList.remove('is-invalid');
            cvvValid = true;
        }

        if(nameT.length < 2){
            document.getElementById("inputNameT").classList.add('is-invalid');
            nValid = false;
        }else{
            document.getElementById("inputNameT").classList.remove('is-invalid');
            nTValid = true;
        }

        if(cnValid && cvvValid && nTValid){
            $('#exampleModalCenter').modal('hide');  
            bankAccount = '';    
            document.getElementById("no-select-fp").classList.add('select-fp');
            document.getElementById("no-select-fp").innerHTML = 'Selecciono tarjeta de credito';  
            fpValid = true;    
        }
    }

    if (formPag == 2){
        bankAccount = document.getElementById("inputCuenta").value;
        let bAValid = false;

        if(bankAccount.length <  15){
            document.getElementById("inputCuenta").classList.add('is-invalid');
            bAValid = false;
        }else{
            bAValid = true;
            document.getElementById("inputCuenta").classList.remove('is-invalid');
        }

        if(bAValid){
            $('#exampleModalCenter').modal('hide');
            cardNumber = ''
            cvv = ''
            nameT = ''
            document.getElementById("no-select-fp").classList.add('select-fp');
            document.getElementById("no-select-fp").innerHTML = 'Selecciono cuenta bancaria';
            fpValid = true;
        }
    }
}


//Finalizar compra
let calle;
let numero;
let esquina;


function finalizarCompra(){
    let calleValid = false;
    let numeroValid = false;
    let esquinaValid = false;

    calle = document.getElementById("inputCalle").value;
    numero = document.getElementById("inputNumero").value;
    esquina = document.getElementById("inputEsquina").value;

    if(calle.length < 3){
        document.getElementById('inputCalle').classList.add('is-invalid');
        calleValid = false;
    }else{
        document.getElementById('inputCalle').classList.remove('is-invalid');
        calleValid = true;
    }

    if(numero.length < 1){
        document.getElementById('inputNumero').classList.add('is-invalid');
        numeroValid = false;
    }else{
        document.getElementById('inputNumero').classList.remove('is-invalid');
        numeroValid = true;
    }

    if(esquina.length < 3){
        document.getElementById('inputEsquina').classList.add('is-invalid');
        esquinaValid = false;
    }else{
        document.getElementById('inputEsquina').classList.remove('is-invalid');
        esquinaValid = true;
    }

    if (calleValid && numeroValid && esquinaValid && fpValid){
        document.getElementById("mensaje-exito").innerHTML = mensajeExito;
        $('#modal-final').modal('show');   
    }else{
        document.getElementById("alertResult").classList.add('alert-danger');
        document.getElementById("alertResult").classList.add('show');
    }


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
    getJSONData(CART_BUY_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            mensajeExito = resultObj.data.msg;

        }});

    creditCard();
    document.getElementById("credit-card-radio").addEventListener("change", function(){
        creditCard();
    });
    document.getElementById("bank-radio").addEventListener("change", function(){
        bankDep();
    });



    document.getElementById("premium-radio").addEventListener("change",function(){
        tipoEnvioP = 0.15;
        updateCostEnvio();
    });
    document.getElementById("express-radio").addEventListener("change",function(){
        tipoEnvioP = 0.07;
        updateCostEnvio();
    });
    document.getElementById("standard-radio").addEventListener("change",function(){
        tipoEnvioP = 0.05;
        updateCostEnvio();
    });
});





