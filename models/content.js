const mongoose = require('mongoose')

const Contents = new mongoose.Schema(
    {
        image: {
            type: "string", 
            required: true, 
            trim:true
        },
        title: {
            type: "string", 
            required: true, 
            trim:true, 
        },
        description: {
            type: "string", 
            required: true, 
            trim:true
        },
    },
    {timestamps: true}
)

module.exports = mongoose.model('Contents', Contents)