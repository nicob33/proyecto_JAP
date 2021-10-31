//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  localStorage.removeItem('calve');
});


var form = document.getElementById('formulario');
  form.addEventListener('submit', function(evt){
    evt.preventDefault();
    var usuario = document.getElementById('usuario').value;
    var errorUsuario = document.getElementById('error-user');
    errorUsuario.style.color = 'red';
    errorUsuario.style.fontSize = '15px';
  if(usuario.length < 4 || usuario == null) {
    errorUsuario.innerHTML = 'El usuario debe tener minimo 4 caracteres';
    return;
  }
  var clave = document.getElementById('clave').value;
  var errorPassword = document.getElementById('error-password');
  errorPassword.style.color = 'red';
  errorPassword.style.fontSize = '15px';
  if (clave.length < 6 || clave == null) {
    errorPassword.innerHTML = 'La clave tiene que ser de minimo 6 caracteres';
    return;
  }

  guardarLocalStorage(usuario);
  
  this.submit();
  
  })


  function guardarLocalStorage (user){
    localStorage.setItem ('clave', user);
  }