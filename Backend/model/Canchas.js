import mongoose from "mongoose";

const canchaSchema = mongoose.Schema(
    {
        tipo_cancha: {
            type: String,
            required: true,
            trim: true
        },

        descripcion: {
            type: String,
            required: true,
            trim: true
        },
    },
    {
        timestamps:true,
        _id: { auto: true }
    }
);
const canchas = mongoose.model("Canchas", canchaSchema);
export default canchas;
