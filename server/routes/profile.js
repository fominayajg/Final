const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Pet = require('../models/Pet')
const app = require('../app')


router.get('/:user', (req, res) => {
    Pet.find({ owner: req.params.user })
        .then(pet => res.status(200).json({ pet }))
        .catch(err => {
            throw err
        })
})







module.exports = router;