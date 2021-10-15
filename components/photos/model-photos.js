const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema =  new Schema({
    lat:{
        type: String,
    },
    lon:{
        type: String, 
    },
    image:{
        type: String
    },
    age:{
        type: String
    },
    gender:{
        type: String
    },
    genProb:{
        type: String
    },
    emotion:{
        type: String
    },
    emotionProb:{
        type: String
    },
    place: {
        type: String
    },
    index: {
        type: String
    },
});

const model = mongoose.model('Photo',mySchema);
module.exports = model;