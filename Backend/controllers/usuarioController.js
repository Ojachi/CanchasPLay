import generarId from "../helpers/generarId.js";
import Usuario from "../model/Usuario.js";
import generarJWT from "../helpers/generarJWT.js";


const registrar = async (req, res) => {
    const { email } = req.body;

    const existeUsuario = await Usuario.findOne({ email });

    if (existeUsuario){
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({ msg: error.message});
    }

    try {
        const usuario = new Usuario(req.body);
        usuario.token = generarId();
        await usuario.save();
        res.json({msg: 'Usuario Creado Correctamente, Revisa tu Email para confirmar tu cuenta'});
    } catch (error) {
        
        console.log(error);
        
        res.status(400).json({ msg: error.message});
    }
};

const autenticar = async (req, res) => {
    const { email, password } = req.body;

    //si el usuario existe
    const usuario = await Usuario.findOne({email});
    if (!usuario){
        const error = new Error("Usuario no existe");
        return res.status(404).json({msg: error.message});
    };
    

    //comprobar el password
    if (await usuario.comprobarPassword(password)){
        return res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            esAdmin: usuario.esAdmin,
            msg: 'Iniciado sesion correctamente',
        });

    }else {
        const error = new Error("El password es incorrecto");
        return res.status(402).json({msg: error.message});
    };

};

// const confirmar = async (req,res) => {
//     const { token } = req.params;
//     const usuarioConfirmar = await Usuario.findOne({ token });
//     if (!usuarioConfirmar){
//         const error = new Error("token no valido");
//         return res.status(402).json({msg: error.message});
//     };
//     try {
//         usuarioConfirmar.confirmado = true;
//         usuarioConfirmar.token=""
//         await usuarioConfirmar.save();
//         res.json({msg: "Usuario Confirmado correctamente"});

//     }catch (error) {
//         console.log(error);
//     }
// };

// const olvidePassword = async(rq, res) => {
//     const {email} = req.body;
//     const usuario = await Usuario.findOne({email});
//     if (!usuario){
//         const error = new Error("Usuario no existe");
//         return res.status(404).json({msg: error.message});
//     };
//     try {
//         usuario.token = generarId();
//         await usuario.save();
//         res.json({msg: "Hemos enviado un email con las instrucciones "});
//     } catch (error) {
//         console.log(error);
//     };
// };

// const comprobarToken = async (req, res) => {
//     const { token } = req.params;
//     const tokenValido = await Usuario.findOne({ token });
//     if (tokenValido){
//         res.json({msg: "Token valido y el usuario existe"});
//     }else{
//         const error = new Error("token no valido");
//         return res.status(404).json({msg: error.message});
//     }
// };

// const nuevoPassword = async (req, res) => {
//     const { token } = req.params;
//     const { password } = req.body;

//     const usuario = await Usuario.findOne({ token });
    
//     if (usuario){
//         usuario.password = password;
//         usuario.token = "";
//         try {
//             await usuario.save();
//             res.json({msg: "Password actualizado correctamente"});
//         } catch (error) {
//             console.log(error);
//         }
//     }else{
//         const error = new Error("token no valido");
//         return res.status(404).json({msg: error.message});
//     }
// };

const perfil = (req, res) => {
    const { usuario } = req;
        
    res.json(usuario);
};


//actualizar el usuario //hay que adaptarlo
const actualizar = async (req, res) => {
    const { email } = req.params;
    const usuario = await Usuario.findById(email);

    console.log(usuario);

    if (!usuario) {
        const error = new Error("No encontrado");
        return res.status(404).json({msg: "Accion no valida"});
    };
    if (usuario.cliente.toString() !== req.usuario.email.toString()) {
        const error = new Error("Accion no valida");
        return res.status(404).json({msg: error.message});   
    };

    usuario.password = req.body.password || usuario.password;
    usuario.email = req.body.email || usuario.email;

    try {
        const usuarioAlmacenado = await Usuario.save();
        res.json(usuarioAlmacenado);
        res.json({msg: "Usuario actualizado correctamente"});
    } catch (error) {
        console.log(error);
    }
};


export { registrar, autenticar, perfil, actualizar };
