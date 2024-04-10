import canchas from "../model/Canchas.js";

const registrar = async (req, res) => {
    try {
        const Canchas = new canchas(req.body);
        const canchaAlmacenado = await Canchas.save();
        res.json(canchaAlmacenado);
    } catch (error) {
        console.log(error);
    }
};

//eliminar canchas

const eliminar = async (req, res) => {
    const usuario = req.usuario; // Suponiendo que ya has autenticado al usuario y has guardado sus datos en req.usuario

// Autenticacion de usuario admin
    if (usuario.esAdmin) {
        //eliminar canchas
        const cancha = await Canchas.findByIdAndDelete(req.params.id);

        res.json({ msg: "Se elimino la cancha" });
    } else {
        res.status(403).json({ msg: "No tienes permiso para realizar esta acción" });
    }
};


export { registrar, eliminar };