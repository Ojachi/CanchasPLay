import express, { request } from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors"
import usuarioRoutes from "./routes/usuarioRoutes.js";
import canchasRoutes from "./routes/canchasRoutes.js";
import reservaRoutes from "./routes/reservaRoutes.js";

const app = express();

app.use(express.json());

dotenv.config();

conectarDB();

//COnfiguracion cors
// const whitelist = ["http://localhost:5173"];

// const corsOption = {
//   origin: function (origin, callback) {
//     if (whitelist.includes(origin)) {
//       //puede consultar la API
//       callback(null, true);
//     } else {
//       //no puede consultar la API
//       callback(new Error("Error de cors"));
//     }
//   },
// };

// app.use(cors(corsOption));

//routing
app.use("/api/usuarios", usuarioRoutes);

app.use("/api/canchas", canchasRoutes);

app.use("/api/reservas", reservaRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
