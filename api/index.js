//mongodb+srv://AngelRaulAcostaRojas:Dd.-3976880@cluster0.hysjg.mongodb.net/almuerzi-db?retryWrites=true&w=majority
//mongodb+srv://AngelRaulAcostaRojas:<password>@cluster0.hysjg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//mongodb+srv://AngelRaulAcostaRojas:Dd.-3976880@cluster0.hysjg.mongodb.net/Cluster0?retryWrites=true&w=majority
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors()); 

//Conexión con la base de datos //ERROR AQUÍ
    mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology:true});

//---Producción ------
//Indica las rutas
    const ordenes = require('./rutas/Ordenes');
    const alimentos = require('./rutas/Alimentos');

    app.use('/api/ordenes', ordenes);
    app.use('/api/alimentos', alimentos);

    module.exports = app;

//-----------Prueba1-------------
app.get('*', (req,res) => {
    res.send('Respuesta de Servidor')
})

//-------------Prueba2---------------
// module.exports=(req,res)=>{
//     res.send('Prueba Api express, mongoose, bodyParser, cors, app, app.use(bodyParser.json()); app.use(cors()); \n try {mongoose.connect} catch (error) {    module.exports=(req,res)=>{ res.send(Error con la BD) }')
// }