import mongoose from "mongoose";


const reservaSchema = mongoose.Schema(
    {
        fecha_hora: {
            type: Date,
            default: Date.now(),
            //required: true,
        },
        duracion: {
            type: Number,
            required: true,
            trim: true
        },
        cliente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario",
            
        },
        cancha: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Canchas",
            //required: true,
        },
    },
    {
        timestamps:true,
        _id: { auto: true }
    }
);
const Reserva = mongoose.model("Reservas", reservaSchema);
export default Reserva;
