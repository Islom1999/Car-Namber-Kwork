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

    getMessage,
    deleteMessage,

    getSetting,
    updateHeader,
    updateLink,
    createContent,
    updateContent,
    deleteContent,

    getAdmin,
    createAdmin,
    deleteAdmin,
    updateAdmin,
} = require('../controls/adminControls')

const upload = require('../utils/fileUpload')

const router = Router()

router.get('/', getAdmin)
router.post('/create', createAdmin)
router.post('/delete/:id', deleteAdmin)
router.post('/update/:id', updateAdmin)

router.get('/numbers', getNumbers)
router.post('/numbers', upload.single('image'), createNumbers)
router.post('/numbers/update/:id', upload.single('image'), updateNumbers)
router.post('/numbers/delete/:id', deleteNumbers)

router.get('/region', getRegion)
router.post('/region', createRegion)
router.post('/region/update/:id', updateRegion)
router.post('/region/delete/:id', deleteRegion)

router.get('/message', getMessage)
router.post('/message/delete/:id', deleteMessage)

// settings
router.get('/setting', getSetting)

router.post('/setting/update/header', upload.single('image'), updateHeader)
router.post('/setting/update/link', updateLink)

router.post('/setting/create/content', upload.single('image'), createContent)
router.post('/setting/update/content/:id', upload.single('image'), updateContent)
router.post('/setting/delete/content/:id', deleteContent)

router.get('/:id', redirect)
router.get('/:id1/:id2', redirect)
router.get('/:id1/:id2/:id3', redirect)

function redirect(req,res){
    try {
        console.log(req.path);
    } catch (error) {
        console.log(error);
    }
}

module.exports = router









