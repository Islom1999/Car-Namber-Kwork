const Region = require('../models/region')
const Number = require('../models/number')

const getNumbers = async (req, res) => {
	try {
		const total = await Number.countDocuments({ ...req.query });
		const limit = req.query.limit || 20;
		const page = req.query.page || 1;

		const number = await Number.find({ ...req.query })
			.sort({ createdAt: -1 })
			.skip(page * limit - limit)
			.limit(limit)
			.populate('region')
			.lean()

		const region = await Region.find().lean()

		res.render('admin/numbers', {
			title: "Страница цифры",
			isAdmin: true,
			pagination: {
				page,
				limit,
				pageCount: Math.ceil(total / limit),
			},
			query: req.query,
			number,
			region,
		})
	} catch (error) {
		console.log(error)
	}
}

const getRegion = async (req, res) => {
	try {
		const region = await Region.find().lean()

		res.render('admin/region', {
			title: "Страница региона",
			isAdmin: true,
			region,
		})
	} catch (error) {
		console.log(error)
	}
}


// CRUD 
// Region
const createRegion = async (req, res) => {
	try {
		const { name, description, number } = req.body
		const obj = { name, description }

		if (number) {
			if (Array.isArray(number)) {
				obj.numbers = number.map(number => { return { number } })
			} else if (typeof number == 'string') {
				obj.numbers = [{ number }]
			}
		}

		await Region.create(obj)

		res.redirect('/admin/region')
	} catch (error) {
		console.log(error)
	}
}

const updateRegion = async (req, res) => {
	try {
		const { name, description, number } = req.body
		const obj = { name, description }

		if (number) {
			if (Array.isArray(number)) {
				obj.numbers = number.map(number => { return { number } })
			} else if (typeof number == 'string') {
				obj.numbers = [{ number }]
			}
		} else {
			obj.numbers = []
		}

		await Region.findByIdAndUpdate(req.params.id, obj)

		res.redirect('/admin/region')
	} catch (error) {
		console.log(error)
	}
}

const deleteRegion = async (req, res) => {
	try {
		await Region.findByIdAndDelete(req.params.id)

		res.redirect('/admin/region')
	} catch (error) {
		console.log(error)
	}
}

// numbers
const createNumbers = async (req, res) => {
	try {
		const image = '/upload/number-image/' + req.file.filename
		let {letter1,letter2,letter3} = req.body

		letter1 = letter1.toUpperCase()
		letter2 = letter2.toUpperCase()
		letter3 = letter3.toUpperCase()

		await Number.create({... req.body, image, letter1, letter2, letter3})

		res.redirect('/admin/numbers')
	} catch (error) {
		console.log(error)
	}
}

const updateNumbers = async (req, res) => {
	try {

		const number = await Number.findById(req.params.id)
		let image = number.image

		let {letter1,letter2,letter3} = req.body

		letter1 = letter1.toUpperCase()
		letter2 = letter2.toUpperCase()
		letter3 = letter3.toUpperCase()

		if(req.file?.filename){
			image = '/upload/number-image/' + req.file.filename
		}

		await Number.findByIdAndUpdate(req.params.id, {...req.body, image, letter1,letter2,letter3})

		res.redirect('/admin/numbers')
	} catch (error) {
		console.log(error)
	}
}

const deleteNumbers = async (req, res) => {
	try {
		await Number.findByIdAndDelete(req.params.id)

		res.redirect('/admin/numbers')
	} catch (error) {
		console.log(error)
	}
}




module.exports = {
	getNumbers,
	createNumbers,
	updateNumbers,
	deleteNumbers,

	getRegion,
	createRegion,
	updateRegion,
	deleteRegion,
}