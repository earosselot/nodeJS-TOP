require('dotenv').config()
require('./database').initialize()
const express = require('express')
const morgan = require('morgan')
const session = require('express-session')

const passport = require('./authentication/passport')
const messageRouter = require('./message/messageRouter')
const userRouter = require('./user/userRouter')

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

// VIEWS ENGINE
app.set('views', __dirname)
app.set('view engine', 'pug')

// PASSPORT JS
app.use(session({ secret: 'session-secret', resave: false, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

// ROUTES
app.get('/', (req, res) => res.redirect('/message'))
app.use('/message', messageRouter)
app.use('/user', userRouter)

// todo: catch errors

// ### SERVER ###
app.listen(process.env.PORT, () => console.log(`app listening on port ${process.env.PORT}`))
