const express = require( 'express');

//crear el servidor/aplicacion de express
const app = express();


// Rutas 
app.use( '/api/auth', require('./routes/auth.routes') ); //midelware de express, funcion que se ejecuta cuando el interprete pase evaluando las linea de código



app.listen( 4000, () => {
    console.log(`Servidor corriendo en puerto ${ 4000 }`);
});