const express = require('express');
const router = express.Router();
//Importa el modelo de la BD
const alimentos = require('../modelosBD/Alimentos');

//Toda la lista
router.get('/', (req, res) => {
    // res.send('Ordenes API');

    alimentos.find()
    .exec()
    .then(data => res.status(200).send(data) )
});

//Un solo elemento
router.get('/:id', (req, res) => {
    alimentos.findById(req.params.id)
    .exec()
    .then(data => res.status(200).send(data) );
});

router.post('/', (req,res) => {
    alimentos.create(req.body).then(data => res.status(201).send(data))
});

router.put('/:id', (req,res) => {
    alimentos.findOneAndUpdate(req.params.id, req.body) //Body es lo nuevo a reemplazar
    .then( ()=> res.sendStatus(204))
});

router.delete('/:id', (req,res) => {
    alimentos.findOneAndDelete(req.params.id).exec().then( ()=> res.sendStatus(204))
});

module.exports = router;