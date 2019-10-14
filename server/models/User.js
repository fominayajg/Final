const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  
    username: String,
    password: String,
    googleId: String,
    email:String,
    role:{
      type:String,
      enum:["USER","VET"],
      default:"USER"
    },
    pets:[]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;