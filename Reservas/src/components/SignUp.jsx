import { useState } from "react";
import axios from "axios";
import Alerta from "../components/Alerta";
import { Link } from "react-router-dom";

function SignUp() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({
        msg: "Los password no son iguales",
        error: true,
      });
      return;
    }

    if (password.lenght < 6) {
      setAlerta({
        msg: "El Password es muy corto, mínimo 6 caracteres",
        error: true,
      });
      return;
    }

    setAlerta({});

    // Crear usuario en la API
    try {
      const { data } = await axios.post("http://localhost:4000/api/usuarios", {
        nombre,
        email,
        password,
      });

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { msg } = alerta;

  return (
    <div>
      <div className="form">
        <h1 className="form-title">Registrarse</h1>
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <label className="LoginTxt">
            Nombre
            <input
              type="text"
              name="fullName"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </label>

          <label className="LoginTxt">
            E-mail
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="LoginTxt">
            Contraseña
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
          </label>
          <label className="LoginTxt">
            Confirmar contraseña
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={repetirPassword}
                onChange={(e) => setRepetirPassword(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <span>&#128065;</span> : <span>&#128064;</span>}
              </button>
            </div>
          </label>
          <div className="registerBtn">
            <button type="submit" className="blue-button">
              Registrarse
            </button>
          </div>
        </form>
        <div id="btnContenedorSign">
          <Link
            to="/olvide-password"
          >
            Olvide Mi Password
          </Link>
          <Link
            id="yTC"
            to="/InicioSesion"
          >
            ¿Ya tienes una Cuenta? Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
