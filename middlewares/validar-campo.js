const { response } = require("express");
const { validationResult } = require("express-validator");



const validarCampos = ( req, res = response, next) => {
    
    // validationResult captura los errores que arroja la peticion
    const error = validationResult( req );
    console.log(error);
    
    if(!error.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: error.mapped()
        });
    }
    //se ejecuta cuando no tenemos errores y asi permitir el flujo normal del endpoint
    next();
}


module.exports = {
    validarCampos
}
