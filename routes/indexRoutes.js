// Manejador de las rutas del index

import express from "express";
const router = express.Router();

router.get("/", (req, res) =>{
    res.render("index");
});

export default router;