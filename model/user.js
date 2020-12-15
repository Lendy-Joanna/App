var mongoose = require("mongoose");
var Schema = mongoose.Schema;
 
var userSchema = new Schema({
    nombre: {
        type: String,
        required: true,   
    },
    apellidos: {
        type: String,
        required: true,        
    },
    email: {
        type: String,
        required: true,        
    },
    numero: {
        type: String,
        required: true,        
    },
    mensaje: {
        type: String,
        required: true,        
    }   
});
module.exports = mongoose.model('User', userSchema);