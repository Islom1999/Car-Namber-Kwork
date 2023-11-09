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

const getRegionByIdNumbers = async(req, res) => {
    try {
        let numbers = []
        if(req.params.id == 'all'){
            numbers = []
            const region = await Region.find().lean()
            if(!region){
                return res.status(404).json({ message: "Region not found"})
            }
            
            region.forEach(regionItem => {
                regionItem.numbers.forEach(number => {
                    numbers.push(number)
                })
            })
            
        }else{
            const region = await Region.findById(req.params.id).lean()
            if(!region){
                return res.status(404).json({ message: "Region not found"})
            }
            numbers = region.numbers
        }

        
        return res.json(numbers)

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getRegion,
    getRegionById,
    getRegionByIdNumbers
}