const Region = require('../models/region')
const Number = require('../models/number')

const getHome = async(req, res) => {
    try {
        const region = await Region.find().lean()

        const numbers = []    
        if(region[0]){
            region.forEach(regionItem => {
                regionItem.numbers.forEach(number => {
                    numbers.push(number)
                })
            })
        }

        res.render('home', {
            region,
            numbers
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getHome
}