const mongoose = require('mongoose');



const dbConnection = async() => {

    try{
        //conexion a la BD a través de mongoose 
        await mongoose.connect( process.env.BD_CNN);


        // await mongoose.connect( process.env.BD_CNN, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     useCreateIndex: true,
        // });

        console.log('DB Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar DB');
    }
}

module.exports = {
    dbConnection
}