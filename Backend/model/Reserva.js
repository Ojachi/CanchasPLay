import mongoose from "mongoose";

const reservaSchema = mongoose.Schema(
    {
        fecha_hora: {
            type: Date,
            required: true,
        },
        duracion: {
            type: Number,
            required: true,
            trim: true
        },
        cliente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario',
            required: true,
            trim: true
        },
        cancha: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Canchas',
            required: true,
            trim: true
        },
        telefono: {
            type: String,
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
