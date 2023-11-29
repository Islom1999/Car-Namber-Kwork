const Region = require('../models/region')
const Number = require('../models/number')
const Message = require('../models/message')
const Header = require('../models/header')
const Content = require('../models/content')
const Link = require('../models/links')

const getHome = async(req, res) => {
    try {
        const total = await Number.countDocuments({ ...req.query });
		const limit = req.query.limit || 12;
		const page = req.query.page || 1;

		const number = await Number.find({ ...req.query })
			.sort({ createdAt: -1 })
			.skip(page * limit - limit)
			.limit(limit)
			.populate('region')
			.lean()

        const region = await Region.find().lean()
        const header = await Header.findOne().lean()
        const content = await Content.find().lean()
        const link = await Link.findOne().lean()

        if(content[0]){
            content.forEach((contentItem, index) =>{
                if(index % 2  == 0){
                    contentItem.isLeft = true
                }
            })
        }

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
            number,
            header,
            content,
            link
        })
    } catch (error) {
        console.log(error)
    }
}

const sendMessage = async(req, res) => {
    try {
        await Message.create(req.body)

        res.redirect('/')
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getHome,
    sendMessage
}