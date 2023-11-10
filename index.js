const express = require('express')
const path = require('path')
const {engine} = require('express-handlebars')
require('dotenv').config()
//  REQUIRE DB function
const configDB = require('./configDB/config')
// session registry
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
// helpers
const helpers = require('./utils/hbsHelpers')
const Handlebars = require('handlebars')
const cors = require('cors');

// server configuration
const server = express()

server.use(cors()); 
// DB configuration
configDB()
 
// JSON configuration
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

// HBS configuration
server.engine('.hbs', engine({extname: '.hbs'}))
server.set('view engine', '.hbs')

// session configuration
const store = new MongoStore({ 
    collection: 'sessions',
    uri: process.env.MONGO_URI
})  
server.use(session({
    secret: process.env.SECTION_SECRET,
    resave: false, 
    saveUninitialized: false,
    store
})) 

// STATIC FILES configuration
server.use(express.static( path.join(__dirname, 'public') ))

//Register handlebars helpers
helpers(Handlebars) 

// Router configuration
server.use('/auth', require('./routers/authRouter'))
server.use('/api', require('./routers/apiRouters'))
server.use('/admin', require('./middleware/auth').authProtected, require('./routers/adminRouters'))
server.use('/', require('./routers/pagesRouters'))

server.get('/:id', redirect)
server.get('/:id1/:id2', redirect)
server.get('/:id1/:id2/:id3', redirect)

function redirect(req,res){
    try {
        res.redirect('/')
    } catch (error) {
        console.log(error);
    }
}

// SERVER LISTENING configuration
const PORT = process.env.PORT || 5000
server.listen(PORT, (err) => { 
    if (err) {
        console.log(err)
    } else {
        console.log(`Server is running on port ${PORT}`)
    }
})





