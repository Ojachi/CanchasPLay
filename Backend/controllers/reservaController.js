import Reserva from "../model/Reserva.js";

const obtenerReservas = async (req, res) => {
  try {
    console.log(req.body);
    const reservas = await Reserva.find()
      .where("cliente")
      .equals(req.cliente)
      .populate("cliente", "nombre")
      .populate("cancha", "tipo_cancha");
    res.json(reservas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener las reservas" });
  }
};

const obtenerReservasAd = async (req, res) => {
  try {
    const reservas = await Reserva.find()
      .populate("cliente", "nombre")
      .populate("cancha", "tipo_cancha");
    res.json(reservas);
  } catch (error) {
    console.log(error);
  }
};

const registrar = async (req, res) => {
  const { fecha_hora, duracion, telefono, cliente, cancha } = req.body;

  // Verificar disponibilidad de la cancha
  const fechaInicio = new Date(fecha_hora);
  const fechaFin = new Date(fecha_hora);
  fechaFin.setHours(fechaFin.getHours() + duracion);

  try {
    const reservasExistentes = await Reserva.find({
      cancha,
      $or: [
        {
          fecha_hora: {
            $lt: fechaFin,
            $gte: fechaInicio,
          },
        },
        {
          $expr: {
            $lt: [
              {
                $add: [
                  "$fecha_hora",
                  { $multiply: ["$duracion", 60 * 60 * 1000] },
                ],
              },
              fechaFin,
            ],
          },
          fecha_hora: {
            $gte: fechaInicio,
          },
        },
      ],
    });

    if (reservasExistentes.length > 0) {
      return res.status(400).json({
        message:
          "La cancha no está disponible en la fecha y hora seleccionada.",
      });
    }

    const nuevaReserva = new Reserva({
      fecha_hora,
      duracion,
      cliente,
      cancha,
      telefono,
    });

    const reservaAlmacenada = await nuevaReserva.save();
    res.json({
      message: "Reserva creada exitosamente.",
      reserva: reservaAlmacenada,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear la reserva." });
  }
};

// Obtener una reserva específica por ID
const obtenerReserva = async (req, res) => {
  const { id } = req.params;

  const reserva = await Reserva.findById(id);

  if (!reserva) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }
  if (reserva.cliente.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(404).json({ msg: error.message });
  }

  res.json(reserva);
};

// Actualizar reserva
const actualizar = async (req, res) => {
  const { id } = req.params;
  const reserva = await Reserva.findById(id);

  if (!reserva) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }
  if (reserva.cliente.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(404).json({ msg: error.message });
  }

  reserva.duracion = req.body.duracion || reserva.duracion;
  reserva.fecha_hora = req.body.fecha_hora || reserva.fecha_hora;
  reserva.cancha = req.body.cancha || reserva.cancha;

  try {
    const reservaAlmacenada = await reserva.save();
    res.json(reservaAlmacenada);
    res.json({ msg: "Reserva actualizada correctamente" });
  } catch (error) {
    console.log(error);
  }
};

// Eliminar reserva
const eliminar = async (req, res) => {
  const { id } = req.params;

  const reserva = await Reserva.findById(id);
  if (!reserva) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }
  if (reserva.cliente.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(404).json({ msg: error.message });
  }

  try {
    await reserva.deleteOne();
    res.json({ msg: "Reserva eliminada correctamente" });
  } catch (error) {
    console.log(error);
  }
};

export {
  registrar,
  obtenerReservas,
  actualizar,
  eliminar,
  obtenerReserva,
  obtenerReservasAd,
};
