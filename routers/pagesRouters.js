const {Router} = require('express')

const {
    getHome,
    sendMessage
} = require('../controls/pagesControls')

const router = Router()

router.get('/', getHome)
router.post('/send/message', sendMessage)

router.get(':id', redirect)
router.get(':id1/:id2', redirect)
router.get(':id1/:id2/:id3', redirect)

function redirect(req,res){
    try {
        res.redirect('/')
    } catch (error) {
        console.log(error);
    }
}


module.exports = router









