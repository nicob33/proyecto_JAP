//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){         //Traigo los datos de la url, usando la funcion getJSONData que esta en init.js
        if (resultObj.status === "ok"){                         //Miro que el estado de los datos este ok, y seguidamente los uso para la funcion addToArray
            addToArray(resultObj.data);               
        }
    });
});


var commentsArray = [];


//Agrego a la array productsArray los datos traidos de la URL
function addToArray(arrayResult){           

    if(arrayResult != undefined){
        commentsArray = arrayResult;
    }

    showComments();  //Una vez agregados los datos, ejecuto la funcion showProductsList
}


var countStar = 0;

function calificar (item){
    console.log(item);
    countStar = item.id[0];
    let nameStar = item.id.substring(1);
    for (let i=0; i<5;i++){
        if(i < countStar){
            document.getElementById((i+1)+nameStar).style.color="orange";
        }else{
            document.getElementById((i+1)+nameStar).style.color="black";
        }
    }

}

function sendValue (){
    let htmlContentToAppend = ''
    var opinion = document.getElementById("commentsBox").value;
    let hoy = new Date()
    let fecha = hoy.getFullYear() + '-' + (hoy.getMonth()+1) + '-' + hoy.getDate() +' '+ hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();

    htmlContentToAppend += `
    <dt>${localStorage.getItem('clave')}</dt>
    <dd> <p>${opinion}</p>
    `;
    for(let i = 1; i <= countStar; i++){
        htmlContentToAppend += `<span class="fa fa-star checked"></span>`;
    }

    for(let x = 1; x <= (5 - countStar); x++){
        htmlContentToAppend += `<span class="fa fa-star"></span>`;
    }
    
    htmlContentToAppend += `<span style="margin-left: 10px ;">${fecha}</span> </dd> <hr class="my-3">`

    document.getElementById("comments").innerHTML += htmlContentToAppend;

    document.getElementById("commentsBox").value = '';

    countStar = 0;

    for(let y = 1; y <= 5; y++){
        document.getElementById(y+"star").style.color ="black";    
    }
    
}


//En esta funcion armo el html para mostrar el listado de productos
function showComments(){                

    let htmlContentToAppend = "";
    for(let i = 0; i < commentsArray.length; i++){
        let comments = commentsArray[i];

            htmlContentToAppend += `
            <dt>${comments.user}</dt>
                <dd>
                <p>${comments.description}</p>
                
            `;

            for(let x = 1; x <= comments.score; x++){
                htmlContentToAppend += `<span class="fa fa-star checked"></span>`;
            }

            for(let y = 1; y <= (5 - comments.score); y++){
                htmlContentToAppend += `<span class="fa fa-star"></span>`;
            }

            htmlContentToAppend += `<span style="margin-left: 10px ;">${comments.dateTime}</span> </dd> <hr class="my-3">`
        }

        document.getElementById("comments").innerHTML = htmlContentToAppend;
};


