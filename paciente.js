// Para ver el Mapa con Leaflet
document.addEventListener("DOMContentLoaded", function () {
    // Inicializa el mapa y establece el centro y nivel de zoom
    const map = L.map("map").setView(
      [-34.52293382299909, -58.7005312473375],
      15
    ); // Ubicacion UNGS
  
    // Agrega el tile layer (fondo de mapa)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  
    // Puedes agregar un marcador opcional para indicar una ubicación específica
    L.marker([-34.52293382299909, -58.7005312473375])
      .addTo(map)
      .bindPopup("Centro de Atención UNGS")
      .openPopup();
  });
  
  // Mostrar datos del centro y estado de la encuesta
  const estadoEncuesta = document.getElementById("estado");
  const completarEncuestaBtn = document.getElementById("completarEncuestaBtn");
  const verRespuestasBtn = document.getElementById("verRespuestasBtn");
  
  // Estado de encuesta capturado
  const seleccion = document.getElementById("estado-encuesta");
  
  // Evento para completar la encuesta
  completarEncuestaBtn.addEventListener("click", () => {
    window.location.href = "completar_encuesta.html";
  });
  
  // Evento para ver el comentario
  verRespuestasBtn.addEventListener("click", () => {
    //id del Modal
    const modalComentario = document.getElementById("comentarioModal");
    //las opciones son opcional - puedes quitarlo
    const myModal = new bootstrap.Modal(modalComentario);
    myModal.show();
    // window.location.href = "ver_respuestas.html";

  });
  
  // Cerrar sesión
  document.getElementById("logoutButton").addEventListener("click", () => {
    // Eliminar datos de sesión
    localStorage.removeItem("rolUsuario");
    // Ir a inicio de sesion
    window.location.href = "index.html";
  });
  
  // Escucha el cambio en los botones de radio
  seleccion.addEventListener("change", ({ target }) => {
    if (target.getAttribute("name") === "estado") {
      if (target.value === "true") {
        estadoEncuesta.textContent = "Respondida";
        completarEncuestaBtn.classList.add("d-none");
        verRespuestasBtn.classList.remove("d-none");
      } else {
        estadoEncuesta.textContent = "No respondida";
        completarEncuestaBtn.classList.remove("d-none");
        verRespuestasBtn.classList.add("d-none");
      }
    }
  });
  