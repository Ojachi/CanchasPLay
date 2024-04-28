import  express  from "express";

import { registrar, autenticar, confirmar, olvidePassword,comprobarToken, nuevoPassword,perfil, actualizar,} from "../controllers/usuarioController.js"

//import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

//Autenticacion, registro y confirmacion de usuario
router.post('/', registrar); //crea un nuevo usuario
router.post('/login', autenticar);
router.get('/confirmar/:token', confirmar);
router.post('/olvide-password', olvidePassword);
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);
router.put('/perfil/actualizar', actualizar);
router.get('/perfil', perfil); 

export default router;