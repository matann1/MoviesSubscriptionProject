const mongoose = require('mongoose');
const { Schema } = mongoose;

const memberSchema = new Schema({
    name: String,
    email: String,
    city: String
})
module.exports = mongoose.model('member', memberSchema);