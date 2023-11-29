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

const getNumbers = async (req, res) => {
	try {
		// const total = await Number.countDocuments();
		const limit = req.query.limit || 12;
		const page = req.query.page || 1;

        const {letter1, letter2, letter3, number1, number2, number3, region, regionNumber} = req.query

        const queryFilter = {}
        

        if (region && region !== 'All'){
            const regionByName = await Region.findOne({name: region})
            if(regionByName){
                queryFilter.region = regionByName._id;
            }
        }

        if (letter1 && letter1 !== '*') queryFilter.letter1 = letter1;
        if (letter2 && letter2 !== '*') queryFilter.letter2 = letter2;
        if (letter3 && letter3 !== '*') queryFilter.letter3 = letter3;
        if (number1 && number1 !== '*') queryFilter.number1 = number1;
        if (number2 && number2 !== '*') queryFilter.number2 = number2;
        if (number3 && number3 !== '*') queryFilter.number3 = number3;
        if (regionNumber && regionNumber !== '*') queryFilter.regionNumber = regionNumber;

		const number = await Number.find({...queryFilter})
			.sort({ createdAt: -1 })
			.skip(page * limit - limit)
			.limit(limit)
			.populate('region')
			.lean()

        if(!number[0]){
            return res.status(404).json({message: "Numbers is not defined"})
        }

        return res.status(200).json(number)
	} catch (error) {
		console.log(error)  
	} 
}

module.exports = {
    getRegion,
    getRegionById,
    getRegionByIdNumbers,

    getNumbers
}