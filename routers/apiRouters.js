const {Router} = require('express')

const {
    getRegion,
    getRegionById,
} = require('../controls/apiControls')

const router = Router()

router.get('/region', getRegion)
router.get('/region/:id', getRegionById)

module.exports = router









