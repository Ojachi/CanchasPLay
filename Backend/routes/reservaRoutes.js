import express from "express";
import { 
  obtenerReservas, 
  obtenerReservasAd, 
  registrar, 
  obtenerReserva, 
  actualizar, 
  eliminar 
}  from '../controllers/reservaController.js';

const router = express.Router();

// Rutas administrativas
router.route("/admin")
  .get(obtenerReservasAd);  // Obtener todas las reservas con permisos administrativos

router.route("/admin/:id")
  .get(obtenerReserva)      // Obtener una reserva específica por ID con permisos administrativos
  .put(actualizar)          // Actualizar una reserva específica por ID con permisos administrativos
  .delete(eliminar);        // Eliminar una reserva específica por ID con permisos administrativos 

// Rutas generales para reservas
router.route("/")
  .get(obtenerReservas)     // Obtener todas las reservas
  .post(registrar);         // Registrar una nueva reserva

router.route("/:id")
  .get(obtenerReserva)      // Obtener una reserva específica por ID
  .put(actualizar)          // Actualizar una reserva específica por ID
  .delete(eliminar);        // Eliminar una reserva específica por ID

export default  router;
