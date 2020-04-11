const mongoose = require('mongoose');

const initClient = () => {
    return new Promise( (resolve, reject) => {
        mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true,useUnifiedTopology: true})
        .then( db => resolve( { db: db, url: process.env.MONGO_URL } ))
        .catch( error => reject(`MongoDB not connected`, error) )
    })
}

module.exports = {initClient};