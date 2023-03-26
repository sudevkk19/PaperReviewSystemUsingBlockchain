const mongoose = require('mongoose')
const JournalSchema = new mongoose.Schema({
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

const JournalModel = mongoose.model("journals", JournalSchema)

module.exports = JournalModel
