const express = require("express");
const router = express.Router();

const {
    formularioLogin,
	obtenerUsuario
} = require("../controllers/loginController");

router.get("/", formularioLogin);
router.post("/", obtenerUsuario);

module.exports = router;
