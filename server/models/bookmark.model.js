const mongoose = require('mongoose');
const {Schema} = mongoose;

const bookmarkSchema = new Schema({
    user: String,
    title: String,
    subContent: String,
    mainContent: String,
    image: String,
    source: String,
    date: String
});

module.exports = mongoose.model('bookmark', bookmarkSchema);