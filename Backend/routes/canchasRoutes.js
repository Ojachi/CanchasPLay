import  express  from "express";
const router = express.Router();
import { eliminar, registrar } from "../controllers/canchasController.js"


//Autenticacion, registro y confirmacion de cancha
router.post('/', registrar); //crea un nuevo cancha
router.delete('/:id', eliminar);


export default router;