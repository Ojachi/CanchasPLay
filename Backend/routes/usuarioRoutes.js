import  express  from "express";

import { registrar, autenticar ,perfil, actualizar, } from "../controllers/usuarioController.js"

//import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

//Autenticacion, registro y confirmacion de usuario
router.post('/', registrar); //crea un nuevo usuario
router.post('/login', autenticar);
router.put('/perfil/actualizar', actualizar);
router.get('/perfil', perfil); 

export default router;