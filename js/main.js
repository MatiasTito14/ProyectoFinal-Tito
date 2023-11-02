// Variables de estado para el inicio de sesión
let loginBoxOpen = false;
let usuariosRegistrados = []; // Almacena las cuentas registradas

// LOGIN
document.getElementById("loginButton").addEventListener("click", function () {
  const loginBox = document.getElementById("loginBox");

  if (!loginBoxOpen) {
    // La pestaña está cerrada, ábrela
    loginBox.style.display = "block";
    loginBoxOpen = true;
  } else {
    // La pestaña está abierta, ciérrala
    loginBox.style.display = "none";
    loginBoxOpen = false;
  }
});

document.getElementById("loginSubmit").addEventListener("click", function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // Función para autenticar al usuario
  function autenticarUsuario(email, password) {
    for (let i = 0; i < usuariosRegistrados.length; i++) {
      if (usuariosRegistrados[i].email === email && usuariosRegistrados[i].contraseña === password) {
        return true;
      }
    }
    return false;
  }

  if (autenticarUsuario(email, password)) {
    alert("Inicio de sesión exitoso. Bienvenido.");
    // Redirige al usuario al inicio (index.html)
    window.location.href = "index.html";
  } else {
    alert("El email o contraseña son incorrectos. Por favor, inténtalo de nuevo.");
  }
});

// CREAR UNA CUENTA
document.getElementById("createAccountLink").addEventListener("click", function () {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("signupBox").style.display = "block";
});

document.getElementById("signupSubmit").addEventListener("click", function () {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("signupEmail").value;
  const signupPassword = document.getElementById("signupPassword").value;

  // Validación de la contraseña
  if (!validarContraseña(signupPassword)) {
    alert("La contraseña no cumple con los requisitos. Debe tener al menos 8 caracteres, 1 letra, 1 número y 1 símbolo.");
    return;
  }

  // Simulación de registro exitoso (esto debería ser reemplazado por una lógica de registro real)
  usuariosRegistrados.push({ email, contraseña: signupPassword });

  alert("Registro exitoso. Bienvenido, " + firstName + " " + lastName);
  // Oculta la pestaña de registro
  document.getElementById("signupBox").style.display = "none";
  // Muestra la pestaña de inicio de sesión
  document.getElementById("loginBox").style.display = "block";
});

// Función para validar la contraseña
function validarContraseña(contraseña) {
  // Requisitos de la contraseña
  const longitudRequerida = 8;
  const letraRequerida = /[a-zA-Z]/;
  const numeroRequerido = /[0-9]/;
  const simboloRequerido = /[@#$%^&+=]/;

  return (
    contraseña.length >= longitudRequerida &&
    letraRequerida.test(contraseña) &&
    numeroRequerido.test(contraseña) &&
    simboloRequerido.test(contraseña)
  );
}