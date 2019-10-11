const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Pet = require('../models/Pet')
const Consulta = require('../models/Consulta')
const app = require('../app')


router.get('/pets/:user', (req, res) => {
    Pet.find({ owner: req.params.user })
        .then(pet => res.status(200).json({ pet }))
        .catch(err => {
            throw err
        })
})

router.get('/reservations/:date', (req, res) => {
    Consulta.find({date:req.params.date})
        .then(consulta => res.status(200).json({ consulta }))
        .catch(err => {
            throw err
        })
})

router.get('/createreservations', (req, res) => {

    console.log(req.query)
    let consulta=[
        {
            email:req.query.user,
            date: req.query.date,
            time: req.query.hour,
            pet: req.query.pet,
        }
    ]

    Consulta.create(consulta).then(()=>{
        res.status(200).json({ message: `Creada la cita para ${req.query.pet} correctamente`})
    })



    // Consulta.find({ date: req.params.date })
    //     .then(consulta => res.status(200).json({ consulta }))
    //     .catch(err => {
    //         throw err
    //     })
})








module.exports = router;