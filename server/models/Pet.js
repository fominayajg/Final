const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema({
    name: String,
    data:{
        type:Object,
        sex:{
            type:String,
            enum:['M','F'],
        },
        age:{
            type:String
        },

        castrated:{
            type:String,
            enum:['YES','NO']
        },
        race:{
            type:String
        }
    },
    type: {
        type: String,
        enum: ['DOG', 'CAT', 'EXOTIC'],
    },
    weight:[],
    owner:{
        type:String,
    },
    thread:[]

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;