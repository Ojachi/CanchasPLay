import generarId from "../helpers/generarId.js";
import Usuario from "../model/Usuario.js";
import generarJWT from "../helpers/generarJWT.js";

const registrar = async (req, res) => {
  const { email } = req.body;

  const existeUsuario = await Usuario.findOne({ email });

  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const usuario = new Usuario(req.body);
    usuario.token = generarId();
    await usuario.save();
    res.json({
      msg: "Usuario Creado Correctamente, Revisa tu Email para confirmar tu cuenta",
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({ msg: error.message });
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  //si el usuario existe
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("Usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  //comprobar el password
  if (await usuario.comprobarPassword(password)) {
    return res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      esAdmin: usuario.esAdmin,
      msg: "Iniciado sesion correctamente",
    });
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(402).json({ msg: error.message });
  }
};

const perfil = (req, res) => {
  const { usuario } = req;

  res.json(usuario);
};

//actualizar el usuario
const actualizar = async (req, res) => {
  const { email } = req.params;
  const usuario = await Usuario.findById(email);

  console.log(usuario);

  if (!usuario) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }
  if (usuario.cliente.toString() !== req.usuario.email.toString()) {
    const error = new Error("Accion no valida");
    return res.status(404).json({ msg: error.message });
  }

  usuario.password = req.body.password || usuario.password;
  usuario.email = req.body.email || usuario.email;

  try {
    const usuarioAlmacenado = await Usuario.save();
    res.json(usuarioAlmacenado);
    res.json({ msg: "Usuario actualizado correctamente" });
  } catch (error) {
    console.log(error); 
  }
};

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    console.log(error);
  }
};

export { registrar, autenticar, perfil, actualizar, obtenerUsuarios };
