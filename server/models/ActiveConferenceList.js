const mongoose = require('mongoose')

const ActiveConf = new mongoose.Schema({
    username: {
        type: String,
        required: true
    }
})

const ActiveConfModel = mongoose.model("ActiveConferenceList",ActiveConf)

module.exports = ActiveConfModel
