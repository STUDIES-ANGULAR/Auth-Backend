const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name ) => {

    const payload = { uid, name };

    //Usamos una promera ya que el sign no lo es y asi siempre retornamos el Token
    return new Promise( (resolve, reject) => {

        //Lo metemos dentro de la promesa para poder esperar que se resuelva
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        }, (err, token) => { 

            if (err) {
                console.log(err);
                reject( err );
            } else {
                //esto es lo que va a resolver el then cuando llamemos esta promesa
                resolve( token )
            }
            
        })

    });

}


module.exports = {
    generarJWT
}