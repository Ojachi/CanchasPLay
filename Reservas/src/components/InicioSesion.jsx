
import { Link } from 'react-router-dom'; 
import { useState } from 'react';


function InicioSesion(){
    const [formData, setFormData] = useState({
        fullName: '',
        password: '',
      });

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prevData => ({
    ...prevData,
    [name]: value
  }));
};

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(formData);
};

const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};

  return (
    <form className='form'>
      <h1>
        Inicio de Sesión
      </h1>
      <label className='LoginTxt'>Nombre</label>
      <input type="text" name='fullname'/>

      <label className='LoginTxt'>
            Contraseña
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
                {showPassword ? <span>&#128065;</span> : <span>&#128064;</span>}
              </button>
              </div>
          </label>
      <button type='submit' className='LoginBtn'>Iniciar Sesión</button> 
      <label className='TienesCuentaTxt'>¿No tienes cuenta?
      <Link to="/SignUp" className='SignupBtn'>Regístrate</Link>
      </label>
    </form>
  )

}
export default InicioSesion