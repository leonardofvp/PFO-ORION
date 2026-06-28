const socket = io();

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

inputMensaje.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    enviarMensaje();
  }
});

socket.on("mensaje", (datos) => {
  const mensajesUl = document.getElementById("mensajes");
  const li = document.createElement("li");

  li.className = "mb-2 border-bottom pb-1";
  li.innerHTML = `<strong>${datos.usuario}:</strong> <span class="text-muted">${datos.texto}</span>`;

  mensajesUl.appendChild(li);

  mensajesUl.scrollTop = mensajesUl.scrollHeight;
});