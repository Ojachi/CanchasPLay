import  express  from "express";
const router = express.Router();
import { registrar } from "../controllers/canchasController.js"


//Autenticacion, registro y confirmacion de cancha
router.post('/', registrar); //crea un nuevo cancha


export default router;