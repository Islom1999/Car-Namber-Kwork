
const authProtected = (req, res, next) => {
    try {
        if(req.session){
            if(req.session.isLogin){
                next()
            }else{
                res.redirect('/')
            }
        }else{
            res.redirect('/')
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {authProtected}