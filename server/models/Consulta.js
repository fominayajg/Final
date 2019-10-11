const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const consultaSchema = new Schema({

    email: String,
    date: String,
    time:String,
    pet:String,

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Consulta = mongoose.model('Consulta', consultaSchema);
module.exports = Consulta;