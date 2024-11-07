document.addEventListener("DOMContentLoaded", function () {
  // Recuperar el rol del usuario desde localStorage
  const rolUsuario = localStorage.getItem("rolUsuario");

  if (rolUsuario) {
    // Mostrar el rol en la página
    const bienvenida = document.getElementById("bienvenida");
    bienvenida.textContent = `Bienvenido, ${rolUsuario.charAt(0).toUpperCase() + rolUsuario.slice(1)}`;

    // Generar contenido específico según el rol
    if (rolUsuario === "coordinador") {
      document.getElementById("pagina-coordinador").style.display = "block";
    } else if (rolUsuario === "secretaria") {
      document.getElementById("pagina-personal-secretaria").style.display = "block";
    }
  } else {
    // Redirigir al login si no hay rol almacenado
    alert("No se ha encontrado un usuario autenticado.");
    window.location.href = "index.html";
  }

  // Cerrar sesión
  document.getElementById("logoutButton").addEventListener("click", () => {
    localStorage.removeItem("rolUsuario");
    window.location.href = "index.html";
  });

  // Inicializa el mapa con Leaflet
  const mapElement = document.getElementById("map-personal");
  const mapElement2 = document.getElementById("map-personal2");

  if (mapElement && mapElement2) {
    const map_personal = L.map("map-personal").setView([-34.52293382299909, -58.7005312473375], 15);
    const map_personal2 = L.map("map-personal2").setView([-34.52293382299909, -58.7005312473375], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 13,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map_personal);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 10,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map_personal2);

    
    // Puedes agregar un marcador opcional para indicar una ubicación específica
    L.marker([-34.52293382299909, -58.7005312473375])
      .addTo(map_personal)
      .bindPopup("Centro de Atención UNGS")
      .openPopup();

      L.marker([-34.513166508369046, -58.70268092501155])
      .addTo(map_personal)
      .bindPopup("Centro salud Malvinas Argentinas")
      .openPopup();

      L.marker([-34.542381819970544, -58.712245279672054
  ])
      .addTo(map_personal)
      .bindPopup("Centro salud San Miguel")
      .openPopup();


    // Datos de zonas y sus centros
    const zonas = {
      "ZONA-1": [
        { nombre: "Centro de salud UNGS", lat: -34.52293382299909, lng: -58.7005312473375 },
        { nombre: "Centro salud San Miguel", lat: -34.6097, lng: -58.4431 },
        { nombre: "Centro salud Malvinas Argentinas", lat: -34.5323, lng: -58.7224 },
      ],
      "ZONA-2": [
        { nombre: "Centro de salud Moreno", lat: -34.6589, lng: -58.6115 },
        { nombre: "Centro salud José C. Paz", lat: -34.5470, lng: -58.7094 },
      ],
      "ZONA-3": [
        { nombre: "Centro de salud Tigre", lat: -34.4116, lng: -58.5692 },
        { nombre: "Centro salud Escobar", lat: -34.1784, lng: -58.7381 },
      ],
    };

    // Función para actualizar el mapa con los puntos según la zona
    function mostrarCentrosEnMapa(zona) {
            map_personal2.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map_personal2.removeLayer(layer);
        }
      });

      // Limpiar la lista de centros
      const centrosContainer = document.getElementById("centros");
      centrosContainer.innerHTML = ""; // Limpiar el contenido anterior

      // Mostrar los puntos en el mapa y en la tarjeta de centros
      if (zonas[zona]) {
        zonas[zona].forEach((centro) => {
          const marker = L.marker([centro.lat, centro.lng]).addTo(map_personal);
          const marker2 = L.marker([centro.lat, centro.lng]).addTo(map_personal2);

          marker.bindPopup(centro.nombre);
          marker2.bindPopup(centro.nombre);

          // Crear un enlace para cada centro
          const centroLink = document.createElement("a");
          centroLink.href = "#"; // Puede ajustarse para redirigir a algún lugar si es necesario
          centroLink.innerHTML = `Nombre: <strong>${centro.nombre}</strong>`;
          centroLink.classList.add("d-block"); // Asegura que cada centro se muestre en una nueva línea
          centrosContainer.appendChild(centroLink);
        });
      } else {
        centrosContainer.innerHTML = "<p>No hay centros para esta zona.</p>";
      }
    }

    // Mostrar centros de la zona cuando se hace clic en los botones
    document.getElementById("zona-1").addEventListener("click", function() {
      mostrarCentrosEnMapa("ZONA-1");
    });
    document.getElementById("zona-2").addEventListener("click", function() {
      mostrarCentrosEnMapa("ZONA-2");
    });
    document.getElementById("zona-3").addEventListener("click", function() {
      mostrarCentrosEnMapa("ZONA-3");
    });
  }
});

// Función para mostrar/ocultar la tarjeta de "Zona Asignada"
function toggleZonaCard() {
  const zonaCard = document.querySelector(".card.mb-4");
  if (zonaCard) {
    zonaCard.style.display = zonaCard.style.display === "none" ? "block" : "none";
  }
}

// Función para el Coordinador: Enviar Recordatorio
function enviarRecordatorio() {
  alert("Se ha enviado un recordatorio a los pacientes que aún no completaron su encuesta.");
}

// Función para el Personal de Secretaría: Actualizar Padrón
function actualizarPadron() {
  alert("El padrón ha sido actualizado en el sistema de salud.");
}
