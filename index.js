// Usuarios
const usuariosMock = [
    { rol: "paciente", dni: "123", clave: "pac" },
    { rol: "coordinador", dni: "1234", clave: "coor" },
    { rol: "secretaria", dni: "12345", clave: "sec" }
];

// Elementos del DOM
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const element = document.getElementById('login');

// Seleccionar los botones de rol
const rolPacienteButton = document.getElementById('rolPaciente');
const rolPersonalButton = document.getElementById('rolPersonal');

// Manejar la selección de rol
rolPacienteButton.addEventListener('click', function () {
    resetSelection(); // Restablecer selección anterior
    this.style.backgroundColor = '#0056b3'; // Cambiar el color de fondo del botón de Paciente
    this.style.color = 'white'; // Cambiar el color del texto
    this.style.border = '2px solid #004085'; // Agregar borde
    element.classList.remove('visually-hidden'); // Mostrar el formulario
    document.querySelector('label[for="dni"]').textContent = "Número de DNI"; // Cambiar el texto del label
});

rolPersonalButton.addEventListener('click', function () {
    resetSelection(); // Restablecer selección anterior
    this.style.backgroundColor = '#0056b3'; // Cambiar el color de fondo del botón de Personal
    this.style.color = 'white'; // Cambiar el color del texto
    this.style.border = '2px solid #004085'; // Agregar borde
    element.classList.remove('visually-hidden'); // Mostrar el formulario
    document.querySelector('label[for="dni"]').textContent = "Número de Legajo"; // Cambiar el texto del label
});

// Función para restablecer la selección
function resetSelection() {
    rolPacienteButton.style.backgroundColor = ''; // Restablecer color de fondo de Paciente
    rolPacienteButton.style.color = ''; // Restablecer color del texto de Paciente
    rolPacienteButton.style.border = ''; // Restablecer borde de Paciente
    
    rolPersonalButton.style.backgroundColor = ''; // Restablecer color de fondo de Personal
    rolPersonalButton.style.color = ''; // Restablecer color del texto de Personal
    rolPersonalButton.style.border = ''; // Restablecer borde de Personal
}

// Validación del formulario de inicio de sesión
loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir el envío predeterminado

    // Obtener los valores ingresados por el usuario
    const dniIngresado = document.getElementById('dni').value;
    const claveIngresada = document.getElementById('clave').value;

    // Buscar el usuario
    const usuarioEncontrado = usuariosMock.find(
        (usuario) => usuario.dni === dniIngresado && usuario.clave === claveIngresada
    );

    // Verificar si las credenciales coinciden con algún usuario
    if (usuarioEncontrado) {
        // Guarda el usuario en el local storage
        localStorage.setItem('rolUsuario', usuarioEncontrado.rol);
        errorMessage.style.display = 'none';
        // Redirigir a la página correspondiente según el rol
        if (usuarioEncontrado.rol === "paciente") {
            window.location.href = "paciente.html";
        } else if (usuarioEncontrado.rol === "coordinador" || usuarioEncontrado.rol === "secretaria") {
            window.location.href = "personal.html";
        }
    } else {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
    }
});
