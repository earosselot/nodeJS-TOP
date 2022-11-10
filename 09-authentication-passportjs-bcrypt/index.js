const express = require('express')
const path = require('path')
const session = require('express-session')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const morgan = require('morgan')
require('dotenv').config()

// configure database connection
const mongoDb = process.env.PROD_MONGODB_URI
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'mongo connection error'))
db.on('connected', () => console.log('DB Connected'))

// configure database user schema and model
const User = mongoose.model(
	'User',
	new Schema({
		username: { type: String, required: true },
		password: { type: String, required: true }
	})
)

// configure passport local strategy. It passes a verify function that will be trigered on passport.authenticate() and checks wheter the user is authenticated or not.
const strategy = new LocalStrategy(function verify(username, password, done) {
	User.findOne({ username: username }, async (err, user) => {
		if (err) {
			return done(err)
		}
		if (!user) {
			return done(null, false, { message: 'invalid username' })
		}
		const passwordMatches = await bcrypt.compare(password, user.password)
		if (!passwordMatches) {
			return done(null, false, { message: 'invalid password' })
		}
		return done(null, user)
	})
})

// configure passport with an strategy and functions to serialize and deserialize users
passport.use(strategy)
passport.serializeUser((user, done) => {
	done(null, user.id)
})
passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user)
	})
})

const app = express()
app.use(morgan('dev'))

// configure views engine
app.set('views', __dirname)
app.set('view engine', 'ejs')

// configure passport
app.use(
	session({ secret: 'session-secret', resave: false, saveUninitialized: true })
)
app.use(passport.initialize())
app.use(passport.session())

// configure request data parsing for the forms (it could be express.json() if the bodies were json...)
app.use(express.urlencoded({ extended: false }))

// sign-up endpoints
app.get('/sign-up', (req, res) => res.render('sign-up-form'))
app.post('/sign-up', (req, res, next) => {
	bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
		if (err) return next(err)
		const user = new User({
			username: req.body.username,
			password: hashedPassword
		}).save((err) => {
			if (err) return next(err)
			res.redirect('/')
		})
	})
})

// log-in endpoints
app.get('/', (req, res) => res.render('index', { user: req.user }))
app.post(
	'/log-in',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/'
	})
)

// log-out endpoint
app.get('/log-out', (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err)
		}
		res.redirect('/')
	})
})

// start the app
app.listen(process.env.PORT, () =>
	console.log(`listening on port${process.env.PORT}`)
)
