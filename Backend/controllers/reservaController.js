import Reserva from "../model/Reserva.js";

const obtenerReservas = async (req, res ) => {
    try {
        const reservas = await Reserva.find().where('').equals(req.usuario);
        res.json(reservas);
    } catch (error) {
        console.log(error);
    }
};

const registrar = async (req, res) => {
    const reserva = new Reserva(req.body);
        reserva.cliente = req.usuario._id;
    try {
        const reservaAlmacenada = await Reserva.save();
        res.json(reservaAlmacenada);
    } catch (error) {
        console.log(error);
    }
};

//obtenerreserva

const obtenerReserva = async (req, res) => {
    const { id } = req.params;

    const reserva = await Reserva.findById(id);
    res.json(reserva);

    if (!reserva) {
        const error = new Error("No encontrado");
        return res.status(404).json({msg: "Accion no valida"});
    };
    if (reserva.cliente.toString() !== req.usuario._id.toString()) {
        const error = new Error("Accion no valida");
        return res.status(404).json({msg: error.message});   
    }

    res.json(reserva);
    
};

//actualizar reserva

const actualizar = async (req, res) => {
    const { id } = req.params;
    const reserva = await Reserva.findById(id);

    console.log(reserva);
    if (!reserva) {
        const error = new Error("No encontrado");
        return res.status(404).json({msg: "Accion no valida"});
    };
    if (reserva.cliente.toString() !== req.usuario._id.toString()) {
        const error = new Error("Accion no valida");
        return res.status(404).json({msg: error.message});   
    }
    reserva.duracion = req.body.duracion || reserva.duracion;
    reserva.fecha_hora = req.body.fecha_hora || reserva.fecha_hora;
    reserva.cancha = req.body.cancha || reserva.cancha;

    try {
        const reservaAlmacenada = await Reserva.save();
        res.json(reservaAlmacenada);
        res.json({msg: "reserva actualizada correctamente"});
    } catch (error) {
        console.log(error);
    }
};

//eliminar reserva

const eliminar = async (req, res) => {
    const { id } = req.params;

    const reserva = await Reserva.findById(id);
    res.json(reserva);
    if (!reserva) {
        const error = new Error("No encontrado");
        return res.status(404).json({msg: "Accion no valida"});
    };
    if (reserva.cliente.toString() !== req.usuario._id.toString()) {
        const error = new Error("Accion no valida");
        return res.status(404).json({msg: error.message});   
    }
    
    try {
        await reserva.deleteOne();
        res.json({msg: "Reserva eliminada correctamente"});
        
    } catch (error) {
        console.log(error);
    }
};

export { registrar, obtenerReservas, actualizar, eliminar, obtenerReserva};
