/*https://github.com/roisete/Proyecto-EV1-ROI*/
/*https://github.com/roisete/roisete.github.io*/

let nombre = document.querySelector("#nombre");
let password = document.querySelector("#password");
let form = document.querySelector("#formulario");
let submitBtn = document.querySelector("#submit");
let limpiarBtn = document.querySelector("#limpiar");

let error_nombre = document.getElementById("error-nombre");
let error_password = document.getElementById("error-password");

error_nombre.style.display = "none";
error_password.style.display = "none";

//FUNCIÓN PARA VALIDAR EL NOMBRE
function validarNombre() {
  let inputNombre = nombre.value.trim();
  let validar = true;
  let regexValido = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/;

  if (inputNombre === "") {
    error_nombre.innerText = "Nombre obligatorio.";
    validar = false;
  } else if (!regexValido.test(inputNombre)) {
    error_nombre.innerText = "Nombre inválido.";
    validar = false;
  } else if (inputNombre.length > 20) {
    error_nombre.innerText = "El nombre no puede tener más de 20 caracteres.";
    validar = false;
  } else {
    error_nombre.style.display = "none"; //Para que no aparezca mientras se escribe
  }

  if (!validar) {
    error_nombre.style.display = "block";
  }

  return validar;
}

//FUNCIÓN PARA VALIDAR LA CONTRASEÑA
function validarPassword() {
  let inputPasswd = password.value;
  let validar = true;
  let regexValidoP = /^[0-9a-zA-ZáéíóúüñÁÉÍÓÚÜÑ·$%&/()]+$/;

  if (inputPasswd === "") {
    error_password.innerText = "Contraseña obligatoria.";
    validar = false;
  } else if (
    inputPasswd.length < 8 ||
    inputPasswd.length > 16 ||
    !regexValidoP.test(inputPasswd)
  ) {
    error_password.innerText =
      "La contraseña debe tener entre 8 y 16 caracteres y solo puede contener letras, números y los caracteres ·$%&/().";
    validar = false;
  } else {
    error_password.style.display = "none";
  }

  if (!validar) {
    error_password.style.display = "block";
  }

  return validar;
}

//EVENTOS EN LOS INPUTS
nombre.addEventListener("input", function () {
  validarNombre();
});

nombre.addEventListener("blur", function () {
  //Esto sirve para que no se muestre error cuando este vacío y cambies de campo
  if (nombre.value.trim() === "") {
    error_nombre.style.display = "none";
  }
});

password.addEventListener("input", function () {
  validarPassword();
});

password.addEventListener("blur", function () {
  if (password.value === "") {
    error_password.style.display = "none";
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (validarNombre() && validarPassword()) {
    window.location.href = "main.html";
  } else {
    alert("Por favor, corrige los errores en el formulario.");
  }
});


//BOTÓN PARA LIMPIAR EL FORMULARIO
limpiarBtn.addEventListener("click", () => {
  form.reset();
  error_nombre.style.display = "none";
  error_password.style.display = "none";
});
