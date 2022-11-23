require('dotenv').config()
require('./database').initialize()
const express = require('express')
const morgan = require('morgan')
const session = require('express-session')

const { userSanitizationsChecksAndValidation } = require('./user/UserSanitizers')
const UserController = require('./user/UserController')
const passport = require('./authentication/passport')

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

// HOME
app.get('/', (req, res) => res.render('home', { user: req.user }))

// USER - sign-up
const userController = new UserController()
app.get('/sign-up', (req, res) => res.render('user/sign-up-form', { errors: [] }))
app.post('/user', userSanitizationsChecksAndValidation, userController.createUser)

app.get('/login', (req, res) => res.render('user/log-in-form', { errors: [] }))
app.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/'
	})
)

// ### SERVER ###
app.listen(process.env.PORT, () => console.log(`app listening on port ${process.env.PORT}`))
