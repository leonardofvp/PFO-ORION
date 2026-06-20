const errorHandler = (err, req, res, next) => {
  console.error("Error capturado:", err);

  if (err.name === "ValidationError") {
    const mensajes = Object.values(err.errors)
      .map((e) => e.message)
      .join(" - ");
    if (res.locals.vista) {
      return res
        .status(400)
        .render(res.locals.vista, { ...req.body, error: mensajes });
    }
  }

  if (err.status === 404 || err.status === 400 || err.status === 403) {
    return res.status(err.status).render("error", {
      titulo: `Error ${err.status}`,
      mensaje: err.message,
    });
  }

  res.status(500).render("error", {
    titulo: "Error interno",
    mensaje: "Ocurrió un problema técnico. Por favor, intente más tarde.",
  });
};

export { errorHandler };
