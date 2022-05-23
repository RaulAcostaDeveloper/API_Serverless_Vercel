const express = require('express');
const router = express.Router();
//Importa el modelo de la BD
const ordenes = require('../modelosBD/Ordenes');

//Toda la lista
router.get('/', (req, res) => {
    // res.send('Ordenes API');

    ordenes.find()
    .exec()
    .then(data => res.status(200).send(data) )
});

//Un solo elemento
router.get('/:id', (req, res) => {
    ordenes.findById(req.params.id)
    .exec()
    .then(data => res.status(200).send(data) );
});

router.post('/', (req,res) => {
    ordenes.create(req.body).then(data => res.status(201).send(data))
});

router.put('/:id', (req,res) => {
    ordenes.findOneAndUpdate(req.params.id, req.body) //Body es lo nuevo a reemplazar
    .then( ()=> res.sendStatus(204))
});

router.delete('/:id', (req,res) => {
    ordenes.findOneAndDelete(req.params.id).exec().then( ()=> res.sendStatus(204))
});

module.exports = router;