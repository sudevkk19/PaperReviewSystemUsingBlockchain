 const mongoose = require('mongoose')

const ReviewerSchema = new mongoose.Schema( {
    reviewerid : {
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
    },
    domains: [{
        type: String
    }],
    paperlist: [{
        type: Number
    }],
    paperhash:[{
        type: String
    }]

})

const ReviewerModel = mongoose.model ("Reviewers", ReviewerSchema)
module.exports = ReviewerModel
