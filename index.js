const express = require( 'express');

//crear el servidor/aplicacion de express

const app = express();


// GET
app.get('/', ( req, res ) => {
    res.status(200).json({
        ok: true,
        msg: 'todo salio bien'
    })
});


app.listen( 4000, () => {
    console.log(`Servidor corriendo en puerto ${ 4000 }`);
});