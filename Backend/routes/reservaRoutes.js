import  express  from "express";
import { registrar, actualizar, eliminar, obtenerReserva, obtenerReservas } from "../controllers/reservaController.js"
//import checkAuth from "../middleware/checkAuth.js";


const router = express.Router();

//registro, eliminacion, actualizacion... de cancha
router
    .route("/")
    .get( obtenerReservas)
    .post( registrar);

router
    .route("/:id")
    .get( obtenerReserva)
    .put( actualizar)
    .delete( eliminar);



export default router;