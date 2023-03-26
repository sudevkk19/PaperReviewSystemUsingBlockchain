const mongoose = require('mongoose')

const Pap = new mongoose.Schema({
    PaperId: {
        type: Number
    },
    AuthorID: {
        type: Number,
        required: true  
    },
    Name: {
        type: String
    },
    ConfID: {
        type: Number
    },
    Hash: {
        type: String,
        required: true
    },
    Domains: [{
        type: String
    }],
    ReviewerIndex:[{
        type: Number
    }],
    ReviewerScore:[{
        type: Number
    }],
    ReviewHash:[{
        type: String
    }],
    Status: {
        type: String
    },
    Result: {
        type: String
    }
})

const Papers = mongoose.model("Papers",Pap)

module.exports = Papers