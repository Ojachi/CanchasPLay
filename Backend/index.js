import  express, { request }  from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv";
import usuarioRoutes from './routes/usuarioRoutes.js'
import canchasRoutes from './routes/canchasRoutes.js'
import reservaRoutes from './routes/reservaRoutes.js'

const app = express();

app.use(express.json());

dotenv.config();

conectarDB();


//routing
app.use("/api/usuarios", usuarioRoutes);

app.use("/api/canchas", canchasRoutes);

app.use("/api/reservas", reservaRoutes);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});