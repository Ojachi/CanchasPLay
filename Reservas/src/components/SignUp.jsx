import { useState } from 'react';

function SignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    <div>
      <div className="form">
        <h1 className="form-title">Registrarse</h1>
        <form onSubmit={handleSubmit}>
          <label className='LoginTxt'>
            Nombre
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
          </label>

          <label className='LoginTxt'>
            E-mail
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
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
          <label className='LoginTxt'>
            Confirmar contraseña
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
                {showPassword ? <span>&#128065;</span> : <span>&#128064;</span>}
              </button>
            </div>
   
          </label>
          <div className="registerBtn">
            <button type="submit" className="blue-button">Registrarse</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
