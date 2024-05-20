import  express  from "express";
const router = express.Router();
import { eliminar, registrar, obtenerCanchas } from "../controllers/canchasController.js"


//Autenticacion, registro y confirmacion de cancha
router.post('/', registrar); //crea un nuevo cancha
router.delete('/:id', eliminar); //elimina cancha
router.get('/', obtenerCanchas); //Muestra todas las canchas



export default router;