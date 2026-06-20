const renderizarChat = (req, res, next) => {
  try {
    res.status(200).render("chat-institucional", {
      usuario: req.usuario
    });
  } catch (error) {
    next(error);
  }
};

export { renderizarChat };