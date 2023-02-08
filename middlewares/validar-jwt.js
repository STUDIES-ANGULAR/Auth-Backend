const { response } = require("express");
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, netx) => {
    
    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg:'Error en el token'
        })
    }

    try {
        //mandamos la firma para verificar si el token fue firmado con esa misma llave
        //si el verify se resuelve bien regresesa un objeto que tiene payload 
        const { uid, name } = jwt.verify( token, process.env.SECRET_JWT_SEED );
        
        /*  al objeto pasar por referencia podemos agregarle data a la request en el meddleware
        y obtenerla en el controller */
        req.uid = uid;
        req.name = name;
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }
    //TODO OK!
    netx();
}

module.exports = {
    validarJWT
}
