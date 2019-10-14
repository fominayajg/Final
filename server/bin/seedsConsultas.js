require('dotenv').config();
const mongoose = require("mongoose");
const Consulta = require("../models/Consulta");

const DBURL = "mongodb+srv://javi:javimolamazo@cluster0-c0evg.mongodb.net/test?retryWrites=true&w=majority";
mongoose.Promise = Promise;
console.log(DBURL)
mongoose
    .connect(DBURL)
    .then(() => {
        console.log(`Connected to Mongo on ${DBURL}`)
    }).catch(err => {
        console.error('Error connecting to mongo', err)
    });

    let consultas=[
        {
            email: "proyectofinalih@gmail.com",
            date:"2019-10-21",
            time:"18:00",
            pet: "Goku",
        },
        {
            email: "proyectofinalih@gmail.com",
            date: "2019-10-21",
            time: "17:00",
            pet: "Goku",
        }
        
    ]


Consulta.deleteMany()
    .then(() => {
        return Consulta.create(consultas)
    })
    .then(consultasCreated => {
        console.log(`${consultasCreated.length} pets created with the following id:`);
        console.log(consultasCreated.map(u => u._id));
    })
