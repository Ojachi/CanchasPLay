import  express  from "express";
const router = express.Router();
import { eliminar, registrar } from "../controllers/canchasController.js"


//Autenticacion, registro y confirmacion de cancha
router.post('/registrar', registrar); //crea un nuevo cancha
router.delete('/eliminar', eliminar)


export default router;