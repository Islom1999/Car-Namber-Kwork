const {Router} = require('express')

const {
    getNumbers,
    createNumbers,
    updateNumbers,
    deleteNumbers,

    getRegion,
    createRegion,
    updateRegion,
    deleteRegion,

} = require('../controls/adminControls')

const router = Router()

router.get('/numbers', getNumbers)
router.post('/numbers', createNumbers)
router.post('/numbers/update/:id', updateNumbers)
router.post('/numbers/delete/:id', deleteNumbers)

router.get('/region', getRegion)
router.post('/region', createRegion)
router.post('/region/update/:id', updateRegion)
router.post('/region/delete/:id', deleteRegion)

module.exports = router









