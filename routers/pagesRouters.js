const {Router} = require('express')

const {
    getHome
} = require('../controls/pagesControls')

const router = Router()

router.get('/', getHome)

module.exports = router









