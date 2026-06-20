import express from "express";
import { renderizarChat } from "../controllers/chatInstitucionalController.js";
import { protegerRuta } from "../middlewares/autenticacionMiddleware.js";

const router = express.Router();

router.use(protegerRuta);

router.get("/", renderizarChat);

export default router;