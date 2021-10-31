//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    let perfil = JSON.parse(localStorage.getItem('perfil'));

    if(perfil != null){
        document.getElementById('nameProfile').value = perfil.nombre;
        document.getElementById('secNameProfile').value = perfil.segNombre;
        document.getElementById('lastNameProfile').value = perfil.apellido
        document.getElementById('secLastNameProfile').value = perfil.segApellido
        document.getElementById('ageProfile').value = perfil.edad
        document.getElementById('phoneProfile').value = perfil.telefono
        document.getElementById('mailProfile').value = perfil.mail
        document.getElementById('imagePreview').style.backgroundImage = perfil.avatar

    }else{
        preview.src = "img/avatar.png"
    }
});


var formProfile = document.getElementById('profile-form');
formProfile.addEventListener('submit', function(evt){
    let errorNameAct = false;
    let errorLastNameAct = false;
    let errorAgeAct = false;
    let errorPhoneAct = false;
    let errorMailAct = false;
    evt.preventDefault();
    //Guardo el nombre
    var nameProfile = document.getElementById('nameProfile').value;
    var errorName = document.getElementById('error-name-profile');
    if(nameProfile == '') {
        errorName.innerHTML = '*Este campo es obligatorio';
        errorNameAct = true;
    }else{
        errorName.innerHTML = '';
        errorNameAct = false;
    }
    
    //Guardo el segundo nombre
    var secNameProfile = document.getElementById('secNameProfile').value;

    //Guardo el apellido
    var lastNameProfile = document.getElementById('lastNameProfile').value;
    var errorLastName = document.getElementById('error-lastName-profile');
    if(lastNameProfile == '') {
        errorLastName.innerHTML = '*Este campo es obligatorio';
        errorLastNameAct = true;
    }else{
        errorLastName.innerHTML = '';
        errorLastNameAct = false;
    }
    
    //Guardo segundo apellido
    var secLastNameProfile = document.getElementById('secLastNameProfile').value;
    
    //Guardo edad
    var ageProfile = document.getElementById('ageProfile').value;
    var errorAge = document.getElementById('error-age-profile');
    if(ageProfile <= 0) {
        errorAge.innerHTML = '*Este campo es obligatorio';
        errorAgeAct = true;
    }else{
        errorAge.innerHTML = '';
        errorAgeAct = false;
    }
    
    //Guardo Telefono
    var phoneProfile = document.getElementById('phoneProfile').value;
    var errorPhone = document.getElementById('error-phone-profile');
    if(phoneProfile <= 0) {
        errorPhone.innerHTML = '*Este campo es obligatorio';
        errorPhoneAct = true;
    }else{
        errorPhone.innerHTML = '';
        errorPhoneAct = false;
    }
    
    //Guardar Mail
    var mailProfile = document.getElementById('mailProfile').value;
    var errorMail = document.getElementById('error-mail-profile');
    if(mailProfile == '') {
        errorMail.innerHTML = '*Este campo es obligatorio';
        errorMailAct = true;
    }else{
        errorMail.innerHTML = '';
        errorMailAct = false;
    }

    if (errorNameAct || errorLastNameAct || errorAgeAct || errorPhoneAct || errorMailAct) {
        return;
    }

    //Una vez ingreso los datos sin errores, guardo en localstorage
    guardar();

    this.submit();
})

function guardar(){
    let preview = document.getElementById('imagePreview');
    let perfil = {};
    perfil.nombre = document.getElementById('nameProfile').value
    perfil.segNombre = document.getElementById('secNameProfile').value
    perfil.apellido = document.getElementById('lastNameProfile').value
    perfil.segApellido = document.getElementById('secLastNameProfile').value
    perfil.edad = document.getElementById('ageProfile').value
    perfil.telefono = document.getElementById('phoneProfile').value
    perfil.mail = document.getElementById('mailProfile').value
    perfil.avatar = preview.style.backgroundImage

    localStorage.setItem ('perfil', JSON.stringify(perfil));
    alert("Perfil guardado");
}

function previewFile(){
    let file = document.getElementById('imageUpload').files[0]; 
    let preview = document.getElementById('imagePreview');

    let reader = new FileReader();

    if(file){
        reader.readAsDataURL(file);
    }else {
        preview.style.backgroundImage = 'url(img/avatar.png)';
    }
    reader.onload = function (){
        preview.style.backgroundImage = 'url('+reader.result+')';
    }
}
