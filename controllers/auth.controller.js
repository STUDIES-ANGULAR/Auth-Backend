const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async (req, res = response) => {

    const { name, email, password } = req.body;

    try{
        //Verificar el email
        const usuario = await Usuario.findOne({ email });

        if ( usuario ) {
            return  res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese email'
            })
        }    

        //Crear usuario con el modelo
        const dbUser = new Usuario( req.body );
        
        // Hashear la contraseña
            //generar numeros aleatorios como parte de la contraseña con (n) vueltas
        const salt =  bcrypt.genSaltSync(5);
        dbUser.password = bcrypt.hashSync( password, salt );

        //Generar el JWT
        console.log('dbUser');
        console.log(dbUser);
        const token = await generarJWT( dbUser.id, name );
      
        //Crear usuario de DB
        await dbUser.save();

        //Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name, 
            token
        });


    } catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });

    }


}


const loginUsuario = (req, res = response) => {

    const { email, password } = req.body;

    return res.json({
        ok: true,
        msg: 'Login usuario /'
    });
}


const revalidarToken = (req, res = response) => {
    return res.json({
        ok: true,
        msg: 'Renew'
    });
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}