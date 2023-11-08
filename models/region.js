const mongoose = require('mongoose')

const Regions = new mongoose.Schema(
    {
        name: {
            type: "string", 
            required: true, 
            trim:true,
            unique: true,
        },
        numbers: [
            {
                number: {
                    type: "string", 
                    required: false, 
                    trim:true, 
                    unique: true
                }
            }
        ],
        description: {
            type: "string", 
            required: false, 
            trim:true
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model('Regions', Regions)