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


})

router.get('/search/:mail',(req,res)=>{
    Pet.find({ owner: { "$regex": req.params.mail, "$options": "i" }})
    .then(pets=>res.status(200).json({pets}))
})
router.get('/updatepet', (req, res) => {
    let upData = { sex: req.query.sex, age: req.query.age, castrated: req.query.castrated, race: req.query.race}
    let filter = { owner: req.query.email, name: req.query.name }
    let update ={data:upData}
    Pet.findOneAndUpdate(filter, update, {
        new: true,        
    })
        .then(pet => res.status(200).json({ pet }))
})







module.exports = router;