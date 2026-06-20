const configurarChat = (io) => {
  io.on("connection", (socket) => {

    socket.on("mensaje", (datos) => {
      io.emit("mensaje", datos);
    });

  });
};

export default configurarChat;