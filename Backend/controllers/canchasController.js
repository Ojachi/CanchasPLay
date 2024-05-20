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

// Obtener canchas 

const obtenerCanchas = async (req, res) => {
    try {
      const canchas = await Canchas.find();
      res.json(canchas);
    } catch (error) {
      console.log(error);
    }
  };



export { registrar, eliminar, obtenerCanchas, };