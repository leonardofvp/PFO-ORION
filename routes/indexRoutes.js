// Manejador de las rutas del index

const express = require("express");
const router = express.Router();

router.get("/", (req, res) =>{
    res.render("index");
});

module.exports = router;