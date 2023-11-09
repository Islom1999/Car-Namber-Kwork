const mongoose = require('mongoose')

const Users = new mongoose.Schema(
    {
        fullname: {
            type: "string", 
            required: true, 
            trim:true
        },
        username:{
            type: "string", 
            required: true,
            unique: true,
        },
        phone:{
            type: "string", 
            required: false,
        },
        password: {
            type: "string", 
            required: true,
        },     
    },
    {timestamps: true}
)

module.exports = mongoose.model('Users', Users)