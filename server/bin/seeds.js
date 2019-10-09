
require('dotenv').config();
const mongoose = require("mongoose");
const Pet = require("../models/Pet");

const DBURL = "mongodb://localhost:27017/vet";
mongoose.Promise = Promise;
console.log(DBURL)
mongoose
    .connect(DBURL)
    .then(() => {
        console.log(`Connected to Mongo on ${DBURL}`)
    }).catch(err => {
        console.error('Error connecting to mongo', err)
    });
    
let pets = [
    {
        name:"Goku",
        type:"DOG",
        data:{
            sex:'M',
            age:'4 Years',
            castrated:'Yes',
            race:'Mix'
        },
        weight:[
          
            {
                weight:38.8,
                date: "07-07-2019"
            },
            {
                weight: 42,
                date: "07-09-2019"
            },
            {
                weight: 45.5,
                date: "18-09-2019"
            },
            {
                weight: 36.3,
                date: "23-09-2019"
            },
            {
                weight: 40,
                date: "28-09-2019"
            },
        ],
        owner:"proyectofinalih@gmail.com",
        thread:[
            {
                title:"vomitos",
                consulta1:{
                    date: "07-09-2019",
                    esp:"general",
                    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu quam cursus, scelerisque urna sed, convallis diam. Nam quis volutpat elit, vitae sagittis tortor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam dolor ligula, volutpat fringilla dapibus in, ultricies sit amet erat. In sed tellus fringilla, euismod orci nec, placerat turpis. Aenean in sagittis dolor. Mauris vehicula justo nulla, a tempus ligula hendrerit at. Nulla commodo mauris sed nisi cursus volutpat. ",
                    indications:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu quam cursus, scelerisque urna sed, convallis diam. Nam quis volutpat elit, vitae sagittis tortor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam dolor ligula, volutpat fringilla dapibus in, ultricies sit amet erat. In sed tellus fringilla, euismod orci nec, placerat turpis. Aenean in sagittis dolor. Mauris vehicula justo nulla, a tempus ligula hendrerit at. Nulla commodo mauris sed nisi cursus volutpat."
                },
            },
        ],
    },
    {
        name: "Gato",
        type: "CAT",
        data: {
            sex: 'F',
            age: '2 Years',
            castrated: 'No',
            race: 'Mix'
        },
        weight: [
            {
                weight: 20,
                date: "07-07-2019"
            },
            {
                weight: 22,
                date: "07-09-2019"
            },
            {
                weight: 18,
                date: "18-09-2019"
            },
            {
                weight: 19,
                date: "23-09-2019"
            },
            {
                weight: 16,
                date: "28-09-2019"
            },
        ],
        owner: "proyectofinalih@gmail.com",
        thread: [
            {
                title: "vomitos",
                consulta1:{
                    date: "07-09-2019",
                    esp: "general",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu quam cursus, scelerisque urna sed, convallis diam. Nam quis volutpat elit, vitae sagittis tortor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam dolor ligula, volutpat fringilla dapibus in, ultricies sit amet erat. In sed tellus fringilla, euismod orci nec, placerat turpis. Aenean in sagittis dolor. Mauris vehicula justo nulla, a tempus ligula hendrerit at. Nulla commodo mauris sed nisi cursus volutpat. ",
                    indications: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu quam cursus, scelerisque urna sed, convallis diam. Nam quis volutpat elit, vitae sagittis tortor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam dolor ligula, volutpat fringilla dapibus in, ultricies sit amet erat. In sed tellus fringilla, euismod orci nec, placerat turpis. Aenean in sagittis dolor. Mauris vehicula justo nulla, a tempus ligula hendrerit at. Nulla commodo mauris sed nisi cursus volutpat."
                },
                consulta2: {
                    date: "07-09-2019",
                    esp: "digestivo",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu quam cursus, scelerisque urna sed, convallis diam. Nam quis volutpat elit, vitae sagittis tortor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam dolor ligula, volutpat fringilla dapibus in, ultricies sit amet erat. In sed tellus fringilla, euismod orci nec, placerat turpis. Aenean in sagittis dolor. Mauris vehicula justo nulla, a tempus ligula hendrerit at. Nulla commodo mauris sed nisi cursus volutpat. ",
                    indications: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu quam cursus, scelerisque urna sed, convallis diam. Nam quis volutpat elit, vitae sagittis tortor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam dolor ligula, volutpat fringilla dapibus in, ultricies sit amet erat. In sed tellus fringilla, euismod orci nec, placerat turpis. Aenean in sagittis dolor. Mauris vehicula justo nulla, a tempus ligula hendrerit at. Nulla commodo mauris sed nisi cursus volutpat."
                },
            },
        ],
    }
]
Pet.deleteMany()
    .then(() => {
        return Pet.create(pets)
    })
    .then(petsCreated => {
        console.log(`${petsCreated.length} pets created with the following id:`);
        console.log(petsCreated.map(u => u._id));
    })
