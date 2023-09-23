const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    age: {
        type: Number,
    },
    phoneNumber: {
        type:Number
    },
    salary: {
        type:String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default:'user'
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    verified: {
        type: Boolean,
        default:false,
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default:null
    }
},{timestamps:true,versionKey:false});
module.exports = mongoose.model ('Add',UserSchema)