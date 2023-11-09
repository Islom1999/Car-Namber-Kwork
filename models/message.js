const mongoose = require('mongoose')

const Messages = new mongoose.Schema(
    {
        name: {
            type: "string", 
            required: true, 
            trim:true
        },
        phone: {
            type: "string", 
            required: true, 
            trim:true, 
        },
        email: {
            type: "string", 
            required: true, 
            trim:true
        },
        message: {
            type: "string", 
            required: true,
            trim:true,
        },
    },
    {timestamps: true}
)

module.exports = mongoose.model('Messages', Messages)