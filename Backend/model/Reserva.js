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
            type: String,
            required: true,
            trim: true
            
        },
        cancha: {
            type: String,
            required: true,
            trim: true
        },
        telefono: {
            type: Number,
            trim: true,
            required: true,
        },
    },
    {
        timestamps:true,
        _id: { auto: true }
    }
);
const Reserva = mongoose.model("Reservas", reservaSchema);
export default Reserva;
