const mongoose = require('mongoose');
const { Schema } = mongoose;

const usersSchema = new Schema({
    fullName: String,
    username: String,
    password: String,
    permission: Boolean
})
module.exports = mongoose.model('users', usersSchema);