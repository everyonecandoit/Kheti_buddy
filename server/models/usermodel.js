const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        requied:true,
    },
    email:{
        type:String,
        requied:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"Visitor"
    }

});

const UserModel = mongoose.model('User',UserSchema);
module.exports = UserModel;