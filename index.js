const express = require( 'express');
const cors = require('cors');

const path = require('path');

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

//Manejar demas rutas
app.get( '*', ( req, res ) => { //_dirname es el path donde esta desplegado nuestro servidor
    res.sendFile( path.resolve( __dirname, 'public/index.html' ) );
})


app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});