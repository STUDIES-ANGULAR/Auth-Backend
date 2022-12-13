const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campo');

const router = Router();

//Crear un nuevo usuario
router.post('/new',[
    check('name','El nombre no puede ser vacio').not().isEmpty(),
    check('email', 'El email es no es valido').isEmail(),
    check('password', 'La contraseña no es valida').isLength({min: 6}),
    validarCampos
], crearUsuario );

//Login de usuario argumentos (path, [middleware], controlador)
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña no es valida').isLength({min: 6}),
    validarCampos
] , loginUsuario );

//Validar y revalidar token
router.get('/renew', revalidarToken);





module.exports = router;