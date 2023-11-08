const Region = require('../models/region')
const Number = require('../models/number')

const getRegion = async(req, res) => {
    try {
        const region = await Region.find().lean()
        if(!region[0]){
            return res.status(404).json({ message: "Region not found"})
        }
        
        return res.json(region)

    } catch (error) {
        console.log(error)
    }
}
const getRegionById = async(req, res) => {
    try {
        const region = await Region.findById(req.params.id).lean()
        if(!region){
            return res.status(404).json({ message: "Region not found"})
        }
        
        return res.json(region)

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getRegion,
    getRegionById
}