import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Alerta from "./Alerta";

function InicioSesion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

    // Iniciar sesion del usuario en la API
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/usuarios/login",
        { email, password }
      );
      setAlerta({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
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
        ></input>
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
          Iniciar Sesion
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
