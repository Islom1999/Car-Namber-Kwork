const mongoose = require('mongoose')

const Links = new mongoose.Schema(
    {
        phone: {
            type: "string", 
            required: true, 
            trim:true
        },
        watsapp: {
            type: "string", 
            required: true, 
            trim:true, 
        },
        telegram: {
            type: "string", 
            required: true, 
            trim:true
        },
    },
    {timestamps: true}
)

module.exports = mongoose.model('Links', Links)