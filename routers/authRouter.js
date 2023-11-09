const {Router} = require('express')

const {
    getLogin,
    userLogin,
    userLogout
} = require('../controls/authControls')

const router = Router()

router.get('/login', getLogin)
router.post('/login', userLogin)
router.post('/logout', userLogout)

router.get('/:id', redirect)
router.get('/:id1/:id2', redirect)
router.get('/:id1/:id2/:id3', redirect)

function redirect(req,res){
    try {
        res.redirect('/auth/login')
    } catch (error) {
        console.log(error);
    }
}

module.exports = router 









