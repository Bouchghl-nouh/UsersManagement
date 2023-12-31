const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const AuthSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
    }
});
module.exports = mongoose.model ('Post',AuthSchema)