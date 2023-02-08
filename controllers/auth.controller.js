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
            //salt(forma aleatoria de crear numeros) generar numeros aleatorios como parte de la contraseña con (n) vueltas
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
            email,
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


const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

   try {

       const dbUser = await Usuario.findOne({ email });

       if( !dbUser ){
           return res.status(400).json({
                ok: false,
                msg: 'El correo no existe '
           });
       }

       // confirmar si el password hace match
       const validPassword = bcrypt.compareSync( password, dbUser.password )

       if( !validPassword ){
           return res.status(400).json({
                ok: false,
                msg: 'El password no es válido'
           });
       }

       //Generar el JWT 
       const token = await generarJWT( dbUser.id, dbUser.name);

       //Respuesta del servicio (por defecto status es 200)
       return res.json({
           ok: true,
           uid: dbUser.id,
           email,
           name: dbUser.name, 
           token
       })

   } catch(error){
       console.log(error);
       return res.status(500).json({
           ok: false,
           msg: 'Hable con el administrador'
       })
   }
 
}


const revalidarToken = async (req, res = response) => {

    // uid  y name fueron insertados a la request en el middleware validar-jwt
    const { uid, name } = req;
    try {
        
        //Leer base de datos 
        const dbUser = await Usuario.findById(uid);
        console.log('dbUser', uid);

        if (!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'Sesión no permitida'
            });
        }

        //Generar el JWT 
        const token = await generarJWT(uid, dbUser.name);

        return res.json({
            ok: true,
            uid,
            name,
            // name: dbUser.name, //otra opción
            token,
            email: dbUser.email

        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}