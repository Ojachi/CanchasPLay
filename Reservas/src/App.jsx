import NavBar from "./components/NavBar";
import Inicio from "./paginas/Inicio";
import Canchas from "./paginas/Canchas";
import Reservar from "./paginas/Reservar";
import Nosotros from "./paginas/Nosotros";
import { Routes, Route } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import SignUp from "./paginas/SignUp";
import InicioSesion from "./paginas/InicioSesion";
import Dashboard from "./paginas/Dashboard";

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
        <Route path="Dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
