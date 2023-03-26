const mongoose = require('mongoose')

const ConferenceListSchema = new mongoose.Schema ({
    name: {
        type: String
    },
    confid: {
        type: Number
    },
    domains: [{
        type: String
    }],
    phase : {
        type: Number
    },
    PaperList: [{
        type: Number
    }],
    ReviewerList: [{
        type: Number
    }]
})

const ConferenceList = mongoose.model("ConferenceList", ConferenceListSchema)

module.exports = ConferenceList
