import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import Alerta from "../components/Alerta";
import { SessionContext } from "../components/Session";

function InicioSesion() {
  const { setSession } = useContext(SessionContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    setAlerta({});

    // Iniciar sesión del usuario en la API
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/usuarios/login",
        { email, password }
      );

      setAlerta({
        msg: data.msg,
        error: false,
      });

      const session = {
        id: data._id,
        nombre: data.nombre,
        email: data.email,
        esAdmin: data.esAdmin,
      };
      setSession(session);

      // Redirección basada en si el usuario es administrador o no
      setTimeout(() => {
        if (session.esAdmin) {
          navigate("/dashboard"); // Ruta del dashboard del administrador
        } else {
          navigate("/reservas"); // Ruta para usuarios generales
        }
      }, 1000); // 1 segundo de espera antes de redirigir

    } catch (error) {
      setAlerta({
        msg: error.response?.data?.msg || "Error al iniciar sesión",
        error: true,
      });
    }
  };

  const { msg } = alerta;

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Inicio de Sesión</h1>

      {msg && <Alerta alerta={alerta} />}

      <label className="LoginTxt">Correo</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="LoginTxt">Contraseña</label>
      <div className="password-input-container">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          className="password-toggle"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <span>&#128065;</span> : <span>&#128064;</span>}
        </button>
      </div>
      <div className="btncont">
        <button type="submit" className="submit primary button" id="LoginBtn">
          Iniciar Sesión
        </button>
      </div>
      <div className="btnContenedor">
        <label className="TienesCuentaTxt">¿No tienes cuenta?</label>
        <Link to="/SignUp" className="button secondary" id="SignupBtn">
          Regístrate
        </Link>
      </div>
    </form>
  );
}

export default InicioSesion;
