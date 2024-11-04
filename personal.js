// Recuperar el rol del usuario desde localStorage
const rolUsuario = localStorage.getItem('rolUsuario');

if (rolUsuario) {
  // Mostrar el rol en la página
  const bienvenida = document.getElementById('bienvenida');
  const contenidoRol = document.getElementById('contenidoRol');
  
  bienvenida.textContent = `Bienvenido, ${rolUsuario.charAt(0).toUpperCase() + rolUsuario.slice(1)}`;

  // Generar contenido específico según el rol
  let contenidoHTML = '';
  if (rolUsuario === 'coordinador') {
    contenidoHTML = `
      <h2>Portal de Coordinador</h2>
      <p>Consulta los centros de tu zona y gestiona recordatorios de encuestas.</p>
      <a href="centros.html" class="btn btn-primary">Ver Centros</a>
      <button class="btn btn-secondary mt-2" onclick="enviarRecordatorio()">Enviar Recordatorio</button>
    `;
  } else if (rolUsuario === 'secretaria') {
    contenidoHTML = `
      <h2>Portal de Personal de Secretaría</h2>
      <p>Gestiona reportes de encuestas y solicita actualizaciones al sistema de salud.</p>
      <a href="reportes.html" class="btn btn-primary">Ver Reportes</a>
      <button class="btn btn-secondary mt-2" onclick="actualizarPadron()">Actualizar Padrón</button>
    `;
  }
  contenidoRol.innerHTML = contenidoHTML;
} else {
  // Redirigir al login si no hay rol almacenado
  alert('No se ha encontrado un usuario autenticado.');
  window.location.href = 'index.html';
}

// Función para el Coordinador: Enviar Recordatorio
function enviarRecordatorio() {
  alert("Se ha enviado un recordatorio a los pacientes que aún no completaron su encuesta.");
}

// Función para el Personal de Secretaría: Actualizar Padrón
function actualizarPadron() {
  alert("El padrón ha sido actualizado en el sistema de salud.");
}

// Cerrar sesión
document.getElementById('logoutButton').addEventListener('click', () => {
  localStorage.removeItem('rolUsuario');
  window.location.href = 'index.html';
});
