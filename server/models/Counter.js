const mongoose = require('mongoose')

const CounterSchema = new mongoose.Schema ({
    ConfID : {
        type:Number
    },
    AuthID : {
        type: Number
    },
    RevID: {
        type: Number
    },
    PaperID: {
        type: Number
    }
})

const Counter = mongoose.model("Counter", CounterSchema)

module.exports = Counter
