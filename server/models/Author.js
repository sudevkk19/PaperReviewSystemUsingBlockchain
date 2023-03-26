const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema( {
    authid: {
        type: Number
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }


})

const AuthorModel = mongoose.model ("Authors", AuthorSchema)
module.exports = AuthorModel
