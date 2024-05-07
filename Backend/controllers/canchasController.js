import Canchas from "../model/Canchas.js";

const registrar = async (req, res) => {
    try {
        const canchas = new Canchas(req.body);
        const canchaAlmacenado = await canchas.save();
        res.json(canchaAlmacenado);
    } catch (error) {
        console.log(error);
    }
};

//eliminar canchas

// const eliminarC = async (req, res) => {
//     const usuario = req.usuario; // Suponiendo que ya has autenticado al usuario y has guardado sus datos en req.usuario

// // Autenticacion de usuario admin
//     if (usuario.esAdmin) {
//         //eliminar canchas
//         const cancha = await Canchas.findByIdAndDelete(req.params.id);

//         res.json({ msg: "Se elimino la cancha" });
//     } else {
//         res.status(403).json({ msg: "No tienes permiso para realizar esta acción" });
//     }
// };

const eliminar = async (req, res) => {
    const { id } = req.params;

    const cancha = await Canchas.findById(id);
    res.json(cancha);
    if (!cancha) {
        const error = new Error("No encontrado");
        return res.status(404).json({msg: "Accion no valida"});
    };
    
    try {
        await cancha.deleteOne();
        res.json({msg: "Cancha eliminada correctamente"});
        
    } catch (error) {
        console.log(error);
    }
};


export { registrar, eliminar };