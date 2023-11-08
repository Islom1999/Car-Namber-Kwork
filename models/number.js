const mongoose = require('mongoose')

const Numbers = new mongoose.Schema(
    {
        letter1: {
            type: "string", 
            required: true, 
            trim:true,
        },
        letter2: {
            type: "string", 
            required: true, 
            trim:true,
        },
        letter3: {
            type: "string", 
            required: true, 
            trim:true,
        },
        number1: {
            type: "number", 
            required: true, 
            trim:true,
        },
        number2: {
            type: "number", 
            required: true, 
            trim:true,
        },
        number3: {
            type: "number", 
            required: true, 
            trim:true,
        },
        regionNumber: {
            type: "string", 
            required: true, 
            trim:true, 
        },
        region: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Regions'
        },
        amount: {
            type: "number", 
            required: true, 
        },
        description: {
            type: "string", 
            required: false, 
            trim:true
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model('Numbers', Numbers)