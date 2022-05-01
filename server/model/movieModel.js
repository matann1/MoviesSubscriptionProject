const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new Schema({
    name: String,
    yearPremiered: Date,
    genres: [String],
    image: String,
    youtubeEmbed: String
})
module.exports = mongoose.model('movie', movieSchema);