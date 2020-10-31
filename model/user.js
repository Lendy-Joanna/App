var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    
  username:{
        type: String,
        required: true,
       unique: 1,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: 1,
        trim: true
    },
   
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    edad:{
        type: Number,
        required: true,
       
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    
    Tipocuenta:{
        type: Number,
        required: true,
    
    }

   }
);

module.exports = mongoose.model('User', userSchema);