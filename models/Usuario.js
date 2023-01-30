const { Schema, model } = require('mongoose')


const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

//mongoose se encarga de ponerles la s de plurar a las tablas (Usuario)
module.exports = model('Usuario', UsuarioSchema); 