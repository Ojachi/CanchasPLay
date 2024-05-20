import express from "express";

import {
  registrar,
  autenticar,
  perfil,
  actualizar,
  obtenerUsuarios,
} from "../controllers/usuarioController.js";

//import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

//Autenticacion, registro y confirmacion de usuario
router.post("/", registrar); //crea un nuevo usuario
router.get("/", obtenerUsuarios); //muestra todos los usuarios
router.post("/login", autenticar);
router.put("/perfil/actualizar", actualizar);
router.get("/perfil", perfil);

export default router;
