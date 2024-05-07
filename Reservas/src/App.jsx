import NavBar from "./components/NavBar";
import Inicio from "./components/Inicio";
import Canchas from "./components/Canchas";
import Reservar from "./components/Reservar";
import Nosotros from "./components/Nosotros";
import { Routes, Route } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import SignUp from "./components/SignUp";
import InicioSesion from "./components/InicioSesion";
import OlvidePassword from "./components/OlvidePassword";
import NuevoPassword from "./components/NuevoPassword";
import ConfirmarCuenta from "./components/ConfirmarCuenta";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Inicio />} />
        <Route path="Canchas" element={<Canchas />} />
        <Route path="Reservar" element={<Reservar />} />
        <Route path="Nosotros" element={<Nosotros />} />
        <Route path="InicioSesion" element={<InicioSesion />} />
        <Route path="SignUp" element={<SignUp />} />
        <Route path="olvide-password" element={<OlvidePassword />} />
        <Route path="olvide-password/:token" element={<NuevoPassword />} />
        <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
      </Route>
    </Routes>
  );
}

export default App;
