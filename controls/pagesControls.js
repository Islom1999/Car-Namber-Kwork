const Region = require('../models/region')
const Number = require('../models/number')

const getHome = async(req, res) => {
    try {
        const total = await Number.countDocuments({ ...req.query });
		const limit = req.query.limit || 3;
		const page = req.query.page || 1;

		const number = await Number.find({ ...req.query })
			.sort({ createdAt: -1 })
			.skip(page * limit - limit)
			.limit(limit)
			.populate('region')
			.lean()

        const region = await Region.find().lean()

        const regionNumbers = []    
        if(region[0]){
            region.forEach(regionItem => {
                regionItem.numbers.forEach(number => {
                    regionNumbers.push(number)
                })
            })
        }

        res.render('home', {
            region,
            regionNumbers,
            number
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getHome
}