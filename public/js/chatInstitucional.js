const socket = io();

// Guardamos la referencia al input en una constante para reutilizarla
const inputMensaje = document.getElementById("mensaje");

function enviarMensaje() {
  const texto = inputMensaje.value.trim();

  if (!texto) return;

  socket.emit("mensaje", {
    usuario: typeof NOMBRE_USUARIO !== 'undefined' ? NOMBRE_USUARIO : 'Desconocido',
    texto: texto
  });

  inputMensaje.value = "";
}

// Escuchar el evento "keydown" en el campo de texto
inputMensaje.addEventListener("keydown", (event) => {
  // Verificamos si la tecla presionada es "Enter"
  if (event.key === "Enter") {
    event.preventDefault(); // Evita comportamientos por defecto del navegador (como recargar o saltar de línea)
    enviarMensaje(); // Ejecuta la función de envío
  }
});

socket.on("mensaje", (datos) => {
  const mensajesUl = document.getElementById("mensajes");
  const li = document.createElement("li");

  li.className = "mb-2 border-bottom pb-1";
  li.innerHTML = `<strong>${datos.usuario}:</strong> <span class="text-muted">${datos.texto}</span>`;

  mensajesUl.appendChild(li);

  // Auto-scroll hacia el último mensaje
  mensajesUl.scrollTop = mensajesUl.scrollHeight;
});