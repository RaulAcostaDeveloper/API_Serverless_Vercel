const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors()); 

//Conexión con la base de datos //ERROR AQUÍ
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology:true });
//-----------Código de Prueba-------------
// app.get('*', (req,res) => {
//     res.send('Respuesta de Servidor')
// });
// module.exports = app;

//---Producción ------
//Indica las rutas
const ordenes = require('./rutas/Ordenes');
const alimentos = require('./rutas/Alimentos');

app.use('/api/ordenes', ordenes);
app.use('/api/alimentos', alimentos);

module.exports = app;
