const mongoose = require('mongoose');
const { Schema } = mongoose;

const subscriptionSchema = new Schema({
    movieId: String,
    memberId: String,
    date: Date
})
module.exports = mongoose.model('subscription', subscriptionSchema);