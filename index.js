const express = require( 'express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config(); //para que tome la configuracion de .env al cargar


//crear el servidor/aplicacion de express
const app = express();

//Conexión a Base de Datos
dbConnection()

//Directorio Público
app.use( express.static('public') ); //public es el nombre de la carpeta donde estara alojado el front

//app.use( Middleware() )
//CORS
app.use( cors() );

// lectura y parseo del body
app.use( express.json() );


// Rutas 
app.use( '/api/auth', require('./routes/auth.routes') ); //midelware de express, funcion que se ejecuta cuando el interprete pase evaluando las linea de código



app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});