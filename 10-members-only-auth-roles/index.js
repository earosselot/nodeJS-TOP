require('dotenv').config()
require('./database').initialize()
const express = require('express')
const morgan = require('morgan')

const { userSanitizationsChecksAndValidation } = require('./user/UserSanitizers')
const UserController = require('./user/UserController')

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

// VIEWS ENGINE
app.set('views', __dirname)
app.set('view engine', 'pug')

// HOME
app.get('/', (req, res) => res.render('home'))

// USER - sign-up
const userController = new UserController()
app.get('/sign-up', (req, res) => res.render('user/sign-up-form', { errors: [] }))
app.post('/user', userSanitizationsChecksAndValidation, userController.createUser)

app.get('/sign-in', (req, res) => res.render('user/log-in-form', { errors: [] }))
app.post('/sign-in', (req, res) => {})

// ### SERVER ###
app.listen(process.env.PORT, () => console.log(`app listening on port ${process.env.PORT}`))
