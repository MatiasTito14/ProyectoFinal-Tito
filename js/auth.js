// Función para autenticar al usuario
function autenticarUsuario(email, password) {
    for (let i = 0; i < usuariosRegistrados.length; i++) {
      if (usuariosRegistrados[i].email === email && usuariosRegistrados[i].contraseña === password) {
        return true;
      }
    }
    return false;
  }
  
  // JavaScript para la autenticación y creación de cuentas
  document.getElementById("createAccountLink").addEventListener("click", function () {
    toggleLoginAndSignupDisplay("none", "block");
  });
  
  document.getElementById("signupSubmit").addEventListener("click", function () {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("signupEmail").value;
    const signupPassword = document.getElementById("signupPassword").value;
  
    if (validarContraseña(signupPassword)) {
      usuariosRegistrados.push({ email, contraseña: signupPassword });
      alert("Registro exitoso. Bienvenido, " + firstName + " " + lastName);
      toggleLoginAndSignupDisplay("block", "none");
    } else {
      alert("La contraseña no cumple con los requisitos. Debe tener al menos 8 caracteres, 1 letra, 1 número y 1 símbolo.");
    }
  });
  
